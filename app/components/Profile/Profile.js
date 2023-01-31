import { View, Text, ImageBackground, Dimensions } from "react-native";
import { MasonryFlashList } from "@shopify/flash-list";
import { useBoundStore } from "../../Store/useBoundStore";
import { useState } from "react";

const Profile = () => {
  const [posts, setPosts] = useState([
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
      repostedByUser: true, // if the user himself has reposted the post
      isDonateable: true,
    },
    {
      postId: "askjdlkasjdmaslldi",
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
          width: 4000,
          height: 2300,
          type: "photo",
          url: "https://images.pexels.com/photos/7303171/pexels-photo-7303171.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        },
      ],
      caption: "#cat",
      createdAt: Date.now(),
      likes: 300,
      comments: 12,
      reposts: 5,
      lastEdit: null,
      isLiked: false,
      repostedByUser: true, // if the user himself has reposted the post
      isDonateable: true,
    },
    {
      postId: "askjdlkasjdmaslldi",
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
          width: 4000,
          height: 2300,
          type: "photo",
          url: "https://images.pexels.com/photos/10414930/pexels-photo-10414930.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        },
      ],
      caption: "#cat",
      createdAt: Date.now(),
      likes: 300,
      comments: 12,
      reposts: 5,
      lastEdit: null,
      isLiked: false,
      repostedByUser: true, // if the user himself has reposted the post
      isDonateable: true,
    },
    {
      postId: "askjdlkasjdmaslldi",
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
          width: 4000,
          height: 2300,
          type: "photo",
          url: "https://images.pexels.com/photos/15355492/pexels-photo-15355492.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        },
      ],
      caption: "#cat",
      createdAt: Date.now(),
      likes: 300,
      comments: 12,
      reposts: 5,
      lastEdit: null,
      isLiked: false,
      repostedByUser: true, // if the user himself has reposted the post
      isDonateable: true,
    },
  ]);
  const username = useBoundStore((state) => state.username);
  const renderItem = ({ item, postId }) => {
    console.log(postId);
    return (
      <View
        style={{
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ImageBackground
          source={{ uri: item.posts[0].url }}
          style={{
            width: "98%",
            marginBottom: 10,
            height: Math.floor(Math.random() * 200) + 100,
            borderRadius: 4,
          }}
          imageStyle={{ borderRadius: 6 }}
        ></ImageBackground>
      </View>
    );
  };

  return (
    <View style={{ height: "100%", backgroundColor: "white" }}>
      <MasonryFlashList
        disableAutoLayout={true}
        data={posts}
        numColumns={2}
        renderItem={({ item }) =>
          renderItem({
            item,
            postId: item.postId,
          })
        }
        estimatedItemSize={200}
      />
    </View>
  );
};

export default Profile;
// <View style={{ height: "100%", backgroundColor: "white" }}>
//   <ImageBackground
//     source={{
//       uri: "https://images.unsplash.com/photo-1625266462942-f8535427d87a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1332&q=80",
//     }}
//     resizeMode="cover"
//     style={{
//       height: Dimensions.get("window").height * 0.2,
//       width: Dimensions.get("window").width,
//     }}
//   ></ImageBackground>
// </View>
