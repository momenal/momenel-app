import {
  View,
  Text,
  ImageBackground,
  Dimensions,
  ActivityIndicator,
  Pressable,
} from "react-native";
import * as WebBrowser from "expo-web-browser";
import { MasonryFlashList } from "@shopify/flash-list";
import { useBoundStore } from "../../Store/useBoundStore";
import { memo, useEffect, useMemo, useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import CustomText from "../customText/CustomText";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { scale } from "../../utils/Scale";
import LinearGradientButton from "../Buttons/LinearGradientButton";
import AmntTag from "./AmntTag";
import { useRoute } from "@react-navigation/native";
import { supabase } from "../../lib/supabase";
import Repost from "../icons/Repost";
import StructuredText from "../Posts/StructuredText";
import DetachedBottomSheetWithScroll from "../BottomFlatSheet/DetachedBottomSheetWithScroll";

const Profile = ({ navigation }) => {
  const route = useRoute();
  //   console.log(route.name);
  const [showBottomMoreSheet, setShowBottomMoreSheet] = useState(false);
  const userId = useBoundStore((state) => state.userId);
  const [data, setData] = useState(null);
  const username = useBoundStore((state) => state.username);
  const [isLoading, setisLoading] = useState(false);
  const { top: topInset } = useSafeAreaInsets();

  const scale12 = useMemo(() => scale(12), []);

  useEffect(() => {
    setisLoading(true);
    supabase.auth.getSession().then(({ data: { session } }) => {
      //todo: fetch user data with session
      setTimeout(() => {
        setData({
          // id: "e1b6073e-ec35-4904-b91a-b6ef7606068f",
          id: "some-other-id",
          username: "farhanverse",
          name: "Farhan 👋 sadjaskdlkjaskdjlkjsadkjaskjdlkjasjkjdakljsakdjjajkdslajdklsajk",
          profile_url:
            "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
          bio: `Privacy is a fundamental right we can't ignore.\nwww.momenel.com \n#PrivacyMatters #AlwaysBeAware #PrivacyIsNotOptional`,
          location: "from Mars 🌌",
          link: "https://www.momenel.com",
          isFollowing: true,
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
              caption: "#cat",
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
      }, 0);
      setTimeout(() => {
        setisLoading(false);
      }, 0);
    });
  }, []);

  const handleFollow = () => {
    // send request to follow
    console.log(data?.isFollowing);
    setData({
      ...data,
      isFollowing: !data?.isFollowing,
    });
  };

  const renderHeader = () => {
    return (
      <View style={{ backgroundColor: "white" }}>
        <ImageBackground
          source={{
            uri:
              data?.profile_url ||
              `https://source.unsplash.com/random/${
                Dimensions.get("window").width
              }${
                Dimensions.get("window").width
              }/?experimental,3d-renders,digital-image,art`,
          }}
          resizeMode="cover"
          style={{
            // width: Dimensions.get("window").width,
            // height: Dimensions.get("window").width,
            maxHeight: Dimensions.get("window").height * 0.4,
            backgroundColor: "white",
            alignItems: "flex-end",
          }}
          imageStyle={{
            height: Dimensions.get("window").width,
            maxHeight: Dimensions.get("window").height * 0.4,
          }}
        >
          <View
            style={{
              height: "100%",
              width: "100%",
              marginHorizontal: "4%",
              paddingTop: topInset + 5,
              paddingBottom: "4%",

              justifyContent: "space-between",
              alignItems: "flex-end",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                data?.id === userId
                  ? console.log("navigate to settings")
                  : console.log("open report modal");
              }}
              style={{
                backgroundColor: "#EEEEEE",
                borderRadius: 40,
                opacity: 0.8,
                marginLeft: 15,
                padding: 8,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Ionicons
                name="ellipsis-vertical"
                size={scale(16)}
                color="black"
              />
            </TouchableOpacity>
            {data?.id === userId ? (
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <TouchableOpacity
                  onPress={() => console.log("navigate to edit profile page")}
                >
                  <LinearGradientButton
                    style={{ width: scale(80), height: 34 }}
                  >
                    <CustomText style={{ color: "white" }}>
                      Edit Profile
                    </CustomText>
                  </LinearGradientButton>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <TouchableOpacity onPress={handleFollow}>
                  <LinearGradientButton
                    style={{ width: scale(80), height: 34 }}
                  >
                    <CustomText style={{ color: "white" }}>
                      {data.isFollowing ? "Following" : "Follow"}
                    </CustomText>
                  </LinearGradientButton>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => console.log("handle message")}
                  style={{
                    backgroundColor: "#EEEEEE",
                    borderRadius: 40,
                    opacity: 0.8,
                    marginLeft: 15,
                    padding: 8,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Ionicons name="ios-mail" size={scale(15)} color="black" />
                </TouchableOpacity>
              </View>
            )}
          </View>
        </ImageBackground>
        <View style={{ marginTop: "3%", marginHorizontal: "4%" }}>
          {data?.name && (
            <CustomText
              style={{ fontFamily: "Nunito_800ExtraBold", fontSize: scale(22) }}
              numberOfLines={2}
            >
              {data?.name}
            </CustomText>
          )}
          <CustomText
            style={[
              {
                fontFamily: "Nunito_600SemiBold",
                fontSize: scale12,
                marginTop: -4,
              },
              !data?.name && {
                marginTop: 0,
                fontFamily: "Nunito_800ExtraBold",
                fontSize: scale(20),
              },
            ]}
            numberOfLines={1}
          >
            @{username}
          </CustomText>
        </View>
        {data?.bio && (
          <View
            style={{
              marginTop: "1%",
              marginHorizontal: "4%",
              marginVertical: 5,
            }}
          >
            <StructuredText
              mentionHashtagPress={mentionHashtagClick}
              mentionHashtagColor={"#8759F2"}
              maxCharCount={200}
              style={{ fontFamily: "Nunito_400Regular", fontSize: scale12 }}
            >
              {data?.bio}
            </StructuredText>
          </View>
        )}
        {data?.location && (
          <View
            style={{
              marginTop: "1%",
              marginHorizontal: "3.5%",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Ionicons name="ios-location" size={scale12 + 5} color="#7C7C7C" />
            <CustomText
              style={{
                fontFamily: "Nunito_700Bold",
                fontSize: scale12,
                marginLeft: "1%",
                color: "#7C7C7C",
              }}
              numberOfLines={1}
            >
              {data?.location}
            </CustomText>
          </View>
        )}
        {data?.link && (
          <TouchableOpacity
            onPress={() => handleLinkPressAsync(data?.link)}
            style={{
              marginTop: "1%",
              marginHorizontal: "3.5%",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Ionicons
              name="ios-link"
              size={scale12 + 5}
              color="#6E31E2"
              style={{ transform: [{ rotate: "-45deg" }] }}
            />
            <CustomText
              numberOfLines={1}
              style={{
                fontFamily: "Nunito_700Bold",
                fontSize: scale12,
                marginLeft: "1%",
                color: "#7C7C7C",
              }}
            >
              {data?.link}
            </CustomText>
          </TouchableOpacity>
        )}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginHorizontal: "5%",
            marginVertical: "3%",
          }}
        >
          <AmntTag value={99321} txt={"Posts"} disabled={true} />
          <AmntTag
            value={99321}
            txt={"Followers"}
            onPress={() => console.log("follwoers")}
          />
          <AmntTag
            value={99321}
            txt={"Following"}
            disabled={data?.id !== userId}
          />
        </View>
      </View>
    );
  };
  const CalcHeight = (width, height) => {
    const ScreenWidth = Dimensions.get("window").width;

    // const Iwidth = ScreenWidth * 0.5;
    const Iwidth = ScreenWidth * 0.5 - ScreenWidth * 0.02;
    let newHeight = height * (Iwidth / width);
    return newHeight;
  };
  const renderItem = ({ item, index, postId, height }) => {
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
          onPress={() => console.log(index)}
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
    let width = item.posts[0]?.width;
    return (
      <Pressable style={{ padding: "2%" }} onPress={() => console.log(index)}>
        <ImageBackground
          // todo: get thumbnail from bunny if item.posts[0].type is video
          source={{ uri: item.posts[0].url }}
          style={{
            flexDirection: "row",
            width: "100%",
            height: CalcHeight(width, height),
            borderRadius: 4,
            backgroundColor: "pink",
            //   marginHorizontal: 10,
          }}
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

  const handleLinkPressAsync = async (url) => {
    console.log(url);
    if (url.startsWith("https://www.")) {
      await WebBrowser.openBrowserAsync(url);
    } else if (url.startsWith("www.")) {
      await WebBrowser.openBrowserAsync("https://" + url);
    } else {
      await WebBrowser.openBrowserAsync("https://www." + url);
    }
  };

  const mentionHashtagClick = async (text) => {
    const _handlePressButtonAsync = async (url) => {
      await WebBrowser.openBrowserAsync(url);
    };
    if (text.startsWith("https")) {
      try {
        _handlePressButtonAsync(text);
      } catch (error) {
        console.log(error);
      }
    } else if (text.startsWith("www")) {
      try {
        _handlePressButtonAsync("https://" + text);
      } catch (error) {
        console.log(error);
      }
    } else if (text.startsWith("@")) {
      //todo: navigate to user profile
      // navigation.navigate("Search", {
      //   type: "mention",
      //   query: text,
      // });
      // console.log("@", text);
    } else if (text.startsWith("#")) {
      navigation.navigate("Search", {
        type: "hashtag",
        query: text,
      });
      setShowBottomMoreSheet(false);
    } else if (text.startsWith("more")) {
      setShowBottomMoreSheet(true);
    } else {
      console.log("else", text);
    }
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
      ) : (
        <MasonryFlashList
          ListHeaderComponent={renderHeader}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          disableAutoLayout={true}
          data={data?.posts}
          numColumns={2}
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
      <DetachedBottomSheetWithScroll
        show={showBottomMoreSheet}
        onSheetClose={() => setShowBottomMoreSheet(false)}
      >
        <View
          style={{
            paddingHorizontal: "5%",
            paddingTop: "2%",
            paddingBottom: "5%",
          }}
        >
          <StructuredText
            mentionHashtagPress={mentionHashtagClick}
            mentionHashtagColor={"#8759F2"}
            style={{
              fontSize: scale12 + 2,
            }}
          >
            {data?.bio || `No bio yet`}
          </StructuredText>
        </View>
      </DetachedBottomSheetWithScroll>
      <StatusBar hidden={true} />
    </View>
  );
};

export default Profile;
