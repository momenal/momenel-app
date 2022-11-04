import { Dimensions, FlatList, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import PostHeader from "./PostHeader";
import PostsMedia from "./PostsMediaMultiple";
import PostMediaOne from "./PostMediaOne";

const ScreenWidth = Dimensions.get("window").width;
const Post = ({ data, setShowBottomSheetFunc, index }) => {
  // const renderItem = ({ item, index }) => (
  //   <PostsMedia data={item} length={data.posts.length} />
  // );
  const [maxHeight, setmaxHeight] = useState(0);
  const setMaxHeightFunc = (h) => {
    setmaxHeight(h);
  };
  const renderItem = ({ item, index }) => {
    return (
      <PostsMedia
        data={item}
        maxHeight={maxHeight}
        index={index}
        setMaxHeightFunc={setMaxHeightFunc}
      />
    );
  };
  return (
    <View
      style={{
        backgroundColor: "#FFFFFF",
        width: "100%",
        // paddingHorizontal: 18,
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
        setShowBottomSheetFunc={setShowBottomSheetFunc}
        index={index}
      />
      {/* media */}
      {data.posts.length >= 2 ? (
        <FlatList
          data={data.posts}
          horizontal
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          snapToAlignment="end"
          decelerationRate={"fast"}
          snapToInterval={Dimensions.get("window").width}
        />
      ) : (
        <PostMediaOne data={data.posts[0]} />
      )}
      {data.posts.length > 1 && data.posts.map((d) => <Text>tabs</Text>)}
    </View>
  );
};

export default Post;

const styles = StyleSheet.create({ container: { backgroundColor: "red" } });
