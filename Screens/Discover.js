import { View, Text, ActivityIndicator, Alert } from "react-native";
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

// let fakeData = [
//   {
//     postId: "99",
//     username: "Midjourney",
//     name: "Midjourney",
//     profile_url:
//       "https://images.unsplash.com/profile-1680614713692-1eef21c9fcbcimage?dpr=2&auto=format&fit=crop&w=150&h=150&q=60&crop=faces&bg=fff",
//     repost: {
//       isRepost: false,
//     },
//     posts: [
//       {
//         id: Math.random(19).toString(),
//         width: 4000,
//         height: 4000,
//         type: "photo",
//         url: "https://images.unsplash.com/photo-1680615722182-443d96a3280d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80",
//       },
//     ],
//     caption: "Follow @midjourney for more",
//     createdAt: Date.now(),
//     likes: 3,
//     comments: 9,
//     reposts: 100,
//     lastEdit: null,
//     isLiked: false,
//     repostedByUser: false,
//     isDonateable: true,
//   },
//   {
//     postId: Math.random(19).toString(),
//     username: "LuizaJane",
//     name: "Luiza Jane",
//     type: "text",
//     repost: {
//       isRepost: true,
//       repostedBy: "farhan_haider",
//       repostedAt: "2022-11-04T13:54:55+00:00",
//     },
//     profile_url:
//       "https://images.pexels.com/photos/6497118/pexels-photo-6497118.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//     caption: `#miniblog
// Every week, I spend 20+ hours researching and writing about an amazing founder

// In a world of tweets and short emails, I chose to go long-form with Just Go Grind

// 50,000+ words published so far:

// Dharmesh Shah - 6,628
// Rachel Romer Carlson  - 4,235
// Patrick Collison - 7,487
// Christina Cacioppo - 3,593
// Tony Xu - 5,965
// Iman Abuzeid - 3,460
// Ryan Petersen - 3,559
// Ooshma Garg - 4,731
// Tope Awotona - 4,065
// Melanie Perkins - 2,712
// Sam Altman - 3,805

// And my piece on Sara Blakely comes out tomorrow, free to all subscribers 😊
// `,
//     likes: 85609,
//     comments: 15609,
//     reposts: 9091,
//     lastEdit: null,
//     isLiked: false,
//     repostedByUser: true, // if the user himself has reposted the pos
//     isDonateable: false,
//   },
//   {
//     postId: 90082882,
//     username: "pramodtiwari",
//     name: "pramod tiwari",
//     repost: {
//       isRepost: false,
//     },
//     profile_url:
//       "https://images.unsplash.com/profile-1662762270762-06d6156dc577image?dpr=2&auto=format&fit=crop&w=150&h=150&q=60&crop=faces&bg=fff",
//     posts: [
//       {
//         id: Math.random(19).toString(),
//         width: 2414,
//         height: 3017,
//         type: "photo",
//         url: "https://images.unsplash.com/photo-1680955886067-cbc868d1ab85?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1065&q=80",
//       },
//       {
//         id: Math.random(19).toString(),
//         width: 2160,
//         height: 2700,
//         type: "photo",
//         url: "https://images.unsplash.com/photo-1638937480132-ebdc0219a4af?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80",
//       },
//       {
//         id: Math.random(19).toString(),
//         width: 2462,
//         height: 3482,
//         type: "photo",
//         url: "https://images.unsplash.com/photo-1628204146743-ee4c51566096?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2232&q=80",
//       },
//       {
//         id: Math.random(19).toString(),
//         width: 2462,
//         height: 3482,
//         type: "photo",
//         url: "https://images.unsplash.com/photo-1634654422250-9f4526b8453c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=822&q=80",
//       },

