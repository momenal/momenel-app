import {
  Animated,
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useRef, useState } from "react";
import PostHeader from "./PostHeader";
import PostsMedia from "./PostsMediaMultiple";
import PostMediaOne from "./PostMediaOne";
import PaginationDot from "./PaginationDot";

const Post = ({ data, setShowBottomSheetFunc, index }) => {
  const [maxHeight, setmaxHeight] = useState(0);
  // for pagination dots
  const scrollX = useRef(new Animated.Value(0)).current;
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
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            {
              useNativeDriver: false,
            }
          )}
        />
      ) : (
        <PostMediaOne data={data.posts[0]} />
      )}
      {/* pagination dots */}
      <View
        style={{
          flexDirection: "row",
          // backgroundColor: "pink",
          width: "100%",
          justifyContent: "center",
        }}
      >
        {data.posts.length > 1 && (
          <PaginationDot data={data.posts} scrollX={scrollX} />
        )}
      </View>
    </View>
  );
};

export default Post;

const styles = StyleSheet.create({ container: { backgroundColor: "red" } });
