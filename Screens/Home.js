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
import BottomSheet from "../app/components/BottomFlatSheet/BottomSheet";

const Home = ({ navigation }) => {
  const SetUserData = useBoundStore((state) => state.SetUserData);
  const fetchMorePosts = useBoundStore((state) => state.fetchMorePosts);
  const postsData = useBoundStore((state) => state.posts);
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const [bottomSheetPostIndex, setbottomSheetPostIndex] = useState(0);

  const setShowBottomSheetFunc = (index) => {
    setbottomSheetPostIndex(index);
    setShowBottomSheet(!showBottomSheet);
  };

  useEffect(() => {
    fetch("https://random-data-api.com/api/v2/users")
      .then((response) => response.json())
      .then((json) => {
        // console.log(json.uid);
        let username = "farhanverse";
        let fname = "farhan";
        let profile_url =
          "https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80";
        let preview_url =
          "https://images.unsplash.com/photo-1592298285277-64da3dc70efb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80";
        SetUserData(
          (username = username),
          (profile_url = profile_url),
          (preview_url = preview_url)
        );
      });
  }, []);

  // const onViewableItemsChanged = useCallback(({ viewableItems, changed }) => {
  //   console.log(viewableItems);
  // }, []);

  // const viewabilityConfigCallbackPairs = useRef([{ onViewableItemsChanged }]);

  const renderItem = ({ item, index }) => {
    return (
      <Post
        // key={item.postId}
        data={item}
        index={index}
        setShowBottomSheetFunc={setShowBottomSheetFunc}
      />
    );
  };

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
        renderItem={renderItem}
        keyExtractor={(item) => item.postId}
        ListHeaderComponent={() => <StoriesContainer navigation={navigation} />}
        showsVerticalScrollIndicator={false}
        onEndReached={() => setTimeout(fetchMorePosts, 2000)} //! fake 2 sec delay
        onEndReachedThreshold={2}
        initialNumToRender={5}
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

      <BottomSheet
        show={showBottomSheet}
        onSheetClose={() => setShowBottomSheet(false)}
      >
        <View
          style={{
            flex: 1,
            alignItems: "center",
          }}
        >
          <Text>{postsData[bottomSheetPostIndex].userName}</Text>
        </View>
      </BottomSheet>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
