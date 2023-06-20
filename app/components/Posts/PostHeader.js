import {
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Image } from "expo-image";
import { memo, useCallback, useMemo, useState } from "react";
import CustomText from "../customText/CustomText";
import { Ionicons } from "@expo/vector-icons";
import { RelativeTime } from "../../utils/RelativeTime";
import BottomSheet from "../BottomFlatSheet/BottomSheet";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { scale } from "../../utils/Scale";

const ScreenWidth = Dimensions.get("window").width;

const PostHeader = ({
  profileUrl,
  username,
  name,
  createdAt,
  index,
  navigation,
  onReportPress,
}) => {
  const [showBottomSheet, setShowBottomSheet] = useState(false);

  const insets = useSafeAreaInsets();

  const onReportPressWrapper = () => {
    setShowBottomSheet(false);
    onReportPress();
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
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: ScreenWidth * 0.04,
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
          style={{ marginLeft: "1%" }}
        >
          <CustomText
            style={{
              color: "#262628",
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
          <Ionicons name="ellipsis-vertical" size={scale(18)} color="#828282" />
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
          }}
        >
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              width: "100%",
              backgroundColor: "#EAEAEA",
              paddingVertical: 15,
              paddingHorizontal: 18,

              borderRadius: 12,
            }}
            onPress={() => onReportPressWrapper()}
          >
            <Ionicons name="ios-flag" size={20} color="red" />
            <CustomText
              style={{
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
    color: "#999999",
    fontSize: 13,
    marginRight: 4,
  },
});
