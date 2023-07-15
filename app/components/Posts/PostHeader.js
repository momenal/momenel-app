import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";
import { Image } from "expo-image";
import { useCallback, useEffect, useMemo, useState } from "react";
import CustomText from "../customText/CustomText";
import { Ionicons } from "@expo/vector-icons";
import { RelativeTime } from "../../utils/RelativeTime";
import BottomSheet from "../BottomFlatSheet/BottomSheet";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { scale } from "../../utils/Scale";
import { useRoute } from "@react-navigation/native";

const ScreenWidth = Dimensions.get("window").width;

const PostHeader = ({
  profileUrl,
  username,
  name,
  createdAt,
  index,
  navigation,
  onReportPress,
  onDeletePress,
}) => {
  const { name: RouteName } = useRoute();

  const [showBottomSheet, setShowBottomSheet] = useState(false);

  useEffect(() => {
    setShowBottomSheet(false);
  }, []);

  const insets = useSafeAreaInsets();

  const onReportPressWrapper = () => {
    setShowBottomSheet(false);
    onReportPress();
  };

  const onDeletePressWrapper = () => {
    setShowBottomSheet(false);
    setTimeout(() => {
      onDeletePress({ index });
    }, 100);
  };

  const Time = useMemo(
    () => (
      <CustomText style={styles.textMedium}>
        {RelativeTime(createdAt)}
      </CustomText>
    ),
    [createdAt]
  );

  const memoizedScale = useCallback((size) => {
    return scale(size);
  }, []);

  const size = useMemo(() => scale(26), []);

  const handleProfileNavigation = () => {
    if (RouteName === "Profile") return;
    navigation.navigate("UserProfile", { id: username });
  };

  return (
    <View
      style={{
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: ScreenWidth * 0.04,
        paddingBottom: 6,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Pressable onPress={handleProfileNavigation}>
          {profileUrl ? (
            <Image
              style={{
                width: size,
                height: size,
                borderRadius: 500,
                marginRight: "2%",
              }}
              source={{
                uri: `https://cdn.momenel.com/profiles/${profileUrl}`,
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
        </Pressable>
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
        <Pressable
          style={{ marginLeft: 6 }}
          onPress={() => setShowBottomSheet(true)}
        >
          <Ionicons name="ellipsis-vertical" size={scale(18)} color="#828282" />
        </Pressable>
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
          {RouteName === "Profile" ? (
            <Pressable
              style={{
                flexDirection: "row",
                alignItems: "center",
                width: "100%",
                backgroundColor: "#EAEAEA",
                paddingVertical: 15,
                paddingHorizontal: 18,

                borderRadius: 12,
              }}
              onPress={() => onDeletePressWrapper()}
            >
              <Ionicons name="trash-bin" size={20} color="red" />
              <CustomText
                style={{
                  fontSize: 16,
                  marginLeft: 10,
                  color: "red",
                }}
              >
                Delete
              </CustomText>
            </Pressable>
          ) : (
            <Pressable
              style={{
                flexDirection: "row",
                alignItems: "center",
                width: "100%",
                backgroundColor: "#EAEAEA",
                paddingVertical: 15,
                paddingHorizontal: 18,
                marginTop: 10,
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
            </Pressable>
          )}
        </View>
      </BottomSheet>
    </View>
  );
};

export default PostHeader;

const styles = StyleSheet.create({
  textMedium: {
    color: "#999999",
    fontSize: 13,
    marginRight: 4,
  },
});
