/* ホーム画面 */
import React, { useState } from 'react';
import { StyleSheet, Text, View, Image,  ScrollView, TouchableOpacity, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CalendarList from '../components/calendar/CalendarList';

export default function HomeScreen() {

    return (
    <SafeAreaView style={styles.container}>
      {/* ヘッダー */}
      <View style={styles.topBar}>
        <Image
            source={require('../../assets/logo.png')}
            style={styles.image}
        />
      </View>

      {/* メインコンテンツ */}
      <View style={styles.content}>
        <CalendarList />
      </View>

      {/* フッター */}
      <View style={styles.bottomBar} />
    </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    topBar: {
        backgroundColor: '#9EBCA8',
        height: 90,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bottomBar: {
        backgroundColor: '#9EBCA8',
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 150,
        height: 150,
    },
});