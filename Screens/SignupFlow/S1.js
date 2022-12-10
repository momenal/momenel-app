import { Button, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { supabase } from "../../app/lib/supabase";

const S1 = ({ navigation }) => {
  useEffect(() => {
    async function user(params) {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      console.log(user.user_metadata.dob);
    }
    user();
  }, []);
  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <Text>S1</Text>
      <Button title="next" onPress={() => navigation.navigate("s2")} />
      <Button title="Logout" onPress={() => supabase.auth.signOut()} />
    </View>
  );
};

export default S1;

const styles = StyleSheet.create({});
