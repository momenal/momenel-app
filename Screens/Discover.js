import { View, Text, Pressable, ActivityIndicator } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { FlashList } from "@shopify/flash-list";
import Post from "../app/components/Posts/Post";
import { CalcHeight } from "../app/utils/CalcHeight";
import { Ionicons } from "@expo/vector-icons";
import { scale } from "../app/utils/Scale";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomText from "../app/components/customText/CustomText";
let fakeData = [
  {
    postId: "99",
    username: "Midjourney",
    name: "Midjourney",
    profile_url:
      "https://images.unsplash.com/profile-1680614713692-1eef21c9fcbcimage?dpr=2&auto=format&fit=crop&w=150&h=150&q=60&crop=faces&bg=fff",
    repost: {
      isRepost: false,
    },
    posts: [
      {
        id: Math.random(19).toString(),
        width: 4000,
        height: 4000,
        type: "photo",
        url: "https://images.unsplash.com/photo-1680615722182-443d96a3280d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80",
      },
    ],
    caption: "Follow @midjourney for more",
    createdAt: Date.now(),
    likes: 88991,
    comments: 9232,
    reposts: 9001,
    lastEdit: null,
    isLiked: false,
    repostedByUser: false,
    isDonateable: true,
  },
  {
    postId: Math.random(19).toString(),
    username: "LuizaJane",
    name: "Luiza Jane",
    type: "text",
    repost: {
      isRepost: true,
      repostedBy: "farhan_haider",
      repostedAt: "2022-11-04T13:54:55+00:00",
    },
    profile_url:
      "https://images.pexels.com/photos/6497118/pexels-photo-6497118.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    caption: `#miniblog
Every week, I spend 20+ hours researching and writing about an amazing founder

In a world of tweets and short emails, I chose to go long-form with Just Go Grind

50,000+ words published so far:

Dharmesh Shah - 6,628
Rachel Romer Carlson  - 4,235
Patrick Collison - 7,487
Christina Cacioppo - 3,593
Tony Xu - 5,965
Iman Abuzeid - 3,460
Ryan Petersen - 3,559
Ooshma Garg - 4,731
Tope Awotona - 4,065
Melanie Perkins - 2,712
Sam Altman - 3,805

And my piece on Sara Blakely comes out tomorrow, free to all subscribers 😊
`,
    likes: 85609,
    comments: 15609,
    reposts: 9091,
    lastEdit: null,
    isLiked: false,
    repostedByUser: true, // if the user himself has reposted the pos
    isDonateable: false,
  },
  {
    postId: 90082882,
    username: "pramodtiwari",
    name: "pramod tiwari",
    repost: {
      isRepost: false,
    },
    profile_url:
      "https://images.unsplash.com/profile-1662762270762-06d6156dc577image?dpr=2&auto=format&fit=crop&w=150&h=150&q=60&crop=faces&bg=fff",
    posts: [
      {
        id: Math.random(19).toString(),
        width: 2414,
        height: 3017,
        type: "photo",
        url: "https://images.unsplash.com/photo-1680955886067-cbc868d1ab85?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1065&q=80",
      },
      {
        id: Math.random(19).toString(),
        width: 2160,
        height: 2700,
        type: "photo",
        url: "https://images.unsplash.com/photo-1638937480132-ebdc0219a4af?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80",
      },
      {
        id: Math.random(19).toString(),
        width: 2462,
        height: 3482,
        type: "photo",
        url: "https://images.unsplash.com/photo-1628204146743-ee4c51566096?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2232&q=80",
      },
      {
        id: Math.random(19).toString(),
        width: 2462,
        height: 3482,
        type: "photo",
        url: "https://images.unsplash.com/photo-1634654422250-9f4526b8453c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=822&q=80",
      },

      {
        id: Math.random(19).toString(),
        width: 2462,
        height: 9000,
        type: "photo",
        url: "https://images.unsplash.com/photo-1634655613075-b1f7446b2ec8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2232&q=80",
      },
      {
        id: Math.random(19).toString(),
        width: 4320,
        height: 3482,
        type: "photo",
        url: "https://images.unsplash.com/photo-1651925757999-4d6d94adbde4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80",
      },
      {
        id: Math.random(19).toString(),
        width: 3000,
        height: 3000,
        type: "photo",
        url: "https://images.unsplash.com/photo-1635046252884-5ad97aab0c97?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80",
      },
      {
        id: Math.random(19).toString(),
        width: 3200,
        height: 2400,
        type: "photo",
        url: "https://images.unsplash.com/photo-1611262588019-db6cc2032da3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80",
      },
      {
        id: Math.random(19).toString(),
        width: 2000,
        height: 3000,
        type: "photo",
        url: "https://images.unsplash.com/photo-1633536838356-80807d2321d4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
      },
      {
        id: Math.random(19).toString(),
        width: 2000,
        height: 3000,
        type: "photo",
        url: "https://images.unsplash.com/photo-1651290984981-56cf9f7e105c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80",
      },
      {
        id: Math.random(19).toString(),
        width: 4000,
        height: 3000,
        type: "photo",
        url: "https://images.unsplash.com/photo-1634335572482-c43700ecbc23?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80",
      },
      {
        id: Math.random(19).toString(),
        width: 2160,
        height: 2700,
        type: "photo",
        url: "https://images.unsplash.com/photo-1644691075420-10e570de79a0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80",
      },
      {
        id: Math.random(19).toString(),
        width: 2000,
        height: 2500,
        type: "photo",
        url: "https://images.unsplash.com/photo-1635322966219-b75ed372eb01?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80",
      },
    ],
    caption: `Darn I am tired, insomnia is killer. \nMy best of #January2021 \n#photography #photographer #photographylovers #photographyislife #photographyeveryday #photographylover`,
    createdAt: Date.now(),
    likes: 7998,
    comments: 12,
    reposts: 5,
    lastEdit: null,
    isLiked: false,
    repostedByUser: true, // if the user himself has reposted the pos
    isDonateable: true,
  },
  {
    postId: "213213",
    username: "Hermetics_",
    name: "Cano",
    repost: {
      isRepost: false,
    },
    profile_url:
      "https://plus.unsplash.com/premium_photo-1664551734441-6f4726ad0e9f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=776&q=80",
    posts: [
      {
        id: Math.random(19).toString(),
        width: 640,
        height: 426,
        type: "photo",
        url: "https://images.unsplash.com/photo-1550565360-6986a92b7169?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
      },
    ],
    caption: `99% of my portfolio is #Bitcoin
No matter what, I'm going to hodl them for at least 10 years, but I will stack and focus only on #Monero from now on. 
      
Why? Because of its pure cypherpunk philosophy. 
      
BTC feels more and more like a dogmatic to the moon coin.`,
    createdAt: Date.now(),
    likes: 300,
    comments: 12,
    reposts: 5,
    lastEdit: null,
    isLiked: false,
    repostedByUser: false, // if the user himself has reposted the pos
    isDonateable: true,
  },
  {
    postId: "0299023",
    username: "photooos",
    name: "photooos",
    repost: {
      isRepost: false,
    },
    profile_url:
      "https://plus.unsplash.com/premium_photo-1664551734441-6f4726ad0e9f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=776&q=80",
    posts: [
      {
        id: Math.random(19).toString(),
        width: 4160,
        height: 6240,
        type: "photo",
        url: "https://images.pexels.com/photos/14246458/pexels-photo-14246458.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      },
      {
        id: Math.random(19).toString(),
        width: 2970,
        height: 2958,
        type: "photo",
        url: "https://images.pexels.com/photos/13986931/pexels-photo-13986931.jpeg",
      },
      {
        id: Math.random(19).toString(),
        height: 700,
        width: 1200,
        type: "video",
        url: "https://assets.mixkit.co/videos/preview/mixkit-going-down-a-curved-highway-through-a-mountain-range-41576-large.mp4",
      },
      {
        id: Math.random(19).toString(),
        height: 1200,
        width: 1200,
        type: "photo",
        url: "https://images.pexels.com/photos/11987710/pexels-photo-11987710.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      },
    ],
    caption:
      "He was an expert but not in a @discipline that anyone could fully appreciate. He knew how to hold the cone just right so that the soft server ice-cream fell into it at the precise angle to form a perfect cone each and every time. It had taken years to perfect and he could now do it without even putting any thought behind it. Nobody seemed to fully understand the beauty of this accomplishment except for the new worker who watched in amazement.",
    createdAt: Date.now(),
    likes: 300,
    comments: 12,
    reposts: 5,
    lastEdit: null,
    isLiked: false,
    repostedByUser: true, // if the user himself has reposted the pos
    isDonateable: true,
  },
  {
    postId: "asdk;lksa;dk;lakd",
    username: "quotes",
    name: "Quotes",

    repost: {
      isRepost: false,
    },
    profile_url:
      "https://plus.unsplash.com/premium_photo-1664551734441-6f4726ad0e9f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=776&q=80",
    posts: [
      {
        id: Math.random(19).toString(),
        height: 700,
        width: 1200,
        type: "video",
        url: "https://assets.mixkit.co/videos/preview/mixkit-going-down-a-curved-highway-through-a-mountain-range-41576-large.mp4",
      },
      {
        id: Math.random(19).toString(),
        height: 1200,
        width: 1200,
        type: "photo",
        url: "https://images.pexels.com/photos/11987710/pexels-photo-11987710.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      },
      // {
      //   id: Math.random(19).toString(),
      //   height: 1200,
      //   width: 1200,
      //   type: "video",
      //   url: "https://assets.mixkit.co/videos/preview/mixkit-female-models-in-a-convertible-car-43192-large.mp4",
      // },
    ],
    caption:
      "He was an expert but not in a discipline that anyone could fully appreciate. He knew how to hold the cone just right so that the soft server ice-cream fell into it at the precise angle to form a perfect cone each and every time. It had taken years to perfect and he could now do it without even putting any thought behind it. Nobody seemed to fully understand the beauty of this accomplishment except for the new worker who watched in amazement.",
    createdAt: Date.now(),
    likes: 300,
    comments: 12,
    reposts: 5,
    lastEdit: null,
    isLiked: false,
    repostedByUser: true, // if the user himself has reposted the pos
    isDonateable: true,
  },

  {
    postId: "jsjjsjsjsjjsjsa",
    username: "thetravellingfamilynonstopaaaaaaahelloevenbuggernamehere",
    name: "Quotes",

    repost: {
      isRepost: false,
    },
    profile_url:
      "https://plus.unsplash.com/premium_photo-1664551734441-6f4726ad0e9f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=776&q=80",
    posts: [
      {
        id: Math.random(19).toString(),
        width: 2048,
        height: 2730,
        type: "photo",
        url: "https://images.pexels.com/photos/13999202/pexels-photo-13999202.jpeg",
      },
    ],
    caption: "isn't this gorgeous\n#travel #photography",
    createdAt: Date.now(),
    likes: 300,
    comments: 12,
    reposts: 5,
    lastEdit: null,
    isLiked: false,
    repostedByUser: true, // if the user himself has reposted the pos
    isDonateable: true,
  },
  {
    postId: "sakdaskjdlk",
    username: "catsofmomenel",
    name: "Cats lol",

    repost: {
      isRepost: false,
    },
    profile_url:
      "https://plus.unsplash.com/premium_photo-1664551734441-6f4726ad0e9f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=776&q=80",
    posts: [
      {
        id: Math.random(19).toString(),
        width: 6000,
        height: 4000,
        type: "photo",
        url: "https://images.pexels.com/photos/1183434/pexels-photo-1183434.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      },
    ],
    caption: "Hilaroius cat 🤣",
    createdAt: Date.now(),
    likes: 300,
    comments: 12,
    reposts: 5,
    lastEdit: null,
    isLiked: false,
    repostedByUser: true, // if the user himself has reposted the pos
    isDonateable: true,
  },
];
const Discover = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [showFooter, setShowFooter] = useState(true);
  const [trendingHashtags, setTrendingHashtags] = useState([
    // "#dezinced",
    // "#leavers",
    // "#carboniferous",
    // "#crudites",
    // "#bicarbs",
    // "#indexed",
    // "#steroidogenesis",
    // "chias",
    // "#ordonnances",
    // "#teapoys",
  ]);
  const [followingHashtags, setFollowingHashtags] = useState([
    // { id: "1", hashtag: "#cars" },
    // { id: "2", hashtag: "#cats" },
    // { id: "3", hashtag: "#memes" },
  ]);
  const [postsData, setPostsData] = useState();

  useEffect(() => {
    //todo: fetch discover data which should include top hashtags, following hashtags and posts
    fetch("https://random-word-api.herokuapp.com/word?number=7").then((res) => {
      res.json().then((data) => {
        let hashtags = data.map((hashtag) => `#${hashtag}`); //todo: remove this
        setTrendingHashtags(hashtags);
        setPostsData(fakeData);
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

  const handleLike = (index, isLiked, postId) => {
    console.log(postId);
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
  };
  const handleRepost = (index, isReposted, postId) => {
    console.log(postId);
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

      fetch("https://api.coinstats.app/public/v1/coins?skip=0&limit=10")
        .then((response) => response.json())
        .then((json) => {
          //todo: set res to postsData
          //todo: setShowFooter to false if empty response
          //todo: if res is not empty then set json to setPostsData
          // setPostsData((prev) => [...prev, ...morePosts]);
          //todo: do the below if the response is empty only
          setShowFooter(false);
        });
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
              <Tag tag={item} navigation={navigation} />
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
              <Tag tag={item} navigation={navigation} />
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
          isLiked={isLiked}
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
          <Ionicons
            name="ios-search"
            size={scale(16)}
            color="#727477"
            onPress={() =>
              navigation.navigate("Search", {
                type: null,
                query: null,
              })
            }
          />
          <Pressable
            onPress={() =>
              navigation.navigate("Search", {
                type: null,
                query: null,
              })
            }
            style={{
              flex: 1,
              justifyContent: "center",
              width: "100%",
              marginLeft: "3%",
            }}
          >
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                width: "100%",
                height: "100%",
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
        ListHeaderComponent={renderHeader}
        ListHeaderComponentStyle={{
          paddingTop: 5,
        }}
        ListFooterComponent={renderListFooter}
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
        // todo: implement viewability below
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
