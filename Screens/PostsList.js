// list of posts
// example usage: when press on a post in mansory list

import { View, FlatList } from "react-native";
import { useCallback, useEffect, useRef, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { CalcHeight } from "../app/utils/CalcHeight";
import Post from "../app/components/Posts/Post";

const PostsList = ({ navigation }) => {
  const flashListRef = useRef(null);
  const { params } = useRoute();
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(params.posts);
    setTimeout(() => {
      flashListRef?.current?.scrollToIndex({
        animated: true,
        index: params.scrollToIndex,
        viewPosition: 0,
      });
    }, 200);
  }, []);

  const handleLike = useCallback(
    async (index, isLiked, postId) => {
      let newData = [...params.posts];
      let post = newData[index];
      if (post.isLiked) {
        post.likes -= 1;
        post.isLiked = false;
      } else {
        post.likes += 1;
        post.isLiked = true;
      }
      setData(newData);

      //todo: send like to db with postId
    },
    [data]
  );

  const renderItem = useCallback(
    ({ item, index, isLiked, isReposted, height, width }) => {
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
        />
      );
    },
    []
  );

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
