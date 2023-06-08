import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  Dimensions,
  Pressable,
} from "react-native";
import { Image } from "expo-image";
import { MasonryFlashList } from "@shopify/flash-list";

const LikedPosts = ({ navigation }) => {
  const [likedPosts, setLikedPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    //todo: fetch liked posts from backend

    setLikedPosts([
      {
        postId: "askjdlkasjdmasdi",
        username: "farhanverse",
        name: "farhan",
        repost: {
          isRepost: true,
        },
        posts: [
          {
            id: Math.random(19).toString(),
            width: 3333,
            height: 5000,
            type: "photo",
            url: "https://images.pexels.com/photos/13290878/pexels-photo-13290878.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          },
          {
            id: Math.random(19).toString(),
            width: 6000,
            height: 4000,
            type: "photo",
            url: "https://images.pexels.com/photos/15355977/pexels-photo-15355977.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
          },
        ],
      },
      {
        postId: "2132113sadsadgggg",
        username: "farhanverse",
        name: "farhan",
        repost: {
          isRepost: false,
        },
        posts: [
          {
            id: Math.random(19).toString(),
            width: 6746,
            height: 9439,
            type: "photo",
            url: "https://images.unsplash.com/photo-1681238339260-67f4e6ab5717?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=830&q=80",
          },
        ],
      },
      {
        postId: "2132113sajjsadjlkj`dsadgggg",
        username: "farhanverse",
        name: "farhan",
        repost: {
          isRepost: false,
        },
        posts: [
          {
            id: Math.random(19).toString(),
            width: 6760,
            height: 4507,
            type: "photo",
            url: "https://images.unsplash.com/photo-1681519488861-be9e0a3e905a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
          },
          {
            id: Math.random(19).toString(),
            width: 6000,
            height: 4000,
            type: "photo",
            url: "https://images.pexels.com/photos/15355977/pexels-photo-15355977.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
          },
        ],
      },
      {
        postId: "oool7761",
        username: "farhanverse",
        name: "farhan",
        repost: {
          isRepost: false,
        },
        posts: [
          {
            id: Math.random(19).toString(),
            width: 2560,
            height: 1707,
            type: "photo",
            url: "https://images.unsplash.com/photo-1512632578888-169bbbc64f33?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
          },
        ],
      },
      {
        postId: "oool7761",
        username: "farhanverse",
        name: "farhan",
        repost: {
          isRepost: false,
        },
        posts: [
          {
            id: Math.random(19).toString(),
            width: 10000,
            height: 9118,
            type: "photo",
            url: "https://images.unsplash.com/photo-1628859017536-c2f1d69f3c84?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1274&q=80",
          },
        ],
      },
      {
        postId: "oool77998123961",
        username: "farhanverse",
        name: "farhan",
        repost: {
          isRepost: false,
        },
        posts: [
          {
            id: Math.random(19).toString(),
            width: 640,
            height: 960,
            type: "photo",
            url: "https://images.unsplash.com/photo-1575538439014-1b8bc5fcaa1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
          },
        ],
      },
    ]);
    setIsLoading(false);
  }, []);
  const ScreenWidth = Dimensions.get("window").width;
  const CalcHeight = (width, height) => {
    // const Iwidth = ScreenWidth * 0.5;
    const Iwidth = ScreenWidth * 0.5 - ScreenWidth * 0.04;
    let newHeight = height * (Iwidth / width);
    return newHeight;
  };
  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <MasonryFlashList
          data={likedPosts}
          numColumns={2}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.postId}
          renderItem={({ item, index }) => (
            <Pressable
              onPress={() =>
                navigation.navigate("PostsList", {
                  //todo:use this scrollToIndex: index,
                  //todo:use this posts: likedPosts,
                  scrollToIndex: 0,
                  posts: [
                    {
                      postId: "askjdlkasjdmasdi",
                      username: "farhanverse",
                      name: "farhan",
                      repost: {
                        isRepost: false,
                      },
                      profile_url:
                        "https://plus.unsplash.com/premium_photo-1664551734441-6f4726ad0e9f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=776&q=80",
                      posts: [
                        {
                          id: Math.random(19).toString(),
                          width: 3333,
                          height: 5000,
                          type: "photo",
                          url: "https://images.pexels.com/photos/13290878/pexels-photo-13290878.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                        },
                        {
                          id: Math.random(19).toString(),
                          width: 6000,
                          height: 4000,
                          type: "photo",
                          url: "https://images.pexels.com/photos/15355977/pexels-photo-15355977.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                        },
                      ],
                      caption: "#firstpost",
                      createdAt: Date.now(),
                      likes: 300,
                      comments: 12,
                      reposts: 5,
                      lastEdit: null,
                      isLiked: false,
                      repostedByUser: true, // if the user himself has reposted the post
                      isDonateable: true,
                    },
                  ],
                })
              }
              style={{ paddingVertical: 5, paddingHorizontal: "2%" }}
            >
              <Image
                style={{
                  width: "100%",
                  height: CalcHeight(item.posts[0].width, item.posts[0].height),
                  borderRadius: 7,
                }}
                source={{ uri: item.posts[0].url }}
              />
            </Pressable>
          )}
          estimatedItemSize={142}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  item: {
    // marginVertical: 5,
    // marginHorizontal: 2,
    // backgroundColor: "#fff",
    // borderRadius: 5,
    // overflow: "hidden",
  },
  image: {
    height: 150,
    width: 150,
  },
});

export default LikedPosts;
