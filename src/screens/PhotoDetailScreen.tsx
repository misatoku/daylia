/* 写真詳細画面 */
import React, { useState } from "react";
import {
  Dimensions,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import type { DayEntry, Mood } from "../lib/types";
import AddPhotoScreen from "./AddPhotoScreen";

interface Props {
  date: string;
  entry?: DayEntry;
  onClose: () => void;
  onSaved: () => void;
}

export default function PhotoDetailScreen({
  date,
  entry,
  onClose,
  onSaved,
}: Props) {
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
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 10,
      }}
    >
      <TouchableOpacity style={styles.returnButton} onPress={onClose}>
        <Text style={styles.returnButtonText}>&lt;戻る</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setIsAddPhotoOpen(true)}
      >
        <Text style={styles.addButtonText}>＋</Text>
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
            <ScrollView
              contentContainerStyle={styles.scrollContent}
              showsVerticalScrollIndicator={false}
            >
              <View style={styles.photoContainer}>
                <ImageBackground
                  source={{ uri: entry.photoUrl }}
                  style={styles.photo}
                  imageStyle={styles.photoImage}
                  resizeMode="contain"
                />
                {entry.mood ? (
                  <Image
                    source={moodSources[entry.mood]}
                    style={styles.moodImage}
                    accessibilityLabel="保存された気分"
                  />
                ) : null}
              </View>

              {entry.diary.trim() ? (
                <View style={styles.detailSection}>
                  <Text style={styles.diaryText}>{entry.diary}</Text>
                </View>
              ) : null}
            </ScrollView>
          </View>
        ) : (
          <View style={styles.content}>{controls}</View>
        )}
        <View style={styles.bottomBar} />
      </View>
    </View>
  );
}

const { height: screenHeight } = Dimensions.get("window");

const moodSources: Record<Mood, number> = {
  petal1: require("../../assets/petal1.png"),
  petal2: require("../../assets/petal2.png"),
  petal3: require("../../assets/petal3.png"),
  petal4: require("../../assets/petal4.png"),
  petal5: require("../../assets/petal5.png"),
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "flex-end",
  },
  bottomSheet: { height: screenHeight * 0.5, backgroundColor: "white" },
  content: { flex: 1 },
  scrollContent: { paddingHorizontal: 16, paddingBottom: 24 },
  photoContainer: { width: "100%", aspectRatio: 4 / 3 },
  photo: { width: "100%", height: "100%" },
  photoImage: { width: "100%", height: "100%" },
  detailSection: { marginTop: 20 },
  moodImage: {
    position: "absolute",
    top: -15,
    right: -15,
    width: 120,
    height: 120,
  },
  diaryText: { fontSize: 30, lineHeight: 42, color: "#333" },
  image: { width: 50, height: 50, alignSelf: "flex-start" },
  image2: { width: 50, height: 50, alignSelf: "flex-end" },
  topBar: {
    backgroundColor: "#9EBCA8",
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  bottomBar: {
    backgroundColor: "#9EBCA8",
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  dateText: { fontSize: 20, fontWeight: "bold" },
  dateContainer: { flex: 1, alignItems: "center" },
  returnButton: { padding: 10, borderRadius: 5, alignSelf: "flex-start" },
  returnButtonText: { color: "#000", fontSize: 20 },
  addButton: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
    width: 50,
    alignSelf: "flex-end",
  },
  addButtonText: { color: "#000", fontSize: 20, fontWeight: "bold" },
});
