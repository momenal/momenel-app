import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { supabase } from "../lib/supabase";

const FakeLogout = () => {
  function logSession() {
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log("session: \n", session.access_token);
    });
  }
  return (
    <SafeAreaView>
      <Text>FakeLogout</Text>
      <View style={{ marginBottom: 20 }}>
        <Button title="Log Session" onPress={logSession} />
      </View>

      <Button title="Logout" onPress={() => supabase.auth.signOut()} />
    </SafeAreaView>
  );
};

export default FakeLogout;
