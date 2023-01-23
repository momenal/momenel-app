import { ActivityIndicator, Dimensions, StyleSheet, View } from "react-native";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import StoriesContainer from "../app/components/Stories/StoriesScroll/StoriesContainer";
import { useBoundStore } from "../app/Store/useBoundStore";
import Post from "../app/components/Posts/Post";
import { supabase } from "../app/lib/supabase";
import Lottie from "lottie-react-native";
import Loader from "../app/components/Loader";
import { FlashList } from "@shopify/flash-list";

// Keep the splash screen visible while we fetch resources
// SplashScreen.preventAutoHideAsync();

const Home = ({ navigation }) => {
  const fetchMorePosts = useBoundStore((state) => state.fetchMorePosts);
  const postsData = useBoundStore((state) => state.posts);
  const [appIsReady, setAppIsReady] = useState(false);
  const ScreenWidth = Dimensions.get("window").width;
  const ScreenHeight = Dimensions.get("window").height;
  const Iwidth = ScreenWidth - ScreenWidth * 0.1;

  async function login() {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    // console.log(user.id);
    const { data, error } = await supabase
      .from("profiles")
      .select("username")
      .eq("id", user.id);
    //todo: update username with .username
    setAppIsReady(true);
  }

  useEffect(() => {
    // setTimeout(login, 2000);
    login();
  }, []);

  // funtion to calcualte scaled height and width
  const calcHeight = (width, height) => {
    let newHeight = height * (Iwidth / width);
    if (newHeight > ScreenHeight * 0.7) {
      return ScreenHeight * 0.7;
    } else {
      return newHeight;
    }
  };

  const renderItem = useCallback(
    ({ item, index, isLiked, isReposted, height, width }) => {
      let scaledHeight = calcHeight(width, height);
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
        />
      );
    },

    []
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

  // const keyExtractor = useCallback((item) => item.postId, []);

  if (!appIsReady) {
    return <Loader />;
  }

  return (
    <View
      style={{
        backgroundColor: "white",
        height: "100%",
        marginBottom: 800,
        // backgroundColor: "pink",
      }}
    >
      <FlashList
        data={postsData}
        estimatedItemSize={450}
        keyExtractor={(item) => {
          return item.postId;
        }}
        renderItem={({ item, index }) =>
          renderItem({
            item,
            index,
            isLiked: item.isLiked,
            isReposted: item.repostedByUser,
            postId: item.postId,
            width: item.posts?.length > 0 ? item.posts[0].width : 0,
            height: item.posts?.length > 0 ? item.posts[0].height : 0,

            // height: calcHeight(item.posts[0]?.width, item.posts[0]?.height),
          })
        }
        ListHeaderComponent={renderStories}
        ListHeaderComponentStyle={{
          paddingTop: 5,
          // paddingBottom: Dimensions.get("window").height * 0.002,
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
