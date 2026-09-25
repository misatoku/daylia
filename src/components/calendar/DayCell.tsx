/* カレンダーの1日分のマス */
import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, Button, ScrollView, Modal} from 'react-native';
import PhotoDetailScreen from '../../screens/PhotoDetailScreen';

type Props = {
    day: number | null; // null は月の外の空きマス
    dayOfWeek: number;  // 0 = 日曜, 6 = 土曜
    isToday: boolean;
    width: number;
    height: number;
};

function DayCell({ day, dayOfWeek, isToday, width, height }: Props) {
    
    const [isPhotoDetailOpen, setIsPhotoDetailOpen] = useState(false);

    if (day === null) {
        return <View style={{ width: width, height: height }} />;
    }

    return (
        <View style={[styles.cell, isToday && styles.todayCell, { width, height }]}>
            <View style={[styles.dayCircle]}>
                <Text
                    style={[
                        styles.dayText,
                        dayOfWeek === 0 && styles.sunday,
                        dayOfWeek === 6 && styles.saturday,
                    ]}
                >
                    {day}
                </Text>
            </View>

            {/* 写真詳細画面を開くボタン */}
            <View style={styles.addArea}>
                <Button 
                    title="+" 
                    color="#ccc"
                    onPress={() => setIsPhotoDetailOpen(true)}
                />
            </View>
            
            <Modal visible={isPhotoDetailOpen} animationType="slide" transparent>
                <PhotoDetailScreen onClose={() => setIsPhotoDetailOpen(false)} />
            </Modal>

            {/* TODO: ここに写真のサムネイルやステッカーを表示する */}
        </View>
    );
}

export default React.memo(DayCell);

const styles = StyleSheet.create({
    cell: {
        alignItems: 'flex-start',
        paddingTop: 4,
        borderWidth: 0.5,
        borderColor: '#ccc',
    },
    todayCell: {
        borderColor: '#9EBCA8',
        borderWidth: 1.5,
    },
    dayCircle: {
        width: 26,
        height: 26,
        borderRadius: 13,
        justifyContent: 'center',
        alignItems: 'center',
    },
    addArea: {
        flex: 1,
        ...StyleSheet.absoluteFill,
        justifyContent: 'center',
        alignItems: 'center',
    },

    dayText: {
        fontSize: 14,
        color: '#333',
    },
    sunday: {
        color: '#D9534F',
    },
    saturday: {
        color: '#4A7BC8',
    },
});
