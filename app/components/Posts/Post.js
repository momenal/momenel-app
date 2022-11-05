import {
  Animated,
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import * as Haptics from "expo-haptics";
import React, { useEffect, useRef, useState } from "react";
import PostHeader from "./PostHeader";
import PostsMedia from "./PostsMediaMultiple";
import PostMediaOne from "./PostMediaOne";
import PaginationDot from "./PaginationDot";
import StructuredText from "./StructuredText";
import LottieView from "lottie-react-native";
import { Ionicons } from "@expo/vector-icons";
import CommentsIcon from "../icons/CommentsIcon";
import Repost from "../icons/Repost";
import TipIcon from "../icons/TipIcon";
import CustomText from "../customText/CustomText";

const ScreenWidth = Dimensions.get("window").width;
const Post = ({ data, setShowBottomSheetFunc, index }) => {
  console.log(data.repost.isRepost);
  const [maxHeight, setmaxHeight] = useState(0);
  const animation = useRef(null);
  const [isLiked, setIsLiked] = useState(false);
  const [isFirst, setIsFirst] = useState(true);
  // for pagination dots
  const scrollX = useRef(new Animated.Value(0)).current;
  const setMaxHeightFunc = (h) => {
    setmaxHeight(h);
  };

  useEffect(() => {
    if (isFirst) {
      if (isLiked === true) {
        animation.current?.play(110, 110);
      } else {
        animation.current?.play(6, 6);
      }
      setIsFirst(false);
    } else if (isLiked && !isFirst) {
      animation.current?.play(6, 110);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      // Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } else {
      animation.current?.play(24, 6);
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
  }, [isLiked]);
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
        marginVertical: 10,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* reposts */}
      {data.repost.isRepost && (
        <View
          style={{
            paddingHorizontal: ScreenWidth * 0.04,
            paddingBottom: 11,
            width: "100%",
            flexDirection: "row",
            alignItems: "center",

            // backgroundColor: "pink",
          }}
        >
          <Repost
            size={23}
            color={data.repostedByUser ? "#8456E9" : "#999999"}
          />
          <CustomText
            style={{
              fontFamily: "Nunito_800ExtraBold",
              color: "#999999",
              marginLeft: 8,
              fontSize: 15,
            }}
          >
            {data.repost.repostedBy} reposted
          </CustomText>
        </View>
      )}

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
      <View
        style={{
          // backgroundColor: "black",
          flexDirection: "row",
          width: "100%",
          paddingLeft: ScreenWidth * 0.05,
          paddingRight: ScreenWidth * 0.06,

          justifyContent: "space-between",
          alignItems: "center",
          height: 30,
        }}
      >
        <TouchableWithoutFeedback onPress={() => setIsLiked(!isLiked)}>
          <View
            style={{
              width: 30,
              // backgroundColor: "red",
              alignItems: "center",
            }}
          >
            <LottieView
              ref={animation}
              autoPlay={false}
              style={{ height: 55 }}
              // source={require("../icons/heart.json")}
              source={require("../icons/heart2.json")}
              loop={false}
            />
          </View>
        </TouchableWithoutFeedback>
        <CommentsIcon size={21} />
        <Repost size={25} color={data.repostedByUser ? "#8456E9" : "#999999"} />
        <Ionicons
          name="paper-plane-outline"
          size={25}
          color="#999999"
          style={{ transform: [{ rotate: "45deg" }] }}
        />
        <TipIcon size={25} />
      </View>
    </View>
  );
};

export default Post;

const styles = StyleSheet.create({ container: { backgroundColor: "red" } });
