import {
  View,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  Pressable,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React, { createRef, useCallback, useEffect, useState } from "react";
import { FlashList } from "@shopify/flash-list";
import { useBoundStore } from "../app/Store/useBoundStore";
import Post from "../app/components/Posts/Post";
import { CalcHeight } from "../app/utils/CalcHeight";
import { Ionicons } from "@expo/vector-icons";
import { scale } from "../app/utils/Scale";
import GradientText from "../app/components/customText/GradientText";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomText from "../app/components/customText/CustomText";
import { useIsFocused } from "@react-navigation/native";

const Discover = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(true);
  const handleLike = useBoundStore((state) => state.handleLike);

  const [trendingHashtags, setTrendingHashtags] = useState([
    "#dezinced",
    "#leavers",
    "#carboniferous",
    "#crudites",
    "#bicarbs",
    "#indexed",
    "#steroidogenesis",
    "chias",
    "#ordonnances",
    "#teapoys",
  ]);

  const [followingHashtags, setFollowingHashtags] = useState([
    { id: "1", hashtag: "#cars" },
    { id: "2", hashtag: "#cats" },
    { id: "3", hashtag: "#memes" },
  ]);

  useEffect(() => {
    fetch("https://random-word-api.herokuapp.com/word?number=7").then((res) => {
      res.json().then((data) => {
        let hashtags = data.map((hashtag) => `#${hashtag}`); //todo: remove this
        setTrendingHashtags(hashtags);

        //todo: remove this
        fetch("https://random-word-api.herokuapp.com/word?number=20").then(
          (res) => {
            res.json().then((data) => {
              let hashtags = data.map((hashtag) => `#${hashtag}`);
              setFollowingHashtags(hashtags);
              setIsLoading(false);
            });
          }
        );
      });
    });
  }, []);

  const fetchMorePosts = useBoundStore((state) => state.fetchMorePosts);
  //todo: change this to discover posts data
  const postsData = useBoundStore((state) => state.posts);

  const renderHeader = (
    <View style={{}}>
      {/* top hashtags */}
      <View>
        <CustomText
          style={{
            fontFamily: "Nunito_700Bold",
            marginHorizontal: 12,
            marginBottom: "1%",
          }}
        >
          Top Hashtags
        </CustomText>
        <FlashList
          data={trendingHashtags}
          renderItem={({ item }) => <Tag tag={item} navigation={navigation} />}
          horizontal
          estimatedItemSize={50}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingLeft: 12,
          }}
        />
      </View>
      {/* following hashtags */}
      <View style={{ marginVertical: "5%" }}>
        <CustomText
          style={{
            fontFamily: "Nunito_700Bold",
            marginHorizontal: 12,
            marginBottom: "1%",
          }}
        >
          Following Hashtags
        </CustomText>
        <FlashList
          data={followingHashtags}
          renderItem={({ item }) => <Tag tag={item} navigation={navigation} />}
          showsHorizontalScrollIndicator={false}
          horizontal
          estimatedItemSize={50}
          contentContainerStyle={{
            paddingLeft: 12,
          }}
        />
      </View>
      {/* <View style={{ paddingHorizontal: "3%", marginVertical: "3%" }}>
        <CustomText style={{ fontFamily: "Nunito_700Bold" }}>
          #newtomomenel
        </CustomText>
      </View> */}
    </View>
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

  if (isLoading) {
    return (
      <SafeAreaView
        style={{
          backgroundColor: "white",
          height: "100%",
          marginBottom: 800,
          justifyContent: "center",
        }}
      >
        <ActivityIndicator />
      </SafeAreaView>
    );
  }

  return (
    <View
      style={{
        backgroundColor: "white",
        height: "100%",
        marginBottom: 800,
      }}
    >
      <SafeAreaView
        style={{
          display: "flex",
          backgroundColor: "white",
          width: "100%",
          flexDirection: "row",
          alignItems: "center",
          paddingBottom: scale(-20),
        }}
      >
        <View
          style={{
            flexDirection: "row",
            flex: 1,
            backgroundColor: "#F1F1F2",
            marginRight: "2%",
            height: "100%",
            minHeight: scale(32),
            borderRadius: 13,
            fontFamily: "Nunito_600SemiBold",
            fontSize: 14,
            paddingHorizontal: "3%",
            alignItems: "center",
            marginLeft: "3%",
            marginRight: "3%",
          }}
        >
          <Ionicons name="ios-search" size={scale(16)} color="#727477" />
          <Pressable
            onPress={() =>
              navigation.navigate("Search", {
                type: null,
                query: null,
              })
            }
          >
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                marginLeft: "2%",
              }}
            >
              <CustomText
                style={{
                  backgroundColor: "#F1F1F2",
                  fontFamily: "Nunito_600SemiBold",
                  fontSize: 14,
                  color: "#999999",
                }}
              >
                Search for people, posts, tags...
              </CustomText>
            </View>
          </Pressable>
        </View>
      </SafeAreaView>
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
        // todo: change this to a custom component
        ListHeaderComponent={renderHeader}
        ListHeaderComponentStyle={{
          paddingTop: 5,
          // paddingBottom: Dimensions.get("window").height * 0.002,
        }}
        maxToRenderPerBatch={5}
        initialNumToRender={5}
        showsVerticalScrollIndicator={false}
        onEndReached={() => setTimeout(fetchMorePosts, 2000)} //! fake 2 sec delay
        onEndReachedThreshold={2}
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

const Tag = ({ tag, navigation }) => {
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("Search", {
          type: "hashtag",
          query: tag,
        })
      }
      style={{
        height: 40,
        backgroundColor: "#BFBFBF",
        justifyContent: "center",
        marginRight: 10,
        paddingHorizontal: 15,
        borderRadius: 5,
      }}
    >
      <Text style={{ textAlign: "center" }}>{tag}</Text>
    </TouchableOpacity>
  );
};

export default Discover;
