import {
  Animated,
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import * as Haptics from "expo-haptics";
import React, { useRef, useState } from "react";
import PostHeader from "./PostHeader";
import PostsMedia from "./PostsMediaMultiple";
import PostMediaOne from "./PostMediaOne";
import PaginationDot from "./PaginationDot";
import StructuredText from "./StructuredText";
import CommentsIcon from "../icons/CommentsIcon";
import Repost from "../icons/Repost";
import TipIcon from "../icons/TipIcon";
import CustomText from "../customText/CustomText";
import { useBoundStore } from "../../Store/useBoundStore";
import Heart from "../icons/Heart";

const ScreenWidth = Dimensions.get("window").width;

const Post = ({ data, setShowBottomSheetFunc, index }) => {
  const handleRepost = useBoundStore((state) => state.handleRepost);
  const handleLike = useBoundStore((state) => state.handleLike);
  const [maxHeight, setmaxHeight] = useState(0);

  // for pagination dots
  const scrollX = useRef(new Animated.Value(0)).current;

  const setMaxHeightFunc = (h) => {
    setmaxHeight(h);
  };

  const handleLikeFunc = () => {
    handleLike(index);
    if (data.isLiked === true) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } else {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
  };

  const doubleTap = () => {
    handleLikeFunc();
  };

  const renderItem = ({ item, index }) => {
    return (
      <PostsMedia
        data={item}
        maxHeight={maxHeight}
        index={index}
        setMaxHeightFunc={setMaxHeightFunc}
        doubleTap={doubleTap}
      />
    );
  };
  const mentionHashtagClick = (text) => {
    console.log(text);
  };

  function kFormatter(num) {
    return Math.abs(num) <= 9999
      ? // ? num.toLocaleString()
        num.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      : // num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
      Math.abs(num) > 9999 && Math.abs(num) <= 999940
      ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + "k"
      : Math.abs(num) > 999940 //999999
      ? Math.sign(num) * (Math.abs(num) / 1000000).toFixed(2) + "M"
      : Math.sign(num) * Math.abs(num);
  }

  return (
    <View
      style={{
        backgroundColor: "#FFFFFF",

        width: "100%",

        marginVertical: 10,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* reposts */}
      {data.repost.isRepost && (
        <View
          style={{
            paddingHorizontal: ScreenWidth * 0.05,
            paddingBottom: 6,
            width: "100%",
            flexDirection: "row",
            alignItems: "center",

            // backgroundColor: "pink",
          }}
        >
          <Repost
            size={23}
            color={"#8456E9"}
            // color={data.repostedByUser ? "#8456E9" : "#999999"}
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
        <PostMediaOne data={data.posts[0]} doubleTap={doubleTap} />
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
      {data.caption && (
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
      )}
      <View
        style={{
          // backgroundColor: "black",
          flexDirection: "row",
          width: "100%",
          paddingLeft: ScreenWidth * 0.05,
          paddingRight: ScreenWidth * 0.06,
          marginBottom: 5,
          justifyContent: "space-between",
          alignItems: "center",
          height: 30,
        }}
      >
        <View>
          <Heart isLiked={data.isLiked} index={index} />
        </View>

        <TouchableOpacity>
          <CommentsIcon size={21} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            handleRepost(index);
            if (data.repostedByUser === true) {
              Haptics.notificationAsync(
                Haptics.NotificationFeedbackType.Success
              );
            } else {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            }
          }}
        >
          <Repost
            size={25}
            color={data.repostedByUser ? "#8456E9" : "#999999"}
          />
        </TouchableOpacity>

        <TipIcon size={25} />
      </View>
      <View
        style={{
          // backgroundColor: "black",
          flexDirection: "row",
          flexWrap: "wrap",
          width: "100%",
          paddingHorizontal: ScreenWidth * 0.06,
          alignItems: "center",
          height: 30,
        }}
      >
        <TouchableOpacity>
          <CustomText
            style={{
              fontFamily: "Nunito_700Bold",
              marginRight: 9,
              color: "#999999",
            }}
          >
            {kFormatter(data.likes)} Likes
          </CustomText>
        </TouchableOpacity>
        <CustomText style={{ fontSize: 4, marginRight: 9, color: "#999999" }}>
          {"\u2B24"}
        </CustomText>
        <TouchableOpacity>
          <CustomText
            style={{
              fontFamily: "Nunito_700Bold",
              marginRight: 9,
              color: "#999999",
            }}
          >
            {kFormatter(data.comments)} Comments
          </CustomText>
        </TouchableOpacity>

        {data.reposts > 1 && (
          <CustomText style={{ fontSize: 4, marginRight: 9, color: "#999999" }}>
            {"\u2B24"}
          </CustomText>
        )}

        {data.reposts > 1 && (
          <TouchableOpacity>
            <CustomText
              style={{
                fontFamily: "Nunito_700Bold",
                marginRight: 9,
                color: "#999999",
              }}
            >
              {kFormatter(data.reposts)} Reposts
            </CustomText>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default Post;

const styles = StyleSheet.create({ container: { backgroundColor: "red" } });
