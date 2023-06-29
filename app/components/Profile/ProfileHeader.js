import { View, Dimensions, Platform, Pressable } from "react-native";
import { Image } from "expo-image";
import * as WebBrowser from "expo-web-browser";
import { useMemo, useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
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
  const bgColors = [
    "#C7EFCF",
    "#FEC7C7",
    "#C7DFFD",
    "#363946",
    "#EDA2C0",
    "#f5bfd7",
    "#f0eafc",
  ];
  console.log("profile_url", profile_url);
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
  console.log(blurhash);
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
            marginVertical: "2%",
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
                // marginVertical: 5,
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
            <TouchableOpacity
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
            </TouchableOpacity>
          )}
        </View>
        {/* right */}
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Pressable
            onPress={() =>
              navigation?.navigate("Zoom", {
                url: `https://momenel.b-cdn.net/profiles/${profile_url}`,
                username,
              })
            }
          >
            <Image
              source={
                profile_url
                  ? {
                      uri: `https://momenel.b-cdn.net/profiles/${profile_url}`,
                    }
                  : null
              }
              contentFit="cover"
              placeholder={blurhash}
              style={{
                height: scaledSize,
                width: scaledSize,
                borderRadius: scaledSize / 2,
                backgroundColor:
                  bgColors[Math.floor(Math.random() * bgColors.length)],
              }}
              transition={1000}
            />
          </Pressable>
        </View>
      </View>
      {/* stats */}
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-evenly",
          alignItems: "flex-start",
          marginTop: "4%",
          marginBottom: "4%",
        }}
      >
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
          disabled={RouteName === "UserProfile"}
          onPress={() =>
            navigation.navigate("UserList", {
              type: "following",
              id: id,
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
          <TouchableOpacity
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
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
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
          </TouchableOpacity>
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
                // contentId: id,
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
          </TouchableOpacity>
        </View>
      </BottomSheet>
    </View>
  );
};

export default ProfileHeader;
