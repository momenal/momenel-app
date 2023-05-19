import {
  Alert,
  Animated,
  Dimensions,
  Image,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useMemo, useState } from "react";
import CustomText from "../customText/CustomText";
import GradientText from "../customText/GradientText";
import { scale } from "../../utils/Scale";
import { RelativeTime } from "../../utils/RelativeTime";
import StructuredText from "./StructuredText";
import Heart from "../icons/Heart";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import * as Haptics from "expo-haptics";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { Ionicons } from "@expo/vector-icons";
import { useBoundStore } from "../../Store/useBoundStore";
import DetachedBottomSheetWithScroll from "../BottomFlatSheet/DetachedBottomSheetWithScroll";
import { baseUrl } from "@env";
import { supabase } from "../../lib/supabase";

const AnimatedIconComponent = Animated.createAnimatedComponent(Ionicons);

const RightActionsIfAdmin = (progress, dragX, commentId, handleDelete) => {
  const scale = dragX.interpolate({
    inputRange: [-100, 0],
    outputRange: [2, 0],
    extrapolate: "clamp",
  });
  return (
    <>
      {/* todo: handle delete */}
      <TouchableOpacity onPress={() => handleDelete(commentId)}>
        <View
          style={{
            flex: 1,
            backgroundColor: "#ff0000",
            justifyContent: "center",
            alignItems: "center",
            width: Dimensions.get("window").width * 0.12,
          }}
        >
          <AnimatedIconComponent
            name="md-trash-bin-outline"
            size={24}
            color="white"
            style={{
              transform: [{ scale }],
            }}
          />
          {/* <Animated.Text
            style={{
              color: "white",
              paddingHorizontal: 10,
              fontWeight: "600",
              transform: [{ scale }],
            }}
          >
            Archive
          </Animated.Text> */}
        </View>
      </TouchableOpacity>
    </>
  );
};
const RightActions = (progress, dragX, navigation, commentId, username) => {
  const scale = dragX.interpolate({
    inputRange: [-100, 0],
    outputRange: [2.2, 0],
    extrapolate: "clamp",
  });

  function handleReport() {
    navigation.navigate("Report", {
      contentId: commentId,
      username: username,
      contentType: "comment",
    });
  }

  return (
    <>
      {/* todo: handle delete */}
      <TouchableOpacity onPress={handleReport}>
        <View
          style={{
            flex: 1,
            backgroundColor: "#a0a0a0",
            justifyContent: "center",
            alignItems: "center",
            width: Dimensions.get("window").width * 0.12,
          }}
        >
          <AnimatedIconComponent
            name="ios-alert-circle-outline"
            size={24}
            color="white"
            style={{
              transform: [{ scale }],
            }}
          />
        </View>
      </TouchableOpacity>
    </>
  );
};

const Comment = ({
  navigation,
  username,
  profile_url,
  likes,
  time,
  comment,
  isLiked,
  commentId,
  handleDelete,
}) => {
  const [isLikedS, setisLikedS] = useState(isLiked);
  const [likeCount, setLikeCount] = useState(likes);
  const LoggedInUsername = useBoundStore((state) => state.username);
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const FontSize = useMemo(() => scale(14), []);

  function kFormatter(num) {
    console.log(num);
    return Math.abs(num) <= 999999
      ? // ? num.toLocaleString()
        num.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      : Math.abs(num) > 999999
      ? Math.sign(num) * (Math.abs(num) / 1000000).toFixed(2) + "M"
      : Math.sign(num) * Math.abs(num);
  }

  async function handleLike() {
    const { data, error } = await supabase.auth.getSession();
    if (error) {
      return navigation.navigate("Login");
    }
    setisLikedS(!isLikedS);
    if (isLikedS) {
      if (likeCount <= 0) {
        setLikeCount(0);
      } else {
        setLikeCount(likeCount - 1);
      }
    } else {
      if (likeCount <= 0) {
        setLikeCount(1);
      } else {
        setLikeCount(likeCount + 1);
      }
    }

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    // post like to api
    let response = await fetch(`${baseUrl}/likeComment/${commentId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${data.session.access_token}`,
      },
    });

    if (!response.ok) {
      Alert.alert("Oops", "Something went wrong!");
      return;
    }

    if (response.status === 201) {
      setisLikedS(true);
    } else {
      setisLikedS(false);
    }
  }

  const _doubleTap = Gesture.Tap()
    .runOnJS(true)
    .numberOfTaps(2)
    .maxDuration(250)
    .onStart(() => {
      handleLike();
    });

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
    } else if (text.startsWith("more")) {
      setShowBottomSheet(true);
    } else {
      console.log("else", text);
    }
  };

  return (
    <Swipeable
      renderRightActions={(progress, dragX) =>
        LoggedInUsername === username
          ? RightActionsIfAdmin(progress, dragX, commentId, handleDelete)
          : RightActions(progress, dragX, navigation, commentId, username)
      }
      overshootRight={false}
      friction={1.8}
    >
      <GestureDetector gesture={_doubleTap}>
        <View
          style={{
            flexDirection: "row",
            paddingHorizontal: "3%",
            paddingVertical: "2%",
            backgroundColor: "#fff",
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: "white",
              width: 34,
              height: 34,
              borderRadius: 50,
              overflow: "hidden",
            }}
            onPress={() => navigation.navigate("UserProfile", { id: username })}
          >
            {!profile_url ? (
              <Ionicons
                name="person-circle-sharp"
                size={34}
                color="#999999"
                style={{ marginRight: "2%" }}
              />
            ) : (
              <Image
                source={{ uri: profile_url }}
                // style={{ height: 34, width: 34, borderRadius: 50 }}
                style={{ flex: 1, width: undefined, height: undefined }}
              />
            )}
          </TouchableOpacity>
          <View style={{ flex: 1, marginLeft: "2%" }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("UserProfile", { id: username })
                }
              >
                <GradientText
                  style={{ fontSize: scale(12), fontFamily: "Nunito_700Bold" }}
                  adjustsFontSizeToFit={true}
                  numberOfLines={1}
                >
                  {username}
                </GradientText>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleLike}
                style={{ flexDirection: "row", alignItems: "center" }}
              >
                {likes > 0 && (
                  <CustomText
                    style={{
                      color: "#999999",
                      paddingRight: "2%",
                      fontSize: 13,
                    }}
                  >
                    {kFormatter(likeCount)}
                  </CustomText>
                )}
                <TouchableOpacity onPress={handleLike}>
                  <Heart isLiked={isLikedS} onPress={handleLike} size={15} />
                </TouchableOpacity>
              </TouchableOpacity>
            </View>
            <View style={{ marginVertical: "1%" }}>
              <StructuredText
                style={{ fontSize: 16 }}
                maxCharCount={150}
                mentionHashtagPress={mentionHashtagClick}
              >
                {comment}
              </StructuredText>
            </View>
            <View>
              <CustomText style={{ color: "#ADADAD", fontSize: 12 }}>
                {RelativeTime(time)}
              </CustomText>
            </View>
          </View>
        </View>
      </GestureDetector>
      {/* read more */}
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
              fontSize: FontSize,
            }}
          >
            {comment}
          </StructuredText>
        </View>
      </DetachedBottomSheetWithScroll>
    </Swipeable>
  );
};

export default Comment;
