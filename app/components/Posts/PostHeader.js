import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import CustomText from "../customText/CustomText";
import { Ionicons } from "@expo/vector-icons";
import { RelativeTime } from "../../utils/RelativeTime";
import BookmarkIcon from "../icons/BookmarkIcon";
import Ellipsis from "../icons/Ellipsis";
import { useBoundStore } from "../../Store/useBoundStore";
import BottomSheet from "../BottomFlatSheet/BottomSheet";

const ScreenWidth = Dimensions.get("window").width;

const PostHeader = ({
  profileUrl,
  username,
  name,
  createdAt,
  isSaved,
  setShowBottomSheetFunc,
  index,
}) => {
  const SavePost = useBoundStore((state) => state.SavePost);

  return (
    <View
      style={{
        // backgroundColor: "pink",
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        // paddingHorizontal: 18,
        paddingHorizontal: ScreenWidth * 0.04,
        paddingBottom: 11,
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
              fontSize: 16,
              fontFamily: "Nunito_600SemiBold",
            }}
          >
            {name ? name : `@${username}`}
          </CustomText>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: -2,
            }}
          >
            {name ? (
              <CustomText style={styles.textMedium}>@{username}</CustomText>
            ) : (
              <Text></Text>
            )}
            {name ? (
              <CustomText style={[styles.textMedium, { fontSize: 4 }]}>
                {"\u2B24"}
              </CustomText>
            ) : (
              <Text></Text>
            )}

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
        <TouchableOpacity onPress={() => SavePost(index)}>
          <BookmarkIcon size={23} filled={isSaved} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ marginLeft: 6 }}
          onPress={() => setShowBottomSheetFunc(index)}
        >
          <Ellipsis size={21} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PostHeader;

const styles = StyleSheet.create({
  textMedium: {
    // fontFamily: "Nunito_500Medium",
    color: "#999999",
    fontSize: 13,
    marginRight: 4,
  },
});
