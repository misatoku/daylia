/* 写真詳細画面 */
import React, { useState } from 'react';
import { Dimensions, Image, ImageBackground, Modal, StyleSheet, TouchableOpacity, View } from 'react-native';
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

    const controls = (
        <>
            <TouchableOpacity onPress={() => setIsAddPhotoOpen(true)}>
                <Image source={require('../../assets/addicon.png')} style={styles.image} />
            </TouchableOpacity>
            <Modal visible={isAddPhotoOpen} animationType="slide">
                <AddPhotoScreen date={date} onClose={() => setIsAddPhotoOpen(false)} onSaved={onSaved} />
            </Modal>
            <TouchableOpacity onPress={onClose}>
                <Image source={require('../../assets/return.png')} style={styles.image} />
            </TouchableOpacity>
        </>
    );

    return (
        <View style={styles.overlay}>
            <View style={styles.bottomSheet}>
                <View style={styles.topBar} />
                {entry ? (
                    <ImageBackground source={{ uri: entry.photoUrl }} style={styles.content} resizeMode="cover">
                        {controls}
                    </ImageBackground>
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
    image: { width: 50, height: 50 },
    topBar: { backgroundColor: '#9EBCA8', height: 60, justifyContent: 'center', alignItems: 'center' },
    bottomBar: { backgroundColor: '#9EBCA8', height: 60, justifyContent: 'center', alignItems: 'center' },
});
