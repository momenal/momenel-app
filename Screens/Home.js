import { Button, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import CustomText from "../app/components/customText/CustomText";
import StoriesContainer from "../app/components/Stories/StoriesScroll/StoriesContainer";
import { useBoundStore } from "../app/Store/useBoundStore";
import Post from "../app/components/Posts/Post";

const Home = ({ navigation }) => {
  const SetUserData = useBoundStore((state) => state.SetUserData);
  const postsData = useBoundStore((state) => state.posts);

  useEffect(() => {
    fetch("https://random-data-api.com/api/v2/users")
      .then((response) => response.json())
      .then((json) => {
        // console.log(json.uid);
        let username = "farhanverse";
        let fname = "farhan";
        let profile_url =
          "https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80";
        let preview_url =
          "https://images.unsplash.com/photo-1592298285277-64da3dc70efb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80";
        SetUserData(
          (username = username),
          (profile_url = profile_url),
          (preview_url = preview_url)
        );
      });
  }, []);

  return (
    <View
      style={{
        backgroundColor: "white",
        height: "100%",
        // backgroundColor: "pink",
      }}
    >
      <StoriesContainer navigation={navigation} />
      {postsData.map((post) => (
        <Post key={post.userId} data={post} />
      ))}

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
