/* 写真追加画面 */
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import {
  Alert,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { saveEntry } from "../lib/entries";
import type { Mood } from "../lib/types";

interface Props {
  date: string;
  onClose: () => void;
  onSaved: () => void;
}

export default function AddPhotoScreen({ date, onClose, onSaved }: Props) {
  const [photo, setPhoto] = useState<ImagePicker.ImagePickerAsset | null>(null);
  const [mood, setMood] = useState<Mood | null>(null);
  const [diary, setDiary] = useState("");
  const [saving, setSaving] = useState(false);

  const pickPhoto = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert(
        "写真へのアクセスが必要です",
        "端末の設定から写真へのアクセスを許可してください。",
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      quality: 0.9,
    });
    if (!result.canceled) setPhoto(result.assets[0]);
  };

  const addPhoto = async () => {
    if (!photo) {
      Alert.alert("写真を追加してください");
      return;
    }
    try {
      setSaving(true);
      await saveEntry(date, photo, mood, diary);
      onSaved();
    } catch (error) {
      Alert.alert(
        "保存できませんでした",
        error instanceof Error ? error.message : "もう一度お試しください。",
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* ヘッダー */}
      <View style={styles.topBar} />

      {/* メインコンテンツ */}
      <ScrollView
        style={styles.mainContent}
        contentContainerStyle={styles.mainContentContainer}
      >
        {/* 戻るボタン*/}
        <TouchableOpacity style={styles.returnButton} onPress={onClose}>
          <Text style={styles.returnButtonText}>&lt;戻る</Text>
        </TouchableOpacity>

        {/*今日の一枚*/}
        <View style={styles.addblock}>
          <View style={styles.title}>
            <Image
              source={require("../../assets/Alstroemeria.png")}
              style={styles.titleImage}
            />
            <Text style={styles.titleText}>今日の一枚</Text>
          </View>
          <View style={styles.todayPhoto}>
            <TouchableOpacity
              style={styles.photo}
              onPress={pickPhoto}
              activeOpacity={0.8}
            >
              <ImageBackground
                source={
                  photo
                    ? { uri: photo.uri }
                    : require("../../assets/sample_yoko.png")
                }
                style={styles.photoBackground}
                imageStyle={styles.photoImage}
                resizeMode="cover"
              >
                {!photo ? (
                  <Text style={styles.todayPhotoText}>
                    写真を追加してください
                  </Text>
                ) : null}
              </ImageBackground>
            </TouchableOpacity>
          </View>
        </View>

        {/*今日の気分*/}
        <View style={styles.addblock}>
          <View style={styles.title}>
            <Image
              source={require("../../assets/Violet.png")}
              style={styles.titleImage}
            />
            <Text style={styles.titleText}>今日の気分</Text>
          </View>
          <View style={styles.todayStamp}>
            {(["petal1", "petal2", "petal3", "petal4", "petal5"] as Mood[]).map(
              (item) => (
                <TouchableOpacity key={item} onPress={() => setMood(item)}>
                  <Image source={moodSources[item]} style={styles.stampImage} />
                </TouchableOpacity>
              ),
            )}
          </View>
        </View>

        <View style={styles.addblock}>
          <View style={styles.title}>
            <Image
              source={require("../../assets/Clover.png")}
              style={styles.titleImage}
            />
            <Text style={styles.titleText}>日記</Text>
          </View>
          <View style={styles.todayDiary}>
            <TextInput
              value={diary}
              onChangeText={setDiary}
              placeholder="今日のことを書いてください..."
              multiline
              style={styles.diaryInput}
            />
          </View>
        </View>

        {/* 追加ボタン */}
        <TouchableOpacity
          style={styles.addButton}
          onPress={addPhoto}
          disabled={saving}
        >
          <Text style={styles.addButtonText}>+ 追加</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* フッター */}
      <View style={styles.bottomBar} />
    </SafeAreaView>
  );
}

const moodSources = {
  petal1: require("../../assets/petal1.png"),
  petal2: require("../../assets/petal2.png"),
  petal3: require("../../assets/petal3.png"),
  petal4: require("../../assets/petal4.png"),
  petal5: require("../../assets/petal5.png"),
} as const;

const styles = StyleSheet.create({
  container: { flex: 1 },
  mainContent: { flex: 1 },
  mainContentContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  topBar: {
    backgroundColor: "#9EBCA8",
    height: 90,
    justifyContent: "center",
    alignItems: "center",
  },
  bottomBar: {
    backgroundColor: "#9EBCA8",
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  returnButton: { padding: 10, borderRadius: 5, alignSelf: "flex-start" },
  returnButtonText: { color: "#000", fontSize: 20 },
  addblock: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  title: { flexDirection: "row", alignItems: "flex-start" },
  titleText: { fontSize: 25, fontWeight: "bold" },
  titleImage: { width: 50, height: 50 },
  todayPhoto: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: undefined,
  },
  photo: {
    width: "90%",
    height: undefined,
    aspectRatio: 4 / 3,
    justifyContent: "center",
    alignItems: "center",
  },
  photoBackground: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  photoImage: { width: "100%", height: "100%" },
  todayPhotoText: { fontSize: 20, color: "#000" },
  todayStamp: { flexDirection: "row" },
  stampImage: { width: 70, height: 70 },
  todayDiary: { width: 350 },
  diaryInput: {
    width: "100%",
    height: 100,
    borderWidth: 1,
    borderColor: "#888",
    borderRadius: 5,
    padding: 10,
  },
  addButton: {
    backgroundColor: "#fff",
    padding: 10,
    borderWidth: 1,
    borderColor: "#888",
    borderRadius: 5,
    margin: 10,
    width: 100,
    alignItems: "center",
  },
  addButtonText: { color: "#000", fontSize: 20, fontWeight: "bold" },
});
