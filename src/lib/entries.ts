import type { ImagePickerAsset } from "expo-image-picker";
import { decode } from "base64-arraybuffer";
import { ImageManipulator, SaveFormat } from "expo-image-manipulator";
import { supabase } from "./supabase";
import type { DayEntry, Mood } from "./types";

const BUCKET = "day-photos";

type DayEntryRow = {
  date: string;
  photo_path: string;
  mood: Mood | null;
  diary: string;
};

export function toDateKey(year: number, month: number, day: number) {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

// DBからデータを取得する場所
export async function fetchEntries(): Promise<Record<string, DayEntry>> {
  const { data, error } = await supabase
    .from("day_entries_public") // day_entries_publicっていう名前のテーブルからデータを取ってくる
    .select("date, photo_path, mood, diary"); // この4つのカラムからデータを取ってくる
  if (error) throw error;

  const rows = (data ?? []) as DayEntryRow[];
  if (rows.length === 0) return {};
  // 写真のパスだけを集めた配列を作る
  const paths = rows.map((row) => row.photo_path);

  // まとめて期限付きURLを作る（3600秒 = 1時間有効）
  const { data: urls, error: urlError } = await supabase.storage
    .from(BUCKET)
    .createSignedUrls(paths, 3600);
  if (urlError) throw urlError;

  const entries = rows.map((row, i) => {
    return {
      date: row.date,
      photoUrl: urls[i].signedUrl ?? "",
      photoPath: row.photo_path,
      mood: row.mood,
      diary: row.diary,
    } satisfies DayEntry;
  });

  // ここで取得したデータをオブジェクト化して返す。mapはキー・バリュー配列
  // これでキーで日付を指定して探索できるようになる
  return Object.fromEntries(entries.map((entry) => [entry.date, entry]));
}

export async function saveEntry(
  date: string,
  asset: ImagePickerAsset,
  mood: Mood | null,
  diary: string,
) {

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    throw new Error("ログインしていません。");
  }

  // 写真を読み込んで、幅1080pxに縮める指示を出す
  const context = ImageManipulator.manipulate(asset.uri);
  context.resize({ width: 1080 });

  // 指示どおりに画像を作る
  const image = await context.renderAsync();

  // JPEG で、画質0.7で保存して、base64 ももらう
  const resized = await image.saveAsync({
    format: SaveFormat.JPEG,
    compress: 0.7,
    base64: true,
  });
  // resized.base64 が縮めた写真のデータ
  if (!resized.base64) {
    throw new Error(
      "画像データを読み込めませんでした。写真を選び直してください。",
    );
  }

  const extension = "jpg";
  const photoPath = `${user.id}/${date}/${Date.now()}.${extension}`;
  const fileData = decode(resized.base64); // base64の文字列データをArrayBufferに変換

  const { error: uploadError } = await supabase.storage
    .from(BUCKET)
    .upload(photoPath, fileData, {
      contentType: "image/jpeg",
      upsert: false,
    });
  if (uploadError) throw uploadError;

  const { data: oldEntry } = await supabase
    .from("day_entries_public")
    .select("photo_path")
    .eq("date", date)
    .maybeSingle();

  const { error: saveError } = await supabase.from("day_entries_public").upsert(
    {
      date,
      photo_path: photoPath,
      mood,
      diary: diary.trim(),
      updated_at: new Date().toISOString(),
    },
    { onConflict: "date,user_id" },
  );

  if (saveError) {
    await supabase.storage.from(BUCKET).remove([photoPath]);
    throw saveError;
  }

  if (oldEntry?.photo_path && oldEntry.photo_path !== photoPath) {
    await supabase.storage.from(BUCKET).remove([oldEntry.photo_path]);
  }
}
