/* 写真追加画面 */
import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Props {
  onClose: () => void; // 閉じるボタン
}

export default function AddPhotoScreen({ onClose }: Props) {
    return (
    <SafeAreaView style={styles.container}>
      {/* ヘッダー */}
      <View style={styles.topBar} />

      {/* メインコンテンツ */}
      <View style={styles.content}>
        <Text style={styles.text}>写真を追加・選択する画面</Text>
        <TouchableOpacity onPress={onClose}>
            <Image
                source={require('../../assets/return.png')}
                style={styles.image}
            /> 
        </TouchableOpacity>
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
    image: {
        width: 50,
        height: 50,
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
});