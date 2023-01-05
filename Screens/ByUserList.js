// Description: This screen will show the list of users who liked the post or reposted the post or tipped the post.

import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useMemo } from "react";
import { useBoundStore } from "../app/Store/useBoundStore";
import { FlashList } from "@shopify/flash-list";
import { set } from "react-native-reanimated";
import CustomText from "../app/components/customText/CustomText";
import { scale } from "../app/utils/Scale";
import GradientText from "../app/components/customText/GradientText";
import CoinIcon from "../app/components/icons/CoinIcon";

const ByUserList = ({ route, navigation }) => {
  const { type, postId } = route.params;
  const Likes = useBoundStore((state) => state.likes);
  const Reposts = useBoundStore((state) => state.reposts);

  const fetchLikes = useBoundStore((state) => state.fetchLikes);
  const fetchReposts = useBoundStore((state) => state.fetchReposts);

  useEffect(() => {
    if (type === "likes") {
      navigation.setOptions({ title: "Likes" });
      fetchLikes(postId);
    } else if (type === "reposts") {
      navigation.setOptions({ title: "Reposts" });
      fetchReposts(postId);
    } else if (type === "tips") {
      navigation.setOptions({ title: "Tips" });
    }
  }, []);

  const renderItem = ({ item, isFollowing }) => {
    return (
      <UserListComp
        type={type}
        username={item.username}
        profile_url={item.profile_url}
        isFollowing={isFollowing}
      />
    );
  };

  return (
    <View style={styles.container}>
      <FlashList
        data={type === "likes" ? Likes : type === "reposts" ? Reposts : Tips}
        renderItem={({ item }) =>
          renderItem({
            item,
            isFollowing: item.isFollowing,
          })
        }
        estimatedItemSize={69}
      />
    </View>
  );
};

const UserListComp = ({ type, username, profile_url, isFollowing, tip }) => {
  const size = useMemo(() => scale(25), []);
  const fontSize = useMemo(() => scale(13), []);
  // console.log("size", fontSize);
  const handleUserFollowFromList = useBoundStore(
    (state) => state.handleUserFollowFromList
  );

  return (
    <View
      style={{
        // backgroundColor: "red",
        flexDirection: "row",
        marginBottom: 4,
        justifyContent: "space-between",
        paddingVertical: 11,
        paddingHorizontal: 20,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Image
          style={{ width: size, height: size, borderRadius: 500 }}
          resizeMode="cover"
          source={{
            uri: profile_url,
          }}
        />
        <View style={{ marginLeft: "5%" }}>
          <CustomText
            style={{
              fontFamily: "Nunito_600SemiBold",
              fontSize: fontSize,
              width: Dimensions.get("window").width / 2.4,
            }}
            numberOfLines={1}
          >
            {username}
          </CustomText>
          {tip && (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: "2%",
              }}
            >
              <CoinIcon size={fontSize + 2} />
              <CustomText
                style={{
                  fontFamily: "Nunito_600SemiBold",
                  fontSize: fontSize - 3,
                  width: Dimensions.get("window").width / 2.4,
                  marginLeft: 2,
                }}
                numberOfLines={1}
              >
                {tip}
              </CustomText>
            </View>
          )}
        </View>
      </View>
      <TouchableOpacity
        style={!isFollowing ? styles.not_following : styles.following}
        onPress={() => handleUserFollowFromList(type, username)}
      >
        {!isFollowing ? (
          <GradientText style={{ fontSize: fontSize }}>Follow</GradientText>
        ) : (
          <CustomText
            style={{
              fontSize: fontSize,
              color: "#8A8A8A",
              fontFamily: "Nunito_500Medium",
            }}
          >
            Following
          </CustomText>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default ByUserList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  not_following: {
    width: Dimensions.get("window").width / 4,
    backgroundColor: "#F2F2F2",
    borderColor: "#F2F2F2",
    borderWidth: 1.1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  following: {
    width: Dimensions.get("window").width / 4,
    // backgroundColor: "#F2F2F2",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderColor: "#B5B5B5",
    borderWidth: 1.1,
  },
});
