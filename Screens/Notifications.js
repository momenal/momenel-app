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
  const handleFollow = useBoundStore((state) => state.handleFollow);
  const handleNotificationsRead = useBoundStore(
    (state) => state.handleNotificationsRead
  );
  const [isLoading, setisLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    if (notifications.length === 0) fetchNotificationsWrapper();
    else handleNotificationsRead();
  }, [notifications]);

  const fetchNotificationsWrapper = async () => {
    setisLoading(true);
    await fetchNotifications();
    setisLoading(false);
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fetchNotifications();
    setIsRefreshing(false);
  };

  const handlePress = (index) => {
    const fakeRes = [
      {
        postId: Math.random(19).toString(),
        username: "gifpedia",
        name: "Gifs official",
        repost: {
          isRepost: false,
        },
        posts: [
          {
            id: Math.random(19).toString(),
            width: 4000,
            height: 2300,
            type: "photo",
            url: "https://media.tenor.com/dqoSY8JhoEAAAAAC/kitten-cat.gif",
          },
        ],
        caption: "#cat",
        createdAt: Date.now(),
        likes: 300,
        comments: 12,
        reposts: 5,
        lastEdit: null,
        isLiked: false,
        repostedByUser: true,
        isDonateable: true,
      },
    ];
    // fetch post data from db and then navigate to postList
    // fetch(`https://run.mocky.io/v3/ce50730d-1497-4664-ade9-4fe1c1626344`)
    //   .then((res) => res.json())
    //   .then((data) => {
    //     navigation.navigate("PostsList", {
    //       scrollToIndex: 0,
    //       posts: fakeRes,
    //     });
    //   });

    // navigation.navigate("PostsList", {
    //   id: "jsakd",
    // });

    if (
      notifications[index].type === "comment" ||
      notifications[index].type === "mentionComment"
    ) {
      navigation.navigate("Comments", {
        postId: notifications[index].comment.post_id,
        comment_id: notifications[index].comment.id,
      });
    }
  };

  const scaledHeight = useMemo(() => scale(30), []);
  const renderItem = ({ item, index }) => {
    console.log(index);
    return (
      <TouchableOpacity
        style={{
          marginHorizontal: "2%",
          marginVertical: "3%",
          justifyContent: "space-between",
          // width: "100%",
          maxWidth: Dimensions.get("window").width,
          flexDirection: "row",
        }}
        onPress={() => handlePress(index)}
      >
        {/* left */}
        <View style={{ flexDirection: "row", maxWidth: "65%" }}>
          <Pressable
            onPress={() =>
              navigation.navigate("UserProfile", { id: item.user.id })
            }
          >
            {item.user.profile_url ? (
              <Image
                style={{
                  width: scaledHeight,
                  height: scaledHeight,
                  borderRadius: scaledHeight / 2,
                }}
                source={{ uri: item.user.profile_url }}
              />
            ) : (
              <Ionicons
                name="person-circle-sharp"
                size={scaledHeight}
                color="#999999"
                style={{ marginRight: "2%" }}
              />
            )}
          </Pressable>
          <View style={{ marginLeft: "2%" }}>
            <CustomText style={{ flexWrap: "wrap" }}>
              <CustomText style={{ fontFamily: "Nunito_700Bold" }}>
                {item.user.username + ` `}
              </CustomText>
              {item.type === "like"
                ? `liked your post`
                : item.type === "comment"
                ? "commented on your post"
                : item.type === "mentionComment"
                ? "mentioned you in a comment"
                : item.type === "repost"
                ? "reposted your post"
                : item.type === "follow"
                ? "followed you"
                : ""}
            </CustomText>
            <CustomText style={{ color: "gray", fontSize: 14 }}>
              {RelativeTime(item.created_at)}
            </CustomText>
          </View>
        </View>
        {/* right */}
        <View
          style={{
            alignItems: "flex-end",
            width: "20%",
          }}
        >
          <Pressable
            style={{ width: "100%" }}
            onPress={() => handleFollow(item.user.id, item.isFollowed)}
          >
            <LinearGradientButton
              style={{ width: "100%" }}
              disabled={item.isFollowed}
            >
              <CustomText
                style={{
                  color: "white",
                  paddingHorizontal: "4%",
                  paddingVertical: "1%",
                  fontFamily: "Nunito_600SemiBold",
                }}
              >
                {item.isFollowed ? "Following" : "Follow"}
              </CustomText>
            </LinearGradientButton>
          </Pressable>
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
      ) : notifications.length === 0 && !isLoading ? (
        <View
          style={{
            flex: 1,
            backgroundColor: "white",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: headerHeight,
          }}
        >
          <GradientText style={{ fontSize: scaledHeight - 15 }}>
            No Notifications yet!
          </GradientText>
        </View>
      ) : (
        <FlashList
          data={notifications}
          renderItem={renderItem}
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
        />
      )}
    </View>
  );
};

export default Notifications;
