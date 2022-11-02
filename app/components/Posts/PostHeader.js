import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import CustomText from "../customText/CustomText";
import { Ionicons } from "@expo/vector-icons";
import { RelativeTime } from "../../utils/RelativeTime";
import BookmarkIcon from "../icons/BookmarkIcon";
import Ellipsis from "../icons/Ellipsis";
import { useBoundStore } from "../../Store/useBoundStore";

const PostHeader = ({ profileUrl, username, name, createdAt, isSaved }) => {
  const SavePost = useBoundStore((state) => state.SavePost);

  return (
    <View
      style={{
        // backgroundColor: "pink",
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Image
          style={{ width: 35, height: 35, borderRadius: 500, marginRight: 10 }}
          source={{
            uri: profileUrl,
          }}
        />
        <View>
          <CustomText
            style={{
              color: "#262628",
              fontSize: 17.11,
              fontFamily: "Nunito_600SemiBold",
            }}
          >
            {name}
          </CustomText>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: -4,
            }}
          >
            <CustomText style={styles.textMedium}>{username}</CustomText>
            <CustomText style={[styles.textMedium, { fontSize: 5 }]}>
              {"\u2B24"}
            </CustomText>
            <CustomText style={styles.textMedium}>
              {RelativeTime(createdAt)}
            </CustomText>
          </View>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <TouchableOpacity onPress={() => SavePost()}>
          <BookmarkIcon size={23} filled={isSaved} />
        </TouchableOpacity>
        <TouchableOpacity style={{ marginLeft: 6 }}>
          <Ellipsis size={21} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PostHeader;

const styles = StyleSheet.create({
  textMedium: {
    fontFamily: "Nunito_500Medium",
    color: "#999999",
    fontSize: 14.83,
    marginRight: 4,
  },
});
