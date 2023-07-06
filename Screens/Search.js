import {
  View,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  Keyboard,
} from "react-native";
import { Image } from "expo-image";
import * as Haptics from "expo-haptics";
import { memo, useCallback, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { scale } from "../app/utils/Scale";
import { Ionicons } from "@expo/vector-icons";
import { TextInput } from "react-native-gesture-handler";
import CustomText from "../app/components/customText/CustomText";
import LinearGradientButton from "../app/components/Buttons/LinearGradientButton";
import { FlashList } from "@shopify/flash-list";
import Post from "../app/components/Posts/Post";
import { CalcHeight } from "../app/utils/CalcHeight";
import { baseUrl } from "@env";
import { supabase } from "../app/lib/supabase";
import { LayoutAnimation } from "react-native";
import { Alert } from "react-native";

const Search = ({ navigation, route }) => {
  const { query } = route.params;
  const [text, onChangeText] = useState("");
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [queryResults, setQueryResults] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [showFooter, setShowFooter] = useState(false);
  const [postsData, setPostsData] = useState([]);
  const [from, setFrom] = useState(0);
  const [to, setTo] = useState(10);

  useEffect(() => {
    if (query) {
      onChangeText(query);
      setQueryResults({ title: query });
      setSearch(query);
    }
  }, []);

  useEffect(() => {
    // if search is not empty
    if (search) {
      getPosts();
    }
  }, [search, from, to]);

  const fetchMorePosts = () => {
    let newFrom = from + 10;
    let newTo = to + 10;

    setFrom(newFrom);
    setTo(newTo);
  };
  const getSearchSuggestions = async (query) => {
    if (!query) return setSuggestions([]);

    const { data: session, error } = await supabase.auth.getSession();
    if (error) {
      navigation.navigate("Login");
      return false;
    }

    let response = await fetch(
      `${baseUrl}/search/${
        query[0] === "#" ? `%23${query.substring(1)}` : query
      }`,
      {
        method: "GET",
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${session.session.access_token}`,
        },
      }
    );

    if (!response.ok) {
      Alert.alert("Error", response.error);
      setSuggestions([]);
      return;
    }
    response = await response.json();
    // console.log(response);
    setSuggestions(response);
  };

  const handleSearchChange = (text) => {
    onChangeText(text);
    setQueryResults(null);
    getSearchSuggestions(text);
  };

  const getPosts = async () => {
    if (from === 0) setIsFetching(true);
    setSuggestions([]);

    const { data: session, error } = await supabase.auth.getSession();
    if (error) {
      navigation.navigate("Login");
      return false;
    }
    let response = await fetch(
      `${baseUrl}/search/hashtag/${search}/${from}/${to}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${session.session.access_token}`,
        },
      }
    );
    if (!response.ok) {
      response = await response.json();
      console.log(response);
      Alert.alert("Error", response.error);
      setSuggestions([]);
      setIsFetching(false);
      return;
    }
    response = await response.json();
    setQueryResults({
      title: search,
      id: response.hashtagId,
      isFollowing: response.isFollowing,
    });
    if (from === 0) {
      setPostsData([...response.posts]);
    } else if (response.posts.length === 0) {
      setShowFooter(false);
    } else {
      setPostsData([...postsData, ...response.posts]);
    }
    setRefreshing(false);
    setIsFetching(false);
  };

  const renderSuggestion = ({ item }) => {
    return (
      <Suggestion
        item={item}
        handleSuggestionPress={getPosts}
        navigation={navigation}
        onChangeText={onChangeText}
        setSearch={setSearch}
        setFrom={setFrom}
        setTo={setTo}
        setQueryResults={setQueryResults}
      />
    );
  };

  const renderItem = useCallback(
    ({ item, index, isLiked, isReposted, height, width, createdAt }) => {
      let scaledHeight = CalcHeight(width, height);

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
      {/* {!showFooter && <CustomText>You are all caught up 😀</CustomText>} */}
    </View>,
    [showFooter]
  );

  const handleLike = async (index, isLiked, postId) => {
    const { data, error } = await supabase.auth.getSession();
    if (error) {
      navigation.navigate("Login");
    }

    // handle like confirmation before sending to the backend
    const updatedPosts = postsData.map((post) => {
      if (post.postId === postId) {
        if (post.isLiked) {
          post.likes -= 1;
        } else {
          post.likes += 1;
        }
        post.isLiked = !post.isLiked;
      }
      return post;
    });
    setPostsData(updatedPosts);

    // send like to the backend
    //todo: change url id to postId
    let response = await fetch(`${baseUrl}/like/8`, {
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
        if (post.postId === postId) {
          post.likes = likes;
          post.isLiked = true;
        }
        return post;
      });
      setPostsData(updatedPosts);
    } else if (response.status === 204) {
      const updatedPosts = postsData.map((post) => {
        if (post.postId === postId) {
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
    let response = await fetch(`${baseUrl}/repost/10`, {
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

  const handleHashtagFollow = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setQueryResults({
      ...queryResults,
      isFollowing: !queryResults.isFollowing,
    });
    console.log(queryResults.id);
    // handle follow on backend
    const { data: session, error } = await supabase.auth.getSession();
    if (error) {
      navigation.navigate("Login");
      return false;
    }
    let response = await fetch(`${baseUrl}/hashtag/follow/${queryResults.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${session.session.access_token}`,
      },
    });
    if (!response.ok) {
      Alert.alert("Error", "Something went wrong");
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      return;
    }
    if (response.status === 201) {
      setQueryResults({
        ...queryResults,
        isFollowing: true,
      });
    } else {
      setQueryResults({
        ...queryResults,
        isFollowing: false,
      });
    }
  };

  const renderHeader = () => {
    return (
      <>
        {queryResults && suggestions.length === 0 && !isFetching && (
          <View style={{ marginHorizontal: "5%", marginTop: "2%" }}>
            <CustomText
              numberOfLines={1}
              style={{
                fontFamily: "Nunito_700Bold",
                fontSize: scale(17),
                marginBottom: "2%",
              }}
            >
              #{queryResults.title}
            </CustomText>
            <TouchableOpacity
              onPress={handleHashtagFollow}
              style={
                queryResults.isFollowing
                  ? {
                      backgroundColor: "#ccc",
                      width: "30%",
                      height: scale(30),
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: 5,
                      paddingVertical: 5,
                    }
                  : { width: "20%" }
              }
            >
              {queryResults.isFollowing ? (
                <CustomText
                  numberOfLines={1}
                  style={{
                    fontFamily: "Nunito_700Bold",
                    fontSize: scale(12),
                  }}
                >
                  Following
                </CustomText>
              ) : (
                <LinearGradientButton
                  style={{ borderRadius: 5, height: scale(30) }}
                >
                  <CustomText
                    numberOfLines={1}
                    style={{
                      fontFamily: "Nunito_700Bold",
                      fontSize: scale(12),
                      color: "white",
                    }}
                  >
                    Follow
                  </CustomText>
                </LinearGradientButton>
              )}
            </TouchableOpacity>
          </View>
        )}
      </>
    );
  };

  const handleRefresh = () => {
    setFrom(0);
    setTo(10);
    setRefreshing(true);
    setShowFooter(true);
  };

  return (
    <View style={{ height: "100%", backgroundColor: "white" }}>
      <SafeAreaView
        style={{
          display: "flex",
          backgroundColor: "white",
          width: "100%",
          flexDirection: "row",
          alignItems: "center",
          paddingBottom: scale(-20),
        }}
        keyboardShouldPersistTaps="always"
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
          }}
        >
          <Ionicons name="ios-search" size={scale(16)} color="#999999" />
          <TextInput
            autoFocus={query ? false : true}
            style={{
              backgroundColor: "#F1F1F2",
              fontFamily: "Nunito_600SemiBold",
              fontSize: 14,
              alignItems: "center",
              flex: 1,
              height: "100%",
              marginLeft: "3%",
            }}
            value={text}
            onChangeText={handleSearchChange}
            placeholder="Search for people, posts, tags..."
            placeholderTextColor="#999999"
          />
        </View>
        <TouchableOpacity onPress={() => navigation.pop()}>
          <CustomText
            style={{
              fontFamily: "Nunito_600SemiBold",
              fontSize: 14,
              marginRight: "3%",
            }}
          >
            Cancel
          </CustomText>
        </TouchableOpacity>
      </SafeAreaView>
      {suggestions.length > 0 ? (
        <View
          style={{
            backgroundColor: "white",
            height: "100%",
          }}
        >
          {suggestions.length > 0 && (
            <FlatList
              data={suggestions}
              renderItem={renderSuggestion}
              keyExtractor={(item) => item.id}
              keyboardShouldPersistTaps="always"
            />
          )}
        </View>
      ) : isFetching ? (
        <View style={{ marginTop: "4%" }}>
          <ActivityIndicator color="#0000ff" />
        </View>
      ) : (
        <FlashList
          data={postsData}
          estimatedItemSize={233}
          keyExtractor={(item) => {
            return item.id;
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
              refreshing={refreshing}
              onRefresh={handleRefresh}
              tintColor={"black"}
            />
          }
          ListFooterComponent={renderListFooter}
          maxToRenderPerBatch={5}
          initialNumToRender={5}
          showsVerticalScrollIndicator={false}
          onEndReached={fetchMorePosts}
          onEndReachedThreshold={2}
          keyboardDismissMode="on-drag"
          viewabilityConfig={{
            itemVisiblePercentThreshold: 50,
            minimumViewTime: 500,
          }}
        />
      )}
      {/* posts from hashtag */}
    </View>
  );
};

const Suggestion = ({
  navigation,
  item,
  onChangeText,
  setSearch,
  setTo,
  setFrom,
  setQueryResults,
}) => {
  return (
    <TouchableOpacity
      style={{
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: "#F1F1F2",
      }}
      onPress={() => {
        if (item.username) {
          navigation.navigate("UserProfile", { id: item.username });
        } else {
          setSearch("");
          Keyboard.dismiss();
          onChangeText("#" + item.hashtag);
          setFrom(0);
          setTo(10);
          setSearch(item.hashtag);
          setQueryResults({ title: item.hashtag });
        }
      }}
    >
      {item.username ? (
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          {item.profile_url ? (
            <Image
              source={{ uri: item.profile_url }}
              style={{
                width: scale(30),
                height: scale(30),
                borderRadius: scale(15),
                marginRight: "1%",
              }}
            />
          ) : (
            <Ionicons
              name="person-circle-sharp"
              size={scale(30)}
              color="#999999"
              style={{ marginRight: "1%" }}
            />
          )}

          <CustomText
            style={{
              fontFamily: "Nunito_600SemiBold",
              fontSize: scale(14),
              color: "black",
            }}
          >
            {item.username}
          </CustomText>
        </View>
      ) : (
        <CustomText
          style={{
            fontFamily: "Nunito_600SemiBold",
            fontSize: scale(14),
            color: "black",
          }}
        >
          #{item.hashtag}
        </CustomText>
      )}
    </TouchableOpacity>
  );
};

export default memo(Search);