//       {
//         id: Math.random(19).toString(),
//         width: 2462,
//         height: 9000,
//         type: "photo",
//         url: "https://images.unsplash.com/photo-1634655613075-b1f7446b2ec8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2232&q=80",
//       },
//       {
//         id: Math.random(19).toString(),
//         width: 4320,
//         height: 3482,
//         type: "photo",
//         url: "https://images.unsplash.com/photo-1651925757999-4d6d94adbde4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80",
//       },
//       {
//         id: Math.random(19).toString(),
//         width: 3000,
//         height: 3000,
//         type: "photo",
//         url: "https://images.unsplash.com/photo-1635046252884-5ad97aab0c97?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80",
//       },
//       {
//         id: Math.random(19).toString(),
//         width: 3200,
//         height: 2400,
//         type: "photo",
//         url: "https://images.unsplash.com/photo-1611262588019-db6cc2032da3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80",
//       },
//       {
//         id: Math.random(19).toString(),
//         width: 2000,
//         height: 3000,
//         type: "photo",
//         url: "https://images.unsplash.com/photo-1633536838356-80807d2321d4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
//       },
//       {
//         id: Math.random(19).toString(),
//         width: 2000,
//         height: 3000,
//         type: "photo",
//         url: "https://images.unsplash.com/photo-1651290984981-56cf9f7e105c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80",
//       },
//       {
//         id: Math.random(19).toString(),
//         width: 4000,
//         height: 3000,
//         type: "photo",
//         url: "https://images.unsplash.com/photo-1634335572482-c43700ecbc23?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80",
//       },
//       {
//         id: Math.random(19).toString(),
//         width: 2160,
//         height: 2700,
//         type: "photo",
//         url: "https://images.unsplash.com/photo-1644691075420-10e570de79a0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80",
//       },
//       {
//         id: Math.random(19).toString(),
//         width: 2000,
//         height: 2500,
//         type: "photo",
//         url: "https://images.unsplash.com/photo-1635322966219-b75ed372eb01?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80",
//       },
//     ],
//     caption: `Darn I am tired, insomnia is killer. \nMy best of #January2021 \n#photography #photographer #photographylovers #photographyislife #photographyeveryday #photographylover`,
//     createdAt: Date.now(),
//     likes: 7998,
//     comments: 12,
//     reposts: 5,
//     lastEdit: null,
//     isLiked: false,
//     repostedByUser: true, // if the user himself has reposted the pos
//     isDonateable: true,
//   },
//   {
//     postId: "213213",
//     username: "Hermetics_",
//     name: "Cano",
//     repost: {
//       isRepost: false,
//     },
//     profile_url:
//       "https://plus.unsplash.com/premium_photo-1664551734441-6f4726ad0e9f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=776&q=80",
//     posts: [
//       {
//         id: Math.random(19).toString(),
//         width: 640,
//         height: 426,
//         type: "photo",
//         url: "https://images.unsplash.com/photo-1550565360-6986a92b7169?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
//       },
//     ],
//     caption: `99% of my portfolio is #Bitcoin
// No matter what, I'm going to hodl them for at least 10 years, but I will stack and focus only on #Monero from now on.

// Why? Because of its pure cypherpunk philosophy.

// BTC feels more and more like a dogmatic to the moon coin.`,
//     createdAt: Date.now(),
//     likes: 300,
//     comments: 12,
//     reposts: 5,
//     lastEdit: null,
//     isLiked: false,
//     repostedByUser: false, // if the user himself has reposted the pos
//     isDonateable: true,
//   },
//   {
//     postId: "0299023",
//     username: "photooos",
//     name: "photooos",
//     repost: {
//       isRepost: false,
//     },
//     profile_url:
//       "https://plus.unsplash.com/premium_photo-1664551734441-6f4726ad0e9f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=776&q=80",
//     posts: [
//       {
//         id: Math.random(19).toString(),
//         width: 4160,
//         height: 6240,
//         type: "photo",
//         url: "https://images.pexels.com/photos/14246458/pexels-photo-14246458.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//       },
//       {
//         id: Math.random(19).toString(),
//         width: 2970,
//         height: 2958,
//         type: "photo",
//         url: "https://images.pexels.com/photos/13986931/pexels-photo-13986931.jpeg",
//       },
//       {
//         id: Math.random(19).toString(),
//         height: 700,
//         width: 1200,
//         type: "video",
//         url: "https://assets.mixkit.co/videos/preview/mixkit-going-down-a-curved-highway-through-a-mountain-range-41576-large.mp4",
//       },
//       {
//         id: Math.random(19).toString(),
//         height: 1200,
//         width: 1200,
//         type: "photo",
//         url: "https://images.pexels.com/photos/11987710/pexels-photo-11987710.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//       },
//     ],
//     caption:
//       "He was an expert but not in a @discipline that anyone could fully appreciate. He knew how to hold the cone just right so that the soft server ice-cream fell into it at the precise angle to form a perfect cone each and every time. It had taken years to perfect and he could now do it without even putting any thought behind it. Nobody seemed to fully understand the beauty of this accomplishment except for the new worker who watched in amazement.",
//     createdAt: Date.now(),
//     likes: 300,
//     comments: 12,
//     reposts: 5,
//     lastEdit: null,
//     isLiked: false,
//     repostedByUser: true, // if the user himself has reposted the pos
//     isDonateable: true,
//   },
//   {
//     postId: "asdk;lksa;dk;lakd",
//     username: "quotes",
//     name: "Quotes",

