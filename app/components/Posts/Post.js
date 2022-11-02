import { StyleSheet, Text, View } from "react-native";
import React from "react";
import PostHeader from "./PostHeader";

const Post = ({ data }) => {
  return (
    <View
      style={{
        backgroundColor: "#FFFFFF",
        width: "100%",
        paddingHorizontal: 18,
        paddingVertical: 10,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <PostHeader
        profileUrl={data.profile_url}
        username={data.userName}
        name={data.name}
        createdAt={data.createdAt}
        isSaved={data.isSaved}
      />
      <Text>Post</Text>
    </View>
  );
};

export default Post;

const styles = StyleSheet.create({ container: { backgroundColor: "red" } });
