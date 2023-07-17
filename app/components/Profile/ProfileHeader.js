import { View, Dimensions, Platform, Pressable } from "react-native";
import { Image } from "expo-image";
import * as WebBrowser from "expo-web-browser";
import { memo, useMemo, useState } from "react";
import CustomText from "../customText/CustomText";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { scale } from "../../utils/Scale";
import AmntTag from "./AmntTag";
import StructuredText from "../Posts/StructuredText";
import DetachedBottomSheetWithScroll from "../BottomFlatSheet/DetachedBottomSheetWithScroll";
import BottomSheet from "../BottomFlatSheet/BottomSheet";
import { useRoute } from "@react-navigation/native";

const blurhashBase =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";
const ProfileHeader = ({
  navigation,
  id,
  handleFollow,
  handleBlock,
  profile_url,
  isFollowing,
  name,
  bio,
  link,
  likes_count,
  followers,
  following,
  username,
  isRefreshing,
  blurhash = blurhashBase,
}) => {
  const { name: RouteName } = useRoute();
  const { top: topInset, bottom: BottomInsets } = useSafeAreaInsets();
  const [showBottomSheeModal, setShowBottomSheetModal] = useState(false);
  const [showBottomMoreSheet, setShowBottomMoreSheet] = useState(false);
  const scale12 = useMemo(() => scale(12), []);
  const mentionHashtagClick = async (text) => {
    const _handlePressButtonAsync = async (url) => {
      await WebBrowser.openBrowserAsync(url);
    };
    if (text.startsWith("https")) {
      try {
        _handlePressButtonAsync(text);
      } catch (error) {}
    } else if (text.startsWith("www")) {
      try {
        _handlePressButtonAsync("https://" + text);
      } catch (error) {}
    } else if (text.startsWith("@")) {
      navigation.navigate("UserProfile", { id: text.slice(1) });
    } else if (text.startsWith("#")) {
      navigation.navigate("Search", {
        type: "hashtag",
        query: text[0] === "#" ? text.slice(1) : text,
      });
      setShowBottomMoreSheet(false);
    } else if (text.startsWith("more")) {
      setShowBottomMoreSheet(true);
    } else {
    }
  };

  const handleLinkPressAsync = async (url) => {
    if (url.startsWith("https://www.")) {
      await WebBrowser.openBrowserAsync(url);
    } else if (url.startsWith("www.")) {
      await WebBrowser.openBrowserAsync("https://" + url);
    } else {
      await WebBrowser.openBrowserAsync("https://www." + url);
    }
  };
  const scaledSize = useMemo(() => scale(95), []);
  return (
    <View
      style={[
        {
          backgroundColor: "white",
          marginTop: topInset,
          width: Dimensions.get("window").width,
          overflow: "hidden",
        },
        isRefreshing === true && Platform.OS === "ios"
          ? { marginTop: topInset + 5 }
          : {},
      ]}
    >
      <View
        style={[
          {
            flexDirection: "row",
            marginRight: "4%",
            marginTop: "2%",
            justifyContent: "space-between",
          },
          RouteName === "UserProfile"
            ? { paddingHorizontal: "2%" }
            : { marginLeft: "4%" },
        ]}
      >
        <Pressable
          style={{
            flexDirection: "row",
            alignItems: "center",
            maxWidth: "85%",
          }}
          onPress={() => {
            navigation.goBack();
          }}
        >
          {RouteName === "UserProfile" && (
            <Ionicons
              name="md-chevron-back"
              size={scale(17)}
              color="black"
              style={{ marginTop: 2 }}
            />
          )}
          <CustomText
            style={{
              justifyContent: "center",
              alignItems: "center",
              fontFamily: "Nunito_700Bold",
              fontSize: scale(21.5),
            }}
            numberOfLines={2}
            adjustsFontSizeToFit={true}
          >
            {username}
          </CustomText>
        </Pressable>
        {RouteName === "UserProfile" ? (
          <Pressable
            onPress={() => {
              setShowBottomSheetModal(true);
            }}
            style={{ marginTop: "2%" }}
          >
            <Ionicons name="ellipsis-vertical" size={scale(16)} color="black" />
          </Pressable>
        ) : (
          <Pressable
            onPress={() => {
              navigation.navigate("Setting");
            }}
            style={{ marginTop: "2%" }}
          >
            <Ionicons name="settings-sharp" size={scale(16)} color="black" />
          </Pressable>
        )}
      </View>
      <View
        style={[
          {
            flexDirection: "row",
            justifyContent: "space-between",
          },
          RouteName === "UserProfile"
            ? { paddingHorizontal: "5%" }
            : { paddingHorizontal: "4%" },
        ]}
      >
        {/* left */}
        <View
          style={{
            flex: 1,
            marginRight: "3%",
          }}
        >
          {name && (
            <CustomText
              style={{
                fontFamily: "Nunito_500Medium",
                fontSize: scale(13),
                color: "#7E7E7E",
              }}
              numberOfLines={4}
            >
              {name}
            </CustomText>
          )}
          {bio && (
            <View
              style={{
                marginTop: "2%",
              }}
            >
              <StructuredText
                mentionHashtagPress={mentionHashtagClick}
                mentionHashtagColor={"#8759F2"}
                maxCharCount={160}
                style={{ fontFamily: "Nunito_400Regular", fontSize: scale12 }}
              >
                {bio}
              </StructuredText>
            </View>
          )}
          {link && (
            <Pressable
              onPress={() => handleLinkPressAsync(link)}
              style={{
                marginTop: "2%",
                marginBottom: "2%",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Ionicons
                name="ios-link"
                size={scale12 + 3}
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
            </Pressable>
          )}
        </View>
        {/* right */}
        {profile_url && (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Pressable
              onPress={() =>
                navigation?.navigate("Zoom", {
                  url: `https://cdn.momenel.com/profiles/${profile_url}`,
                  username,
                })
              }
            >
              <Image
                source={
                  profile_url
                    ? {
                        uri: `https://cdn.momenel.com/profiles/${profile_url}`,
                      }
                    : null
                }
                contentFit="cover"
                placeholder={blurhash}
                style={{
                  height: scaledSize,
                  width: scaledSize,
                  borderRadius: scaledSize / 2,
                }}
                transition={1000}
              />
            </Pressable>
          </View>
        )}
      </View>
      {/* stats */}
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-evenly",
          alignItems: "flex-start",
          marginTop: "1%",
          marginBottom: "3%",
        }}
      >
        <AmntTag
          value={followers}
          txt={"Followers"}
          onPress={() =>
            navigation.navigate("UserList", {
              type: "followers",
              Id: id,
              totalAmount: followers,
            })
          }
        />
        <AmntTag
          value={following}
          txt={"Following"}
          disabled={RouteName === "UserProfile"}
          onPress={() =>
            navigation.navigate("UserList", {
              type: "following",
              Id: id,
              totalAmount: followers,
            })
          }
        />
        <AmntTag value={likes_count} txt={"Likes"} disabled={true} />
      </View>
      {/* buttons */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
          alignItems: "flex-start",
          marginBottom: "3%",
          minWidth: "100%",
        }}
      >
        {RouteName === "Profile" ? (
          <Pressable
            onPress={() => navigation.navigate("EditProfile")}
            style={[
              {
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                padding: 5,
                paddingVertical: 10,
                borderRadius: 5,
                borderWidth: 1,
                borderColor: "#BDBDBD",
                width: Dimensions.get("window").width * 0.9,
              },
            ]}
          >
            <CustomText style={{ color: "black" }}>Edit Profile</CustomText>
          </Pressable>
        ) : (
          <Pressable
            onPress={handleFollow}
            style={[
              {
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                padding: 5,
                paddingVertical: 10,
                borderRadius: 5,
                borderWidth: 1,
                borderColor: "#BDBDBD",
                width: Dimensions.get("window").width * 0.9,
              },
              isFollowing
                ? { borderColor: "black" }
                : { backgroundColor: "#E0E0E0", borderColor: "#E0E0E0" },
            ]}
          >
            <CustomText style={{ color: "black" }}>
              {isFollowing ? "Following" : "Follow"}
            </CustomText>
          </Pressable>
        )}
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
      {/* profile menu --> block & report options*/}
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
          <Pressable
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
          </Pressable>
          <Pressable
            style={{
              flexDirection: "row",
              alignItems: "center",
              width: Dimensions.get("window").width * 0.9,
              backgroundColor: "#EAEAEA",
              paddingVertical: 15,
              paddingHorizontal: 18,

              borderRadius: 12,
            }}
            onPress={() => {
              setShowBottomSheetModal(false);
              navigation.navigate("Report", {
                contentId: "0cee4054-e83f-42ae-a079-75b81c0766fb",
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
          </Pressable>
        </View>
      </BottomSheet>
    </View>
  );
};

export default memo(ProfileHeader);
