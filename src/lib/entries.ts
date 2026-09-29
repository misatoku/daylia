import type { ImagePickerAsset } from 'expo-image-picker';
import { supabase } from './supabase';
import type { DayEntry, Mood } from './types';

const BUCKET = 'day-photos';

type DayEntryRow = {
    date: string;
    photo_path: string;
    mood: Mood | null;
    diary: string;
};

export function toDateKey(year: number, month: number, day: number) {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

export async function fetchEntries(): Promise<Record<string, DayEntry>> {
    const { data, error } = await supabase
        .from('day_entries_public')
        .select('date, photo_path, mood, diary');
    if (error) throw error;

    const rows = (data ?? []) as DayEntryRow[];
    const entries = rows.map((row) => {
        const { data: publicUrl } = supabase.storage.from(BUCKET).getPublicUrl(row.photo_path);
        return {
            date: row.date,
            photoUrl: publicUrl.publicUrl,
            photoPath: row.photo_path,
            mood: row.mood,
            diary: row.diary,
        } satisfies DayEntry;
    });

    return Object.fromEntries(entries.map((entry) => [entry.date, entry]));
}

export async function saveEntry(
    date: string,
    asset: ImagePickerAsset,
    mood: Mood | null,
    diary: string,
) {
    const extension = asset.fileName?.split('.').pop()?.toLowerCase() ?? 'jpg';
    const photoPath = `public/${date}/${Date.now()}.${extension}`;
    const fileResponse = await fetch(asset.uri);
    const fileData = await fileResponse.arrayBuffer();

    const { error: uploadError } = await supabase.storage.from(BUCKET).upload(photoPath, fileData, {
        contentType: asset.mimeType ?? 'image/jpeg',
        upsert: false,
    });
    if (uploadError) throw uploadError;

    const { data: oldEntry } = await supabase
        .from('day_entries_public')
        .select('photo_path')
        .eq('date', date)
        .maybeSingle();

    const { error: saveError } = await supabase.from('day_entries_public').upsert({
        date,
        photo_path: photoPath,
        mood,
        diary: diary.trim(),
        updated_at: new Date().toISOString(),
    }, { onConflict: 'date' });

    if (saveError) {
        await supabase.storage.from(BUCKET).remove([photoPath]);
        throw saveError;
    }

    if (oldEntry?.photo_path && oldEntry.photo_path !== photoPath) {
        await supabase.storage.from(BUCKET).remove([oldEntry.photo_path]);
    }
}
