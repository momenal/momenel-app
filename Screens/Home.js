import { ActivityIndicator, Dimensions, StyleSheet, View } from "react-native";
import React, { useCallback, useEffect } from "react";
import StoriesContainer from "../app/components/Stories/StoriesScroll/StoriesContainer";
import { useBoundStore } from "../app/Store/useBoundStore";
import Post from "../app/components/Posts/Post";
import { supabase } from "../app/lib/supabase";
import { FlashList } from "@shopify/flash-list";
import { CalcHeight } from "../app/utils/CalcHeight";

const Home = ({ navigation }) => {
  const fetchMorePosts = useBoundStore((state) => state.fetchMorePosts);
  const postsData = useBoundStore((state) => state.posts);
  const handleLike = useBoundStore((state) => state.handleLike);

  useEffect(() => {
    // todo: fetch posts from db
  }, []);

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
    [postsData]
  );
  const renderStories = useCallback(
    <StoriesContainer navigation={navigation} />,
    []
  );

  const renderListFooter = useCallback(
    <View
      style={{
        height: 60,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ActivityIndicator />
    </View>,
    []
  );

  const keyExtractor = useCallback((item) => item.postId, []);

  return (
    <View
      style={{
        backgroundColor: "white",
        height: "100%",
        marginBottom: 800,
      }}
    >
      <FlashList
        data={postsData}
        estimatedItemSize={450}
        keyExtractor={keyExtractor}
        renderItem={({ item, index }) =>
          renderItem({
            item,
            index,
            isLiked: item.isLiked,
            isReposted: item.repostedByUser,
            postId: item.postId,
            width: item.posts?.length > 0 ? item.posts[0].width : 0,
            height: item.posts?.length > 0 ? item.posts[0].height : 0,
          })
        }
        ListHeaderComponent={renderStories}
        ListHeaderComponentStyle={{
          paddingTop: 5,
        }}
        maxToRenderPerBatch={5}
        initialNumToRender={5}
        showsVerticalScrollIndicator={false}
        onEndReached={() => setTimeout(fetchMorePosts, 2000)} //! fake 2 sec delay
        onEndReachedThreshold={2}
        ListFooterComponent={renderListFooter}
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

export default Home;

const styles = StyleSheet.create({});
