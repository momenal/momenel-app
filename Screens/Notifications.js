import {
  ActivityIndicator,
  Button,
  Dimensions,
  Image,
  LayoutAnimation,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import { FlashList } from "@shopify/flash-list";
import { scale } from "../app/utils/Scale";
import GradientText from "../app/components/customText/GradientText";
import { useHeaderHeight } from "@react-navigation/elements";
import CustomText from "../app/components/customText/CustomText";
import LinearGradientButton from "../app/components/Buttons/LinearGradientButton";
import { RelativeTime } from "../app/utils/RelativeTime";

const Notifications = ({ navigation }) => {
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const headerHeight = useHeaderHeight();
  const UpdateNotificationsRead = () => {
    const unreadNotifications = notifications.filter(
      (notification) => notification.isRead === false
    );
    // todo: update notifications as read on server
    console.log(unreadNotifications);
  };
  useEffect(() => {
    setisLoading(true);
    //todo: fetch notifications
    fetch("https://demo2190748.mockable.io/Notifications")
      .then((response) => response.json())
      .then((json) => {
        // console.log(json);
        setNotifications(json);
        setisLoading(false);
      });
    // setNotifications([
    //   {
    //     id: 1,
    //     type: "like",
    //     username: "johndoe",
    //     postId: 1,
    //     postImage:
    //       "https://images.unsplash.com/photo-1676202731475-afd55cddb97a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=627&q=80",
    //     profileImage:
    //       "https://images.unsplash.com/photo-1676944350229-f16879749ba7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
    //     timestamp: Date.now() + 1000000,
    //     isRead: false,
    //   },
    //   {
    //     id: 2,
    //     type: "comment",
    //     username: "johndoe",
    //     postId: 39912000,
    //     postImage:
    //       "https://images.unsplash.com/photo-1673506073231-3d4896dd45c2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1166&q=80",
    //     profileImage: "https://picsum.photos/300/300",
    //     timestamp: "2021-05-01T12:00:00.000Z",
    //     isRead: true,
    //   },
    //   {
    //     id: 3,
    //     type: "repost",
    //     username: "farhanverse",
    //     postId: 89918293890,
    //     postImage: "https://source.unsplash.com/random/80x80",
    //     profileImage: "https://source.unsplash.com/random/80x80/?person",
    //     timestamp: "2021-05-01T12:00:00.000Z",
    //     isRead: true,
    //   },
    //   {
    //     id: 4,
    //     username: "kkalra",
    //     type: "mention",
    //     postId: 89918293890,
    //     postImage: "https://source.unsplash.com/random/90x90",
    //     profileImage: "https://source.unsplash.com/random/80x80/?person",
    //     timestamp: "2021-05-01T12:00:00.000Z",
    //     isRead: true,
    //   },
    //   {
    //     id: 4,
    //     type: "tip",
    //     tipAmount: 20, // only for tip
    //     username: "jackly",
    //     postId: 89918293890,
    //     postImage: "https://source.unsplash.com/random/100x100",
    //     profileImage: "https://source.unsplash.com/random/70x70/?person",
    //     timestamp: "2021-05-01T12:00:00.000Z",
    //     isRead: true,
    //   },
    //   {
    //     id: 5,
    //     type: "follow",
    //     isFollowing: false, // only for follow
    //     username: "nathan11998",
    //     postId: 89918293890,
    //     postImage: "https://source.unsplash.com/random/100x100",
    //     profileImage: "https://source.unsplash.com/random/70x70/?person",
    //     timestamp: "2021-05-01T12:00:00.000Z",
    //     isRead: true,
    //   },
    // ]);
    // setTimeout(() => {
    //   LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    //   setisLoading(false);
    // }, 0);

    // update notifications as read on mount
    // UpdateNotificationsRead();
  }, []);
  const handleFollow = (username) => {
    console.log("followed", username);
    //todo: send follow request to server
    // update notifications as read and update follow status
    const updatedNotifications = notifications.map((notification) => {
      if (notification.username === username) {
        return { ...notification, isFollowing: true, isRead: true };
      }
      return notification;
    });
    setNotifications(updatedNotifications);
  };
  const scaledHeight = useMemo(() => scale(30), []);
  const renderItem = ({ item }) => (
    <Pressable
      style={{
        marginHorizontal: "2%",
        marginVertical: "3%",
        justifyContent: "space-between",
        // width: "100%",
        maxWidth: Dimensions.get("window").width,
        flexDirection: "row",
      }}
      //todo: navigate to post
    >
      {/* left */}
      <View style={{ flexDirection: "row", flex: 1 }}>
        <Pressable
          onPress={() =>
            navigation.navigate("UserProfile", { id: item.username })
          }
        >
          <Image
            style={{
              width: scaledHeight,
              height: scaledHeight,
              borderRadius: scaledHeight / 2,
            }}
            source={{ uri: item.profileImage }}
          />
        </Pressable>

        <View style={{ marginLeft: "2%" }}>
          <CustomText style={{ flexWrap: "wrap" }}>
            <CustomText
              style={{ fontFamily: "Nunito_700Bold" }}
              onPress={() =>
                navigation.navigate("UserProfile", { id: item.username })
              }
            >
              {item.username + ` `}
            </CustomText>
            {item.type === "like"
              ? `liked your post`
              : item.type === "comment"
              ? "commented on your post"
              : item.type === "mention"
              ? "mentioned you in a comment"
              : item.type === "repost"
              ? "reposted your post"
              : item.type === "tip"
              ? `sent you a tip of ${item.tipAmount} coins`
              : item.type === "follow"
              ? "followed you"
              : ""}
          </CustomText>
          <CustomText style={{ color: "gray", fontSize: 14 }}>
            {RelativeTime(item.timestamp)}
          </CustomText>
        </View>
      </View>
      {/* right */}
      <View style={{ alignItems: "flex-end" }}>
        {item.type === "follow" ? (
          <Pressable onPress={() => handleFollow(item.username)}>
            <LinearGradientButton disabled={item.isFollowing}>
              <CustomText
                style={{
                  color: "white",
                  paddingHorizontal: "5%",
                  paddingVertical: "1%",
                  fontFamily: "Nunito_600SemiBold",
                }}
              >
                {item.isFollowing ? "Following" : "Follow"}
              </CustomText>
            </LinearGradientButton>
          </Pressable>
        ) : (
          <Image
            style={{
              width: scaledHeight + 10,
              maxWidth: 100,
              height: scaledHeight + 10,
              maxHeight: 100,
              borderRadius: 5,
            }}
            source={{ uri: item.postImage }}
          />
        )}
      </View>
    </Pressable>
  );
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
        />
      )}
    </View>
  );
};

export default Notifications;

const styles = StyleSheet.create({});
