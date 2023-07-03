// list of posts
import { View, FlatList, Alert } from "react-native";
import { useCallback, useEffect, useRef, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { CalcHeight } from "../app/utils/CalcHeight";
import Post from "../app/components/Posts/Post";
import { supabase } from "../app/lib/supabase";
import { baseUrl } from "@env";
import * as Haptics from "expo-haptics";

const PostsList = ({ navigation }) => {
  const flashListRef = useRef(null);
  const { params } = useRoute();
  const [postsData, setPostsData] = useState([]);
  console.log(params.type);
  useEffect(() => {
    if (params.posts) {
      setPostsData(params.posts);
      setTimeout(() => {
        flashListRef?.current?.scrollToIndex({
          animated: true,
          index: params.scrollToIndex,
          viewPosition: 0,
        });
      }, 200);
    } else {
      setPostsData(params.posts);
    }
  }, []);

  const handleLike = async (index, isLiked, postId) => {
    const { data, error } = await supabase.auth.getSession();
    if (error) {
      navigation.navigate("Login");
    }

    // handle like confirmation before sending to the backend
    const updatedPosts = postsData.map((post) => {
      if (post.postId === postId) {
        if (post.isLiked) {
          post.likes -= 1;
        } else {
          post.likes += 1;
        }
        post.isLiked = !post.isLiked;
      }
      return post;
    });
    setPostsData(updatedPosts);

    // send like to the backend
    //todo: change url id to postId
    let response = await fetch(`${baseUrl}/like/8`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${data.session.access_token}`,
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

      const updatedPosts = postsData.map((post) => {
        if (post.postId === postId) {
          post.likes = likes;
          post.isLiked = true;
        }
        return post;
      });
      setPostsData(updatedPosts);
    } else if (response.status === 204) {
      const updatedPosts = postsData.map((post) => {
        if (post.postId === postId) {
          post.isLiked = false;
        }
        return post;
      });
      setPostsData(updatedPosts);
    }
  };

  const renderItem = useCallback(
    ({
      item,
      index,
      isLiked,
      isReposted,
      height,
      width,
      createdAt,
      postId,
      type,
    }) => {
      let scaledHeight = CalcHeight(width, height);
      let tempPost = type === "post" ? item : item.post;
      return (
        <Post
          navigation={navigation}
          postId={tempPost.id}
          index={index}
          likes={tempPost.likes[0].count}
          comments={tempPost.comments[0].count}
          reposts={tempPost.reposts[0].count}
          repost={item.repostedBy}
          profileUrl={tempPost.user?.profile_url}
          username={tempPost.user?.username}
          name={tempPost.user?.name}
          createdAt={createdAt}
          posts={tempPost.content ? tempPost.content : []}
          caption={tempPost.caption}
          height={scaledHeight}
          handleLike={handleLike}
          handleRepost={handleRepost}
          isLiked={isLiked}
          isReposted={isReposted}
        />
      );
    },
    [postsData]
  );

  const handleRepost = async (index, isReposted, postId) => {
    const { data, error } = await supabase.auth.getSession();
    if (error) {
      navigation.navigate("Login");
    }

    // handle repost confirmation before sending to the backend
    const updatedPosts = postsData.map((post) => {
      if (post.postId === postId) {
        if (post.repostedByUser) {
          post.reposts -= 1;
        } else {
          post.reposts += 1;
        }
        post.repostedByUser = !post.repostedByUser;
      }
      return post;
    });
    setPostsData(updatedPosts);

    // send repost to the backend
    let response = await fetch(`${baseUrl}/repost/8`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${data.session.access_token}`,
      },
    });
    // if error
    if (!response.ok) {
      Alert.alert("Error", "Something went wrong");
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      return;
    }

    if (response.status === 200) {
      const updatedPosts = postsData.map((post) => {
        if (post.postId === postId) {
          post.repostedByUser = true;
        }
        return post;
      });
      setPostsData(updatedPosts);
    } else if (response.status === 204) {
      const updatedPosts = postsData.map((post) => {
        if (post.postId === postId) {
          post.repostedByUser = false;
        }
        return post;
      });
      setPostsData(updatedPosts);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <FlatList
        keyExtractor={(item, index) => index}
        ref={flashListRef}
        data={postsData}
        renderItem={({ item, index }) =>
          renderItem({
            item,
            index,
            isLiked: item.isLiked,
            isReposted: item.isReposted,
            postId: item.type === "repost" ? item.post.id : item.id,
            type: params.type,
            width:
              item.type === "repost" && item.post.content?.length > 0
                ? item.post.content[0].width
                : item.type === "post" && item.content?.length > 0
                ? item.content[0].width
                : 0,
            height:
              item.type === "repost" && item.post.content?.length > 0
                ? item.post.content[0].height
                : item.type === "post" && item.content?.length > 0
                ? item.content[0].height
                : 0,
            createdAt: item.created_at,
          })
        }
        // maxToRenderPerBatch={params.scrollToIndex}
        showsVerticalScrollIndicator={false}
        onScrollToIndexFailed={(error) => {
          setTimeout(() => {
            if (postsData?.length !== 0 && flashListRef !== null) {
              flashListRef.current.scrollToIndex({
                index: error.index,
                animated: true,
              });
            }
          }, 100);
        }}
      />
    </View>
  );
};

export default PostsList;
