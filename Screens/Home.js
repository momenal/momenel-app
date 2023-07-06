import {
  ActivityIndicator,
  Alert,
  RefreshControl,
  StyleSheet,
  View,
} from "react-native";
import { useCallback, useEffect, useState } from "react";
import { useBoundStore } from "../app/Store/useBoundStore";
import Post from "../app/components/Posts/Post";
import { supabase } from "../app/lib/supabase";
import { FlashList } from "@shopify/flash-list";
import { CalcHeight } from "../app/utils/CalcHeight";
import CustomText from "../app/components/customText/CustomText";
import { baseUrl } from "@env";
import * as Haptics from "expo-haptics";

const Home = ({ navigation }) => {
  const [postsData, setPostsData] = useState([]);
  const [showFooter, setShowFooter] = useState(true);
  const fetchNotifications = useBoundStore((state) => state.fetchNotifications);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [from, setFrom] = useState(0);
  const [to, setTo] = useState(10);

  useEffect(() => {
    fetchPosts();
  }, [from, to, isRefreshing]);

  useEffect(() => {
    fetchNotifications({ isRefreshing: false });
    const intervalId = setInterval(() => {
      fetchNotifications({ isRefreshing: true });
    }, 180000); // fetch notifications every 3 minutes
    return () => clearInterval(intervalId);
  }, []);

  const fetchPosts = async () => {
    const { data, error } = await supabase.auth.getSession();
    if (error) {
      return navigation.navigate("Login");
    }

    let response = await fetch(`${baseUrl}/feed/home/${from}/${to}`, {
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

    if (from === 0) {
      setPostsData([...response]);
    } else if (response.length === 0) {
      setShowFooter(false);
    } else {
      setPostsData([...postsData, ...response]);
    }

    setIsRefreshing(false);
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
    const updatedPosts = postsData.map((post) => {
      let id = post.type === "repost" ? post.post.id : post.id;

      if (id === postId) {
        if (post.isLiked) {
          post.type === "repost"
            ? post.post.likes[0].count--
            : post.likes[0].count--;
        } else {
          post.type === "repost"
            ? post.post.likes[0].count++
            : post.likes[0].count++;
        }
        post.isLiked = !post.isLiked;
      }
      return post;
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
      const updatedPosts = postsData.map((post) => {
        let id = post.type === "repost" ? post.post.id : post.id;
        if (id === postId) {
          post.type === "repost"
            ? (post.post.likes[0].count = likes)
            : (post.likes[0].count = likes);
          post.isLiked = true;
        }
        return post;
      });
      setPostsData(updatedPosts);
    } else if (response.status === 204) {
      const updatedPosts = postsData.map((post) => {
        let id = post.type === "repost" ? post.post.id : post.id;
        if (id === postId) {
          post.isLiked = false;
        }
        return post;
      });
      setPostsData(updatedPosts);
    }
  };

  const handleRepost = async (index, isReposted, postId) => {
    const { data, error } = await supabase.auth.getSession();
    if (error) {
      navigation.navigate("Login");
    }

    // handle like confirmation before sending to the backend
    const updatedPosts = postsData.map((post) => {
      let id = post.type === "repost" ? post.post.id : post.id;

      if (id === postId) {
        if (post.isReposted) {
          post.type === "repost"
            ? post.post.reposts[0].count--
            : post.reposts[0].count--;
        } else {
          post.type === "repost"
            ? post.post.reposts[0].count++
            : post.reposts[0].count++;
        }
        post.isReposted = !post.isReposted;
      }
      return post;
    });
    setPostsData(updatedPosts);

    // send like to the backend
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
      const updatedPosts = postsData.map((post) => {
        let id = post.type === "repost" ? post.post.id : post.id;
        if (id === postId) {
          post.isReposted = true;
        }
        return post;
      });
      setPostsData(updatedPosts);
    } else if (response.status === 204) {
      const updatedPosts = postsData.map((post) => {
        let id = post.type === "repost" ? post.post.id : post.id;
        if (id === postId) {
          post.isReposted = false;
        }
        return post;
      });
      setPostsData(updatedPosts);
    }
  };

  const renderItem = useCallback(
    ({
      item,
      index,
      isLiked,
      isReposted,
      height,
      width,
      createdAt,
      postId,
      type,
    }) => {
      let scaledHeight = CalcHeight(width, height);
      let tempPost = type === "post" ? item : item.post;
      return (
        <Post
          navigation={navigation}
          postId={tempPost.id}
          index={index}
          likes={tempPost.likes[0].count}
          comments={tempPost.comments[0].count}
          reposts={tempPost.reposts[0].count}
          repost={item.repostedBy}
          profileUrl={tempPost.user?.profile_url}
          username={tempPost.user?.username}
          name={tempPost.user?.name}
          createdAt={createdAt}
          posts={tempPost.content ? tempPost.content : []}
          caption={tempPost.caption}
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

  const keyExtractor = useCallback((item, index) => item.type + item.id, []);

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
        estimatedItemSize={233}
        keyExtractor={keyExtractor}
        renderItem={({ item, index }) =>
          renderItem({
            item,
            index,
            isLiked: item.isLiked,
            isReposted: item.isReposted,
            postId: item.type === "repost" ? item.post.id : item.id,
            type: item.type,
            width:
              item.type === "repost" && item.post.content?.length > 0
                ? item.post.content[0].width
                : item.type === "post" && item.content?.length > 0
                ? item.content[0].width
                : 0,
            height:
              item.type === "repost" && item.post.content?.length > 0
                ? item.post.content[0].height
                : item.type === "post" && item.content?.length > 0
                ? item.content[0].height
                : 0,
            createdAt: item.created_at,
          })
        }
        showsVerticalScrollIndicator={false}
        onEndReached={fetchMorePosts}
        onEndReachedThreshold={0.5}
        keyboardDismissMode="on-drag"
        ListFooterComponent={renderListFooter}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
            tintColor={"black"}
          />
        }
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
