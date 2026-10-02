import React, {useState, useEffect} from 'react';
import { StyleSheet, View, } from 'react-native';
import { Session } from '@supabase/supabase-js';
import HomeScreen from './src/screens/HomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import {supabase} from "./src/lib/supabase"

export default function App() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    // 起動時に今のログイン情報を取得
    supabase.auth.getSession().then(({ data }) => {
      // data.session を state にセット
      setSession(data.session)
    });

    // ログイン・ログアウトの見張り
    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      // session を state にセット
      setSession(session)
    });

    // 画面が消えるときに見張りをやめる
    return () => data.subscription.unsubscribe();
    },[]);

  return (
    <View style={styles.container}>
      {session ? <HomeScreen /> : <LoginScreen />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});