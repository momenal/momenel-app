import { Button, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";

const CreatePost = ({ navigation }) => {
  useEffect(() => {
    navigation.setOptions({
      tabBarStyle: { display: "none" },
    });
  }, []);
  return (
    <View>
      <Text>CreatePost</Text>
      <Button title="back" onPress={() => navigation.goBack()} />
      <Button title="dw!" onPress={() => navigation.navigate("Discover2")} />
    </View>
  );
};

export default CreatePost;

const styles = StyleSheet.create({});
