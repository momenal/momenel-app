import {
  Animated,
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import * as Haptics from "expo-haptics";
import * as WebBrowser from "expo-web-browser";
import React, { memo, useCallback, useMemo, useRef, useState } from "react";
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
import { State, TapGestureHandler } from "react-native-gesture-handler";
import { runOnJS } from "react-native-reanimated";

const ScreenWidth = Dimensions.get("window").width;

const Post = ({
  postId,
  type,
  isLiked,
  likes,
  comments,
  index,
  repost,
  profileUrl,
  reposts,
  username,
  name,
  createdAt,
  isSaved,
  posts,
  caption,
  isReposted,
  isDonateable,
  height,
  numOfLines,
}) => {
  const handleRepost = useBoundStore((state) => state.handleRepost);
  const handleLike = useBoundStore((state) => state.handleLike);
  const [maxHeight, setmaxHeight] = useState(0);
  const doubleTapRef = useRef(null);
  // const [numOfLines, setnumOfLines] = useState(null);

  //flashlist recycling
  const lastItemId = useRef(postId);
  // if (postId !== lastItemId.current) {
  //   lastItemId.current = postId;

  //   if (type === "text") {
  //     setnumOfLines(12);
  //   } else {
  //     setnumOfLines(3);
  //   }
  // }

  // for pagination dots
  const scrollX = useRef(new Animated.Value(0)).current;

  const setMaxHeightFunc = (h) => {
    setmaxHeight(h);
  };

  const handleLikeFunc = () => {
    handleLike(index);
    if (isLiked === true) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } else {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
  };

  const handleRepostFunc = async () => {
    await handleRepost(index);
    if (isReposted === false) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } else {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  };

  const doubleTap = () => {
    handleLikeFunc();
  };

  const renderItem = ({ item, index }) => (
    <PostsMedia
      url={item.url}
      type={type}
      maxHeight={height}
      // maxHeight={height}
      index={index}
      setMaxHeightFunc={setMaxHeightFunc}
      doubleTap={doubleTap}
    />
  );

  const _onDoubleTap = (event) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      runOnJS(doubleTap)();
    }
  };

  const keyExtractor = useCallback((item) => item.id, []);

  const _handlePressButtonAsync = async (url) => {
    await WebBrowser.openBrowserAsync(url);
  };

  const mentionHashtagClick = async (text) => {
    if (text.startsWith("http")) {
      try {
        _handlePressButtonAsync(text);
      } catch (error) {
        console.log(error);
      }
    } else if (text.startsWith("www")) {
      try {
        _handlePressButtonAsync("https://" + text);
      } catch (error) {
        console.log(error);
      }
    } else if (text.startsWith("@")) {
      console.log("@", text);
    } else if (text.startsWith("#")) {
      console.log("#", text);
    } else {
      console.log("else", text);
    }
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

  const handleTip = () => {
    if (isDonateable === true) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      //open tip modal
    } else {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
      //todo: show alert
    }
  };

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
      {repost.isRepost && (
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
          <Repost size={23} color={"#8456E9"} />
          <CustomText
            style={{
              fontFamily: "Nunito_800ExtraBold",
              color: "#999999",
              marginLeft: 8,
              fontSize: 15,
            }}
          >
            {repost.repostedBy} reposted
          </CustomText>
        </View>
      )}

      <PostHeader
        profileUrl={profileUrl}
        username={username}
        name={name}
        createdAt={createdAt}
        isSaved={isSaved}
        index={index}
      />
      {/* media */}

      {posts && posts.length >= 2 ? (
        <FlatList
          data={posts}
          horizontal={true}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
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
      ) : posts && posts.length >= 1 ? (
        <PostMediaOne data={posts[0]} doubleTap={doubleTap} height={height} />
      ) : (
        <></>
      )}
      {/* pagination dots */}
      {posts && posts.length > 1 && (
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            justifyContent: "center",
            paddingBottom: 11,
          }}
        >
          <PaginationDot data={posts} scrollX={scrollX} />
        </View>
      )}
      {/* caption */}
      {caption && (
        <View
          style={{
            paddingHorizontal: ScreenWidth * 0.06,
            width: ScreenWidth,
            paddingBottom: 16,
          }}
        >
          <TapGestureHandler
            ref={doubleTapRef}
            onHandlerStateChange={_onDoubleTap}
            numberOfTaps={2}
          >
            <View>
              <StructuredText
                mentionHashtagPress={mentionHashtagClick}
                mentionHashtagColor={"#8759F2"}
                // maxCharCount={150}
                maxCharCount={posts.length === 0 ? 500 : 150}
                // numberOfLines={
                //   numOfLines != null ? numOfLines : type === "text" ? 12 : 3
                // }
                // numberOfLines={3}
                style={posts.length === 0 ? { fontSize: 19 } : { fontSize: 16 }}
              >
                {caption}
              </StructuredText>
            </View>
          </TapGestureHandler>
        </View>
      )}
      {/* buttons */}
      <View
        style={{
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
        <Heart isLiked={isLiked} index={index} />

        <TouchableOpacity>
          <CommentsIcon size={21} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleRepostFunc}>
          <Repost size={25} color={isReposted ? "#8456E9" : "#999999"} />
        </TouchableOpacity>

        <TouchableOpacity onPress={handleTip}>
          <TipIcon size={25} color={isDonateable ? "#F12D97" : "#CECECE"} />
        </TouchableOpacity>
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
            {kFormatter(likes)} Likes
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
            {kFormatter(comments)} Comments
          </CustomText>
        </TouchableOpacity>

        {reposts > 1 && (
          <CustomText style={{ fontSize: 4, marginRight: 9, color: "#999999" }}>
            {"\u2B24"}
          </CustomText>
        )}

        {reposts > 1 && (
          <TouchableOpacity>
            <CustomText
              style={{
                fontFamily: "Nunito_700Bold",
                marginRight: 9,
                color: "#999999",
              }}
            >
              {kFormatter(reposts)} Reposts
            </CustomText>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

// export default memo(Post);
export default Post;

const styles = StyleSheet.create({ container: { backgroundColor: "red" } });
