/* カレンダーの1日分のマス */
import React, { useState } from "react";
import { Image, Modal, StyleSheet, Text, View, Pressable } from "react-native";
import type { DayEntry } from "../../lib/types";
import PhotoDetailScreen from "../../screens/PhotoDetailScreen";

type Props = {
  day: number | null; // null は月の外の空きマス
  dayOfWeek: number; // 0 = 日曜, 6 = 土曜
  isToday: boolean;
  width: number;
  height: number;
  date: string | null;
  entry?: DayEntry;
  onSaved: () => void;
};

const moodSources = {
  petal1: require("../../../assets/petal1.png"),
  petal2: require("../../../assets/petal2.png"),
  petal3: require("../../../assets/petal3.png"),
  petal4: require("../../../assets/petal4.png"),
  petal5: require("../../../assets/petal5.png"),
} as const;

function DayCell({
  day,
  dayOfWeek,
  isToday,
  width,
  height,
  date,
  entry,
  onSaved,
}: Props) {
  const [isPhotoDetailOpen, setIsPhotoDetailOpen] = useState(false);

  if (day === null || date === null) return <View style={{ width, height }} />;

  return (
    <Pressable style={[styles.cell, isToday && styles.todayCell, { width, height }]} onPress={() => setIsPhotoDetailOpen(true)}>
      {entry?.photoUrl ? (
        <Image
          source={{ uri: entry.photoUrl }}
          style={styles.thumbnail}
          resizeMode="cover"
        />
      ) : null}
      <View style={styles.dayCircle}>
        <Text
          style={[
            styles.dayText,
            dayOfWeek === 0 && styles.sunday,
            dayOfWeek === 6 && styles.saturday,
            entry && styles.entryDayText,
          ]}
        >
          {day}
        </Text>
      </View>

      {/* 写真詳細画面を開くボタン */}
      <View style={styles.addButton}>
        <Text style={styles.addButtonText}>+</Text>
      </View>

      <Modal visible={isPhotoDetailOpen} animationType="slide" transparent>
        <PhotoDetailScreen
          date={date}
          entry={entry}
          onClose={() => setIsPhotoDetailOpen(false)}
          onSaved={() => {
            setIsPhotoDetailOpen(false);
            onSaved();
          }}
        />
      </Modal>

      {/* 今日の気分の表示 */}
      {entry?.mood ? (
        <Image
          source={moodSources[entry.mood]}
          style={styles.moodIcon}
          resizeMode="contain"
        />
      ) : null}
    </Pressable>
  );
}

export default React.memo(DayCell);

const styles = StyleSheet.create({
  cell: {
    alignItems: "flex-start",
    paddingTop: 4,
    borderWidth: 0.5,
    borderColor: "#ccc",
    overflow: "hidden",
  },
  todayCell: { borderColor: "#9EBCA8", borderWidth: 1.5 },
  dayCircle: {
    width: 25,
    height: 25,
    borderRadius: 13,
    justifyContent: "center",
    alignItems: "center",
  },

  addButton: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    top: 0, right: 0, bottom: 0, left: 0,
    zIndex: -1,
  },
  addButtonText: {
    fontSize: 24,
    color: "#ccc",
  },
  dayText: { fontSize: 14, color: "#333" },
  sunday: { color: "#D9534F" },
  saturday: { color: "#4A7BC8" },
  entryDayText:{ color: "#fff" },
  thumbnail: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  moodIcon: {
    position: "absolute",
    top: 1,
    right: 1,
    width: 30,
    height: 30,
  },
});
