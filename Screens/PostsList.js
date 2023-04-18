// list of posts
// example usage: when press on a post in mansory list

import { View, FlatList } from "react-native";
import { useCallback, useEffect, useRef, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { CalcHeight } from "../app/utils/CalcHeight";
import Post from "../app/components/Posts/Post";
// todo: remove this
let fakeRes = [
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
const PostsList = ({ navigation }) => {
  const flashListRef = useRef(null);
  const { params } = useRoute();
  const [data, setData] = useState([]);

  useEffect(() => {
    if (params.posts) {
      setData(params.posts);
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
      setData(fakeRes);
    }
  }, []);

  // const handleLike = useCallback(
  //   async (index, isLiked, postId) => {
  //     let newData = [...params.posts];
  //     let post = newData[index];
  //     if (post.isLiked) {
  //       post.likes -= 1;
  //       post.isLiked = false;
  //     } else {
  //       post.likes += 1;
  //       post.isLiked = true;
  //     }
  //     setData(newData);

  //     //todo: send like to db with postId
  //   },
  //   [data]
  // );
  const handleLike = (index, isLiked, postId) => {
    // update data by liking the post
    let newData = [...data];
    let post = newData[index];
    console.log(post.isLiked);
    if (post.isLiked === true) {
      post.likes -= 1;
      post.isLiked = false;
    } else {
      post.likes += 1;
      post.isLiked = true;
    }
    console.log(post.isLiked);
    setData(newData);
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
    let newData = [...data];
    let post = newData[index];
    if (post.repostedByUser === true) {
      post.reposts -= 1;
      post.repostedByUser = false;
    } else {
      post.reposts += 1;
      post.repostedByUser = true;
    }
    setData(newData);
  };

  // const renderItem = useCallback(
  //   ({ item, index, isLiked, isReposted, height, width }) => {
  //     let scaledHeight = CalcHeight(width, height);
  //     return (
  //       <Post
  //         navigation={navigation}
  //         postId={item.postId}
  //         index={index}
  //         likes={item.likes}
  //         comments={item.comments}
  //         reposts={item.reposts}
  //         isLiked={isLiked}
  //         isReposted={isReposted}
  //         type={item.type}
  //         isDonateable={item.isDonateable}
  //         repost={item.repost}
  //         profileUrl={item.profile_url}
  //         username={item.username}
  //         name={item.name}
  //         createdAt={item.createdAt}
  //         posts={item.posts ? item.posts : []}
  //         caption={item.caption}
  //         height={scaledHeight}
  //         handleLike={handleLike}
  //       />
  //     );
  //   },
  //   []
  // );

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <FlatList
        keyExtractor={(item, index) => index}
        ref={flashListRef}
        data={data}
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
