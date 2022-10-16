import { Button, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const Home = ({ navigation }) => {
  return (
    <View
      style={{
        backgroundColor: "white",
        height: "100%",
        backgroundColor: "pink",
      }}
    >
      <Button title="story" onPress={() => navigation.navigate("Stories")} />
      <Button
        title="comments"
        onPress={() => navigation.navigate("Comments")}
      />
      <Text>Home</Text>
      <Text>Home</Text>
      <Text>Home</Text>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
