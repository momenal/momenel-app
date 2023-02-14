import {
  Dimensions,
  Image,
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { memo, useCallback, useMemo, useRef, useState } from "react";
import CustomText from "../customText/CustomText";
import { Ionicons } from "@expo/vector-icons";
import { RelativeTime } from "../../utils/RelativeTime";
import Ellipsis from "../icons/Ellipsis";
import { useBoundStore } from "../../Store/useBoundStore";
import BottomSheet from "../BottomFlatSheet/BottomSheet";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Haptics from "expo-haptics";
import { scale } from "../../utils/Scale";

const ScreenWidth = Dimensions.get("window").width;

const PostHeader = ({
  profileUrl,
  username,
  name,
  createdAt,
  index,
  navigation,
}) => {
  const SavePost = useBoundStore((state) => state.SavePost);
  const postsData = useBoundStore((state) => state.posts);
  const [showBottomSheet, setShowBottomSheet] = useState(false);

  const insets = useSafeAreaInsets();

  const onSavePress = () => {
    SavePost(index);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    setShowBottomSheet(false);
  };

  const onReportPress = () => {
    setShowBottomSheet(false);
    navigation.navigate("Report", {
      contentId: postsData[index].postId,
      username: postsData[index].username,
      contentType: "post",
    });
  };

  const Time = useMemo(
    () => (
      <CustomText style={styles.textMedium}>
        {RelativeTime(createdAt)}
      </CustomText>
    ),
    []
  );

  const memoizedScale = useCallback((size) => {
    return scale(size);
  }, []);

  const size = useMemo(() => scale(26), []);

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
        <TouchableOpacity
          onPress={() => navigation.navigate("UserProfile", { id: username })}
        >
          {profileUrl ? (
            <Image
              style={{
                width: size,
                height: size,
                borderRadius: 500,
                marginRight: "2%",
              }}
              source={{
                uri: profileUrl,
              }}
            />
          ) : (
            <Ionicons
              name="person-circle-sharp"
              size={size + 4}
              color="#999999"
              style={{ marginRight: "2%" }}
            />
          )}
        </TouchableOpacity>

        <Pressable
          onPress={() => navigation.navigate("UserProfile", { id: username })}
        >
          <CustomText
            style={{
              color: "#262628",
              // fontSize: 16,
              // fontSize: memoizedScale(13.5),
              fontSize: memoizedScale(13.5),
              paddingBottom: 2,
              fontFamily: "Nunito_600SemiBold",
              maxWidth: memoizedScale(210),
            }}
            numberOfLines={1}
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
              <CustomText
                numberOfLines={1}
                style={[styles.textMedium, { maxWidth: memoizedScale(170) }]}
              >
                @{username}
              </CustomText>
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
            {Time}
          </View>
        </Pressable>
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
          <Ellipsis size={memoizedScale(18)} />
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
            paddingBottom: insets.bottom + 15,
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
    </View>
  );
};

export default memo(PostHeader);

const styles = StyleSheet.create({
  textMedium: {
    // fontFamily: "Nunito_500Medium",
    color: "#999999",
    fontSize: 13,
    marginRight: 4,
  },
});
