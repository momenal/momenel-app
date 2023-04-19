import { ActivityIndicator, Dimensions, StyleSheet, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { useBoundStore } from "../app/Store/useBoundStore";
import Post from "../app/components/Posts/Post";
import { supabase } from "../app/lib/supabase";
import { FlashList } from "@shopify/flash-list";
import { CalcHeight } from "../app/utils/CalcHeight";
import CustomText from "../app/components/customText/CustomText";

let fakeData = [
  {
    postId: "lkjaskdjsadjk",
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
    repostedByUser: false,
    isDonateable: true,
  },

  {
    postId: "klannsad",
    username: "3dpediaimagessssssssssssssssssssssssssss",
    name: "3d renered imagessssssssssssssssssssssssssss",
    repost: {
      isRepost: false,
    },
    profile_url:
      "https://plus.unsplash.com/premium_photo-1664551734441-6f4726ad0e9f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=776&q=80",
    posts: [
      {
        id: Math.random(19).toString(),
        width: 4320,
        height: 5400,
        type: "photo",
        url: "https://images.unsplash.com/photo-1667790384695-97a0e8a98a93?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80",
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
    caption:
      "Rewind 2022 ⏪\n#render #3d #3drender #3dmodel #3dmodeling #3dartist #3danimation #3dmodel #3drendering #3dmodel #3d #3drender #3dmodel #3dmodeling #3dartist #3danimation #3dmodel #3drendering #3dmodel #3d #3drender #3dmodel #3dmodeling #3dartist #3danimation #3dmodel #3drendering #3dmodel #3d #3drender #3dmodel #3dmodeling #3dartist #3danimation #3dmodel #3drendering #3dmodel #3d #3drender #3dmodel #3dmodeling #3dartist #3danimation #3dmodel #3drendering #3dmodel #3d #3drender #3dmodel #3dmodeling #3dartist #3danimation #3dmodel #3drendering #3dmodel #3d #3drender #3dmodel #3dmodeling #3dartist #3danimation #3dmodel #3drendering #3dmodel #3d #3drender #3dmodel #3dmodeling #3dartist #3danimation #3dmodel #3drendering #3dmodel #3d #3drender #3dmodel #3dmodeling #3dartist #3danimation #3dmodel #3drendering #3dmodel #3d #3drender #3dmodel #3dmodeling #3dartist #3danimation #3dmodel #3drendering #3dmodel #3d #3drender #3dmodel #3dmodeling #3dartist #3danimation #3dmodel #3drendering #3dmodel #3d #3drender #3dmodel #3dmodeling #3dartist #3danimation #3dmodel #3drendering #3dmodel #3d #3drender #3dmodel #3dmodeling #3dartist #3danimation #3dmodel #3drendering #3dmodel #3d #3drender #3dmodel #3dmodeling #3 end",
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
    postId: "o0saidsad",
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

const Home = ({ navigation }) => {
  const [postsData, setPostsData] = useState([]);
  const [showFooter, setShowFooter] = useState(true);
  const [isInitialRender, setIsInitialRender] = useState(true);
  const fetchNotifications = useBoundStore((state) => state.fetchNotifications);

  useEffect(() => {
    // todo: fetch posts from db || change below url
    fetch("https://api.coinstats.app/public/v1/coins?skip=0&limit=10")
      .then((response) => response.json())
      .then((json) =>
        //set fakeData to postsData
        setTimeout(() => {
          setPostsData(fakeData);
        }, 1000)
      );

    fetchNotifications();
    //todo: implement this --> fetch notifications every 5 minutes
    // const intervalId = setInterval(() => {
    //   fetchNotifications();
    // }, 10000); //todo: set this --> fetch notifications every 5 minutes

    // return () => clearInterval(intervalId);
  }, []);

  // fetch posts from the backend and add them to the postsData
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
    if (showFooter && !isInitialRender) {
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
    setIsInitialRender(false);
  };

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
          posts={item.posts ? item.posts : []}
          caption={item.caption}
          height={scaledHeight}
          handleLike={handleLike}
          handleRepost={handleRepost}
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

  const keyExtractor = useCallback((item) => item.postId, []);

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
        estimatedItemSize={450}
        keyExtractor={keyExtractor}
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
        maxToRenderPerBatch={5}
        initialNumToRender={6}
        showsVerticalScrollIndicator={false}
        onEndReached={() => setTimeout(fetchMorePosts, 2000)} //! fake 2 sec delay
        onEndReachedThreshold={1}
        ListFooterComponent={renderListFooter}
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

export default Home;

const styles = StyleSheet.create({});
