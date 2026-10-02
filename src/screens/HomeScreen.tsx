/* ホーム画面 */
import React, { useCallback, useEffect, useState, useRef } from 'react';
import { Alert, Image, StyleSheet, View, TouchableOpacity, Text, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { captureRef } from 'react-native-view-shot';
import * as Sharing from 'expo-sharing';
import CalendarList from '../components/calendar/CalendarList';
import { fetchEntries } from '../lib/entries';
import type { DayEntry } from '../lib/types';
import { getTodayIndex } from '../lib/calendar';
import MonthView from '../components/calendar/MonthView';

export default function HomeScreen() {
    const [entries, setEntries] = useState<Record<string, DayEntry>>({});

    const [currentMonthIndex, setCurrentMonthIndex] = useState(getTodayIndex); // 見てる月を渡す

    const calendarRef = useRef<View>(null);   // 目印を作る

    const loadEntries = useCallback(async () => {
        try {
            setEntries(await fetchEntries());
        } catch (error) {
            Alert.alert('読み込みに失敗しました', error instanceof Error ? error.message : 'もう一度お試しください。');
        }
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => { void loadEntries(); }, 0);
        return () => clearTimeout(timer);
    }, [loadEntries]);

    const handleShare = async () => {
    try {
        const uri = await captureRef(calendarRef);
        await Sharing.shareAsync(uri);
    } catch (error) {
        Alert.alert('共有に失敗しました', error instanceof Error ? error.message : 'もう一度お試しください。');
    }
    };

    const { width } = useWindowDimensions();
    const widthCellSize = width / 7;
    const heightCellSize = widthCellSize * 4 / 3;

    return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBar}>
        <Image source={require('../../assets/logo.png')} style={styles.image} />
      </View>
      <View style={styles.content}>
        <CalendarList entries={entries} onSaved={loadEntries} onMonthChange={setCurrentMonthIndex} />
        {/* メニューバー */}
        <View style={styles.overlay}>
            <View style={styles.menuBar}>
                <TouchableOpacity onPress={handleShare}>
                    <Text>↑</Text>
                </TouchableOpacity>
            </View>
        </View>
      </View>

      <View style={styles.bottomBar} />

        {/* 撮影用の画面外カレンダー */}
        <View ref={calendarRef} collapsable={false} style={[styles.shareTarget, { width }]}>
            <MonthView
                index={currentMonthIndex}
                widthCellSize={widthCellSize}
                heightCellSize={heightCellSize}
                todayDay={null}
                entries={entries}
                onSaved={loadEntries}
            />
        </View>
    </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    content: { flex: 1 },
    text: { fontSize: 20, fontWeight: 'bold' },
    topBar: { backgroundColor: '#9EBCA8', height: 90, justifyContent: 'center', alignItems: 'center' },
    overlay: { position: "absolute", backgroundColor: 'transparent', height: 80, left: 0, right: 0, bottom: 0, justifyContent: 'flex-end' },
    menuBar: {
        backgroundColor: '#fff', 
        height: 60, marginHorizontal: 10, marginBottom: 20, 
        borderRadius: 30, borderColor: "#ccc", borderWidth: 1, borderStyle: 'solid',
        shadowColor: "#ccc", shadowOffset: { width: 4, height: 4 }, shadowOpacity: 0.5, shadowRadius: 4,
        flexDirection: "row", justifyContent: "space-around",
    },
    bottomBar: { backgroundColor: '#9EBCA8', height: 70, justifyContent: 'center', alignItems: 'center' },
    image: { width: 150, height: 150 },
    shareTarget: {
    position: 'absolute',
    left: -10000,          // 画面の外に追い出す
    backgroundColor: '#fff', // 背景がないと透明な画像になるので白を敷く
    },
});
