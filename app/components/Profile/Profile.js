import {
  View,
  ImageBackground,
  Dimensions,
  ActivityIndicator,
  Pressable,
  TouchableOpacity,
  LayoutAnimation,
  RefreshControl,
  Platform,
} from "react-native";
import * as Haptics from "expo-haptics";
import { useMemo, useState, useEffect, memo } from "react";
import { MasonryFlashList } from "@shopify/flash-list";
import { StatusBar } from "expo-status-bar";
import CustomText from "../customText/CustomText";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { scale } from "../../utils/Scale";
import { useRoute } from "@react-navigation/native";
import { supabase } from "../../lib/supabase";
import Repost from "../icons/Repost";
import ProfileHeader from "./ProfileHeader";
import { useBoundStore } from "../../Store/useBoundStore";

const Profile = ({ navigation }) => {
  const { params: RouteParams } = useRoute();
  // console.log(RouteParams);
  const [data, setData] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [isFollowing, setisFollowing] = useState();
  const { top: topInset, bottom: BottomInsets } = useSafeAreaInsets();
  const profile_url = useBoundStore((state) => state.profile_url);
  const username = useBoundStore((state) => state.username);

  const scale12 = useMemo(() => scale(12), []);

  useEffect(() => {
    setisLoading(true);
    //todo: fetch user data with session

    if (RouteParams?.id !== null && RouteParams?.id !== undefined) {
      console.log("fetching user data with id", RouteParams?.id);
      supabase.auth.getSession().then(({ data: { session } }) => {
        //todo: fetch user data with session
        setTimeout(() => {
          setData({
            isBlockedByYou: false, //! if you blocked the other user
            isBlockedByUser: false, //! if the other user blocked you
            id: "some-other-id",
            username: RouteParams?.id,
            name: "someoneelse 👋",
            profile_url:
              "https://images.pexels.com/users/avatars/37865/ni-san-713.jpeg?auto=compress&fit=crop&h=130&w=130&dpr=2",
            cover_url:
              "https://images.pexels.com/photos/135033/pexels-photo-135033.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            bio: `Sometimes I feel like I'm not doing enough, but then I remember that I'm doing the best I can. \n#PrivacyMatters`,
            location: "from Mars 🌌",
            link: "https://www.momenel.com",
            isFollowing: true,
            postsAmount: 100,
            followers: 900000,
            following: 100,
            contactOptions: [
              {
                platform: "sessions",
                contact: "sessionid",
              },
              {
                platform: "telegram",
                contact: "@sessionid",
              },
            ],
            posts: [
              {
                postId: "askjdlkasjdmasdi",
                username: "farhanverse",
                name: "should",
                repost: {
                  isRepost: false,
                },
                profile_url:
                  "https://images.unsplash.com/photo-1681385936857-d7bd675a9057?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
                posts: [
                  {
                    id: Math.random(19).toString(),
                    width: 3333,
                    height: 5000,
                    type: "photo",
                    url: "https://images.pexels.com/photos/13290878/pexels-photo-13290878.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                  },
                  {
                    id: Math.random(19).toString(),
                    width: 6000,
                    height: 4000,
                    type: "photo",
                    url: "https://images.pexels.com/photos/15355977/pexels-photo-15355977.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                  },
                ],
                caption: "#firstpost",
                createdAt: Date.now(),
                likes: 300,
                comments: 12,
                reposts: 5,
                lastEdit: null,
                isLiked: true,
                repostedByUser: true, // if the user himself has reposted the post
                isDonateable: true,
              },
              {
                postId: "askjdlkasjdmasdi",
                username: "farhanverse",
                name: "farhan",
                repost: {
                  isRepost: false,
                },
                profile_url:
                  "https://plus.unsplash.com/premium_photo-1664551734441-6f4726ad0e9f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=776&q=80",
                posts: null,
                caption:
                  "We believe that we can change the things around us in accordance with our desires—we believe it because otherwise we can see no favourable outcome. We do not think of the outcome which generally comes to pass and is also favourable: we do not succeed in changing things in accordance with our desires, but gradually our desires change. The situation that we hoped to change because it was intolerable becomes unimportant to us. We have failed to surmount the obstacle, as we were absolutely determined to do, but life has taken us round it, led us beyond it, and then if we turn round to gaze into the distance of the past, we can barely see it, so imperceptible has it become.” – Marcel Proust, In Search of Lost Time",
                createdAt: Date.now(),
                likes: 300,
                comments: 12,
                reposts: 5,
                lastEdit: null,
                isLiked: false,
                repostedByUser: true, // if the user himself has reposted the post
                isDonateable: true,
              },
              {
                postId: "oadks;fksda;kf;lk",
                username: "farhanverse",
                name: "farhan",
                repost: {
                  isRepost: false,
                },
                profile_url:
                  "https://plus.unsplash.com/premium_photo-1664551734441-6f4726ad0e9f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=776&q=80",
                posts: [
                  {
                    id: Math.random(19).toString(),
                    width: 1080,
                    height: 1920,
                    type: "video",
                    url: "https://assets.mixkit.co/videos/preview/mixkit-palm-frond-lifeguard-station-1194-large.mp4",
                  },
                ],
                caption: "#video",
                createdAt: Date.now(),
                likes: 300,
                comments: 12,
                reposts: 5,
                lastEdit: null,
                isLiked: false,
                repostedByUser: false, // if the user himself has reposted the post
                isDonateable: true,
              },
              {
                postId: "askjdlkasjdmasdi",
                username: "farhanverse",
                name: "farhan",
                repost: {
                  isRepost: false,
                },
                profile_url:
                  "https://plus.unsplash.com/premium_photo-1664551734441-6f4726ad0e9f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=776&q=80",
                posts: [
                  {
                    id: Math.random(19).toString(),
                    width: 4000,
                    height: 5000,
                    type: "photo",
                    url: "https://images.pexels.com/photos/14489260/pexels-photo-14489260.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                  },
                ],
                caption: "#cat",
                createdAt: Date.now(),
                likes: 300,
                comments: 12,
                reposts: 5,
                lastEdit: null,
                isLiked: false,
                repostedByUser: false, // if the user himself has reposted the post
                isDonateable: true,
              },
              {
                postId: "askjdlkasjdmasdi",
                username: "farhanverse",
                name: "farhan",
                repost: {
                  isRepost: false,
                },
                profile_url:
                  "https://plus.unsplash.com/premium_photo-1664551734441-6f4726ad0e9f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=776&q=80",
                posts: null,
                caption:
                  "new video is out on my youtube channel. go check it out. link in bio",
                createdAt: Date.now(),
                likes: 300,
                comments: 12,
                reposts: 5,
                lastEdit: null,
                isLiked: false,
                repostedByUser: true, // if the user himself has reposted the post
                isDonateable: true,
              },
              {
                postId: "askjdlkasjdmaslldi",
                username: "farhanverse",
                name: "farhan",
                repost: {
                  isRepost: false,
                },
                profile_url:
                  "https://plus.unsplash.com/premium_photo-1664551734441-6f4726ad0e9f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=776&q=80",
                posts: [
                  {
                    id: Math.random(19).toString(),
                    width: 3206,
                    height: 4275,
                    type: "photo",
                    url: "https://images.pexels.com/photos/15358911/pexels-photo-15358911.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                  },
                ],
                caption: "#cat",
                createdAt: Date.now(),
                likes: 300,
                comments: 12,
                reposts: 5,
                lastEdit: null,
                isLiked: false,
                repostedByUser: false, // if the user himself has reposted the post
                isDonateable: true,
              },
              {
                postId: "askjdlkasjdmaslldi",
                username: "farhanverse",
                name: "farhan",
                repost: {
                  isRepost: false,
                },
                profile_url:
                  "https://plus.unsplash.com/premium_photo-1664551734441-6f4726ad0e9f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=776&q=80",
                posts: [
                  {
                    id: Math.random(19).toString(),
                    width: 4000,
                    height: 6000,
                    type: "photo",
                    url: "https://images.pexels.com/photos/15355492/pexels-photo-15355492.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                  },
                ],
                caption: "#cat",
                createdAt: Date.now(),
                likes: 300,
                comments: 12,
                reposts: 5,
                lastEdit: null,
                isLiked: false,
                repostedByUser: false, // if the user himself has reposted the post
                isDonateable: true,
              },
              {
                postId: "askjdlkasjdmaslldi",
                username: "farhanverse",
                name: "farhan",
                repost: {
                  isRepost: false,
                },
                profile_url:
                  "https://plus.unsplash.com/premium_photo-1664551734441-6f4726ad0e9f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=776&q=80",
                posts: [
                  {
                    id: Math.random(19).toString(),
                    width: 3706,
                    height: 2470,
                    type: "photo",
                    url: "https://images.pexels.com/photos/2300672/pexels-photo-2300672.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                  },
                ],
                caption: "#cat",
                createdAt: Date.now(),
                likes: 300,
                comments: 12,
                reposts: 5,
                lastEdit: null,
                isLiked: false,
                repostedByUser: false, // if the user himself has reposted the post
                isDonateable: true,
              },
            ],
          });
          setisFollowing(true); //todo: get this from the server
        }, 0);
        setTimeout(() => {
          LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
          setisLoading(false);
        }, 0);
      });
    } else {
      supabase.auth.getSession().then(({ data: { session } }) => {
        //todo: fetch user data with session
        setTimeout(() => {
          setData({
            id: "e1b6073e-ec35-4904-b91a-b6ef7606068f",
            username: username,
            name: "Farhan 👋",
            profile_url: profile_url,
            cover_url:
              "https://images.unsplash.com/photo-1626761191814-a9dc9efd085c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80",
            bio: `Privacy is a fundamental right we can't ignore.\nwww.momenel.com \n#PrivacyMatters #AlwaysBeAware #PrivacyIsNotOptional\nLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
            location: "from Mars 🌌",
            link: "momenel.com",
            // isFollowing: true,
            postsAmount: 100,
            followers: 900000,
            following: 100,
            //
            posts: [
              {
                postId: "pendingID",
                username: "farhanverse",
                name: "farhan",
                posts: null,
                createdAt: Date.now(),
                published: false,
                caption: "This is a pending post",
              },
              {
                postId: "askjdlkasjdmasdi",
                username: "farhanverse",
                name: "farhan here",
                repost: {
                  isRepost: false,
                },
                profile_url:
                  "https://images.unsplash.com/photo-1681385936857-d7bd675a9057?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
                posts: [
                  {
                    id: Math.random(19).toString(),
                    width: 3333,
                    height: 5000,
                    type: "photo",
                    url: "https://images.pexels.com/photos/13290878/pexels-photo-13290878.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                  },
                  {
                    id: Math.random(19).toString(),
                    width: 6000,
                    height: 4000,
                    type: "photo",
                    url: "https://images.pexels.com/photos/15355977/pexels-photo-15355977.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                  },
                ],
                caption: "#cat",
                createdAt: Date.now(),
                likes: 4,
                comments: 12,
                reposts: 5,
                lastEdit: null,
                isLiked: false,
                repostedByUser: true, // if the user himself has reposted the post
                isDonateable: true,
              },
              {
                postId: "askjdlkasjdmasdi",
                username: "farhanverse",
                name: "farhan",
                repost: {
                  isRepost: false,
                },
                profile_url:
                  "https://plus.unsplash.com/premium_photo-1664551734441-6f4726ad0e9f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=776&q=80",
                posts: null,
                caption:
                  "We believe that we can change the things around us in accordance with our desires—we believe it because otherwise we can see no favourable outcome. We do not think of the outcome which generally comes to pass and is also favourable: we do not succeed in changing things in accordance with our desires, but gradually our desires change. The situation that we hoped to change because it was intolerable becomes unimportant to us. We have failed to surmount the obstacle, as we were absolutely determined to do, but life has taken us round it, led us beyond it, and then if we turn round to gaze into the distance of the past, we can barely see it, so imperceptible has it become.” – Marcel Proust, In Search of Lost Time",
                createdAt: Date.now(),
                likes: 300,
                comments: 12,
                reposts: 5,
                lastEdit: null,
                isLiked: false,
                repostedByUser: true, // if the user himself has reposted the post
                isDonateable: true,
              },
              {
                postId: "askjdlkasjdmasdi",
                username: "farhanverse",
                name: "farhan",
                repost: {
                  isRepost: false,
                },
                profile_url:
                  "https://plus.unsplash.com/premium_photo-1664551734441-6f4726ad0e9f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=776&q=80",
                posts: [
                  {
                    id: Math.random(19).toString(),
                    width: 1080,
                    height: 1920,
                    type: "video",
                    url: "https://assets.mixkit.co/videos/preview/mixkit-palm-frond-lifeguard-station-1194-large.mp4",
                  },
                ],
                caption: "#video",
                createdAt: Date.now(),
                likes: 300,
                comments: 12,
                reposts: 5,
                lastEdit: null,
                isLiked: false,
                repostedByUser: false, // if the user himself has reposted the post
                isDonateable: true,
              },
              {
                postId: "askjdlkasjdmasdi",
                username: "farhanverse",
                name: "farhan",
                repost: {
                  isRepost: false,
                },
                profile_url:
                  "https://plus.unsplash.com/premium_photo-1664551734441-6f4726ad0e9f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=776&q=80",
                posts: [
                  {
                    id: Math.random(19).toString(),
                    width: 4000,
                    height: 5000,
                    type: "photo",
                    url: "https://images.pexels.com/photos/14489260/pexels-photo-14489260.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                  },
                ],
                caption: "#cat",
                createdAt: Date.now(),
                likes: 300,
                comments: 12,
                reposts: 5,
                lastEdit: null,
                isLiked: false,
                repostedByUser: false, // if the user himself has reposted the post
                isDonateable: true,
              },
              {
                postId: "askjdlkasjdmasdi",
                username: "farhanverse",
                name: "farhan",
                repost: {
                  isRepost: false,
                },
                profile_url:
                  "https://plus.unsplash.com/premium_photo-1664551734441-6f4726ad0e9f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=776&q=80",
                posts: null,
                caption:
                  "new video is out on my youtube channel. go check it out. link in bio",
                createdAt: Date.now(),
                likes: 300,
                comments: 12,
                reposts: 5,
                lastEdit: null,
                isLiked: false,
                repostedByUser: true, // if the user himself has reposted the post
                isDonateable: true,
              },
              {
                postId: "askjdlkasjdmaslldi",
                username: "farhanverse",
                name: "farhan",
                repost: {
                  isRepost: false,
                },
                profile_url:
                  "https://plus.unsplash.com/premium_photo-1664551734441-6f4726ad0e9f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=776&q=80",
                posts: [
                  {
                    id: Math.random(19).toString(),
                    width: 3206,
                    height: 4275,
                    type: "photo",
                    url: "https://images.pexels.com/photos/15358911/pexels-photo-15358911.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                  },
                ],
                caption: "#cat",
                createdAt: Date.now(),
                likes: 300,
                comments: 12,
                reposts: 5,
                lastEdit: null,
                isLiked: false,
                repostedByUser: false, // if the user himself has reposted the post
                isDonateable: true,
              },
              {
                postId: "askjdlkasjdmaslldi",
                username: "farhanverse",
                name: "farhan",
                repost: {
                  isRepost: false,
                },
                profile_url:
                  "https://plus.unsplash.com/premium_photo-1664551734441-6f4726ad0e9f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=776&q=80",
                posts: [
                  {
                    id: Math.random(19).toString(),
                    width: 4000,
                    height: 6000,
                    type: "photo",
                    url: "https://images.pexels.com/photos/15355492/pexels-photo-15355492.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                  },
                ],
                caption: "#cat",
                createdAt: Date.now(),
                likes: 300,
                comments: 12,
                reposts: 5,
                lastEdit: null,
                isLiked: false,
                repostedByUser: false, // if the user himself has reposted the post
                isDonateable: true,
              },
              {
                postId: "askjdlkasjdmaslldi",
                username: "farhanverse",
                name: "farhan",
                repost: {
                  isRepost: false,
                },
                profile_url:
                  "https://plus.unsplash.com/premium_photo-1664551734441-6f4726ad0e9f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=776&q=80",
                posts: [
                  {
                    id: Math.random(19).toString(),
                    width: 3706,
                    height: 2470,
                    type: "photo",
                    url: "https://images.pexels.com/photos/2300672/pexels-photo-2300672.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                  },
                ],
                caption: "#cat",
                createdAt: Date.now(),
                likes: 300,
                comments: 12,
                reposts: 5,
                lastEdit: null,
                isLiked: false,
                repostedByUser: false, // if the user himself has reposted the post
                isDonateable: true,
              },
            ],
          });
        }, 0);
        setTimeout(() => {
          setisLoading(false);
        }, 0);
      });
    }
  }, []);

  function handleFollow() {
    //todo: send request to follow

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setisFollowing(!isFollowing);
  }

  function handleBlock() {
    setData({
      ...data,
      posts: [],
      isBlockedByYou: true,
    });
  }
  async function handleUnBlock() {
    setData({
      ...data,
      posts: [],
      isBlockedByYou: false,
    });
    setisLoading(true);
    //todo: get the data from the server
    setData({
      isBlockedByYou: false, // if you blocked the other user
      isBlockedByUser: false, // if the other user blocked you
      // id: "e1b6073e-ec35-4904-b91a-b6ef7606068f",
      id: "some-other-id",
      username: "farhanverse",
      name: "Farhan 👋 sadjaskdlkjaskdjlkjsadkjaskjdlkjasjkjdakljsakdjjajkdslajdklsajk",
      profile_url:
        "https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&dpr=2",
      // bio: `Privacy is a fundamental right we can't ignore.\nwww.momenel.com \n#PrivacyMatters #AlwaysBeAware #PrivacyIsNotOptional`,
      bio: `Privacy is a fundamental right we can't ignore.\nwww.momenel.com \n#PrivacyMatters #AlwaysBeAware #PrivacyIsNotOptional\nLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
      location: "from Mars 🌌",
      link: "https://www.momenel.com",
      isFollowing: true,
      postsAmount: 100,
      followers: 900000,
      following: 100,
      contactOptions: [
        {
          platform: "sessions",
          contact: "sessionid",
        },
        {
          platform: "telegram",
          contact: "@sessionid",
        },
      ],
      posts: [
        {
          postId: "askjdlkasjdmasdi",
          username: "farhanverse",
          name: "farhan",
          repost: {
            isRepost: false,
          },
          profile_url:
            "https://plus.unsplash.com/premium_photo-1664551734441-6f4726ad0e9f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=776&q=80",
          posts: [
            {
              id: Math.random(19).toString(),
              width: 3333,
              height: 5000,
              type: "video",
              url: "https://images.pexels.com/photos/13290878/pexels-photo-13290878.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            },
            {
              id: Math.random(19).toString(),
              width: 6000,
              height: 4000,
              type: "photo",
              url: "https://images.pexels.com/photos/15355977/pexels-photo-15355977.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            },
          ],
          caption: "another pso",
          createdAt: Date.now(),
          likes: 300,
          comments: 12,
          reposts: 5,
          lastEdit: null,
          isLiked: false,
          repostedByUser: true, // if the user himself has reposted the post
          isDonateable: true,
        },
        {
          postId: "askjdlkasjdmasdi",
          username: "farhanverse",
          name: "farhan",
          repost: {
            isRepost: false,
          },
          profile_url:
            "https://plus.unsplash.com/premium_photo-1664551734441-6f4726ad0e9f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=776&q=80",
          posts: null,
          caption:
            "We believe that we can change the things around us in accordance with our desires—we believe it because otherwise we can see no favourable outcome. We do not think of the outcome which generally comes to pass and is also favourable: we do not succeed in changing things in accordance with our desires, but gradually our desires change. The situation that we hoped to change because it was intolerable becomes unimportant to us. We have failed to surmount the obstacle, as we were absolutely determined to do, but life has taken us round it, led us beyond it, and then if we turn round to gaze into the distance of the past, we can barely see it, so imperceptible has it become.” – Marcel Proust, In Search of Lost Time",
          createdAt: Date.now(),
          likes: 300,
          comments: 12,
          reposts: 5,
          lastEdit: null,
          isLiked: false,
          repostedByUser: true, // if the user himself has reposted the post
          isDonateable: true,
        },
        {
          postId: "askjdlkasjdmasdi",
          username: "farhanverse",
          name: "farhan",
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
              type: "video",
              url: "https://images.pexels.com/photos/15355977/pexels-photo-15355977.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            },
          ],
          caption: "#cat",
          createdAt: Date.now(),
          likes: 300,
          comments: 12,
          reposts: 5,
          lastEdit: null,
          isLiked: false,
          repostedByUser: false, // if the user himself has reposted the post
          isDonateable: true,
        },
        {
          postId: "askjdlkasjdmasdi",
          username: "farhanverse",
          name: "farhan",
          repost: {
            isRepost: false,
          },
          profile_url:
            "https://plus.unsplash.com/premium_photo-1664551734441-6f4726ad0e9f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=776&q=80",
          posts: [
            {
              id: Math.random(19).toString(),
              width: 4000,
              height: 5000,
              type: "photo",
              url: "https://images.pexels.com/photos/14489260/pexels-photo-14489260.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            },
          ],
          caption: "#cat",
          createdAt: Date.now(),
          likes: 300,
          comments: 12,
          reposts: 5,
          lastEdit: null,
          isLiked: false,
          repostedByUser: false, // if the user himself has reposted the post
          isDonateable: true,
        },
        {
          postId: "askjdlkasjdmasdi",
          username: "farhanverse",
          name: "farhan",
          repost: {
            isRepost: false,
          },
          profile_url:
            "https://plus.unsplash.com/premium_photo-1664551734441-6f4726ad0e9f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=776&q=80",
          posts: null,
          caption:
            "new video is out on my youtube channel. go check it out. link in bio",
          createdAt: Date.now(),
          likes: 300,
          comments: 12,
          reposts: 5,
          lastEdit: null,
          isLiked: false,
          repostedByUser: true, // if the user himself has reposted the post
          isDonateable: true,
        },
        {
          postId: "askjdlkasjdmaslldi",
          username: "farhanverse",
          name: "farhan",
          repost: {
            isRepost: false,
          },
          profile_url:
            "https://plus.unsplash.com/premium_photo-1664551734441-6f4726ad0e9f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=776&q=80",
          posts: [
            {
              id: Math.random(19).toString(),
              width: 3206,
              height: 4275,
              type: "photo",
              url: "https://images.pexels.com/photos/15358911/pexels-photo-15358911.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            },
          ],
          caption: "#cat",
          createdAt: Date.now(),
          likes: 300,
          comments: 12,
          reposts: 5,
          lastEdit: null,
          isLiked: false,
          repostedByUser: false, // if the user himself has reposted the post
          isDonateable: true,
        },
        {
          postId: "askjdlkasjdmaslldi",
          username: "farhanverse",
          name: "farhan",
          repost: {
            isRepost: false,
          },
          profile_url:
            "https://plus.unsplash.com/premium_photo-1664551734441-6f4726ad0e9f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=776&q=80",
          posts: [
            {
              id: Math.random(19).toString(),
              width: 4000,
              height: 6000,
              type: "photo",
              url: "https://images.pexels.com/photos/15355492/pexels-photo-15355492.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            },
          ],
          caption: "#cat",
          createdAt: Date.now(),
          likes: 300,
          comments: 12,
          reposts: 5,
          lastEdit: null,
          isLiked: false,
          repostedByUser: false, // if the user himself has reposted the post
          isDonateable: true,
        },
        {
          postId: "askjdlkasjdmaslldi",
          username: "farhanverse",
          name: "farhan",
          repost: {
            isRepost: false,
          },
          profile_url:
            "https://plus.unsplash.com/premium_photo-1664551734441-6f4726ad0e9f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=776&q=80",
          posts: [
            {
              id: Math.random(19).toString(),
              width: 3706,
              height: 2470,
              type: "photo",
              url: "https://images.pexels.com/photos/2300672/pexels-photo-2300672.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            },
          ],
          caption: "#cat",
          createdAt: Date.now(),
          likes: 300,
          comments: 12,
          reposts: 5,
          lastEdit: null,
          isLiked: false,
          repostedByUser: false, // if the user himself has reposted the post
          isDonateable: true,
        },
      ],
    });

    setisLoading(false);
  }

  const CalcHeight = (width, height) => {
    const ScreenWidth = Dimensions.get("window").width;

    // const Iwidth = ScreenWidth * 0.5;
    const Iwidth = ScreenWidth * 0.5 - ScreenWidth * 0.02;
    let newHeight = height * (Iwidth / width);
    return newHeight;
  };

  const renderItem = ({ item, index, postId, height }) => {
    // -> if not publised

    if (item?.published === false) {
      return (
        <Pressable
          style={{
            padding: "2%",
            width: "100%",
          }}
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            navigation.navigate("PostsList", {
              scrollToIndex: index,
              posts: data.posts,
            });
          }}
        >
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              borderRadius: 6,
              backgroundColor: "#f6b93b",
              borderWidth: 2,
              borderColor: "#e58e26",
            }}
          >
            <CustomText
              numberOfLines={9}
              style={{
                color: "white",
                margin: scale12,
                fontFamily: "Nunito_600SemiBold",
              }}
            >
              Processing this post...
            </CustomText>
          </View>
        </Pressable>
      );
    }
    // -> if text post
    if (!item.posts || item.posts.length === 0 || !item.posts[0]) {
      const bgColors = [
        "#20063b",
        "#1f7a8c",
        "black",
        "#ff495c",
        "#FF4E8B",
        "#048a81",
      ];
      return (
        <Pressable
          style={{
            padding: "2%",
            width: "100%",
          }}
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            navigation.navigate("PostsList", {
              scrollToIndex: index,
              posts: data.posts,
            });
          }}
        >
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              borderRadius: 6,
              backgroundColor:
                bgColors[Math.floor(Math.random() * bgColors.length)],
            }}
          >
            <CustomText
              numberOfLines={9}
              style={{
                color: "white",
                margin: scale12,
                fontFamily: "Nunito_600SemiBold",
              }}
            >
              {item.caption}
            </CustomText>
          </View>
        </Pressable>
      );
    }

    // -> if not text post
    let width = item.posts[0]?.width;
    return (
      <Pressable
        style={{ padding: "2%" }}
        onPress={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
          navigation.navigate("PostsList", {
            scrollToIndex: index,
            posts: data.posts,
          });
        }}
      >
        <ImageBackground
          // todo: get thumbnail from bunny if item.posts[0].type is video
          source={
            item.posts[0]?.type === "video"
              ? {
                  //todo: get thumbnail from bunny
                  uri: "https://images.pexels.com/photos/135033/pexels-photo-135033.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                }
              : { uri: item.posts[0].url }
          }
          style={
            item.posts[0]?.type === "video"
              ? {
                  flexDirection: "row",
                  width: "100%",
                  borderRadius: 4,
                  backgroundColor: "black",
                  height: CalcHeight(7680, 4320),
                }
              : {
                  flexDirection: "row",
                  width: "100%",
                  height: CalcHeight(width, height),
                  borderRadius: 5,
                  backgroundColor: "white",
                }
          }
          // style={{
          //   flexDirection: "row",
          //   width: "100%",
          //   height: CalcHeight(width, height),
          //   borderRadius: 4,
          //   backgroundColor: "black",
          //   //   marginHorizontal: 10,
          // }}
          imageStyle={{ borderRadius: 6 }}
          resizeMode="contain"
        >
          {item.repostedByUser && (
            <View
              style={{
                backgroundColor: "#8456E9",
                height: scale12 + 15,
                position: "absolute",
                left: 0,
                top: 0,
                justifyContent: "center",
                alignItems: "center",
                padding: 5,
                borderBottomRightRadius: 5,
                borderTopLeftRadius: 5,
              }}
            >
              <Repost size={scale12 + 5} color="white" />
            </View>
          )}
          {item.posts.length > 1 ? (
            <View
              style={{
                backgroundColor: "#8456E9",
                height: scale12 + 15,
                position: "absolute",
                right: 0,
                top: 0,
                justifyContent: "center",
                alignItems: "center",
                padding: 5,
                borderBottomLeftRadius: 5,
                borderTopRightRadius: 5,
              }}
            >
              <Ionicons name="md-images" size={scale12 + 5} color="white" />
            </View>
          ) : item.posts[0]?.type === "video" ? (
            <View
              style={{
                backgroundColor: "#8456E9",
                height: scale12 + 15,
                position: "absolute",
                right: 0,
                top: 0,
                justifyContent: "center",
                alignItems: "center",
                padding: 5,

                borderBottomLeftRadius: 5,
                borderTopRightRadius: 5,
              }}
            >
              <Ionicons name="videocam" size={scale12 + 5} color="white" />
            </View>
          ) : null}
        </ImageBackground>
      </Pressable>
    );
  };

  const onRefresh = () => {
    //set isRefreshing to true
    setIsRefreshing(true);
    // callApiMethod()
    // and set isRefreshing to false at the end of your callApiMethod()
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };

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
      ) : data?.isBlockedByYou || data?.isBlockedByUser ? (
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
          {data?.isBlockedByYou ? (
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
                onPress={() => handleUnBlock()}
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
            <View>
              <CustomText
                style={{
                  fontSize: 40,
                  fontFamily: "Nunito_800ExtraBold",
                  textAlign: "center",
                }}
              >
                oops!
              </CustomText>
              <CustomText
                style={{ fontSize: 20, textAlign: "center", marginTop: 15 }}
              >
                You can't view this profile 😞
              </CustomText>
            </View>
          )}
        </View>
      ) : (
        <MasonryFlashList
          ListHeaderComponent={
            <ProfileHeader
              isRefreshing={isRefreshing}
              username={data?.username}
              handleFollow={handleFollow}
              navigation={navigation}
              profile_url={data?.profile_url}
              cover_url={data?.cover_url}
              id={data?.id}
              isFollowing={isFollowing}
              name={data?.name}
              bio={data?.bio}
              location={data?.location}
              link={data?.link}
              postsAmount={data?.postsAmount}
              followers={data?.followers}
              following={data?.following}
              contactOptions={data?.contactOptions}
              handleBlock={handleBlock}
            />
          }
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          disableAutoLayout={true}
          data={data?.posts}
          numColumns={2}
          progressViewOffset={500}
          refreshControl={
            <RefreshControl
              title="Refreshing"
              titleColor={"#000000"}
              tintColor={"#000000"}
              refreshing={isRefreshing}
              onRefresh={onRefresh}
              progressViewOffset={topInset}
            />
          }
          renderItem={({ item, index }) =>
            renderItem({
              item,
              postId: item.postId,
              height: item.posts ? item.posts[0]?.height : 0,
              index: index,
              posts: item.posts,
            })
          }
          estimatedItemSize={400}
        />
      )}

      <StatusBar hidden={true} />
    </View>
  );
};

export default memo(Profile);
