import {
  ActivityIndicator,
  Dimensions,
  Pressable,
  View,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useMemo, useState } from "react";
import { FlashList } from "@shopify/flash-list";
import { scale } from "../app/utils/Scale";
import GradientText from "../app/components/customText/GradientText";
import { useHeaderHeight } from "@react-navigation/elements";
import CustomText from "../app/components/customText/CustomText";
import LinearGradientButton from "../app/components/Buttons/LinearGradientButton";
import { RelativeTime } from "../app/utils/RelativeTime";
import { useBoundStore } from "../app/Store/useBoundStore";

const Notifications = ({ navigation }) => {
  const headerHeight = useHeaderHeight();
  const notifications = useBoundStore((state) => state.notifications);
  const fetchNotifications = useBoundStore((state) => state.fetchNotifications);
  const handleNotificationsRead = useBoundStore(
    (state) => state.handleNotificationsRead
  );
  const [isLoading, setisLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    if (notifications.length === 0) {
      fetchNotificationsWrapper({ isRefreshing: true });
      handleNotificationsRead();
    }
    handleNotificationsRead();
  }, [notifications]);

  useEffect(() => {
    if (isRefreshing === true) {
      fetchNotificationsWrapper();
      handleNotificationsRead();
    }
  }, [isRefreshing]);

  const fetchNotificationsWrapper = async () => {
    await fetchNotifications({ isRefreshing: true });
    setIsRefreshing(false);
    setisLoading(false);
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
  };

  const handlePress = (index) => {
    let type = notifications[index].type;
    if (
      type === "comment" ||
      type === "mentionComment" ||
      type === "comment_like"
    ) {
      navigation.navigate("Comments", {
        postId: notifications[index].comment.post_id,
        comment_id: notifications[index].comment.id,
      });
    } else if (type === "post_like") {
      navigation.navigate("SinglePost", {
        type: "post",
        id: notifications[index].post_id,
      });
    } else if (type === "repost") {
      navigation.navigate("SinglePost", {
        type: "repost",
        id: notifications[index].repost_id,
      });
    } else if (type === "system") {
      if (notifications[index].post_id) {
        navigation.navigate("SinglePost", {
          type: "post",
          id: notifications[index].post_id,
        });
      }
    } else if (type === "mentionPost") {
      if (notifications[index].post_id) {
        navigation.navigate("SinglePost", {
          type: "post",
          id: notifications[index].post_id,
        });
      }
    }
  };

  const scaledHeight = useMemo(() => scale(30), []);
  const renderItem = ({ item, index, isRead, type }) => {
    return (
      <TouchableOpacity
        style={[
          {
            paddingHorizontal: "2%",
            paddingVertical: "3%",
            justifyContent: "space-between",
            maxWidth: Dimensions.get("window").width,
            flexDirection: "row",
          },
          { backgroundColor: isRead ? "#fff" : "#f2f2f2" },
        ]}
        onPress={() => handlePress(index)}
      >
        {/* left */}
        <View style={{ flexDirection: "row" }}>
          <Pressable
            onPress={() =>
              navigation.navigate("UserProfile", { id: item.user.username })
            }
          >
            {item.user.profile_url ? (
              <Image
                style={{
                  width: scaledHeight,
                  height: scaledHeight,
                  borderRadius: scaledHeight / 2,
                }}
                source={{
                  uri: `https://cdn.momenel.com/profiles/${item.user.profile_url}`,
                }}
              />
            ) : (
              <Ionicons
                name="person-circle-sharp"
                size={scaledHeight}
                color="#999999"
              />
            )}
          </Pressable>
          <View style={{ marginLeft: "2%", width: "100%" }}>
            <CustomText
              style={{
                flexWrap: "wrap",
                maxWidth: "70%",
              }}
            >
              {type === "system" ? (
                <CustomText style={{ fontFamily: "Nunito_700Bold" }}>
                  {"your" + ` `}
                </CustomText>
              ) : item.user?.username ? (
                <CustomText style={{ fontFamily: "Nunito_700Bold" }}>
                  {item.user?.username + ` `}
                </CustomText>
              ) : (
                ""
              )}
              {type === "post_like"
                ? `liked your post`
                : type === "comment"
                ? "commented on your post"
                : type === "mentionComment"
                ? "mentioned you in a comment"
                : type === "mentionPost"
                ? "mentioned you in a post"
                : type === "comment_like"
                ? "liked your comment"
                : type === "repost"
                ? "reposted your post"
                : type === "follow"
                ? "followed you"
                : type === "system"
                ? item.system_message
                : ""}
            </CustomText>
            <CustomText style={{ color: "gray", fontSize: 14 }}>
              {RelativeTime(item.created_at)}
            </CustomText>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      {isLoading ? (
        <View
          style={{
            flex: 1,
            backgroundColor: "white",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: headerHeight,
          }}
        >
          <ActivityIndicator />
        </View>
      ) : (
        <FlashList
          data={notifications}
          renderItem={({ item, index }) =>
            renderItem({ item, index, isRead: item.isRead, type: item.type })
          }
          onEndReached={() => {
            fetchNotifications({ isRefreshing: false });
          }}
          estimatedItemSize={100}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={handleRefresh}
            />
          }
          ListFooterComponent={
            <ActivityIndicator animating={isLoading && !isRefreshing} />
          }
          ListEmptyComponent={
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                marginBottom: headerHeight,
                marginTop: "5%",
              }}
            >
              <GradientText
                style={{ fontSize: scaledHeight - 15, textAlign: "center" }}
              >
                No Notifications
              </GradientText>
            </View>
          }
        />
      )}
    </View>
  );
};

export default Notifications;
