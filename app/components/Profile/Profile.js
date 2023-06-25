import {
  View,
  ImageBackground,
  Dimensions,
  ActivityIndicator,
  Pressable,
  TouchableOpacity,
  LayoutAnimation,
  RefreshControl,
  Alert,
} from "react-native";
import * as Haptics from "expo-haptics";
import { useMemo, useState, useEffect, memo, useCallback } from "react";
import { FlashList, MasonryFlashList } from "@shopify/flash-list";
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
import { baseUrl } from "@env";
import Post from "../Posts/Post";
import { CalcHeight } from "../../utils/CalcHeight";

const Profile = ({ navigation }) => {
  const { params: RouteParams } = useRoute();
  // console.log(RouteParams);
  const [profile, setProfile] = useState({});
  const [data, setData] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [isFollowing, setisFollowing] = useState();
  const { top: topInset, bottom: BottomInsets } = useSafeAreaInsets();
  const scale12 = useMemo(() => scale(12), []);
  const [from, setFrom] = useState(0);
  const [to, setTo] = useState(10);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showFooter, setShowFooter] = useState(true);
  const [type, setType] = useState("posts"); // posts or reposts

  useEffect(() => {
    setShowFooter(true);
    setisLoading(true);
  }, []);

  useEffect(() => {
    if (type === "posts") {
      fetchPosts();
    } else {
      //todo: fetchReposts();
    }
  }, [from, to, isRefreshing, type]);

  const fetchPosts = async () => {
    setShowFooter(true);
    // if passed user id is passed (aka user is viewing another user's profile)
    if (RouteParams?.id !== null && RouteParams?.id !== undefined) {
    } else {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        return navigation.navigate("Login");
      }

      let response = await fetch(`${baseUrl}/user/profile/${from}/${to}`, {
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
        setProfile(response.profile);
        setData([...response.posts]);
      } else {
        setData((prev) => [...prev, ...response.posts]);
      }
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
    let newFrom = from + 10;
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
    setisFollowing(!isFollowing);

    //todo: add user id to the URL
    let response = await fetch(
      `${baseUrl}/followuser/b64ebff6-f29d-46f0-a0df-8cf6885a34f9`,
      {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${data.session.access_token}`,
        },
      }
    );

    if (response.status === 201) {
      setisFollowing(true);
    } else {
      setisFollowing(false);
    }
  }

  async function handleBlock() {
    const { data, error } = await supabase.auth.getSession();
    if (error) {
      return navigation.navigate("Login");
    }

    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setData({
      ...data,
      isBlockedByYou: true,
    });

    // post like to api
    //todo: replace with id below
    let response = await fetch(
      `${baseUrl}/blockuser/${"b64ebff6-f29d-46f0-a0df-8cf6885a34f9"}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${data.session.access_token}`,
        },
      }
    );

    if (!response.ok) {
      Alert.alert("Oops", "Something went wrong!");
      return;
    }

    //todo: handle this after correct profile is fetched
    if (response.status === 201) {
      setData({
        ...data,
        posts: [],
        isBlockedByYou: true,
      });
    } else {
      setData({
        ...data,
        isBlockedByYou: false,
      });
    }
  }
  async function handleUnBlock() {
    setisLoading(true);
    // setData({
    //   ...data,
    //   posts: [],
    //   isBlockedByYou: false,
    // });
    const { data, error } = await supabase.auth.getSession();
    if (error) {
      return navigation.navigate("Login");
    }

    setData({
      ...data,
      isBlockedByYou: false,
    });

    // post like to api
    //todo: replace with id below
    let response = await fetch(
      `${baseUrl}/blockuser/${"b64ebff6-f29d-46f0-a0df-8cf6885a34f9"}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${data.session.access_token}`,
        },
      }
    );

    if (!response.ok) {
      Alert.alert("Oops", "Something went wrong!");
      return;
    }

    //todo: handle this after correct profile is fetched
    if (response.status === 201) {
      setData({
        ...data,
        posts: [],
        isBlockedByYou: true,
      });
    } else {
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

        link: "https://www.momenel.com",
        isFollowing: true,
        postsAmount: 100,
        followers: 900000,
        likes_count: 100,
        following: 90298,
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
    }

    setisLoading(false);
  }

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
      let tempPost = item;
      return (
        <Post
          navigation={navigation}
          postId={[tempPost.id]}
          index={index}
          likes={tempPost.likes[0].count}
          comments={tempPost.comments[0].count}
          reposts={tempPost.reposts[0].count}
          repost={item.repostedBy}
          profileUrl={tempPost.user?.profile_url}
          username={tempPost.user?.username}
          name={tempPost.user?.name}
          createdAt={createdAt}
          posts={tempPost.content}
          caption={tempPost.caption}
          height={scaledHeight}
          // handleLike={handleLike}
          // handleRepost={handleRepost}
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
      {!showFooter && <CustomText>You are all caught up 😀</CustomText>}
    </View>,
    [showFooter]
  );

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
          estimatedItemSize={500}
          keyExtractor={(item) => {
            return item.id;
          }}
          renderItem={({ item, index }) =>
            renderItem({
              item,
              index,
              isLiked: item.isLiked,
              isReposted: item.isReposted,
              postId: item.id,
              width: item.content?.length > 0 ? item.content[0].width : 0,
              height: item.content?.length > 0 ? item.content[0].height : 0,
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
              isFollowing={isFollowing}
              name={profile?.name}
              bio={profile?.bio}
              link={profile?.link}
              likes_count={profile?.likes_count}
              followers={profile?.followers}
              following={profile?.following}
              handleBlock={handleBlock}
              type={type}
              setType={setType}
            />
          }
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
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
          // todo: implement viewability below
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
