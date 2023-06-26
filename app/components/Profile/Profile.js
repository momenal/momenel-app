import {
  View,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
  LayoutAnimation,
  RefreshControl,
  Alert,
} from "react-native";
import * as Haptics from "expo-haptics";
import { useState, useEffect, memo, useCallback } from "react";
import { FlashList } from "@shopify/flash-list";
import { StatusBar } from "expo-status-bar";
import CustomText from "../customText/CustomText";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { scale } from "../../utils/Scale";
import { useRoute } from "@react-navigation/native";
import { supabase } from "../../lib/supabase";
import ProfileHeader from "./ProfileHeader";
import { baseUrl } from "@env";
import Post from "../Posts/Post";
import { CalcHeight } from "../../utils/CalcHeight";

const Profile = ({ navigation }) => {
  const { params: RouteParams } = useRoute();
  // console.log(RouteParams);
  const [profile, setProfile] = useState({});
  const [data, setData] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const { top: topInset, bottom: BottomInsets } = useSafeAreaInsets();
  const [from, setFrom] = useState(0);
  const [to, setTo] = useState(10);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showFooter, setShowFooter] = useState(true);

  useEffect(() => {
    setShowFooter(true);
    setisLoading(true);
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [from, to, isRefreshing]);

  const fetchPosts = async () => {
    setShowFooter(true);
    // if passed user id is passed (aka user is viewing another user's profile)

    const { data, error } = await supabase.auth.getSession();
    if (error) {
      return navigation.navigate("Login");
    }

    let url =
      RouteParams?.id !== null && RouteParams?.id !== undefined
        ? `${baseUrl}/user/profile/${RouteParams?.id}/${from}/${to}`
        : `${baseUrl}/user/profile/null/${from}/${to}`;

    let response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${data.session.access_token}`,
      },
    });

    if (!response.ok) {
      console.log(response);
      Alert.alert("Oops", "Something went wrong!");
      return;
    }
    response = await response.json();
    if (from === 0) {
      setProfile(response.profile);
      setData([...response.posts]);
    } else {
      setData((prev) => [...prev, ...response.posts]);
    }

    setShowFooter(false);
    setisLoading(false);
    setIsRefreshing(false);
  };

  const handleRefresh = () => {
    setFrom(0);
    setTo(10);
    setIsRefreshing(true);
  };

  const fetchMorePosts = () => {
    let newFrom = from + 11;
    let newTo = to + 10;

    setFrom(newFrom);
    setTo(newTo);
  };

  async function handleFollow() {
    const { data, error } = await supabase.auth.getSession();
    if (error) {
      navigation.navigate("Login");
      return false;
    }

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    setProfile((prev) => ({
      ...prev,
      isFollowing: prev.isFollowing ? false : true,
    }));

    let response = await fetch(`${baseUrl}/followuser/${profile.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${data.session.access_token}`,
      },
    });

    if (response.status === 201) {
      setProfile((prev) => ({
        ...prev,
        isFollowing: true,
      }));
    } else {
      setProfile((prev) => ({
        ...prev,
        isFollowing: false,
      }));
    }
  }

  async function handleBlock() {
    const { data, error } = await supabase.auth.getSession();
    if (error) {
      return navigation.navigate("Login");
    }
    setisLoading(true);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setProfile((prev) => ({
      ...prev,
      isBlockedByYou: prev.isBlockedByYou ? false : true,
    }));

    // post block to api
    let response = await fetch(`${baseUrl}/blockuser/${profile.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${data.session.access_token}`,
      },
    });

    if (!response.ok) {
      response = await response.json();
      Alert.alert("Oops", response.error);
      setProfile((prev) => ({
        ...prev,
        isBlockedByYou: prev.isBlockedByYou ? false : true,
      }));
      return;
    }

    if (response.status === 201) {
      setProfile((prev) => ({
        ...prev,
        isBlockedByYou: true,
      }));
    } else {
      setProfile((prev) => ({
        ...prev,
        isBlockedByYou: false,
      }));
    }

    setFrom(0);
    setTo(10);
  }

  const handleRepost = async (index, isReposted, postId) => {
    const { data: session, error } = await supabase.auth.getSession();
    if (error) {
      navigation.navigate("Login");
    }

    const updatedPosts = data.map((post) => {
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
    setData(updatedPosts);

    // send like to the backend
    let response = await fetch(`${baseUrl}/repost/${postId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.session.access_token}`,
      },
    });
    // if error
    if (!response.ok) {
      Alert.alert("Error", "Something went wrong");
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      return;
    }
    if (response.status === 201) {
      const updatedPosts = data.map((post) => {
        let id = post.type === "repost" ? post.post.id : post.id;
        if (id === postId) {
          post.isReposted = true;
        }
        return post;
      });
      setData(updatedPosts);
    } else if (response.status === 204) {
      const updatedPosts = data.map((post) => {
        let id = post.type === "repost" ? post.post.id : post.id;
        if (id === postId) {
          post.isReposted = false;
        }
        return post;
      });
      setData(updatedPosts);
    }
  };

  const handleLike = async (index, isLiked, postId) => {
    const { data: session, error } = await supabase.auth.getSession();
    if (error) {
      navigation.navigate("Login");
    }

    // handle like confirmation before sending to the backend
    const updatedPosts = data.map((post) => {
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
    setData(updatedPosts);

    // send like to the backend
    let response = await fetch(`${baseUrl}/like/${postId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.session.access_token}`,
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
      const updatedPosts = data.map((post) => {
        let id = post.type === "repost" ? post.post.id : post.id;
        if (id === postId) {
          post.type === "repost"
            ? (post.post.likes[0].count = likes)
            : (post.likes[0].count = likes);
          post.isLiked = true;
        }
        return post;
      });
      setData(updatedPosts);
    } else if (response.status === 204) {
      const updatedPosts = data.map((post) => {
        let id = post.type === "repost" ? post.post.id : post.id;
        if (id === postId) {
          post.isLiked = false;
        }
        return post;
      });
      setData(updatedPosts);
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
    [data]
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
      {/* {!showFooter && <CustomText>You are all caught up 😀</CustomText>} */}
    </View>,
    [showFooter]
  );

  const keyExtractor = useCallback((item, index) => item.type + item.id, []);

  return (
    <View style={{ height: "100%", backgroundColor: "white" }}>
      {isLoading === true ? (
        <View
          style={{
            height: "100%",
            backgroundColor: "white",
            justifyContent: "center",
          }}
        >
          <ActivityIndicator />
        </View>
      ) : profile?.isBlockedByYou || profile?.isBlockedByUser ? (
        <View
          style={{
            height: "100%",
            backgroundColor: "white",
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          <View
            style={{ flex: 1, flexDirection: "row", marginHorizontal: "3%" }}
          >
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
              style={{
                backgroundColor: "#EAEAEA",
                borderRadius: 40,
                opacity: 0.8,
                padding: 8,
                justifyContent: "center",
                alignItems: "center",
                marginTop: topInset,
                height: scale(30),
                width: scale(30),
              }}
            >
              <Ionicons name="md-chevron-back" size={scale(16)} color="black" />
            </TouchableOpacity>
          </View>
          {profile?.isBlockedByYou ? (
            <View style={{ flex: 2, alignItems: "center" }}>
              <CustomText
                style={{
                  fontSize: 40,
                  fontFamily: "Nunito_800ExtraBold",
                  textAlign: "center",
                  marginHorizontal: "4%",
                }}
              >
                This profile is Blocked
              </CustomText>
              <CustomText
                style={{
                  fontSize: 20,
                  textAlign: "center",
                  marginTop: 15,
                  marginHorizontal: "4%",
                }}
              >
                You can't view this profile before unblocking it
              </CustomText>
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  width: Dimensions.get("window").width * 0.9,
                  backgroundColor: "#EAEAEA",
                  paddingVertical: 15,
                  paddingHorizontal: 18,
                  marginBottom: 15,
                  borderRadius: 12,
                  marginTop: "10%",
                }}
                onPress={() => handleBlock()}
              >
                <Ionicons name="ios-flag" size={20} color="black" />
                <CustomText
                  style={{
                    fontSize: 16,
                    marginLeft: 10,
                  }}
                >
                  Unblock
                </CustomText>
              </TouchableOpacity>
            </View>
          ) : (
            <View
              style={{
                flex: 2,
                alignItems: "center",
                paddingHorizontal: "4%",
              }}
            >
              <CustomText
                style={{
                  fontSize: 40,
                  fontFamily: "Nunito_800ExtraBold",
                  textAlign: "center",
                }}
              >
                Blocked
              </CustomText>
              <CustomText
                style={{ fontSize: 20, textAlign: "center", marginTop: 15 }}
              >
                You can't view this profile because you have been blocked!
              </CustomText>
            </View>
          )}
        </View>
      ) : (
        <FlashList
          data={data}
          estimatedItemSize={450}
          keyExtractor={keyExtractor}
          ListEmptyComponent={() => (
            <View
              style={{
                backgroundColor: "white",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "5%",
              }}
            >
              <CustomText
                style={{
                  fontSize: 20,
                  textAlign: "center",
                  marginHorizontal: "4%",
                }}
              >
                No Posts Yet
              </CustomText>
            </View>
          )}
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
          ListHeaderComponent={
            <ProfileHeader
              isRefreshing={isRefreshing}
              username={profile?.username}
              handleFollow={handleFollow}
              navigation={navigation}
              profile_url={profile?.profile_url}
              id={profile?.id}
              isFollowing={profile?.isFollowing}
              name={profile?.name}
              bio={profile?.bio}
              link={profile?.link}
              likes_count={profile?.likes_count}
              followers={profile?.followers}
              following={profile?.following}
              handleBlock={handleBlock}
            />
          }
          maxToRenderPerBatch={5}
          initialNumToRender={5}
          showsVerticalScrollIndicator={false}
          onEndReached={fetchMorePosts}
          onEndReachedThreshold={2}
          keyboardDismissMode="on-drag"
          ListFooterComponent={renderListFooter}
          viewabilityConfig={{
            itemVisiblePercentThreshold: 50,
            minimumViewTime: 500,
          }}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={handleRefresh}
              tintColor={"black"}
            />
          }
          onViewableItemsChanged={({ viewableItems, changed }) => {
            // loop through viewable items and update the store
            viewableItems.forEach((item) => {
              // console.log("Visible items are", item.index);
            });
          }}
        />
      )}

      <StatusBar hidden={true} />
    </View>
  );
};

export default memo(Profile);
