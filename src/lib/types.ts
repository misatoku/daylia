// ステッカーの種類
export type Mood = 'petal1' | 'petal2' | 'petal3' | 'petal4' | 'petal5';

// 日記の1日分のデータ
export type DayEntry = {
    date: string;       // '2026-09-25'
    photoUrl: string;   // 表示する写真のURL
    mood: Mood | null;  // 気分ステッカー
    diary: string;      // 日記の本文
}