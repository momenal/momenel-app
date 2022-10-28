import { Button, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import CustomText from "../app/components/customText/CustomText";
import StoriesContainer from "../app/components/Stories/StoriesScroll/StoriesContainer";

const Home = ({ navigation, route }) => {
  console.log(route);
  return (
    <View
      style={{
        backgroundColor: "white",
        height: "100%",
        // backgroundColor: "pink",
      }}
    >
      <StoriesContainer navigation={navigation} />
      <Text>Home</Text>
      <Text>Home</Text>
      <Text>Home</Text>
      <Text>Home</Text>
      <Text>Home</Text>
      <Text>Home</Text>
      <Text>Home</Text>
      <Text>Home</Text>
      <Button title="story" onPress={() => navigation.navigate("Stories")} />
      <Button
        title="comments"
        onPress={() => navigation.navigate("Comments")}
      />
      <Text>Home</Text>
      <Text>Home</Text>
      <CustomText style={{ color: "white" }}>Home</CustomText>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
