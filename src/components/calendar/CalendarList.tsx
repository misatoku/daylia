/* 縦スクロールのカレンダー */
import React, { useCallback, useImperativeHandle, useMemo, useRef } from 'react';
import { FlatList, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import {
    getTodayIndex,
    getWeekCount,
    getYearMonth,
    TOTAL_MONTHS,
} from '../../lib/calendar';
import MonthView, { MONTH_TITLE_HEIGHT } from './MonthView';

const WEEKDAYS = ['日', '月', '火', '水', '木', '金', '土'];

// FlatList に渡すデータ（月の番号 0〜2399）
const MONTH_INDEXES = Array.from({ length: TOTAL_MONTHS }, (_, i) => i);

// 親から「今日に戻る」を呼べるようにするための型
export type CalendarListHandle = {
    scrollToToday: () => void;
};

type Props = {
    ref?: React.Ref<CalendarListHandle>;
};

export default function CalendarList({ ref }: Props) {
    const { width } = useWindowDimensions();
    const widthCellSize = width / 7;
    const heightCellSize = widthCellSize * 4 / 3; // 1マスの高さは幅の4/3倍
    const listRef = useRef<FlatList<number>>(null);

    const todayIndex = useMemo(() => getTodayIndex(), []);
    const todayDay = useMemo(() => new Date().getDate(), []);

    // 各月の高さと、上から何px目に始まるかを最初に一度だけ計算しておく
    const { heights, offsets } = useMemo(() => {
        const heights: number[] = [];
        const offsets: number[] = [];
        let offset = 0;
        for (let i = 0; i < TOTAL_MONTHS; i++) {
            const { year, month } = getYearMonth(i);
            const height = MONTH_TITLE_HEIGHT + getWeekCount(year, month) * heightCellSize;
            heights.push(height);
            offsets.push(offset);
            offset += height;
        }
        return { heights, offsets };
    }, [heightCellSize]);

    const getItemLayout = useCallback(
        (_: ArrayLike<number> | null | undefined, index: number) => ({
            length: heights[index],
            offset: offsets[index],
            index,
        }),
        [heights, offsets],
    );

    const renderItem = useCallback(
        ({ item }: { item: number }) => (
            <MonthView
                index={item}
                widthCellSize={widthCellSize}
                heightCellSize={heightCellSize}
                todayDay={item === todayIndex ? todayDay : null}
            />
        ),
        [widthCellSize, heightCellSize, todayIndex, todayDay],
    );

    useImperativeHandle(ref, () => ({
        scrollToToday: () => {
            listRef.current?.scrollToIndex({ index: todayIndex, animated: true });
        },
    }), [todayIndex]);

    return (
        <View style={styles.container}>
            {/* 曜日の行はスクロールせず上に固定 */}
            {/*
            <View style={styles.weekdays}>
                {WEEKDAYS.map((label, d) => (
                    <Text
                        key={label}
                        style={[
                            styles.weekdayText,
                            d === 0 && styles.sunday,
                            d === 6 && styles.saturday,
                        ]}
                    >
                        {label}
                    </Text>
                ))}
            </View>
            */}

            <FlatList
                ref={listRef}
                data={MONTH_INDEXES}
                keyExtractor={(item) => String(item)}
                renderItem={renderItem}
                getItemLayout={getItemLayout}
                initialScrollIndex={todayIndex}
                initialNumToRender={2}
                maxToRenderPerBatch={2}
                windowSize={5}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    weekdays: {
        flexDirection: 'row',
        paddingVertical: 6,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#ccc',
    },
    weekdayText: {
        flex: 1,
        textAlign: 'center',
        fontSize: 12,
        color: '#666',
    },
    sunday: {
        color: '#D9534F',
    },
    saturday: {
        color: '#4A7BC8',
    },
});

