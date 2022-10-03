import { Button, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const Home = ({ navigation }) => {
  return (
    <SafeAreaView style={{ backgroundColor: "white", height: "100%" }}>
      <Button title="post" onPress={() => navigation.navigate("Post")} />
      <Button title="d2" onPress={() => navigation.navigate("Discover2")} />
      <Button title="hidden" onPress={() => navigation.navigate("Hidden")} />
      <Button title="Profile" onPress={() => navigation.navigate("Profile")} />
      <Button
        title="comments"
        onPress={() => navigation.navigate("Comments")}
      />
      <Text>Home</Text>
      <Text>Home</Text>
      <Text>Home</Text>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({});
