import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { supabase } from "../lib/supabase";

const FakeLogout = () => {
  return (
    <SafeAreaView>
      <Text>FakeLogout</Text>
      <Button title="Logout" onPress={() => supabase.auth.signOut()} />
    </SafeAreaView>
  );
};

export default FakeLogout;

const styles = StyleSheet.create({});
