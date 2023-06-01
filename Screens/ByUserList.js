// Description: This screen will show the list of users who liked the post or reposted the post or tipped the post.

import {
  ActivityIndicator,
  Alert,
  Dimensions,
  StyleSheet,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { FlashList } from "@shopify/flash-list";
import UserList from "../app/components/UserList";
import * as Haptics from "expo-haptics";
import CustomText from "../app/components/customText/CustomText";
import { scale } from "../app/utils/Scale";
import { supabase } from "../app/lib/supabase";
import { baseUrl } from "@env";

const ByUserList = ({ route, navigation }) => {
  const { type, Id } = route.params;
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setIsLoading(true);
    let response;
    const { data: session, error } = await supabase.auth.getSession();
    if (error) {
      navigation.navigate("Login");
      return false;
    }
    // fetch data
    if (type === "likes") {
      navigation.setOptions({ title: "Likes" });
      response = await fetch(`${baseUrl}/like/8`, {
        method: "GET",
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${session.session.access_token}`,
        },
      });
    } else if (type === "reposts") {
      navigation.setOptions({ title: "Reposts" });
      //todo: change id
      response = await fetch(`${baseUrl}/repost/8`, {
        method: "GET",
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${session.session.access_token}`,
        },
      });
    } else if (type === "followers") {
      navigation.setOptions({
        title: `Followers`,
      });
      //todo: change id
      response = await fetch(
        `${baseUrl}/followuser/followers/0cee4054-e83f-42ae-a079-75b81c0766fb`,
        {
          method: "GET",
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${session.session.access_token}`,
          },
        }
      );
    } else if (type === "following") {
      navigation.setOptions({
        title: `Following`,
      });
      //todo: change id
      response = await fetch(`${baseUrl}/followuser/following`, {
        method: "GET",
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${session.session.access_token}`,
        },
      });
    }
    response = await response.json();
    if (response.error) {
      Alert.alert("Error", response.error);
    }
    setData(response);
    setIsLoading(false);
  };

  const kFormatter = (num) => {
    return num.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handleFollowPress = async (id) => {
    const { data: session, error } = await supabase.auth.getSession();
    if (error) {
      navigation.navigate("Login");
      return false;
    }
    // update the state
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    const newData = data.map((item) => {
      if (item.user.id === id) {
        return {
          ...item,
          isFollowed: !item.isFollowed,
        };
      }
      return item;
    });
    setData(newData);

    let response = await fetch(`${baseUrl}/followuser/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${session.session.access_token}`,
      },
    });

    if (response.status === 201) {
      const newData = data.map((item) => {
        if (item.user.id === id) {
          return {
            ...item,
            isFollowed: true,
          };
        }
        return item;
      });
      setData(newData);
    } else {
      const newData = data.map((item) => {
        if (item.user.id === id) {
          return {
            ...item,
            isFollowed: false,
          };
        }
        return item;
      });
      setData(newData);
    }
  };

  const renderItem = ({ item, isFollowing }) => {
    return (
      <UserList
        type={type}
        id={item.user.id}
        username={item.user.username}
        profile_url={item.user.profile_url}
        isFollowing={isFollowing}
        onPress={handleFollowPress}
        navigation={navigation}
      />
    );
  };

  const renderHeaderComponent = () => {
    if (type === "followers" || type === "following") {
      return (
        <View style={{ marginHorizontal: "5%", marginVertical: "2%" }}>
          <CustomText
            style={{ fontFamily: "Nunito_800ExtraBold", fontSize: scale(25) }}
          >
            {kFormatter(data.length)}
          </CustomText>
          <CustomText
            style={{ fontFamily: "Nunito_500Medium", fontSize: scale(15) }}
          >
            {type === "followers" ? "Followers" : "Following"}
          </CustomText>
        </View>
      );
    } else {
      return null;
    }
  };

  // return of isLoading
  if (isLoading) {
    return (
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <ActivityIndicator color="black" style={{ marginTop: "2%" }} />
      </View>
    );
  }

  const handleRefresh = () => {
    getData();
  };

  return (
    <View style={styles.container}>
      <FlashList
        ListHeaderComponent={renderHeaderComponent}
        data={data}
        renderItem={({ item }) =>
          renderItem({
            item,
            isFollowing: item.isFollowed,
          })
        }
        estimatedItemSize={69}
        onRefresh={handleRefresh}
        refreshing={isLoading}
      />
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
