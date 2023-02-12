import { View, ImageBackground, Dimensions, Image } from "react-native";
import * as WebBrowser from "expo-web-browser";

import { useBoundStore } from "../../Store/useBoundStore";
import React, { memo, useEffect, useMemo, useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";

import CustomText from "../customText/CustomText";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { scale } from "../../utils/Scale";
import LinearGradientButton from "../Buttons/LinearGradientButton";
import AmntTag from "./AmntTag";
import StructuredText from "../Posts/StructuredText";
import DetachedBottomSheetWithScroll from "../BottomFlatSheet/DetachedBottomSheetWithScroll";
import BottomSheet from "../BottomFlatSheet/BottomSheet";
import ContactOption from "./ContactOption";
import { useRoute } from "@react-navigation/native";

const ProfileHeader = ({
  navigation,
  id,
  handleFollow,
  handleBlock,
  profile_url,
  isFollowing,
  name,
  bio,
  location,
  link,
  postsAmount,
  followers,
  following,
  contactOptions,
  username,
}) => {
  const { name: RouteName } = useRoute();

  const { top: topInset, bottom: BottomInsets } = useSafeAreaInsets();
  const [showBottomSheeModal, setShowBottomSheetModal] = useState(false);
  const [showBottomMoreSheet, setShowBottomMoreSheet] = useState(false);
  const [showBottomContactSheet, setShowBottomContactSheet] = useState(false);
  const userId = useBoundStore((state) => state.userId);
  console.log(userId);

  const scale12 = useMemo(() => scale(12), []);

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

  return (
    <View style={{ backgroundColor: "white" }}>
      <ImageBackground
        source={{
          uri:
            profile_url ||
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
          style={[
            {
              height: "100%",
              width: "100%",
              paddingHorizontal: "4%",
              paddingTop: topInset + 5,
              paddingBottom: "4%",
              flexDirection: "row",
            },
            RouteName === "UserProfile"
              ? { justifyContent: "space-between" }
              : { justifyContent: "flex-end" },
          ]}
        >
          {RouteName === "UserProfile" && (
            // back button
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
              style={{
                backgroundColor: "#EEEEEE",
                borderRadius: 40,
                opacity: 0.8,
                padding: 8,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Ionicons name="md-chevron-back" size={scale(16)} color="black" />
            </TouchableOpacity>
          )}
          <View
            style={{
              justifyContent: "space-between",
              alignItems: "flex-end",

              // height: "100%",
              // width: "100%",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                id === userId
                  ? navigation.navigate("Settings")
                  : setShowBottomSheetModal(true);
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
            {RouteName === "Profile" ? (
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <TouchableOpacity
                  onPress={() => navigation.navigate("EditProfile")}
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
                      {isFollowing ? "Following" : "Follow"}
                    </CustomText>
                  </LinearGradientButton>
                </TouchableOpacity>
                {contactOptions && (
                  <TouchableOpacity
                    onPress={() => setShowBottomContactSheet(true)}
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
                      name="md-paper-plane"
                      size={scale(15)}
                      color="black"
                    />
                  </TouchableOpacity>
                )}
              </View>
            )}
          </View>
        </View>
      </ImageBackground>
      <View style={{ marginTop: "3%", marginHorizontal: "4%" }}>
        {name && (
          <CustomText
            style={{ fontFamily: "Nunito_800ExtraBold", fontSize: scale(22) }}
            numberOfLines={2}
          >
            {name}
          </CustomText>
        )}
        <CustomText
          style={[
            {
              fontFamily: "Nunito_600SemiBold",
              fontSize: scale12,
              marginTop: -4,
            },
            !name && {
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
      {bio && (
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
            {bio}
          </StructuredText>
        </View>
      )}
      {location && (
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
            {location}
          </CustomText>
        </View>
      )}
      {link && (
        <TouchableOpacity
          onPress={() => handleLinkPressAsync(link)}
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
            {link}
          </CustomText>
        </TouchableOpacity>
      )}
      {/* info tags */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginHorizontal: "5%",
          marginVertical: "3%",
        }}
      >
        <AmntTag value={postsAmount} txt={"Posts"} disabled={true} />
        <AmntTag
          value={followers}
          txt={"Followers"}
          onPress={() =>
            navigation.navigate("UserList", {
              type: "followers",
              id: id,
              totalAmount: followers,
            })
          }
        />
        <AmntTag
          value={following}
          txt={"Following"}
          disabled={id !== userId}
          onPress={() =>
            navigation.navigate("UserList", {
              type: "following",
              id: id,
              totalAmount: followers,
            })
          }
        />
      </View>
      {/* sheets */}
      {/* sheet to read full bio if it exceeds allowed lenght */}
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
            {bio || `No bio yet`}
          </StructuredText>
        </View>
      </DetachedBottomSheetWithScroll>
      {/* profile menu */}
      <BottomSheet
        show={showBottomSheeModal}
        onSheetClose={() => setShowBottomSheetModal(false)}
      >
        <View
          style={{
            alignItems: "center",
            marginBottom: BottomInsets + 8,
            marginTop: 10,
          }}
        >
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
            }}
            onPress={() => handleBlock()}
          >
            <Ionicons name="ios-flag" size={20} color="black" />
            <CustomText
              style={{
                fontSize: 16,
                marginLeft: 10,
              }}
            >
              Block
            </CustomText>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              width: Dimensions.get("window").width * 0.9,
              backgroundColor: "#EAEAEA",
              paddingVertical: 15,
              paddingHorizontal: 18,
              // marginBottom: 15,
              borderRadius: 12,
            }}
            onPress={() => {
              setShowBottomSheetModal(false);
              navigation.navigate("Report", {
                contentId: id,
                username: username,
                contentType: "profile",
              });
            }}
          >
            <Ionicons name="ios-alert-circle-outline" size={20} color="black" />
            <CustomText
              style={{
                fontSize: 16,
                marginLeft: 10,
              }}
            >
              Report
            </CustomText>
          </TouchableOpacity>
        </View>
      </BottomSheet>
      {/* contant options */}
      {contactOptions && (
        <BottomSheet
          show={showBottomContactSheet}
          onSheetClose={() => setShowBottomContactSheet(false)}
        >
          <View style={{ marginBottom: BottomInsets, marginTop: 2 }}>
            <CustomText
              selectable={true}
              style={{
                fontSize: scale(20),
                fontFamily: "Nunito_600SemiBold",
                marginHorizontal: "5%",
              }}
              numberOfLines={1}
            >
              Contact options
            </CustomText>
            <CustomText
              selectable={true}
              style={{
                fontSize: 13,
                // fontFamily: "Nunito_600SemiBold",
                marginHorizontal: "6%",
                fontStyle: "italic",
              }}
              numberOfLines={1}
            >
              Long Press to copy
            </CustomText>
            {contactOptions.map((item, index) => (
              <ContactOption
                key={index}
                platform={item.platform}
                contact={item.contact}
              />
            ))}
          </View>
        </BottomSheet>
      )}
    </View>
  );
};

export default memo(ProfileHeader);
