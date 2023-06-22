import { View, Text, ActivityIndicator, Alert } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { FlashList } from "@shopify/flash-list";
import Post from "../app/components/Posts/Post";
import { CalcHeight } from "../app/utils/CalcHeight";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomText from "../app/components/customText/CustomText";
import { StatusBar } from "expo-status-bar";
import { baseUrl } from "@env";
import * as Haptics from "expo-haptics";
import { supabase } from "../app/lib/supabase";
import SearchBar from "../app/components/SearchBar";
import { scale } from "../app/utils/Scale";

const Discover = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [showFooter, setShowFooter] = useState(true);
  const [trendingHashtags, setTrendingHashtags] = useState([]);
  const [followingHashtags, setFollowingHashtags] = useState([]);
  const [postsData, setPostsData] = useState();
  const [from, setFrom] = useState(0);
  const [to, setTo] = useState(10);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const { data, error } = await supabase.auth.getSession();
    if (error) {
      return navigation.navigate("Login");
    }

    // post like to api
    let response = await fetch(`${baseUrl}/feed/discover/${from}/${to}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${data.session.access_token}`,
      },
    });

    if (!response.ok) {
      Alert.alert("Oops", "Something went wrong!");
      return;
    }

    response = await response.json();
    console.log(response.followingHashtags);
    setTrendingHashtags(response.trendingHashtags);
    setPostsData(response.posts);
    setFollowingHashtags(response.followingHashtags);
    setIsLoading(false);
    if (response.posts.length < 5) {
      setShowFooter(false);
    }
  };

  const handleLike = async (index, isLiked, postId) => {
    const { data, error } = await supabase.auth.getSession();
    if (error) {
      navigation.navigate("Login");
    }
    // handle like confirmation before sending to the backend
    const updatedPosts = postsData.map((p) => {
      if (p.post.id === postId) {
        if (p.isLiked) {
          p.post.likes[0].count -= 1;
        } else {
          p.post.likes[0].count += 1;
        }
        p.isLiked = !p.isLiked;
      }
      return p;
    });

    setPostsData(updatedPosts);

    // send like to the backend
    //todo: change url id to postId
    let response = await fetch(`${baseUrl}/like/${postId}`, {
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
      const updatedPosts = postsData.map((p) => {
        if (p.post.postId === postId) {
          p.post.likes = likes;
          p.isLiked = true;
        }
        return p;
      });
      setPostsData(updatedPosts);
    } else if (response.status === 204) {
      const updatedPosts = postsData.map((p) => {
        if (p.post.postId === postId) {
          p.isLiked = false;
        }
        return p;
      });
      setPostsData(updatedPosts);
    }
  };

  const handleRepost = async (index, isReposted, postId) => {
    const { data, error } = await supabase.auth.getSession();
    if (error) {
      navigation.navigate("Login");
    }

    // handle repost confirmation before sending to the backend
    const updatedPosts = postsData.map((post) => {
      if (post.postId === postId) {
        if (post.repostedByUser) {
          post.reposts -= 1;
        } else {
          post.reposts += 1;
        }
        post.repostedByUser = !post.repostedByUser;
      }
      return post;
    });
    setPostsData(updatedPosts);

    // send repost to the backend
    let response = await fetch(`${baseUrl}/repost/8`, {
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
      const updatedPosts = postsData.map((post) => {
        if (post.postId === postId) {
          post.repostedByUser = true;
        }
        return post;
      });
      setPostsData(updatedPosts);
    } else if (response.status === 204) {
      const updatedPosts = postsData.map((post) => {
        if (post.postId === postId) {
          post.repostedByUser = false;
        }
        return post;
      });
      setPostsData(updatedPosts);
    }
  };

  const fetchMorePosts = () => {
    let morePosts = [
      {
        postId: Math.random(19).toString(),
        username: "moreData",
        name: "Data",
        type: "text",
        repost: {
          isRepost: true,
          repostedBy: "Mohammad",
          repostedAt: "2022-11-04T13:54:55+00:00",
        },
        // posts: [],
        profile_url:
          "https://images.unsplash.com/photo-1677103216895-59fb1b6a4fcd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=770&q=80",
        caption:
          "In a world where technology is advancing rapidly, our personal data is more vulnerable than ever before. From social media platforms to online shopping sites, we are constantly sharing our personal information without a second thought. While the convenience of these services is undeniable, it's essential to consider the consequences of exposing our data.",
        createdAt: Date.now(),
        likes: 90090,
        comments: 2231,
        reposts: 92,
        lastEdit: null,
        isLiked: false,
        repostedByUser: true, // if the user himself has reposted the pos
        isDonateable: false,
      },
    ];
    if (showFooter) {
      console.log("fetching more posts");

      // fetch("https://api.coinstats.app/public/v1/coins?skip=0&limit=10")
      //   .then((response) => response.json())
      //   .then((json) => {
      //     //todo: set res to postsData
      //     //todo: setShowFooter to false if empty response
      //     //todo: if res is not empty then set json to setPostsData
      //     // setPostsData((prev) => [...prev, ...morePosts]);
      //     //todo: do the below if the response is empty only
      //     setShowFooter(false);
      //   });
    }
  };

  const renderHeader = (
    <View style={{}}>
      {/* top hashtags */}
      {trendingHashtags.length > 0 && (
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
            renderItem={({ item }) => (
              <Tag tag={item.hashtag.hashtag} navigation={navigation} />
            )}
            horizontal
            estimatedItemSize={50}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingLeft: 12,
            }}
          />
        </View>
      )}
      {/* following hashtags */}
      {followingHashtags.length > 0 && (
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
            renderItem={({ item }) => (
              <Tag tag={item.hashtag.hashtag} navigation={navigation} />
            )}
            showsHorizontalScrollIndicator={false}
            horizontal
            estimatedItemSize={50}
            contentContainerStyle={{
              paddingLeft: 12,
            }}
          />
        </View>
      )}
    </View>
  );

  const renderItem = useCallback(
    ({ item, index, isLiked, isReposted, height, width, createdAt }) => {
      let scaledHeight = CalcHeight(width, height);
      console.log(createdAt);
      return (
        <Post
          navigation={navigation}
          postId={item.post.id}
          index={index}
          likes={item.post.likes[0].count}
          comments={item.post.comments[0].count}
          reposts={item.post.reposts[0].count}
          repost={false} // discover page does not have reposted posts
          profileUrl={item.post.user?.profile_url}
          username={item.post.user?.username}
          name={item.post.user?.name}
          createdAt={createdAt}
          posts={item.post.content ? item.post.content : []}
          caption={item.post.caption}
          height={scaledHeight}
          handleLike={handleLike}
          handleRepost={handleRepost}
          isLiked={isLiked}
          isReposted={isReposted}
        />
      );
    },
    [postsData]
  );

  const renderListFooter = useCallback(
    <View
      style={[
        {
          height: 60,
          alignItems: "center",
          justifyContent: "center",
        },
        !showFooter && { marginTop: -15 },
      ]}
    >
      {showFooter && <ActivityIndicator color="#0000ff" />}
      {!showFooter && <CustomText>You are all caught up 😀</CustomText>}
    </View>,
    [showFooter]
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
        <SearchBar navigation={navigation} />
      </SafeAreaView>
      {postsData.length === 0 && (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            paddingTop: "5%",
          }}
        >
          <CustomText
            style={{
              fontFamily: "Nunito_700Bold",
              fontSize: 20,
              textAlign: "center",
            }}
          >
            No posts to show
          </CustomText>
        </View>
      )}
      {postsData.length > 0 && (
        <FlashList
          data={postsData}
          estimatedItemSize={450}
          keyExtractor={(item) => {
            return item.post.id;
          }}
          renderItem={({ item, index }) =>
            renderItem({
              item,
              index,
              isLiked: item.isLiked,
              isReposted: item.isReposted,
              postId: item.post.id,
              width:
                item.post.content?.length > 0 ? item.post.content[0].width : 0,
              height:
                item.post.content?.length > 0 ? item.post.content[0].height : 0,
              createdAt: item.post.created_at,
            })
          }
          ListHeaderComponent={renderHeader}
          ListHeaderComponentStyle={{
            paddingTop: 5,
          }}
          ListFooterComponent={renderListFooter}
          maxToRenderPerBatch={5}
          initialNumToRender={5}
          showsVerticalScrollIndicator={false}
          // onEndReached={() => setTimeout(fetchMorePosts, 2000)} //! fake 2 sec delay
          onEndReachedThreshold={2}
          keyboardDismissMode="on-drag"
          // ListFooterComponent={renderListFooter}
          viewabilityConfig={{
            itemVisiblePercentThreshold: 50,
            minimumViewTime: 500,
          }}
          // todo: implement viewability below
          onViewableItemsChanged={({ viewableItems, changed }) => {
            // loop through viewable items and update the store
            viewableItems.forEach((item) => {
              // console.log("Visible items are", item.index);
            });
          }}
        />
      )}
      <StatusBar style="dark" />
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
      <Text style={{ textAlign: "center" }}>#{tag}</Text>
    </TouchableOpacity>
  );
};

export default Discover;
