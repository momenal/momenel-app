import {
  Animated,
  Dimensions,
  FlatList,
  Keyboard,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import * as Haptics from "expo-haptics";
import * as WebBrowser from "expo-web-browser";
import { useCallback, useMemo, useRef, useState } from "react";
import PostHeader from "./PostHeader";
import PostMedia from "./postMedia/PostMedia";
import PaginationDot from "./PaginationDot";
import StructuredText from "./StructuredText";
import CommentsIcon from "../icons/CommentsIcon";
import Repost from "../icons/Repost";
import TipIcon from "../icons/TipIcon";
import CustomText from "../customText/CustomText";
import { useBoundStore } from "../../Store/useBoundStore";
import Heart from "../icons/Heart";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import BottomTipSheet from "../BottomFlatSheet/TipSheet/BottomTipSheet";
import { scale } from "../../utils/Scale";
import DetachedBottomSheetWithScroll from "../BottomFlatSheet/DetachedBottomSheetWithScroll";
import BottomPurchaseSheet from "../BottomFlatSheet/PurchaseSheet/BottomPurchaseSheet";

const ScreenWidth = Dimensions.get("window").width;

const Post = ({
  navigation,
  postId,
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
}) => {
  const handleRepost = useBoundStore((state) => state.handleRepost);
  const handleLike = useBoundStore((state) => state.handleLike);
  const [showTipSheet, setShowTipSheet] = useState(false);
  const [showPurchaseSheet, setShowPurchaseSheet] = useState(false);
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const FontSize = useMemo(() => scale(13), []);

  // for pagination dots
  const scrollX = useRef(new Animated.Value(0)).current;

  //report sheet
  const onReportSheetClose = () => {
    Keyboard.dismiss();
    setShowTipSheet(false);
  };

  /**
   * If the user has liked the post, then the user can unlike the post. If the user has not liked the
   * post, then the user can like the post
   * --> for double Tap only. Pressing heart icon will not trigger this function
   * --> Heart icon press fucntion is in Heart.js
   */
  const handleLikeFunc = () => {
    if (isLiked === true) {
      handleLike(index, isLiked);
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    } else {
      handleLike(index, isLiked);
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      // Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
  };

  const doubleTap = () => {
    handleLikeFunc();
  };
  console.log("isReposted", isReposted);
  const handleRepostFunc = async () => {
    await handleRepost(index, isReposted);
    if (isReposted === false) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    } else {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
  };

  const renderItem = ({ item, index }) => (
    <PostMedia
      navigation={navigation}
      username={username}
      url={item.url}
      type={item.type}
      doubleTap={doubleTap}
      height={height}
      index={index}
    />
  );

  // const _onDoubleTap = (event) => {
  //   if (event.nativeEvent.state === State.ACTIVE) {
  //     runOnJS(doubleTap)();
  //   }
  // };

  const _doubleTap = Gesture.Tap()
    .runOnJS(true)
    .numberOfTaps(2)
    .maxDuration(250)
    .onStart(() => {
      doubleTap();
    });

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
      //todo: navigate to user profile
      // navigation.navigate("Search", {
      //   type: "mention",
      //   query: text,
      // });
      // console.log("@", text);
    } else if (text.startsWith("#")) {
      navigation.navigate("Search", {
        type: "hashtag",
        query: text,
      });
    } else if (text.startsWith("more")) {
      setShowBottomSheet(true);
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
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      //open tip modal
      setShowTipSheet(true);
    } else {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);

      //todo: show alert
    }
  };

  function handleComments() {
    navigation.navigate("Comments", { type: "post", postId: postId });
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
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
      {repost.isRepost && (
        <View
          style={{
            paddingHorizontal: ScreenWidth * 0.05,
            paddingBottom: 6,
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Repost size={FontSize + 8} color={"#8456E9"} />
          <CustomText
            style={{
              fontFamily: "Nunito_800ExtraBold",
              color: "#999999",
              marginLeft: "2%",
              fontSize: FontSize,
            }}
          >
            {repost.repostedBy} reposted
          </CustomText>
        </View>
      )}

      <PostHeader
        navigation={navigation}
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
        <PostMedia
          navigation={navigation}
          username={username}
          url={posts[0].url}
          type={posts[0].type}
          doubleTap={doubleTap}
          height={height}
          index={0}
        />
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
          {/* <TapGestureHandler
            ref={doubleTapRef}
            onHandlerStateChange={_onDoubleTap}
            numberOfTaps={2}
          > */}
          <GestureDetector gesture={_doubleTap}>
            <View>
              <StructuredText
                mentionHashtagPress={mentionHashtagClick}
                mentionHashtagColor={"#8759F2"}
                // maxCharCount={150}
                maxCharCount={posts?.length === 0 ? 500 : 150}
                // numberOfLines={
                //   numOfLines != null ? numOfLines : type === "text" ? 12 : 3
                // }
                // numberOfLines={3}
                style={
                  posts?.length === 0
                    ? { fontSize: FontSize + 3 }
                    : { fontSize: FontSize }
                }
              >
                {caption}
              </StructuredText>
            </View>
          </GestureDetector>
          {/* </TapGestureHandler> */}
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
        <Heart isLiked={isLiked} onPress={handleLikeFunc} size={23} />

        <TouchableOpacity onPress={handleComments}>
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
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("UserList", { type: "likes", Id: postId })
          }
        >
          <CustomText
            style={{
              fontFamily: "Nunito_700Bold",
              fontSize: FontSize - 1,
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
        <TouchableOpacity onPress={handleComments}>
          <CustomText
            style={{
              fontFamily: "Nunito_700Bold",
              fontSize: FontSize - 1,
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
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("UserList", {
                type: "reposts",
                Id: postId,
              })
            }
          >
            <CustomText
              style={{
                fontFamily: "Nunito_700Bold",
                fontSize: FontSize - 1,
                marginRight: 9,
                color: "#999999",
              }}
            >
              {kFormatter(reposts)} Reposts
            </CustomText>
          </TouchableOpacity>
        )}
      </View>
      <BottomTipSheet
        show={showTipSheet}
        setShow={setShowTipSheet}
        onSheetClose={onReportSheetClose}
        username={username}
        postId={postId}
        type={"post"}
        setShowPurchaseSheet={setShowPurchaseSheet}
      />
      <BottomPurchaseSheet
        show={showPurchaseSheet}
        setShow={setShowPurchaseSheet}
        onSheetClose={() => setShowPurchaseSheet(false)}
      />
      <DetachedBottomSheetWithScroll
        show={showBottomSheet}
        onSheetClose={() => setShowBottomSheet(false)}
      >
        <View
          style={{
            paddingHorizontal: "5%",
            paddingTop: "2%",
            paddingBottom: "5%",
          }}
        >
          <StructuredText
            mentionHashtagPress={mentionHashtagClick}
            mentionHashtagColor={"#8759F2"}
            style={{
              fontSize: FontSize + 2,
            }}
          >
            {caption}
          </StructuredText>
        </View>
      </DetachedBottomSheetWithScroll>
    </View>
  );
};

// export default memo(Post);
export default Post;

const styles = StyleSheet.create({ container: { backgroundColor: "red" } });
