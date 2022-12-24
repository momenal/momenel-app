import {
  ActivityIndicator,
  Button,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import CustomText from "../app/components/customText/CustomText";
import StoriesContainer from "../app/components/Stories/StoriesScroll/StoriesContainer";
import { useBoundStore } from "../app/Store/useBoundStore";
import Post from "../app/components/Posts/Post";
import { supabase } from "../app/lib/supabase";
import Lottie from "lottie-react-native";
import * as SplashScreen from "expo-splash-screen";
import Loader from "../app/components/Loader";

// Keep the splash screen visible while we fetch resources
// SplashScreen.preventAutoHideAsync();

const Home = ({ navigation }) => {
  const [isloading, setIsloading] = useState(true);
  const SetUserData = useBoundStore((state) => state.SetUserData);
  const fetchMorePosts = useBoundStore((state) => state.fetchMorePosts);
  const username = useBoundStore((state) => state.username);
  const postsData = useBoundStore((state) => state.posts);
  const [appIsReady, setAppIsReady] = useState(false);
  const animationRef = useRef(null);

  async function login() {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    // console.log(user.id);
    const { data, error } = await supabase
      .from("profiles")
      .select("username")
      .eq("id", user.id);
    // console.log(data);
    setAppIsReady(true);
  }

  useEffect(() => {
    // setTimeout(login, 5000);
    login();
    // fetch("https://random-data-api.com/api/v2/users")
    //   .then((response) => response.json())
    //   .then((json) => {
    //     // console.log(json.uid);
    //     let username = "farhanverse";
    //     let fname = "farhan";
    //     let profile_url =
    //       "https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80";
    //     let preview_url =
    //       "https://images.unsplash.com/photo-1592298285277-64da3dc70efb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80";
    //     SetUserData(
    //       (username = username),
    //       (profile_url = profile_url),
    //       (preview_url = preview_url)
    //     );
    //   });
  }, []);

  // const onViewableItemsChanged = useCallback(({ viewableItems, changed }) => {
  //   console.log(viewableItems);
  // }, []);

  // const viewabilityConfigCallbackPairs = useRef([{ onViewableItemsChanged }]);

  const renderItem = useCallback(
    ({ item, index }) => <Post data={item} index={index} />,
    []
  );

  const keyExtractor = useCallback((item) => item.postId, []);

  if (!appIsReady) {
    return <Loader />;
  }

  // if (!username) {
  //   console.log(username);
  //   return <FillInfo />;
  // }

  return (
    <View
      style={{
        backgroundColor: "white",
        height: "100%",
        marginBottom: 800,
        // backgroundColor: "pink",
      }}
    >
      <FlatList
        data={postsData}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        ListHeaderComponent={() => <StoriesContainer navigation={navigation} />}
        maxToRenderPerBatch={5}
        initialNumToRender={5}
        showsVerticalScrollIndicator={false}
        onEndReached={() => setTimeout(fetchMorePosts, 2000)} //! fake 2 sec delay
        onEndReachedThreshold={2}
        // viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
        // viewabilityConfig={{
        //   waitForInteraction: false,
        //   viewAreaCoveragePercentThreshold: 95,
        // }}
        ItemSeparatorComponent={() => {
          return (
            <View
              style={{
                height: 0,
              }}
            />
          );
        }}
        ListFooterComponent={() => {
          return (
            <View
              style={{
                height: 60,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ActivityIndicator />
            </View>
          );
        }}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
