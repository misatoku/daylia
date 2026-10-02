import React, { useState } from "react";
import { Alert, StyleSheet, View, Image, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from "react-native";
import {supabase} from "../lib/supabase"

export default function LoginScreen() {
  // メアドとパスワード用変数
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  const handleLogin = async () => {
  const { error } = await supabase.auth.signInWithPassword({
    email: email,
    password: pass,
  });
  if (error) {
    Alert.alert('ログインに失敗しました');
  }else{
    console.log("ログイン成功");
  }
  };
  
  return (
    <View style={styles.container}>
        <View style={styles.topBar}>
            <Image source={require("../../assets/logo.png")} style={styles.image} />
        </View>
        <View style={styles.content}>
            <KeyboardAvoidingView style={styles.login} behavior={Platform.OS === "ios" ? "padding" : "height"}>
                <TextInput 
                style={styles.loginInput}
                placeholder="メールアドレス"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
                />
                <TextInput 
                style={styles.loginInput}
                placeholder="パスワード"
                secureTextEntry
                autoCapitalize="none"
                value={pass}
                onChangeText={setPass}
                />
                <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                    <Text>ログイン</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </View>
        <View style={styles.bottomBar} />
    </View>
  );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    topBar: { backgroundColor: '#9EBCA8', height: 90, justifyContent: 'center', alignItems: 'center' },
    image: { width: 150, height: 150 },
    content: { flex: 1, justifyContent: "center", },
    login: {
        paddingHorizontal: 24,
        alignItems: "center",
        marginBottom: 20,
    },
    loginInput: {
        width: "100%",
        height: 44,
        borderWidth: 1,
        borderColor: "#888",
        borderRadius: 5,
        marginBottom: 12,
        padding: 10,
    },
    loginButton: {
        backgroundColor: "#fff",
        padding: 10,
        borderWidth: 1,
        borderColor: "#888",
        borderRadius: 5,
        margin: 10,
        width: 100,
        alignItems: "center",
    },
    bottomBar: { backgroundColor: '#9EBCA8', height: 70, justifyContent: 'center', alignItems: 'center' },
});