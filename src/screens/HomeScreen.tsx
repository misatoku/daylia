/* ホーム画面 */
import React, { useCallback, useEffect, useState } from 'react';
import { Alert, Image, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CalendarList from '../components/calendar/CalendarList';
import { fetchEntries } from '../lib/entries';
import type { DayEntry } from '../lib/types';

export default function HomeScreen() {
    const [entries, setEntries] = useState<Record<string, DayEntry>>({});

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

    return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBar}>
        <Image source={require('../../assets/logo.png')} style={styles.image} />
      </View>
      <View style={styles.content}>
        <CalendarList entries={entries} onSaved={loadEntries} />
      </View>
      <View style={styles.bottomBar} />
    </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    content: { flex: 1 },
    text: { fontSize: 20, fontWeight: 'bold' },
    topBar: { backgroundColor: '#9EBCA8', height: 90, justifyContent: 'center', alignItems: 'center' },
    bottomBar: { backgroundColor: '#9EBCA8', height: 60, justifyContent: 'center', alignItems: 'center' },
    image: { width: 150, height: 150 },
});
