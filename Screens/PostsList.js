// list of posts
// example usage: when press on a post in mansory list

import { View, Text } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { FlashList } from "@shopify/flash-list";
import { CalcHeight } from "../app/utils/CalcHeight";
import Post from "../app/components/Posts/Post";

const PostsList = ({ navigation }) => {
  const { params } = useRoute();
  //   console.log(params.posts);
  //   console.log(params.scrollToIndex);
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(params.posts);
  }, []);

  function handleLike(index, isLiked, postId) {
    // todo: send like to db with postId
    let newData = [...data];
    newData[index].isLiked = !isLiked;
    if (isLiked) {
      newData[index].likes -= 1;
    } else {
      newData[index].likes += 1;
    }

    setData(newData);
  }

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
          isSaved={item.isSaved}
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
      <FlashList
        data={data}
        estimatedItemSize={450}
        // keyExtractor={(item) => {
        //   return item.postId;
        // }}
        renderItem={({ item, index }) =>
          renderItem({
            item,
            index: index,
            isLiked: item.isLiked,
            isReposted: item.repostedByUser,
            postId: item.postId,
            width: item.posts?.length > 0 ? item.posts[0].width : 0,
            height: item.posts?.length > 0 ? item.posts[0].height : 0,
            // height: calcHeight(item.posts[0]?.width, item.posts[0]?.height),
          })
        }
        maxToRenderPerBatch={10}
        initialNumToRender={5}
        showsVerticalScrollIndicator={false}
        // onEndReached={() => setTimeout(fetchMorePosts, 2000)} //! fake 2 sec delay
        // onEndReachedThreshold={2}
        keyboardDismissMode="on-drag"
        // ListFooterComponent={renderListFooter}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 50,
          minimumViewTime: 500,
        }}
        onViewableItemsChanged={({ viewableItems, changed }) => {
          // loop through viewable items and update the store
          viewableItems.forEach((item) => {
            // console.log("Visible items are", item.index);
          });
        }}
      />
    </View>
  );
};

export default PostsList;
