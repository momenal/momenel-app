import {
  View,
  Text,
  ActivityIndicator,
  Alert,
  RefreshControl,
  Button,
  Pressable,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { FlashList } from "@shopify/flash-list";
import Post from "../app/components/Posts/Post";
import { CalcHeight } from "../app/utils/CalcHeight";
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
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showFooter, setShowFooter] = useState(true);
  const [trendingHashtags, setTrendingHashtags] = useState([]);
  const [followingHashtags, setFollowingHashtags] = useState([]);
  const [postsData, setPostsData] = useState([]);
  const [from, setFrom] = useState(0);
  const [to, setTo] = useState(30);

  useEffect(() => {
    fetchPosts();
  }, [from, to, isRefreshing]);

  const fetchPosts = async () => {
    if (!showFooter && from !== 0) {
      return;
    }
    const { data, error } = await supabase.auth.getSession();
    if (error) {
      return navigation.navigate("Login");
    }

    //get posts ids in format ids=1,2,3,4,5
    const ids = postsData
      .slice(-10)
      .map((p) => p.post.id)
      .join(",");
    // post like to api
    let response = await fetch(
      `${baseUrl}/feed/discover/${from === 0 ? null : ids}/${from}/${to}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${data.session.access_token}`,
        },
      }
    );

    if (!response.ok) {
      Alert.alert("Oops", "Something went wrong!");
      return;
    }

    response = await response.json();
    if (from === 0) {
      setPostsData([...response.posts]);
      setTrendingHashtags(response.trendingHashtags);
      setFollowingHashtags(response.followingHashtags);
    } else if (response.posts.length === 0) {
      setShowFooter(false);
    } else {
      setPostsData([...postsData, ...response.posts]);
    }

    setIsLoading(false);
    setIsRefreshing(false);
    if (response.posts.length === 0) {
      setShowFooter(false);
    }
  };

  const fetchMorePosts = () => {
    let newFrom = to;
    let newTo = to + 30;

    setFrom(newFrom);
    setTo(newTo);
  };

  const handleRefresh = () => {
    setFrom(0);
    setTo(10);
    setIsRefreshing(true);
    setShowFooter(true);
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

    const updatedPosts = postsData.map((p) => {
      if (p.post.id === postId) {
        if (p.isReposted) {
          p.post.reposts[0].count -= 1;
        } else {
          p.post.reposts[0].count += 1;
        }
        p.isReposted = !p.isReposted;
      }
      return p;
    });
    setPostsData(updatedPosts);

    // send repost to the backend
    let response = await fetch(`${baseUrl}/repost/${postId}`, {
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

    if (response.status === 201) {
      const updatedPosts = postsData.map((p) => {
        if (p.post.id === postId) {
          p.isReposted = true;
        }
        return p;
      });
      setPostsData(updatedPosts);
    } else if (response.status === 204) {
      const updatedPosts = postsData.map((p) => {
        if (p.post.id === postId) {
          p.isReposted = false;
        }
        return p;
      });
      setPostsData(updatedPosts);
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

  const renderItem = ({ item, index }) => {
    return (
      <Post
        isPublished={true}
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
        createdAt={item.post.created_at}
        posts={item.post.content ? item.post.content : []}
        caption={item.post.caption}
        height={item.post.content.length > 0 ? item.post.content[0].height : 0}
        width={item.post.content.length > 0 ? item.post.content[0].width : 0}
        handleLike={handleLike}
        handleRepost={handleRepost}
        isLiked={item.isLiked}
        isReposted={item.isReposted}
      />
    );
  };

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
  const keyExtractor = (item) => item.post.id;
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
          paddingBottom: scale(-25),
          paddingTop: 4,
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
          <Button title="Refresh" onPress={handleRefresh} />
        </View>
      )}
      {postsData.length > 0 && (
        <FlashList
          data={postsData}
          estimatedItemSize={233}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          ListHeaderComponent={renderHeader}
          ListHeaderComponentStyle={{
            paddingTop: 5,
          }}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={handleRefresh}
              tintColor={"black"}
            />
          }
          ListFooterComponent={renderListFooter}
          showsVerticalScrollIndicator={false}
          onEndReached={fetchMorePosts}
          onEndReachedThreshold={0.1}
        />
      )}
      <StatusBar style="dark" />
    </View>
  );
};

const Tag = ({ tag, navigation }) => {
  return (
    <Pressable
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
    </Pressable>
  );
};

export default Discover;
