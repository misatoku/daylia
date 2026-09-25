/* カレンダーの1か月分（月のタイトル + 日付のグリッド） */
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { getMonthWeeks, getYearMonth } from '../../lib/calendar';
import DayCell from './DayCell';

// 月のタイトル部分の高さ。CalendarList の高さ計算でも使う
export const MONTH_TITLE_HEIGHT = 54;

type Props = {
    index: number;         // 月の番号
    widthCellSize: number;      // 1マスの幅
    heightCellSize: number;     // 1マスの高さ
    todayDay: number | null; // この月に今日が含まれるならその日、なければ null
};

function MonthView({ index, widthCellSize, heightCellSize, todayDay }: Props) {
    const { year, month } = getYearMonth(index);
    const weeks = getMonthWeeks(year, month);

    return (
        <View>
            <View style={styles.title}>
                <Text style={styles.titleText}>
                    {year}年{month + 1}月
                </Text>
            </View>
            {weeks.map((week, w) => (
                <View key={w} style={styles.week}>
                    {week.map((day, d) => (
                        <DayCell
                            key={d}
                            day={day}
                            dayOfWeek={d}
                            isToday={day !== null && day === todayDay}
                            width={widthCellSize}
                            height={heightCellSize}
                        />
                    ))}
                </View>
            ))}
        </View>
    );
}

export default React.memo(MonthView);

const styles = StyleSheet.create({
    title: {
        height: MONTH_TITLE_HEIGHT,
        justifyContent: 'center',
        paddingHorizontal: 16,
    },
    titleText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333',
    },
    week: {
        flexDirection: 'row',
    },
});
