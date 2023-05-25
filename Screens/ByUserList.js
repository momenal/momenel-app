// Description: This screen will show the list of users who liked the post or reposted the post or tipped the post.

import { Dimensions, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import { FlashList } from "@shopify/flash-list";
import UserList from "../app/components/UserList";
import * as Haptics from "expo-haptics";
import CustomText from "../app/components/customText/CustomText";
import { scale } from "../app/utils/Scale";
import { supabase } from "../app/lib/supabase";
import { baseUrl } from "@env";

let likes = [
  {
    username: "farhan",
    profile_url:
      "https://images.unsplash.com/photo-1582233479366-6d38bc390a08?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1783&q=80",
    isFollowing: true,
  },
  {
    username: "mohammad",
    profile_url:
      "https://images.unsplash.com/profile-fb-1490247534-1fb0b1c8ecca.jpg?dpr=2&auto=format&fit=crop&w=150&h=150&q=60&crop=faces&bg=fff",
    isFollowing: false,
  },
];
let reposts = [
  {
    username: "BenIwara",
    profile_url:
      "https://images.unsplash.com/photo-1681483476977-322d81693e41?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
    isFollowing: true,
  },
  {
    username: "vale",
    profile_url:
      "https://images.unsplash.com/photo-1677103216895-59fb1b6a4fcd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=770&q=80",
    isFollowing: false,
  },
];

const ByUserList = ({ route, navigation }) => {
  const { type, Id } = route.params;
  const [data, setData] = useState([]);

  useEffect(() => {
    if (type === "likes") {
      navigation.setOptions({ title: "Likes" });
      //todo: fetch likes from server
      console.log("fetching likes: ", Id);
      setData(likes);
    } else if (type === "reposts") {
      navigation.setOptions({ title: "Reposts" });
      setData(reposts);
    } else if (type === "followers") {
      navigation.setOptions({
        title: `Followers`,
      });
      // fetch followers
      setData([
        {
          id: "iuwqijlksajdk",
          username: "farhan",
          profile_url:
            "https://images.unsplash.com/photo-1582233479366-6d38bc390a08?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1783&q=80",
          isFollowing: true,
        },
        {
          id: "sad77900217nhuuasjd",
          username: "moe",
          profile_url:
            "https://images.unsplash.com/profile-fb-1490247534-1fb0b1c8ecca.jpg?dpr=2&auto=format&fit=crop&w=150&h=150&q=60&crop=faces&bg=fff",
          isFollowing: false,
        },
      ]);
    } else if (type === "following") {
      navigation.setOptions({
        title: `Following`,
      });
      // fetch followers
      setData([
        {
          id: "iuwqijlksajdk",
          username: "farhanverse",
          profile_url:
            "https://images.unsplash.com/photo-1582233479366-6d38bc390a08?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1783&q=80",
          isFollowing: true,
        },
        {
          id: "sad77900217nhuuasjd",
          username: "kkkas",
          profile_url:
            "https://images.unsplash.com/profile-fb-1490247534-1fb0b1c8ecca.jpg?dpr=2&auto=format&fit=crop&w=150&h=150&q=60&crop=faces&bg=fff",
          isFollowing: false,
        },
      ]);
    }
  }, []);

  const kFormatter = (num) => {
    return num.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handleFollowPress = async (username) => {
    const { data: session, error } = await supabase.auth.getSession();
    if (error) {
      navigation.navigate("Login");
      return false;
    }
    // update the state
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    const newData = data.map((item) => {
      if (item.username === username) {
        return {
          ...item,
          isFollowing: !item.isFollowing,
        };
      }
      return item;
    });
    setData(newData);

    let response = await fetch(
      `${baseUrl}/followuser/b64ebff6-f29d-46f0-a0df-8cf6885a34f9`,
      {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${session.session.access_token}`,
        },
      }
    );

    if (response.status === 201) {
      const newData = data.map((item) => {
        if (item.username === username) {
          return {
            ...item,
            isFollowing: true,
          };
        }
        return item;
      });
      setData(newData);
    } else {
      const newData = data.map((item) => {
        if (item.username === username) {
          return {
            ...item,
            isFollowing: false,
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
        username={item.username}
        profile_url={item.profile_url}
        isFollowing={isFollowing}
        onPress={handleFollowPress}
      />
    );
  };

  const renderHeaderComponent = () => {
    if (type === "followers") {
      return (
        <View style={{ marginHorizontal: "5%", marginVertical: "2%" }}>
          <CustomText
            style={{ fontFamily: "Nunito_800ExtraBold", fontSize: scale(25) }}
          >
            {kFormatter(route.params.totalAmount)}
          </CustomText>
          <CustomText
            style={{ fontFamily: "Nunito_500Medium", fontSize: scale(15) }}
          >
            Followers
          </CustomText>
        </View>
      );
    } else {
      return null;
    }
  };

  return (
    <View style={styles.container}>
      <FlashList
        ListHeaderComponent={renderHeaderComponent}
        data={data}
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
