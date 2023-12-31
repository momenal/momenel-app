import { ActivityIndicator, Alert, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { supabase } from "../app/lib/supabase";
import Post from "../app/components/Posts/Post";
import { FlashList } from "@shopify/flash-list";
import * as Haptics from "expo-haptics";

let baseUrl = "https://api.momenel.com";

const SinglePost = ({ navigation }) => {
  const { params } = useRoute();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchPost();
  }, [params.id]);

  const fetchPost = async () => {
    setIsLoading(true);
    const { data, error } = await supabase.auth.getSession();
    if (error) {
      return navigation.navigate("Login");
    }
    let url =
      params.type === "repost"
        ? `${baseUrl}/repost/repost/${params.id}`
        : `${baseUrl}/posts/${params.id}`;

    let response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${data.session.access_token}`,
      },
    });

    if (!response.ok) {
      Alert.alert("Oops", "Something went wrong!");
      return;
    }

    response = await response.json();

    setData(response);
    setIsLoading(false);
  };

  const handleLike = async (index, isLiked, postId) => {
    const { data: session, error } = await supabase.auth.getSession();
    if (error) {
      navigation.navigate("Login");
    }

    // update isliked on the first index
    const updatedPosts = data.map((post) => {
      let id = params.type === "repost" ? post.post.id : post.id;
      if (id === postId) {
        if (post.isLiked) {
          params.type === "repost"
            ? post.post.likes[0].count--
            : post.likes[0].count--;
        } else {
          params.type === "repost"
            ? post.post.likes[0].count++
            : post.likes[0].count++;
        }
        post.isLiked = !post.isLiked;
      }
      return post;
    });
    setData(updatedPosts);

    // send like to the backend
    let response = await fetch(`${baseUrl}/like/${postId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.session.access_token}`,
      },
    });
    // if error
    if (!response.ok) {
      Alert.alert("Error", "Something went wrong");
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      return;
    }
    if (response.status === 200) {
      let { likes } = await response.json();
      const updatedPosts = data.map((post) => {
        let id = params.type === "repost" ? post.post.id : post.id;
        if (id === postId) {
          params.type === "repost"
            ? (post.post.likes[0].count = likes)
            : (post.likes[0].count = likes);
          post.isLiked = true;
        }
        return post;
      });
      setData(updatedPosts);
    } else if (response.status === 204) {
      const updatedPosts = data.map((post) => {
        let id = params.type === "repost" ? post.post.id : post.id;
        if (id === postId) {
          post.isLiked = false;
        }
        return post;
      });
      setData(updatedPosts);
    }
  };

  const handleRepost = async (index, isReposted, postId) => {
    const { data: session, error } = await supabase.auth.getSession();
    if (error) {
      navigation.navigate("Login");
    }

    // handle like confirmation before sending to the backend
    const updatedPosts = data.map((post) => {
      let id = params.type === "repost" ? post.post.id : post.id;

      if (id === postId) {
        if (post.isReposted) {
          params.type === "repost"
            ? post.post.reposts[0].count--
            : post.reposts[0].count--;
        } else {
          params.type === "repost"
            ? post.post.reposts[0].count++
            : post.reposts[0].count++;
        }
        post.isReposted = !post.isReposted;
      }
      return post;
    });
    setData(updatedPosts);

    // send repost to the backend
    let response = await fetch(`${baseUrl}/repost/${postId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.session.access_token}`,
      },
    });

    // if error
    if (!response.ok) {
      Alert.alert("Error", "Something went wrong");
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      return;
    }
    if (response.status === 201) {
      const updatedPosts = data.map((post) => {
        let id = params.type === "repost" ? post.post.id : post.id;
        if (id === postId) {
          post.isReposted = true;
        }
        return post;
      });
      setData(updatedPosts);
    } else if (response.status === 204) {
      const updatedPosts = data.map((post) => {
        let id = params.type === "repost" ? post.post.id : post.id;
        if (id === postId) {
          post.isReposted = false;
        }
        return post;
      });
      setData(updatedPosts);
    }
  };

  const renderItem = useCallback(
    ({ item, index }) => {
      let tempPost = params.type === "post" ? item : item.post;

      return (
        <Post
          height={tempPost?.content.length > 0 ? tempPost.content[0].height : 0}
          width={tempPost?.content.length > 0 ? tempPost.content[0].width : 0}
          isPublished={true}
          navigation={navigation}
          postId={tempPost?.id}
          index={index}
          likes={tempPost?.likes[0].count}
          comments={tempPost?.comments[0].count}
          reposts={tempPost?.reposts[0].count}
          repost={item.repostedBy}
          profileUrl={tempPost.user?.profile_url}
          username={tempPost?.user?.username}
          name={tempPost?.user?.name}
          createdAt={item.created_at}
          posts={tempPost?.content ? tempPost.content : []}
          caption={tempPost?.caption}
          handleLike={handleLike}
          handleRepost={handleRepost}
          isLiked={item.isLiked}
          isReposted={item.isReposted}
        />
      );
    },
    [data]
  );

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          backgroundColor: "white",
        }}
      >
        <ActivityIndicator size="small" color="black" />
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
        justifyContent: "center",
      }}
    >
      <FlashList
        data={data}
        estimatedItemSize={233}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default SinglePost;
