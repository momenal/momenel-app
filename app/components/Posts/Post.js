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
import StructuredText from "./StructuredText";

const ScreenWidth = Dimensions.get("window").width;
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
  const mentionHashtagClick = (text) => {
    console.log(text);
  };

  return (
    <View
      style={{
        backgroundColor: "#FFFFFF",
        // backgroundColor: "pink",
        width: "100%",
        // paddingHorizontal: 18,
        marginVertical: 11,
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
          width: "100%",
          justifyContent: "center",
          paddingBottom: 11,
        }}
      >
        {data.posts.length > 1 && (
          <PaginationDot data={data.posts} scrollX={scrollX} />
        )}
      </View>
      {/* caption */}
      <View
        style={{
          borderRadius: 3,
          paddingHorizontal: ScreenWidth * 0.06,
          width: ScreenWidth,
          paddingBottom: 16,
        }}
      >
        <StructuredText
          mentionHashtagPress={mentionHashtagClick}
          mentionHashtagColor={"#8759F2"}
          numberOfLines={4}
          // ellipsizeMode={"trail"}
          style={{ color: "#535353", fontSize: 17 }}
        >
          {data.caption}
        </StructuredText>
      </View>
    </View>
  );
};

export default Post;

const styles = StyleSheet.create({ container: { backgroundColor: "red" } });
