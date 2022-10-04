import { Button, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const Home = ({ navigation }) => {
  return (
    <View
      style={{
        backgroundColor: "white",
        height: "100%",
        backgroundColor: "red",
      }}
    >
      <Button title="post" onPress={() => navigation.navigate("Post")} />
      <Button title="d2" onPress={() => navigation.navigate("Discover2")} />
      <Button title="cars" onPress={() => navigation.navigate("Cars")} />
      <Button title="Profile" onPress={() => navigation.navigate("Profile")} />
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
