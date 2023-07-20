import React, { useCallback, useMemo, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Keyboard,
  StyleSheet,
  Pressable,
  View,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import CustomText from "../app/components/customText/CustomText";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import LinearGradientButton from "../app/components/Buttons/LinearGradientButton";
import StructuredText from "../app/components/Posts/StructuredText";
import PaginationDot from "../app/components/Posts/PaginationDot";
import DetachedBottomSheet from "../app/components/BottomFlatSheet/DetachedBottomSheet";
import SignIn from "../app/components/auth/SignIn";
import CreateAccount from "../app/components/auth/CreateAccount";
import SignUpConfirmation from "../app/components/auth/SignUpConfirmation";
import ForgotAccount from "../app/components/auth/ForgotAccount";
import { scale } from "../app/utils/Scale";
import { RelativeTime } from "../app/utils/RelativeTime";
import { FlashList } from "@shopify/flash-list";
import { Image } from "expo-image";

const ScreenWidth = Dimensions.get("window").width;
const ScreenHeight = Dimensions.get("window").height;
const data = [
  {
    postId: "first1",
    userName: "momenel",
    name: "farhan",
    profile_url: "https://momenel.b-cdn.net/momenel-internal/IMG_1916.jpg",
    caption: "Protecting Your Privacy!\nNo Data Collection.",
  },
  {
    postId: "second2",
    userName: "privacy",
    name: "#privacymatters",
    profile_url: "https://momenel.b-cdn.net/momenel-internal/ssec.jpg",
    caption: "Zero Tracking!\nSeriously, none at all.",
  },
  {
    postId: "third3",
    userName: "ethan",
    name: "ethan",
    profile_url:
      "https://momenel.b-cdn.net/momenel-internal/pexels-yuri-manei-3211476.jpg",
    caption: "Open Source,\nTrustworthy platform.",
  },
];

const Auth = () => {
  const insets = useSafeAreaInsets();
  const [showSigninBottomSheet, setShowSigninBottomSheet] = useState(false);
  const [showSignupBottomSheet, setShowSignupBottomSheet] = useState(false);
  const [showForgotPasswordBottomSheet, setShowForgotPasswordBottomSheet] =
    useState(false);
  const [showConfrimationBottomSheet, setConfirmationBottomSheet] =
    useState(false);
  const size = useMemo(() => scale(26), []);
  const memoizedScale = useCallback((size) => {
    return scale(size);
  }, []);
  //? for pagination dots
  const scrollX = useRef(new Animated.Value(0)).current;

  const onReportPress = () => {
    setShowSignupBottomSheet(false);
    setConfirmationBottomSheet(true);
  };
  const onUserAlreadyExists = () => {};

  const onSignUpClose = () => {
    setShowSignupBottomSheet(false);
    Keyboard.dismiss();
  };

  const onSignInClose = () => {
    setShowSigninBottomSheet(false);
    Keyboard.dismiss();
  };

  const renderItem = ({ item }) => {
    return (
      <View
        style={{
          paddingHorizontal: ScreenWidth * 0.05, //! using 0.05 because we want 0.04% originally and then add 0.1 of image width to it
          width: ScreenWidth,
        }}
      >
        <View
          style={{
            backgroundColor: "white",
            borderRadius: 7,
            paddingTop: 15,
          }}
        >
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",

              paddingHorizontal: ScreenWidth * 0.04,
              paddingBottom: 11,
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              {item.profile_url ? (
                <Image
                  style={{
                    width: size,
                    height: size,
                    borderRadius: 500,
                    marginRight: "2%",
                  }}
                  source={{
                    uri: item.profile_url,
                  }}
                />
              ) : (
                <Ionicons
                  name="person-circle-sharp"
                  size={size + 4}
                  color="#999999"
                  style={{ marginRight: "2%" }}
                />
              )}

              <View style={{ marginLeft: "1%" }}>
                <CustomText
                  style={{
                    color: "#262628",
                    fontSize: memoizedScale(13.5),
                    paddingBottom: 2,
                    fontFamily: "Nunito_600SemiBold",
                    maxWidth: memoizedScale(210),
                  }}
                  numberOfLines={1}
                >
                  {item.name ? item.name : `@${item.userName}`}
                </CustomText>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: -2,
                  }}
                >
                  {item.name ? (
                    <CustomText
                      numberOfLines={1}
                      style={[
                        styles.textMedium,
                        { maxWidth: memoizedScale(170) },
                      ]}
                    >
                      @{item.userName}
                    </CustomText>
                  ) : null}
                  {item.name ? (
                    <CustomText style={[styles.textMedium, { fontSize: 4 }]}>
                      {"\u2B24"}
                    </CustomText>
                  ) : null}
                  <CustomText style={styles.textMedium}>
                    {RelativeTime(item.createdAt)}
                  </CustomText>
                </View>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <View style={{ marginLeft: 6 }}>
                <Ionicons
                  name="ellipsis-vertical"
                  size={scale(18)}
                  color="#828282"
                />
              </View>
            </View>
          </View>
          <View
            style={{
              borderRadius: 3,
              paddingHorizontal: ScreenWidth * 0.05, //! using 0.05 because we want 0.04% originally and then add 0.1 of image width to it
              paddingBottom: 11.4,
            }}
          >
            <StructuredText
              mentionHashtagColor={"red"}
              numberOfLines={4}
              style={{ color: "#535353", fontSize: 20 }}
            >
              {item.caption}
            </StructuredText>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View
      style={{
        backgroundColor: "#E8E8E8",
        height: "100%",
        alignItems: "center",
        paddingTop: insets.top + 20,
      }}
    >
      <CustomText
        style={{
          fontSize: 31,
          fontFamily: "Nunito_900Black",
        }}
      >
        MOMENEL
      </CustomText>
      <View
        style={{
          flex: 1,
          width: Dimensions.get("window").width,
          marginBottom: insets.bottom + ScreenHeight * 0.03,
          marginTop: "5%",
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            width: "100%",
            paddingHorizontal: "7%",
            marginTop: "5%",
          }}
        >
          <CustomText style={styles.pfs} adjustsFontSizeToFit numberOfLines={1}>
            Privacy-first,
          </CustomText>
          <CustomText style={styles.pfs} adjustsFontSizeToFit numberOfLines={1}>
            Open-source,
          </CustomText>
          <CustomText style={styles.pfs} adjustsFontSizeToFit numberOfLines={1}>
            Social!
          </CustomText>
        </View>
        {/* cards */}
        <View>
          <FlashList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item.postId}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            horizontal
            snapToAlignment="end"
            decelerationRate={"fast"}
            snapToInterval={ScreenWidth}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              {
                useNativeDriver: false,
              }
            )}
            estimatedItemSize={365}
          />
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              justifyContent: "center",
              paddingTop: "5%",
            }}
          >
            <PaginationDot data={data} scrollX={scrollX} marginHorizontal={5} />
          </View>
        </View>
        {/* bottom */}
        <View style={{ paddingHorizontal: "7%" }}>
          <Pressable onPress={() => setShowSignupBottomSheet(true)}>
            <LinearGradientButton style={{ width: "100%", borderRadius: 16 }}>
              <CustomText
                style={{
                  fontFamily: "Nunito_800ExtraBold",
                  fontSize: 17,
                  width: "100%",
                  textAlign: "center",
                  color: "white",
                  paddingVertical: "4%",
                }}
              >
                Create New Account
              </CustomText>
            </LinearGradientButton>
          </Pressable>
          <Pressable
            style={{
              width: "100%",
              borderRadius: 16,
              paddingVertical: 8,
              backgroundColor: "white",
              marginTop: 14,
            }}
            onPress={() => setShowSigninBottomSheet(true)}
          >
            <CustomText
              style={{
                fontFamily: "Nunito_800ExtraBold",
                fontSize: 17,
                width: "100%",
                textAlign: "center",
                color: "black",
                paddingVertical: "4%",
              }}
            >
              Sign in
            </CustomText>
          </Pressable>
        </View>
      </View>
      <DetachedBottomSheet
        show={showSigninBottomSheet}
        onSheetClose={() => onSignInClose()}
      >
        <SignIn
          setShowForgotPasswordBottomSheet={setShowForgotPasswordBottomSheet}
          setShowSigninBottomSheet={setShowSigninBottomSheet}
        />
      </DetachedBottomSheet>
      {/* forgot password */}
      <DetachedBottomSheet
        show={showForgotPasswordBottomSheet}
        onSheetClose={() => {
          setShowForgotPasswordBottomSheet(false);
          Keyboard.dismiss();
        }}
      >
        <ForgotAccount
          setShowForgotPasswordBottomSheet={setShowForgotPasswordBottomSheet}
        />
      </DetachedBottomSheet>
      <DetachedBottomSheet
        show={showSignupBottomSheet}
        onSheetClose={() => onSignUpClose(false)}
      >
        <CreateAccount
          hideBottomSignup={onReportPress}
          onReportPress={onReportPress}
          onUserExists={onUserAlreadyExists}
        />
      </DetachedBottomSheet>

      <DetachedBottomSheet
        show={showConfrimationBottomSheet}
        onSheetClose={() => setConfirmationBottomSheet(false)}
      >
        <SignUpConfirmation />
      </DetachedBottomSheet>
    </View>
  );
};

export default Auth;

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
  },
  pfs: { fontSize: 51, fontFamily: "Nunito_700Bold" },
  termsText: {
    fontFamily: "Nunito_500Medium",
    fontSize: 12,
    textAlign: "center",
    color: "black",
  },
  textUnderline: {
    textDecorationLine: "underline",
    textDecorationStyle: "double",
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: "stretch",
  },
  mt20: {
    marginTop: 20,
  },
  textMedium: {
    color: "#999999",
    fontSize: 13,
    marginRight: 4,
  },
});