//     repost: {
//       isRepost: false,
//     },
//     profile_url:
//       "https://plus.unsplash.com/premium_photo-1664551734441-6f4726ad0e9f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=776&q=80",
//     posts: [
//       {
//         id: Math.random(19).toString(),
//         height: 700,
//         width: 1200,
//         type: "video",
//         url: "https://assets.mixkit.co/videos/preview/mixkit-going-down-a-curved-highway-through-a-mountain-range-41576-large.mp4",
//       },
//       {
//         id: Math.random(19).toString(),
//         height: 1200,
//         width: 1200,
//         type: "photo",
//         url: "https://images.pexels.com/photos/11987710/pexels-photo-11987710.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//       },
//       // {
//       //   id: Math.random(19).toString(),
//       //   height: 1200,
//       //   width: 1200,
//       //   type: "video",
//       //   url: "https://assets.mixkit.co/videos/preview/mixkit-female-models-in-a-convertible-car-43192-large.mp4",
//       // },
//     ],
//     caption:
//       "He was an expert but not in a discipline that anyone could fully appreciate. He knew how to hold the cone just right so that the soft server ice-cream fell into it at the precise angle to form a perfect cone each and every time. It had taken years to perfect and he could now do it without even putting any thought behind it. Nobody seemed to fully understand the beauty of this accomplishment except for the new worker who watched in amazement.",
//     createdAt: Date.now(),
//     likes: 300,
//     comments: 12,
//     reposts: 5,
//     lastEdit: null,
//     isLiked: false,
//     repostedByUser: true, // if the user himself has reposted the pos
//     isDonateable: true,
//   },

//   {
//     postId: "jsjjsjsjsjjsjsa",
//     username: "thetravellingfamilynonstopaaaaaaahelloevenbuggernamehere",
//     name: "Quotes",

//     repost: {
//       isRepost: false,
//     },
//     profile_url:
//       "https://plus.unsplash.com/premium_photo-1664551734441-6f4726ad0e9f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=776&q=80",
//     posts: [
//       {
//         id: Math.random(19).toString(),
//         width: 2048,
//         height: 2730,
//         type: "photo",
//         url: "https://images.pexels.com/photos/13999202/pexels-photo-13999202.jpeg",
//       },
//     ],
//     caption: "isn't this gorgeous\n#travel #photography",
//     createdAt: Date.now(),
//     likes: 300,
//     comments: 12,
//     reposts: 5,
//     lastEdit: null,
//     isLiked: false,
//     repostedByUser: true, // if the user himself has reposted the pos
//     isDonateable: true,
//   },
//   {
//     postId: "sakdaskjdlk",
//     username: "catsofmomenel",
//     name: "Cats lol",

//     repost: {
//       isRepost: false,
//     },
//     profile_url:
//       "https://plus.unsplash.com/premium_photo-1664551734441-6f4726ad0e9f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=776&q=80",
//     posts: [
//       {
//         id: Math.random(19).toString(),
//         width: 6000,
//         height: 4000,
//         type: "photo",
//         url: "https://images.pexels.com/photos/1183434/pexels-photo-1183434.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//       },
//     ],
//     caption: "Hilaroius cat 🤣",
//     createdAt: Date.now(),
//     likes: 300,
//     comments: 12,
//     reposts: 5,
//     lastEdit: null,
//     isLiked: false,
//     repostedByUser: true, // if the user himself has reposted the pos
//     isDonateable: true,
//   },
// ];

