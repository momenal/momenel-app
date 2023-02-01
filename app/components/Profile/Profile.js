import { View, Text, ImageBackground, Dimensions } from "react-native";
import { MasonryFlashList } from "@shopify/flash-list";
import { useBoundStore } from "../../Store/useBoundStore";
import { useMemo, useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import CustomText from "../customText/CustomText";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { scale } from "../../utils/Scale";
import LinearGradientButton from "../Buttons/LinearGradientButton";
import AmntTag from "./AmntTag";

const Profile = () => {
  const [posts, setPosts] = useState([
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
      repostedByUser: true, // if the user himself has reposted the post
      isDonateable: true,
    },
  ]);
  const username = useBoundStore((state) => state.username);
  const { top: topInset } = useSafeAreaInsets();

  const scale12 = useMemo(() => scale(12), []);
  console.log(scale12 - 1);
  const renderHeader = () => {
    return (
      <View style={{ backgroundColor: "white" }}>
        <ImageBackground
          source={{
            uri: "https://images.pexels.com/photos/9695955/pexels-photo-9695955.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
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
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TouchableOpacity>
                <LinearGradientButton style={{ width: scale(80), height: 34 }}>
                  <CustomText style={{ color: "white" }}>Follow</CustomText>
                </LinearGradientButton>
              </TouchableOpacity>
              <TouchableOpacity>
                <LinearGradientButton style={{ width: scale(80), height: 34 }}>
                  <CustomText style={{ color: "white" }}>
                    Edit Profile
                  </CustomText>
                </LinearGradientButton>
              </TouchableOpacity>
              <TouchableOpacity
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
          </View>
        </ImageBackground>
        <View style={{ marginTop: "3%", marginHorizontal: "4%" }}>
          <CustomText
            style={{ fontFamily: "Nunito_800ExtraBold", fontSize: scale(21) }}
          >
            Farhan Haider
          </CustomText>
          <CustomText
            style={{
              fontFamily: "Nunito_600SemiBold",
              fontSize: scale12,
              marginTop: -4,
            }}
          >
            @{username}
          </CustomText>
        </View>
        <View style={{ marginTop: "1%", marginHorizontal: "4%" }}>
          <CustomText
            style={{ fontFamily: "Nunito_500Medium", fontSize: scale12 }}
          >
            {`Spread love, be kind ❤️ \nCreator | Chai addict`}
          </CustomText>
        </View>
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
          >
            {`New York, NY`}
          </CustomText>
        </View>
        <TouchableOpacity
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
            style={{
              fontFamily: "Nunito_700Bold",
              fontSize: scale12,
              marginLeft: "1%",
              color: "#7C7C7C",
            }}
          >
            {`www.momenel.com/momenelprivacy`}
          </CustomText>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginHorizontal: "5%",
            marginVertical: "3%",
          }}
        >
          <AmntTag value={"12"} txt={"Posts"} disabled={true} />
          <AmntTag
            value={"80K"}
            txt={"Followers"}
            onPress={() => console.log("follwoers")}
          />
          <AmntTag value={"800"} txt={"Following"} disabled={true} />
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
    let width = item.posts[0].width;

    return (
      <TouchableOpacity
        style={{ padding: "2%" }}
        onPress={() => console.log(index)}
      >
        <ImageBackground
          source={{ uri: item.posts[0].url }}
          style={{
            width: "100%",
            height: CalcHeight(width, height),
            borderRadius: 4,
            backgroundColor: "pink",
            //   marginHorizontal: 10,
          }}
          imageStyle={{ borderRadius: 6 }}
          resizeMode="contain"
        ></ImageBackground>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ height: "100%", backgroundColor: "white" }}>
      <MasonryFlashList
        ListHeaderComponent={renderHeader}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        disableAutoLayout={true}
        data={posts}
        numColumns={2}
        renderItem={({ item, index }) =>
          renderItem({
            item,
            postId: item.postId,
            height: item.posts[0].height,
            index: index,
          })
        }
        estimatedItemSize={400}
      />
      <StatusBar hidden={true} />
    </View>
  );
};

export default Profile;
