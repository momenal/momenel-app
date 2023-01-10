import {
  Alert,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import CustomText from "../customText/CustomText";
import GradientText from "../customText/GradientText";
import { scale } from "../../utils/Scale";
import { RelativeTime } from "../../utils/RelativeTime";
import StructuredText from "./StructuredText";
import Heart from "../icons/Heart";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import * as Haptics from "expo-haptics";

const Comment = ({
  username,
  profile_url,
  likes,
  time,
  comment,
  isLiked,
  commentId,
  gifUrl,
}) => {
  const [isLikedS, setisLikedS] = useState(isLiked);
  const [likeCount, setLikeCount] = useState(likes);
  function handleLike() {
    //todo: send like to api using commentId
    //todo: if like send successfully then update isLikedS and likeCount like below else show error
    setisLikedS(!isLikedS);
    setLikeCount(isLikedS ? likeCount - 1 : likeCount + 1);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    //  Alert.alert("Oops", "Something went wrong!");
  }

  const _doubleTap = Gesture.Tap()
    .runOnJS(true)
    .numberOfTaps(2)
    .maxDuration(250)
    .onStart(() => {
      handleLike();
    });

  return (
    <GestureDetector gesture={_doubleTap}>
      <View
        style={{
          flexDirection: "row",
          paddingHorizontal: "3%",
          paddingVertical: "2%",
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: "pink",
            width: 34,
            height: 34,
            borderRadius: 50,
            overflow: "hidden",
          }}
        >
          <Image
            source={{ uri: profile_url }}
            // style={{ height: 34, width: 34, borderRadius: 50 }}
            style={{ flex: 1, width: undefined, height: undefined }}
          />
        </TouchableOpacity>
        <View style={{ flex: 1, marginLeft: "2%" }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <TouchableOpacity>
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
                  style={{ color: "#999999", paddingRight: "2%", fontSize: 13 }}
                >
                  {likeCount}
                </CustomText>
              )}
              <TouchableOpacity onPress={handleLike}>
                <Heart isLiked={isLikedS} onPress={handleLike} size={15} />
              </TouchableOpacity>
            </TouchableOpacity>
          </View>
          <View style={{ marginVertical: "1%" }}>
            <StructuredText style={{ fontSize: 16 }}>{comment}</StructuredText>
          </View>
          {/* {gifUrl && (
            <Image
              source={{ uri: gifUrl }}
              style={{
                height: 200, //todo: change based on gif height
                width: "90%",
                borderRadius: 4,
                marginVertical: "1%",
              }}
            />
          )} */}
          <View>
            <CustomText style={{ color: "#ADADAD", fontSize: 12 }}>
              {RelativeTime(time)}
            </CustomText>
          </View>
        </View>
      </View>
    </GestureDetector>
  );
};

export default Comment;

const styles = StyleSheet.create({});
