import {
  ActivityIndicator,
  Alert,
  RefreshControl,
  StatusBar,
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

  const fetchNotificationsIntervalDelay = 120000;
  const fetchNotificationsCallback = useCallback(() => {
    fetchNotifications({ isRefreshing: true });
  }, [fetchNotifications]);

  useEffect(() => {
    const intervalId = setInterval(
      fetchNotificationsCallback,
      fetchNotificationsIntervalDelay
    );

    return () => {
      clearInterval(intervalId);
    };
  }, [fetchNotificationsCallback]);

  // useEffect(() => {
  //   fetchNotifications({ isRefreshing: false });
  // }, []);
  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     fetchNotifications({ isRefreshing: true });
  //   }, 120000); // fetch notifications every 2 minute
  //   return () => clearInterval(intervalId);
  // }, []);

  const fetchPosts = async () => {
    if (!showFooter && from !== 0) {
      return;
    }
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
      setPostsData((prev) => [...prev, ...response]);
    }

    setIsRefreshing(false);
  };

  const fetchMorePosts = () => {
    let newFrom = to;
    let newTo = to + 20;

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
    ({ item, index }) => {
      let tempPost = item.type === "post" ? item : item.post;
      return (
        <Post
          height={tempPost.content.length > 0 ? tempPost.content[0].height : 0}
          width={tempPost.content.length > 0 ? tempPost.content[0].width : 0}
          isPublished={true}
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
          createdAt={item.created_at}
          posts={tempPost.content ? tempPost.content : []}
          caption={tempPost.caption}
          handleLike={handleLike}
          handleRepost={handleRepost}
          isLiked={item.isLiked}
          isReposted={item.isReposted}
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
        estimatedItemSize={100}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        onEndReached={fetchMorePosts}
        onEndReachedThreshold={0.1}
        ListFooterComponent={renderListFooter}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
            tintColor={"black"}
          />
        }
      />
      <StatusBar hidden={false} backgroundColor={"white"} />
    </View>
  );
};

export default Home;
