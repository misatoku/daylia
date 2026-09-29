/* 写真追加画面 */
import React from 'react';
import { StyleSheet, Text, Button, View, ScrollView, Image, ImageBackground, TouchableOpacity, TextInput} from 'react-native';
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
      <ScrollView style={styles.mainContent} contentContainerStyle={styles.mainContentContainer}>

        {/* 戻るボタン*/}
        <TouchableOpacity style={styles.returnButton} onPress={onClose}>
            <Text style={styles.returnButtonText}>&lt;戻る</Text> 
        </TouchableOpacity>

        {/*今日の一枚*/}
        <View style={styles.addblock}>
            <View style={styles.title}>
                <Image source={require('../../assets/Alstroemeria.png')} style={styles.titleImage} />
                <Text style={styles.titleText}>今日の一枚</Text>
            </View>
            <View style={styles.todayPhoto}>
                <ImageBackground 
                    source={require('../../assets/sample_yoko.png')} 
                    style={styles.photo}
                    imageStyle={styles.photoImage}
                >
                    <Text style={styles.todayPhotoText}>写真を追加してください</Text>
                </ImageBackground>
            </View>
        </View>

        {/*今日の気分*/}
        <View style={styles.addblock}>
            <View style={styles.title}>
                <Image source={require('../../assets/Violet.png')} style={styles.titleImage} />
                <Text style={styles.titleText}>今日の気分</Text>
            </View>
            <View style={styles.todayStamp}>
                <TouchableOpacity>
                    <Image source={require('../../assets/petal1.png')} style={styles.stampImage} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image source={require('../../assets/petal2.png')} style={styles.stampImage} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image source={require('../../assets/petal3.png')} style={styles.stampImage} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image source={require('../../assets/petal4.png')} style={styles.stampImage} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image source={require('../../assets/petal5.png')} style={styles.stampImage} />
                </TouchableOpacity>
            </View>
        </View>

        {/*今日の日記*/}
        <View style={styles.addblock}>
            <View style={styles.title}>
                <Image source={require('../../assets/Clover.png')} style={styles.titleImage} />
                <Text style={styles.titleText}>日記</Text>
            </View>
            <View style={styles.todayDiary}>
                <TextInput
                    placeholder="今日のことを書いてください..."
                    multiline
                    style={styles.diaryInput}
                />
            </View>
        </View>

        {/* 追加ボタン */}
        <TouchableOpacity style={styles.addButton}>
            <Text style={styles.addButtonText}>+ 追加</Text>
        </TouchableOpacity>

      </ScrollView>

      {/* フッター */}
      <View style={styles.bottomBar} />
    </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    mainContent: {
        flex: 1,
    },
    mainContentContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
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

    returnButton: {
        padding: 10,
        borderRadius: 5,
        alignSelf: 'flex-start'
    },
    returnButtonText: {
        color: '#000',
        fontSize: 20,
    },

    addblock: {
        //flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },

    title: {
        //flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    titleText: {
        fontSize: 25,
        fontWeight: 'bold',
    },
    titleImage: {
        width: 50,
        height: 50,
    },

    todayPhoto: {
        //flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: undefined,
        //maxWidth: 300,
    },
    photo: {
        width: '90%',
        height: undefined,
        aspectRatio: 4 / 3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    photoImage: {
        width: '100%',
        height: '100%',
    },
    todayPhotoText: {
        fontSize: 20,
        color: '#000',
    },

    todayStamp: {
        //flex: 1,
        flexDirection: 'row',
    },
    stampImage: {
        width: 70,
        height: 70,
    },

    todayDiary: {
        //flex: 1,
        width: 350,
    },
    diaryInput: {
        width: '100%',
        height: 100,
        borderWidth: 1,
        borderColor: '#888',
        borderRadius: 5,
        padding: 10,
    },

    addButton: {
        backgroundColor: '#fff',
        padding: 10,
        borderWidth: 1,
        borderColor: '#888',
        borderRadius: 5,
        margin: 10,
        width: 100,
        alignItems: 'center',
    },
    addButtonText: {
        color: '#000',
        fontSize: 20,
        fontWeight: 'bold',
    },
});