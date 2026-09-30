/* 写真詳細画面 */
import React, { useState } from 'react';
import { Dimensions, Image, ImageBackground, StyleSheet, TouchableOpacity, View } from 'react-native';
import type { DayEntry } from '../lib/types';
import AddPhotoScreen from './AddPhotoScreen';

interface Props {
  date: string;
  entry?: DayEntry;
  onClose: () => void;
  onSaved: () => void;
}

export default function PhotoDetailScreen({ date, entry, onClose, onSaved }: Props) {
    const [isAddPhotoOpen, setIsAddPhotoOpen] = useState(false);

    if (isAddPhotoOpen) {
        return (
            <AddPhotoScreen
                date={date}
                onClose={() => setIsAddPhotoOpen(false)}
                onSaved={onSaved}
            />
        );
    }

    const controls = (
        <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingHorizontal:10}}>
            <TouchableOpacity onPress={onClose}>
                <Image source={require('../../assets/return.png')} style={styles.image} />
            </TouchableOpacity> 
            <TouchableOpacity onPress={() => setIsAddPhotoOpen(true)}>
                <Image source={require('../../assets/addicon.png')} style={styles.image2} />
            </TouchableOpacity>

        </View>
    );

    return (
        <View style={styles.overlay}>
            <View style={styles.bottomSheet}>
                <View style={styles.topBar} />
                {entry ? (
                    <View style={styles.content}>
                        {controls}
                    <ImageBackground source={{ uri: entry.photoUrl }} style={styles.photo} resizeMode="contain">
                    </ImageBackground>
                    </View>
                ) : (
                    <View style={styles.content}>{controls}</View>
                )}
                <View style={styles.bottomBar} />
            </View>
        </View>
    );
}

const { height: screenHeight } = Dimensions.get('window');

const styles = StyleSheet.create({
    overlay: { flex: 1, backgroundColor: 'transparent', justifyContent: 'flex-end' },
    bottomSheet: { height: screenHeight * 0.5, backgroundColor: 'white' },
    content: { flex: 1 },
    photo:{ width: '90%', height: '90%',left:'10%'},
    image: { width: 50, height: 50 ,alignSelf:"flex-start"},
    image2:{ width: 50, height: 50 ,alignSelf:"flex-end"},
    topBar: { backgroundColor: '#9EBCA8', height: 60, justifyContent: 'center', alignItems: 'center' },
    bottomBar: { backgroundColor: '#9EBCA8', height: 60, justifyContent: 'center', alignItems: 'center' },
});
