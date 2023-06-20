import { ActivityIndicator, Alert, StyleSheet, View } from "react-native";
import { useCallback, useEffect, useState } from "react";
import { useBoundStore } from "../app/Store/useBoundStore";
import Post from "../app/components/Posts/Post";
import { supabase } from "../app/lib/supabase";
import { FlashList } from "@shopify/flash-list";
import { CalcHeight } from "../app/utils/CalcHeight";
import CustomText from "../app/components/customText/CustomText";
import { baseUrl } from "@env";
import * as Haptics from "expo-haptics";

let fakeData = [
  // {
  //   postId: "sonnasdsa",
  //   username: "tseries",
  //   name: "T-Series Official",
  //   profile_url:
  //     "https://pixelz.cc/wp-content/uploads/2018/11/t-series-logo-uhd-4k-wallpaper.jpg",
  //   repost: {
  //     isRepost: false,
  //   },
  //   posts: [
  //     {
  //       id: Math.random(19).toString(),
  //       width: 1280,
  //       height: 720,
  //       type: "video",
  //       url: "https://vz-a01f66e8-ba0.b-cdn.net/a61112ad-c71e-41fb-a39b-5c301d2baf2f/playlist.m3u8",
  //       // url: "https://vz-a01f66e8-ba0.b-cdn.net/60205f8f-8102-494c-a960-23bd5cfc2712/playlist.m3u8",
  //     },
  //   ],
  //   caption: "Kahaani Suno @ankit",
  //   createdAt: Date.now(),
  //   likes: 3,
  //   comments: 0,
  //   reposts: 1,
  //   lastEdit: null,
  //   isLiked: false,
  //   repostedByUser: false,
  // },
  {
    postId: "002020881212",
    username: "office_designs",
    // profile_url:
    //   "https://pixelz.cc/wp-content/uploads/2018/11/t-series-logo-uhd-4k-wallpaper.jpg",
    repost: {
      isRepost: false,
    },
    posts: [
      {
        id: Math.random(19).toString(),
        width: 1280,
        height: 720,
        type: "photo",
        url: "https://momenel.b-cdn.net/posts/c98b28b9-7a2d-4768-af10-4469b31c76e2.jpeg",
        // url: "https://vz-a01f66e8-ba0.b-cdn.net/60205f8f-8102-494c-a960-23bd5cfc2712/playlist.m3u8",
      },
    ],
    caption: "New office opening soon",
    createdAt: Date.now(),
    likes: 3,
    comments: 0,
    reposts: 1,
    lastEdit: null,
    isLiked: false,
    repostedByUser: false,
  },
  {
    postId: "00202ssss120881212",
    username: "sammy",
    profile_url:
      "https://www.adobe.com/content/dam/cc/us/en/creativecloud/design/discover/mascot-logo-design/mascot-logo-design_fb-img_1200x800.jpg",
    repost: {
      isRepost: false,
    },
    posts: [
      {
        id: Math.random(19).toString(),
        width: 381,
        height: 498,
        type: "photo",
        url: "https://momenel.b-cdn.net/posts/88fc2b37-e4c5-42ee-857e-bf6f36817220.gif",
        // url: "https://vz-a01f66e8-ba0.b-cdn.net/60205f8f-8102-494c-a960-23bd5cfc2712/playlist.m3u8",
      },
    ],
    caption: "New office opening soon",
    createdAt: Date.now(),
    likes: 3,
    comments: 0,
    reposts: 1,
    lastEdit: null,
    isLiked: false,
    repostedByUser: false,
  },
  {
    postId: "uaslllasooas",
    username: "dailyquotes",
    name: "A daily quote",
    repost: {
      isRepost: false,
    },
    posts: [
      {
        id: Math.random(19).toString(),
        width: 2400,
        height: 1527,
        type: "photo",
        url: "https://images.unsplash.com/photo-1592496431160-00dee11029cf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1512&q=80",
      },
    ],
    caption: "Say this to yourself every morning",
    createdAt: Date.now(),
    likes: 3,
    comments: 0,
    reposts: 1,
    lastEdit: null,
    isLiked: false,
    repostedByUser: false,
  },
  {
    postId: "lkjaskdjsadjk",
    username: "gifpediabutofficialandofficialbutnotofficial",
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
    createdAt: Date.now() + 200000,
    likes: 398,
    comments: 123,
    reposts: 10,
    isLiked: false,
    repostedByUser: false,
  },
  {
    postId: "kkalmmiiso7799912",
    username: "Quotes229",
    name: "Quotes Daily",
    repost: {
      isRepost: false,
    },
    caption: "#quote Do not give up",
    createdAt: "2023-05-02 20:19:25.056789+00",
    likes: 9928828,
    comments: 12,
    reposts: 2,
    lastEdit: null,
    isLiked: false,
    repostedByUser: false,
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
    caption: `Lyrics to my new song 👇\nIn the darkest of nights, when hope is far away,\nI'll sing a song of solace, to brighten up your day.\nWhen tears are streaming down, and you're lost in despair,\nI'll be the gentle whisper, reminding you I'm there.\n\nYou're not alone, my friend, I'll stand by your side,\nThrough every storm that rages, I'll be your guide.\nWhen your heart is breaking, and you can't find your way,\nKnow that love will heal you, and bring a brand new day.\n\nWhen shadows cast their doubts, and fears begin to rise,\nI'll be your ray of sunshine, painting rainbows in the skies.\nWhen life feels like a burden, too heavy to bear,\nI'll carry you on my shoulders, with a love beyond compare.\n\nYou're not alone, my friend, I'll stand by your side,\nThrough every storm that rages, I'll be your guide.\nWhen your heart is breaking, and you can't find your way,\nKnow that love will heal you, and bring a brand new day.\n\nIn this symphony of life, we'll weave our dreams so high,\nTogether we'll find strength, beneath the starry sky.\nThough the road may be rugged, and the journey may be long,\nOur spirits will be lifted, by the power of our song.\n\nYou're not alone, my friend, I'll stand by your side,\nThrough every storm that rages, I'll be your guide.\nWhen your heart is breaking, and you can't find your way,\nKnow that love will heal you, and bring a brand new day.\n\nSo let the melody embrace you, and wipe away your tears,\nFor we'll face the world together, conquering all fears.\nIn this beautiful symphony, our souls will intertwine,\nForever and always, in harmony divine.`,
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
    username: "ChrisEvans",
    name: "Chris Evans",
    repost: {
      isRepost: false,
    },
    profile_url:
      "https://images.pexels.com/photos/2269872/pexels-photo-2269872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
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
        setPostsData(fakeData)
      );

    fetchNotifications();
    //fetch notifications every 5 minutes
    //todo: uncomment
    // const intervalId = setInterval(() => {
    //   fetchNotifications();
    // }, 300000); // fetch notifications every 5 minutes

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
      console.log(response.statusText);
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
