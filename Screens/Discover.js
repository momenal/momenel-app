import {
  View,
  Text,
  ActivityIndicator,
  Alert,
  RefreshControl,
  Button,
} from "react-native";
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
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showFooter, setShowFooter] = useState(true);
  const [trendingHashtags, setTrendingHashtags] = useState([]);
  const [followingHashtags, setFollowingHashtags] = useState([]);
  const [postsData, setPostsData] = useState([]);
  const [from, setFrom] = useState(0);
  const [to, setTo] = useState(10);

  useEffect(() => {
    fetchPosts();
  }, [from, to, isRefreshing]);

  const fetchPosts = async () => {
    console.log("fetching posts");
    if (!showFooter && from !== 0) {
      console.log("no more posts");
      return;
    }
    const { data, error } = await supabase.auth.getSession();
    if (error) {
      return navigation.navigate("Login");
    }

    //get posts ids in format ids=1,2,3,4,5
    let ids = postsData.map((p) => p.post.id).join(",");
    // only keep last 10 ids
    ids = ids.split(",").slice(-10).join(",");
    //to string
    ids = ids.toString();
    console.log(ids);
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
    setTrendingHashtags(response.trendingHashtags);
    setFollowingHashtags(response.followingHashtags);

    console.log(to, from);
    console.log(response.posts.length);
    if (from === 0) {
      setPostsData([...response.posts]);
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
    let newFrom = from + 11;
    let newTo = to + 10;

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
        console.log(p.post.id);
        console.log(p.post.reposts[0].count);
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

  const renderItem = useCallback(
    ({ item, index, isLiked, isReposted, height, width, createdAt }) => {
      let scaledHeight = CalcHeight(width, height);

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
          <Button title="Refresh" onPress={handleRefresh} />
        </View>
      )}
      {postsData.length > 0 && (
        <FlashList
          data={postsData}
          estimatedItemSize={233}
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
          onEndReachedThreshold={0.5}
          keyboardDismissMode="on-drag"
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
