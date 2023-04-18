// to be used if you want to display a single post

// list of posts
// example usage: when press on a post in mansory list

import { View, FlatList } from "react-native";
import { useCallback, useEffect, useRef, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { CalcHeight } from "../app/utils/CalcHeight";
import Post from "../app/components/Posts/Post";
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
const PostSingle = ({ navigation }) => {
  const flashListRef = useRef(null);
  const { params } = useRoute();
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(fakeRes);
  }, []);

  const handleLike = () => {
    // update data by liking the post
    let newData = [...data];
    let post = newData[0];

    if (post.isLiked === true) {
      post.likes -= 1;
      post.isLiked = false;
    } else {
      post.likes += 1;
      post.isLiked = true;
    }

    setData(newData);
  };

  const handleRepost = (index, isReposted, postId) => {
    // update data by reposting the post
    let newData = [...data];
    let post = newData[index];
    console.log(post);
    if (post.repostedByUser === true) {
      post.reposts -= 1;
      post.repostedByUser = false;
    } else {
      post.reposts += 1;
      post.repostedByUser = true;
    }
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

export default PostSingle;
