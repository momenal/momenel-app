import {
  View,
  TouchableOpacity,
  FlatList,
  Image,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
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

const fakeRes = {
  id: "1jklasd9",
  type: "hashtag",
  isFollowing: false,
  posts: [
    {
      postId: Math.random(19).toString(),
      username: "gifpedia",
      name: "Gifs official",
      repost: {
        isRepost: false,
      },
      posts: [
        {
          id: Math.random(19).toString(),
          width: 4000,
          height: 2300,
          type: "photo",
          url: "https://media.tenor.com/dqoSY8JhoEAAAAAC/kitten-cat.gif",
        },
      ],
      caption: "#cat",
      createdAt: Date.now(),
      likes: 300,
      comments: 12,
      reposts: 5,
      lastEdit: null,
      isLiked: false,
      repostedByUser: true,
      isDonateable: true,
    },
    {
      postId: "jsajsadkkjl",
      username: "travelpedia",
      name: "TravelPedia inc.",
      repost: {
        isRepost: false,
      },
      posts: [
        {
          id: Math.random(19).toString(),
          width: 2400,
          height: 1600,
          type: "photo",
          url: "https://images.unsplash.com/photo-1512632578888-169bbbc64f33?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        },
      ],
      caption: "#abudhabi",
      createdAt: Date.now(),
      likes: 300,
      comments: 12,
      reposts: 59,
      lastEdit: null,
      isLiked: true,
      repostedByUser: false,
      isDonateable: true,
    },
  ],
};

// types: "hashtag", "mention", "null"
const Search = ({ navigation, route }) => {
  const { type, query } = route.params;
  const [text, onChangeText] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [queryResults, setQueryResults] = useState(null);
  const [postsData, setPostsData] = useState();
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (query) {
      onChangeText(query);
      //todo: search for query and replace it with fakeRes
      setQueryResults({ ...fakeRes, title: query });
      setPostsData(fakeRes.posts);
    }
  }, []);

  const getSearchSuggestions = async (query) => {
    // make API call to backend to get search suggestions based on query
    // const response = await fetch(`https://example.com/api/search?q=${query}`);
    const response = await fetch(
      `https://run.mocky.io/v3/9fad5460-5d7e-4cfb-9c97-cb6fc7a66e78`
    );
    const data = await response.json();
    setSuggestions(data);
  };

  const handleSearchChange = (text) => {
    onChangeText(text);
    setQueryResults(null);
    getSearchSuggestions(text);
  };

  const handleSuggestionPress = (suggestion) => {
    onChangeText(suggestion.title);
    setSuggestions([]);
    // handle press
    // todo: it should be profile instead of mention
    if (suggestion.type === "mention") {
      navigation.navigate("Profile", { id: suggestion.id });
    } else {
      // setQueryResults(suggestion);
      setQueryResults({ ...fakeRes, title: suggestion.title });
      setPostsData(fakeRes.posts);
      //todo: get posts from backend
      // setQueryResults(fakeRes); //! remove this
    }
  };

  const renderSuggestion = ({ item }) => {
    return (
      <Suggestion item={item} handleSuggestionPress={handleSuggestionPress} />
    );
  };

  const renderItem = ({ item, index, isLiked, isReposted, height, width }) => {
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
        posts={item.posts ? item.posts : []}
        caption={item.caption}
        height={scaledHeight}
        handleLike={handleLike}
        handleRepost={handleRepost}
      />
    );
  };
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
    let response = await fetch(`${baseUrl}/posts/like/8`, {
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
    let response = await fetch(`${baseUrl}/posts/repost/10`, {
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

  const renderHeader = () => {
    return (
      <>
        {queryResults && suggestions.length === 0 && (
          <View style={{ marginHorizontal: "5%", marginTop: "2%" }}>
            <CustomText
              numberOfLines={1}
              style={{
                fontFamily: "Nunito_700Bold",
                fontSize: scale(17),
                marginBottom: "2%",
              }}
            >
              {queryResults.title}
            </CustomText>
            <TouchableOpacity
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                setQueryResults({
                  ...queryResults,
                  isFollowing: !queryResults.isFollowing,
                });
              }}
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
  const fetchMoreData = async () => {
    setIsLoadingMore(true);

    try {
      const response = await fetch(
        `https://run.mocky.io/v3/145571f7-42ba-4873-be22-d86124d286b2`
      );

      if (response.status === 200) {
        const newData = await response.json();
        setData([...data, ...newData]);
        pageRef.current += 1;
      } else if (response.status === 204) {
        console.log("no more data");
        // no more data
      } else {
        throw new Error("Server Error");
      }
    } catch (error) {
      console.log(error);
    } finally {
      //todo: remove timeout
      setTimeout(() => {
        setIsLoadingMore(false);
      }, 1000);
      // setIsLoadingMore(false);
    }
  };

  const handleRefresh = useCallback(() => {
    // ! fake
    const fakeResfreshPosts = [
      {
        postId: Math.random(19).toString(),
        username: "rhysjones",
        name: "Rhys Jones",
        repost: {
          isRepost: false,
        },
        posts: [
          {
            id: Math.random(19).toString(),
            width: 5000,
            height: 3285,
            type: "photo",
            url: "https://images.unsplash.com/photo-1474540412665-1cdae210ae6b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1783&q=80",
          },
        ],
        caption: "The best way to travel is by train",
        createdAt: Date.now() + 2000000,
        likes: 234,
        comments: 1223,
        reposts: 50,
        lastEdit: null,
        isLiked: false,
        repostedByUser: true,
        isDonateable: true,
      },
      {
        postId: "pppsakoooa",
        username: "natgeo",
        name: "National Geographic",
        repost: {
          isRepost: false,
        },
        profile_url:
          "https://images.unsplash.com/photo-1636614484105-6b199a1fbdca?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80",
        posts: [
          {
            id: Math.random(19).toString(),
            width: 2400,
            height: 2279,
            type: "photo",
            url: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1222&q=80",
          },
        ],
        caption: "The universe is a big place",
        createdAt: Date.now(),
        likes: 900000,
        comments: 12132,
        reposts: 5922,
        lastEdit: null,
        isLiked: true,
        repostedByUser: false,
        isDonateable: true,
      },
    ];

    setRefreshing(true);
    //todo: search for query and replace it with fakeRes

    setQueryResults({
      ...queryResults,
      title: query,
      posts: fakeResfreshPosts,
    });
    setRefreshing(false);
    //  todo: implement something like this
    // fetchData().then(() => {
    //   setRefreshing(false);
    // });
  }, []);
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
            returnKeyType="search"
            returnKeyLabel="search"
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
      <View>
        {suggestions.length > 0 && (
          <FlatList
            data={suggestions}
            renderItem={renderSuggestion}
            keyExtractor={(item) => item.id}
          />
        )}
      </View>
      {/* posts from hashtag */}
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
          })
        }
        ListHeaderComponent={renderHeader}
        ListHeaderComponentStyle={{
          paddingTop: 5,
        }}
        maxToRenderPerBatch={5}
        initialNumToRender={5}
        showsVerticalScrollIndicator={false}
        keyboardDismissMode="on-drag"
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
        onEndReached={fetchMoreData}
        onEndReachedThreshold={2}
        ListFooterComponent={() =>
          isLoadingMore ? (
            <View style={{ marginBottom: scale(30) }}>
              <ActivityIndicator />
            </View>
          ) : null
        }
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      />
    </View>
  );
};

const Suggestion = ({ item, handleSuggestionPress }) => {
  console.log(item);
  return (
    <TouchableOpacity
      style={{
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: "#F1F1F2",
      }}
      onPress={() => handleSuggestionPress(item)}
    >
      {item.type === "mention" ? (
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Image
            source={{ uri: item.profile_url }}
            style={{
              width: scale(30),
              height: scale(30),
              borderRadius: scale(15),
              marginRight: scale(10),
            }}
          />
          <CustomText
            style={{
              fontFamily: "Nunito_600SemiBold",
              fontSize: scale(14),
              color: "black",
            }}
          >
            {item.title}
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
          {item.title}
        </CustomText>
      )}
    </TouchableOpacity>
  );
};

export default memo(Search);
