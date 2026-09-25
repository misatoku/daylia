/* 写真詳細画面 */
import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions, Modal} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AddPhotoScreen from './AddPhotoScreen';

interface Props {
  onClose: () => void;
}

export default function PhotoDetailScreen({ onClose }: Props) {
    const [isAddPhotoOpen, setIsAddPhotoOpen] = useState(false);

    return (
        <View style={styles.overlay}>
            <View style={styles.bottomSheet}>

                {/* ヘッダー */}
                <View style={styles.topBar} />

                {/* メインコンテンツ */}
                <View style={styles.content}>
                    <TouchableOpacity onPress={() => setIsAddPhotoOpen(true)}>
                        <Image
                            source={require('../../assets/addicon.png')}
                            style={styles.image}
                        /> 
                    </TouchableOpacity>
                    <Modal visible={isAddPhotoOpen} animationType="slide">
                        <AddPhotoScreen onClose={() => setIsAddPhotoOpen(false)} />
                    </Modal>

                    <TouchableOpacity onPress={onClose}>
                        <Image
                            source={require('../../assets/return.png')}
                            style={styles.image}
                        /> 
                    </TouchableOpacity>
                </View>

                {/* フッター */}
                <View style={styles.bottomBar} />
            </View>
        </View>
    );
}

// 画面の高さを取得
const { height: screenHeight } = Dimensions.get('window');  // 高さ


const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'transparent',
        justifyContent: 'flex-end',
    },
    bottomSheet: {
        height: screenHeight * 0.5, // 画面の半分の高さ',
        backgroundColor: 'white',
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
        height: 60,
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