let fakeData = [
  {
    post: {
      id: 109,
      caption: "trying again - unsplash work by don kaveen #unsplash ",
      user_id: "c985593e-5883-4c97-b09a-6be6bd0cdeff",
      created_at: "2023-06-13T18:08:06+00:00",
      user: {
        name: "Chloe Thompson",
        username: "pixelglow",
        profile_url: null,
      },
      likes: [
        {
          count: 0,
        },
      ],
      comments: [
        {
          count: 0,
        },
      ],
      reposts: [
        {
          count: 0,
        },
      ],
      content: [
        {
          id: "e24d9881-7d96-426d-bb69-f647aafb6748",
          type: "image",
          width: 3840,
          height: 2160,
          blurhash: "K8B2=TkS02M|$$5S0$V[~A",
        },
      ],
    },
    isLiked: false,
    isReposted: false,
  },
  {
    post: {
      id: 108,
      caption: "trying again - unsplash work by don kaveen #unsplash ",
      user_id: "0cee4054-e83f-42ae-a079-75b81c0766fb",
      created_at: "2023-06-13T18:07:04.704016+00:00",
      user: {
        name: "Farhan @ momenel ankaka",
        username: "xoxo",
        profile_url:
          "https://media.tenor.com/ycKJas-YT0UAAAAM/im-waiting-aki-and-paw-paw.gif",
      },
      likes: [
        {
          count: 0,
        },
      ],
      comments: [
        {
          count: 0,
        },
      ],
      reposts: [
        {
          count: 0,
        },
      ],
      content: [
        {
          id: "df87afd9-2b2b-46bc-9330-86fc65bc5265",
          type: "image",
          width: 640,
          height: 538,
          blurhash: "K8B2.LkS02M|$$5S0$V[~A",
        },
      ],
    },
    isLiked: false,
    isReposted: false,
  },
  {
    post: {
      id: 107,
      caption: "trying again - unsplash work by don kaveen #unsplash ",
      user_id: "0cee4054-e83f-42ae-a079-75b81c0766fb",
      created_at: "2023-06-13T18:05:20.145128+00:00",
      user: {
        name: "Farhan @ momenel ankaka",
        username: "xoxo",
        profile_url:
          "https://media.tenor.com/ycKJas-YT0UAAAAM/im-waiting-aki-and-paw-paw.gif",
      },
      likes: [
        {
          count: 0,
        },
      ],
      comments: [
        {
          count: 0,
        },
      ],
      reposts: [
        {
          count: 0,
        },
      ],
      content: [
        {
          id: "de42bd9f-54cb-4072-ae2a-56b311facfc0",
          type: "image",
          width: 1080,
          height: 908,
          blurhash: "K8B2=TkS02M|$$5S0$V[~A",
        },
      ],
    },
    isLiked: false,
    isReposted: false,
  },
  {
    post: {
      id: 106,
      caption: "trying again - unsplash work by don kaveen #unsplash ",
      user_id: "0cee4054-e83f-42ae-a079-75b81c0766fb",
      created_at: "2023-06-13T18:03:48.900266+00:00",
      user: {
        name: "Farhan @ momenel ankaka",
        username: "xoxo",
        profile_url:
          "https://media.tenor.com/ycKJas-YT0UAAAAM/im-waiting-aki-and-paw-paw.gif",
      },
      likes: [
        {
          count: 0,
        },
      ],
      comments: [
        {
          count: 0,
        },
      ],
      reposts: [
        {
          count: 0,
        },
      ],
      content: [
        {
          id: "99469162-7a7c-47be-bcf3-70ce4e2c6b62",
          type: "image",
          width: 3840,
          height: 2160,
          blurhash: "K8B2=TkS02M|$$5S0$V[~A",
        },
      ],
    },
    isLiked: false,
    isReposted: false,
  },
  {
    post: {
      id: 105,
      caption: "trying again - unsplash work by don kaveen #unsplash ",
      user_id: "0cee4054-e83f-42ae-a079-75b81c0766fb",
      created_at: "2023-06-13T18:03:18.760484+00:00",
      user: {
        name: "Farhan @ momenel ankaka",
        username: "xoxo",
        profile_url:
          "https://media.tenor.com/ycKJas-YT0UAAAAM/im-waiting-aki-and-paw-paw.gif",
      },
      likes: [
        {
          count: 0,
        },
      ],
      comments: [
        {
          count: 0,
        },
      ],
      reposts: [
        {
          count: 0,
        },
      ],
      content: [
        {
          id: "4e5a9f2f-e9dd-4efc-9109-b6ce94a04916",
          type: "image",
          width: 1080,
          height: 908,
          blurhash: "K8B2=TkS02M|$$5S0$V[~A",
        },
      ],
    },
    isLiked: false,
    isReposted: false,
  },
  {
    post: {
      id: 104,
      caption: "trying again - unsplash work by don kaveen #unsplash ",
      user_id: "0cee4054-e83f-42ae-a079-75b81c0766fb",
      created_at: "2023-06-13T18:02:47.781133+00:00",
      user: {
        name: "Farhan @ momenel ankaka",
        username: "xoxo",
        profile_url:
          "https://media.tenor.com/ycKJas-YT0UAAAAM/im-waiting-aki-and-paw-paw.gif",
      },
      likes: [
        {
          count: 0,
        },
      ],
      comments: [
        {
          count: 0,
        },
      ],
      reposts: [
        {
          count: 0,
        },
      ],
      content: [
        {
          id: "b341f0f1-0f58-412e-b154-cfcf22f261c7",
          type: "image",
          width: 1080,
          height: 908,
          blurhash: "K8B2=TkS02M|$$5S0$V[~A",
        },
      ],
    },
    isLiked: false,
    isReposted: false,
  },
  {
    post: {
      id: 103,
      caption: "trying again - unsplash work by don kaveen #unsplash ",
      user_id: "0cee4054-e83f-42ae-a079-75b81c0766fb",
      created_at: "2023-06-13T17:53:44.31524+00:00",
      user: {
        name: "Farhan @ momenel ankaka",
        username: "xoxo",
        profile_url:
          "https://media.tenor.com/ycKJas-YT0UAAAAM/im-waiting-aki-and-paw-paw.gif",
      },
      likes: [
        {
          count: 0,
        },
      ],
      comments: [
        {
          count: 0,
        },
      ],
      reposts: [
        {
          count: 0,
        },
      ],
      content: [
        {
          id: "a699f796-bfb6-41d3-8319-e99f0a5ce562",
          type: "image",
          width: 640,
          height: 538,
          blurhash: "K8B2=TkS02M|$$5S0$V[~A",
        },
      ],
    },
    isLiked: false,
    isReposted: false,
  },
  {
    post: {
      id: 102,
      caption: "trying again - unsplash work by don kaveen #unsplash ",
      user_id: "0cee4054-e83f-42ae-a079-75b81c0766fb",
      created_at: "2023-06-13T17:52:41.418522+00:00",
      user: {
        name: "Farhan @ momenel ankaka",
        username: "xoxo",
        profile_url:
          "https://media.tenor.com/ycKJas-YT0UAAAAM/im-waiting-aki-and-paw-paw.gif",
      },
      likes: [
        {
          count: 0,
        },
      ],
      comments: [
        {
          count: 0,
        },
      ],
      reposts: [
        {
          count: 0,
        },
      ],
      content: [
        {
          id: "690d4cb5-ae92-4f1a-af65-6632c53b06f7",
          type: "image",
          width: 640,
          height: 538,
          blurhash: "K8B2=TkS02M|$$5S0$V[~A",
        },
      ],
    },
    isLiked: false,
    isReposted: false,
  },
  {
    post: {
      id: 101,
      caption: "trying again - unsplash work by don kaveen #unsplash ",
      user_id: "0cee4054-e83f-42ae-a079-75b81c0766fb",
      created_at: "2023-06-13T17:51:52.514545+00:00",
      user: {
        name: "Farhan @ momenel ankaka",
        username: "xoxo",
        profile_url:
          "https://media.tenor.com/ycKJas-YT0UAAAAM/im-waiting-aki-and-paw-paw.gif",
      },
      likes: [
        {
          count: 0,
        },
      ],
      comments: [
        {
          count: 0,
        },
      ],
      reposts: [
        {
          count: 0,
        },
      ],
      content: [
        {
          id: "4a37af62-6140-4bae-a2dd-0dcd77abd24d",
          type: "image",
          width: 640,
          height: 538,
          blurhash: "K8B2=TkS02M|$$5S0$V[~A",
        },
      ],
    },
    isLiked: false,
    isReposted: false,
  },
  {
    post: {
      id: 100,
      caption: "trying again - unsplash work by don kaveen #unsplash ",
      user_id: "0cee4054-e83f-42ae-a079-75b81c0766fb",
      created_at: "2023-06-13T17:44:52.019158+00:00",
      user: {
        name: "Farhan @ momenel ankaka",
        username: "xoxo",
        profile_url:
          "https://media.tenor.com/ycKJas-YT0UAAAAM/im-waiting-aki-and-paw-paw.gif",
      },
      likes: [
        {
          count: 1,
        },
      ],
      comments: [
        {
          count: 0,
        },
      ],
      reposts: [
        {
          count: 0,
        },
      ],
      content: [
        {
          id: "7fe49bfe-9354-4926-8aa8-fe0e2d66d9c6",
          type: "image",
          width: 3840,
          height: 2160,
          blurhash: "K8B2=TkS02M|$$5S0$V[~A",
        },
      ],
    },
    isLiked: true,
    isReposted: false,
  },
  {
    post: {
      id: 99,
      caption: "trying again - unsplash work by don kaveen #unsplash ",
      user_id: "0cee4054-e83f-42ae-a079-75b81c0766fb",
      created_at: "2023-06-13T17:42:59.51886+00:00",
      user: {
        name: "Farhan @ momenel ankaka",
        username: "xoxo",
        profile_url:
          "https://media.tenor.com/ycKJas-YT0UAAAAM/im-waiting-aki-and-paw-paw.gif",
      },
      likes: [
        {
          count: 0,
        },
      ],
      comments: [
        {
          count: 0,
        },
      ],
      reposts: [
        {
          count: 1,
        },
      ],
      content: [
        {
          id: "2878b5b0-8c42-4599-b414-47191972d245",
          type: "image",
          width: 640,
          height: 538,
          blurhash: "K8B2=TkS02M|$$5S0$V[~A",
        },
      ],
    },
    isLiked: false,
    isReposted: true,
  },
  {
    post: {
      id: 98,
      caption: "trying again - unsplash work by don kaveen #unsplash ",
      user_id: "0cee4054-e83f-42ae-a079-75b81c0766fb",
      created_at: "2023-06-13T17:38:26.86424+00:00",
      user: {
        name: "Farhan @ momenel ankaka",
        username: "xoxo",
        profile_url:
          "https://media.tenor.com/ycKJas-YT0UAAAAM/im-waiting-aki-and-paw-paw.gif",
      },
      likes: [
        {
          count: 0,
        },
      ],
      comments: [
        {
          count: 0,
        },
      ],
      reposts: [
        {
          count: 0,
        },
      ],
      content: [
        {
          id: "1fe0998f-e573-4731-9df9-58da598c7ee1",
          type: "image",
          width: 1284,
          height: 2265,
          blurhash: "K%A2S=j?f7TOj?j@Mzj[fP",
        },
      ],
    },
    isLiked: false,
    isReposted: false,
  },
  {
    post: {
      id: 97,
      caption: "trying again - unsplash work by don kaveen #unsplash ",
      user_id: "0cee4054-e83f-42ae-a079-75b81c0766fb",
      created_at: "2023-06-13T17:37:27.582496+00:00",
      user: {
        name: "Farhan @ momenel ankaka",
        username: "xoxo",
        profile_url:
          "https://media.tenor.com/ycKJas-YT0UAAAAM/im-waiting-aki-and-paw-paw.gif",
      },
      likes: [
        {
          count: 0,
        },
      ],
      comments: [
        {
          count: 0,
        },
      ],
      reposts: [
        {
          count: 0,
        },
      ],
      content: [
        {
          id: "5b4b2763-797e-4cf6-9e61-b337662fb0da",
          type: "image",
          width: 1920,
          height: 3387,
          blurhash: "K%A2S=j?f7TOj?j@Mzj[fP",
        },
      ],
    },
    isLiked: false,
    isReposted: false,
  },
  {
    post: {
      id: 93,
      caption: "trying again - unsplash work by don kaveen #unsplash ",
      user_id: "0cee4054-e83f-42ae-a079-75b81c0766fb",
      created_at: "2023-06-13T17:28:46.224713+00:00",
      user: {
        name: "Farhan @ momenel ankaka",
        username: "xoxo",
        profile_url:
          "https://media.tenor.com/ycKJas-YT0UAAAAM/im-waiting-aki-and-paw-paw.gif",
      },
      likes: [
        {
          count: 0,
        },
      ],
      comments: [
        {
          count: 0,
        },
      ],
      reposts: [
        {
          count: 0,
        },
      ],
      content: [
        {
          id: "0815c04b-5455-4b6a-8ae5-4e3cb35ceef5",
          type: "image",
          width: 1920,
          height: 3387,
          blurhash: "K%A2S=j?f7TOj?j@Mzj[fP",
        },
      ],
    },
    isLiked: false,
    isReposted: false,
  },
  {
    post: {
      id: 92,
      caption: "trying again - unsplash work by don kaveen #unsplash ",
      user_id: "0cee4054-e83f-42ae-a079-75b81c0766fb",
      created_at: "2023-06-13T17:27:01.499681+00:00",
      user: {
        name: "Farhan @ momenel ankaka",
        username: "xoxo",
        profile_url:
          "https://media.tenor.com/ycKJas-YT0UAAAAM/im-waiting-aki-and-paw-paw.gif",
      },
      likes: [
        {
          count: 0,
        },
      ],
      comments: [
        {
          count: 0,
        },
      ],
      reposts: [
        {
          count: 0,
        },
      ],
      content: [
        {
          id: "a77936aa-ab4c-445b-b949-42cedc751d3d",
          type: "image",
          width: 1920,
          height: 3387,
          blurhash: "K%A2S=j?f7TOj?j@Mzj[fP",
        },
      ],
    },
    isLiked: false,
    isReposted: false,
  },
  {
    post: {
      id: 91,
      caption: "trying again - unsplash work by don kaveen #unsplash ",
      user_id: "0cee4054-e83f-42ae-a079-75b81c0766fb",
      created_at: "2023-06-13T17:22:39.953387+00:00",
      user: {
        name: "Farhan @ momenel ankaka",
        username: "xoxo",
        profile_url:
          "https://media.tenor.com/ycKJas-YT0UAAAAM/im-waiting-aki-and-paw-paw.gif",
      },
      likes: [
        {
          count: 1,
        },
      ],
      comments: [
        {
          count: 0,
        },
      ],
      reposts: [
        {
          count: 0,
        },
      ],
      content: [
        {
          id: "302bc67b-f054-4e8f-83dc-4b91c474f1cc",
          type: "image",
          width: 1284,
          height: 2265,
          blurhash: "K%A2S=j?f7TOj?j@Mzj[fP",
        },
      ],
    },
    isLiked: true,
    isReposted: false,
  },
  {
    post: {
      id: 90,
      caption: "trying again - unsplash work by don kaveen #unsplash ",
      user_id: "0cee4054-e83f-42ae-a079-75b81c0766fb",
      created_at: "2023-06-13T17:21:03.646637+00:00",
      user: {
        name: "Farhan @ momenel ankaka",
        username: "xoxo",
        profile_url:
          "https://media.tenor.com/ycKJas-YT0UAAAAM/im-waiting-aki-and-paw-paw.gif",
      },
      likes: [
        {
          count: 0,
        },
      ],
      comments: [
        {
          count: 0,
        },
      ],
      reposts: [
        {
          count: 0,
        },
      ],
      content: [
        {
          id: "626ecd4d-d297-4633-9a66-b6f0dd8615c9",
          type: "image",
          width: 1284,
          height: 2265,
          blurhash: "K%A2S=j?f7TOj?j@Mzj[fP",
        },
      ],
    },
    isLiked: false,
    isReposted: false,
  },
  {
    post: {
      id: 89,
      caption: "trying again - unsplash work by don kaveen #unsplash ",
      user_id: "0cee4054-e83f-42ae-a079-75b81c0766fb",
      created_at: "2023-06-13T17:15:08.266663+00:00",
      user: {
        name: "Farhan @ momenel ankaka",
        username: "xoxo",
        profile_url:
          "https://media.tenor.com/ycKJas-YT0UAAAAM/im-waiting-aki-and-paw-paw.gif",
      },
      likes: [
        {
          count: 0,
        },
      ],
      comments: [
        {
          count: 0,
        },
      ],
      reposts: [
        {
          count: 0,
        },
      ],
      content: [
        {
          id: "1efc395d-4d38-4510-ad6e-30dd9719d072",
          type: "image",
          width: 1284,
          height: 2265,
          blurhash: "K%A2S=j?f7TOj?j@Mzj[fP",
        },
      ],
    },
    isLiked: false,
    isReposted: false,
  },
  {
    post: {
      id: 69,
      caption: "good morning! #morning",
      user_id: "0cee4054-e83f-42ae-a079-75b81c0766fb",
      created_at: "2023-06-11T18:25:30.216884+00:00",
      user: {
        name: "Farhan @ momenel ankaka",
        username: "xoxo",
        profile_url:
          "https://media.tenor.com/ycKJas-YT0UAAAAM/im-waiting-aki-and-paw-paw.gif",
      },
      likes: [
        {
          count: 0,
        },
      ],
      comments: [
        {
          count: 0,
        },
      ],
      reposts: [
        {
          count: 0,
        },
      ],
      content: [],
    },
    isLiked: false,
    isReposted: false,
  },
  {
    post: {
      id: 62,
      caption: "Hiking photos coming soon 🔜 \n\n#hikingadventures ",
      user_id: "0cee4054-e83f-42ae-a079-75b81c0766fb",
      created_at: "2023-05-25T15:09:11.302459+00:00",
      user: {
        name: "Farhan @ momenel ankaka",
        username: "xoxo",
        profile_url:
          "https://media.tenor.com/ycKJas-YT0UAAAAM/im-waiting-aki-and-paw-paw.gif",
      },
      likes: [
        {
          count: 1,
        },
      ],
      comments: [
        {
          count: 0,
        },
      ],
      reposts: [
        {
          count: 0,
        },
      ],
      content: [
        {
          id: "9b381d8a-51c1-4563-b7ad-61ad606dcb64",
          type: "video",
          width: 1080,
          height: 1920,
          blurhash: null,
        },
      ],
    },
    isLiked: false,
    isReposted: false,
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
    //todo: change url id to postId
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

      // fetch("https://api.coinstats.app/public/v1/coins?skip=0&limit=10")
      //   .then((response) => response.json())
      //   .then((json) => {
      //     //todo: set res to postsData
      //     //todo: setShowFooter to false if empty response
      //     //todo: if res is not empty then set json to setPostsData
      //     // setPostsData((prev) => [...prev, ...morePosts]);
      //     //todo: do the below if the response is empty only
      //     setShowFooter(false);
      //   });
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
          postId={item.post.id}
          index={index}
          likes={item.post.likes[0].count}
          comments={item.post.comments[0].count}
          reposts={item.post.reposts[0].count}
          repost={false} // discover page does not have reposted posts
          profileUrl={item.post.user.profile_url}
          username={item.post.user.username}
          name={item.post.user.name}
          createdAt={item.post.created_at}
          posts={item.posts ? item.posts : []}
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
      <FlashList
        data={postsData}
        estimatedItemSize={450}
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
        // onEndReached={() => setTimeout(fetchMorePosts, 2000)} //! fake 2 sec delay
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
      <Text style={{ textAlign: "center" }}>{tag}</Text>
    </TouchableOpacity>
  );
};

export default Discover;
