import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import CustomText from "../customText/CustomText";
import GradientText from "../customText/GradientText";
import { scale } from "../../utils/Scale";
import { RelativeTime } from "../../utils/RelativeTime";
import StructuredText from "./StructuredText";

const Comment = ({ username, profile_url, likes, time, comment }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        paddingHorizontal: "3%",
        paddingVertical: "2%",
      }}
    >
      <TouchableOpacity>
        <Image
          source={{ uri: profile_url }}
          style={{ height: 34, width: 34, borderRadius: 50 }}
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
          <View>
            {likes > 0 && (
              <CustomText style={{ color: "#999999" }}>{likes}</CustomText>
            )}
          </View>
        </View>
        <View style={{ marginVertical: "1%" }}>
          <StructuredText
          // mentionHashtagPress={mentionHashtagClick}
          >
            {comment}
          </StructuredText>
        </View>
        <View>
          <CustomText style={{ color: "#ADADAD", fontSize: 12 }}>
            {RelativeTime(time)} ago
          </CustomText>
        </View>
      </View>
    </View>
  );
};

export default Comment;

const styles = StyleSheet.create({});
