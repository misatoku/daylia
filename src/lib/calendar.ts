/* カレンダー用の日付計算 */

// index 0 = 2000年1月。ここから100年分（1200か月）を扱う
export const BASE_YEAR = 2000;
export const TOTAL_MONTHS = 12 * 100;

export type YearMonth = {
    year: number;
    month: number; // 0 = 1月, 11 = 12月（Date と同じ）
};

// 月の番号 → 年月
export function getYearMonth(index: number): YearMonth {
    return {
        year: BASE_YEAR + Math.floor(index / 12),
        month: index % 12,
    };
}

// 年月 → 月の番号
export function getMonthIndex(year: number, month: number): number {
    return (year - BASE_YEAR) * 12 + month;
}

// 今月の番号
export function getTodayIndex(): number {
    const today = new Date();
    return getMonthIndex(today.getFullYear(), today.getMonth());
}

// その月が何週あるか（日曜始まりで 4〜6）
export function getWeekCount(year: number, month: number): number {
    const firstDayOfWeek = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    return Math.ceil((firstDayOfWeek + daysInMonth) / 7);
}

// その月の日付を週ごとに分けた配列。月の外のマスは null
// 例: [[null, null, 1, 2, 3, 4, 5], [6, 7, ...], ...]
export function getMonthWeeks(year: number, month: number): (number | null)[][] {
    const firstDayOfWeek = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const weekCount = getWeekCount(year, month);

    const weeks: (number | null)[][] = [];
    for (let w = 0; w < weekCount; w++) {
        const week: (number | null)[] = [];
        for (let d = 0; d < 7; d++) {
            const day = w * 7 + d - firstDayOfWeek + 1;
            week.push(day >= 1 && day <= daysInMonth ? day : null);
        }
        weeks.push(week);
    }
    return weeks;
}
