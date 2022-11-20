import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useRef, useState } from "react";
import CustomText from "../customText/CustomText";
import { Ionicons } from "@expo/vector-icons";
import { RelativeTime } from "../../utils/RelativeTime";
import Ellipsis from "../icons/Ellipsis";
import { useBoundStore } from "../../Store/useBoundStore";
import BottomSheet from "../BottomFlatSheet/BottomSheet";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Haptics from "expo-haptics";
import BottomReportSheet from "../BottomFlatSheet/reportSheet/BottomReportSheet";

const ScreenWidth = Dimensions.get("window").width;

const PostHeader = ({
  profileUrl,
  username,
  name,
  createdAt,
  isSaved,
  index,
}) => {
  const SavePost = useBoundStore((state) => state.SavePost);
  const postsData = useBoundStore((state) => state.posts);
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const [showBottomReportSheet, setShowBottomReportSheet] = useState(false);
  const insets = useSafeAreaInsets();

  const onSavePress = () => {
    SavePost(index);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    setShowBottomSheet(false);
  };

  const onReportPress = () => {
    console.log("rep");
    setShowBottomSheet(false);
    setShowBottomReportSheet(true);
  };

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
        <TouchableOpacity
          style={{ marginLeft: 6 }}
          onPress={() => setShowBottomSheet(true)}
        >
          <Ellipsis size={21} />
        </TouchableOpacity>
      </View>
      <BottomSheet
        show={showBottomSheet}
        onSheetClose={() => setShowBottomSheet(false)}
      >
        <View
          style={{
            flex: 1,
            alignItems: "center",
            paddingTop: 10,
            paddingBottom: insets.bottom,
            paddingHorizontal: 20,
            // backgroundColor: "pink",
          }}
        >
          {/* <Text>{postsData[index].userName}</Text> */}
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              width: "100%",
              backgroundColor: "#EAEAEA",
              paddingVertical: 15,
              paddingHorizontal: 18,
              marginBottom: 15,
              borderRadius: 12,
            }}
            onPress={() => onSavePress()}
          >
            <Ionicons name="md-bookmark" size={20} color="black" />
            <CustomText
              style={{
                // fontFamily: "Nunito_400Regular",
                fontSize: 16,
                marginLeft: 10,
              }}
            >
              Save
            </CustomText>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              width: "100%",
              backgroundColor: "#EAEAEA",
              paddingVertical: 15,
              paddingHorizontal: 18,
              // marginBottom: 10,
              borderRadius: 12,
            }}
            onPress={() => onReportPress()}
          >
            <Ionicons name="ios-flag" size={20} color="red" />
            <CustomText
              style={{
                // fontFamily: "Nunito_600SemiBold",
                fontSize: 16,
                marginLeft: 10,
                color: "red",
              }}
            >
              Report
            </CustomText>
          </TouchableOpacity>
        </View>
      </BottomSheet>
      <BottomReportSheet
        show={showBottomReportSheet}
        setShow={setShowBottomReportSheet}
        onSheetClose={() => setShowBottomReportSheet(false)}
        username={postsData[index].userName}
      />
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
