// list of posts
// example usage: when press on a post in mansory list

import { View, FlatList } from "react-native";
import { useCallback, useEffect, useRef, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { CalcHeight } from "../app/utils/CalcHeight";
import Post from "../app/components/Posts/Post";
import { supabase } from "../app/lib/supabase";
import { baseUrl } from "@env";
import * as Haptics from "expo-haptics";

// todo: remove this
let fakeData = [
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
    likes: 4,
    comments: 12,
    reposts: 5,
    lastEdit: null,
    isLiked: false,
    repostedByUser: true,
    isDonateable: true,
  },
];
const PostsList = ({ navigation }) => {
  const flashListRef = useRef(null);
  const { params } = useRoute();
  // const [data, setPostsData] = useState([]);
  const [postsData, setPostsData] = useState();

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
      // todo: get post from db then set data
      console.log("fetching posts from id: ", params.id);
      setPostsData(fakeData);
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
    let response = await fetch(`${baseUrl}/posts/like/8`, {
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

  const renderItem = ({ item, index, isLiked, isReposted, height, width }) => {
    let scaledHeight = CalcHeight(width, height);
    return (
      <Post
        navigation={navigation}
        postId={item.postId}
        index={index}
        likes={item.likes}
        comments={item.comments}
        reposts={item.reposts}
        isLiked={isLiked}
        isReposted={isReposted}
        type={item.type}
        isDonateable={item.isDonateable}
        repost={item.repost}
        profileUrl={item.profile_url}
        username={item.username}
        name={item.name}
        createdAt={item.createdAt}
        posts={item.posts ? item.posts : []}
        caption={item.caption}
        height={scaledHeight}
        handleLike={handleLike}
        handleRepost={handleRepost}
      />
    );
  };
  const handleRepost = (index, isReposted, postId) => {
    // update data by reposting the post
    let newData = [...postsData];
    let post = newData[index];
    if (post.repostedByUser === true) {
      post.reposts -= 1;
      post.repostedByUser = false;
    } else {
      post.reposts += 1;
      post.repostedByUser = true;
    }
    setPostsData(newData);
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
            index: index,
            isLiked: item.isLiked,
            isReposted: item.repostedByUser,
            postId: item.postId,
            width: item.posts?.length > 0 ? item.posts[0].width : 0,
            height: item.posts?.length > 0 ? item.posts[0].height : 0,
          })
        }
        // maxToRenderPerBatch={params.scrollToIndex}
        showsVerticalScrollIndicator={false}
        onScrollToIndexFailed={(error) => {
          //   flashListRef.current.scrollToOffset({
          //     offset: error.averageItemLength * error.index,
          //     animated: true,
          //   });
          setTimeout(() => {
            if (data.length !== 0 && flashListRef !== null) {
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
