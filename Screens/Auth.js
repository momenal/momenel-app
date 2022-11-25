import React, { useRef, useState } from "react";
import {
  Alert,
  Animated,
  Button,
  Dimensions,
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import CustomText from "../app/components/customText/CustomText";
import { supabase } from "../app/lib/supabase";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import LinearGradientButton from "../app/components/Buttons/LinearGradientButton";
import * as WebBrowser from "expo-web-browser";
import PostHeader from "../app/components/Posts/PostHeader";
import StructuredText from "../app/components/Posts/StructuredText";
import PaginationDot from "../app/components/Posts/PaginationDot";
import DetachedBottomSheet from "../app/components/BottomFlatSheet/DetachedBottomSheet";
import SignIn from "../app/components/auth/SignIn";
import CreateAccount from "../app/components/auth/CreateAccount";

const ScreenWidth = Dimensions.get("window").width;
const ScreenHeight = Dimensions.get("window").height;
const data = [
  {
    postId: "first1",
    userName: "farhan",
    name: "farhan haider",
    profile_url:
      "https://images.unsplash.com/photo-1669290888631-e60c60fed46d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80",
    caption: "No more data collection",
  },
  {
    postId: "second2",
    userName: "betzy",
    name: "betzy",
    profile_url:
      "https://images.unsplash.com/photo-1669290888631-e60c60fed46d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80",
    caption: "No Ads",
  },
  {
    postId: "third3",
    userName: "MO",
    // name: "betzy",
    profile_url:
      "https://images.unsplash.com/photo-1669290888631-e60c60fed46d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80",
    caption: "Simple Chronological feeds!",
  },
];

const Auth = () => {
  const insets = useSafeAreaInsets();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showSigninBottomSheet, setShowSigninBottomSheet] = useState(false);
  const [showSignupBottomSheet, setShowSignupBottomSheet] = useState(false);

  // for pagination dots
  const scrollX = useRef(new Animated.Value(0)).current;

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    setLoading(false);
  }

  async function signUpWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email: email,
      password: password,
      profile_url: "fake url",
    });

    if (error) Alert.alert(error.message);
    setLoading(false);
  }

  const _handlePressButtonAsync = async (url) => {
    await WebBrowser.openBrowserAsync(url);
  };
  const hideBottomSignup = () => {
    setShowSignupBottomSheet(false);
  };
  const hideBottomSignin = () => {
    setShowSigninBottomSheet(false);
  };

  const renderItem = ({ item, index }) => {
    return (
      <View
        style={{
          paddingHorizontal: ScreenWidth * 0.05, //! using 0.05 because we want 0.04% originally and then add 0.1 of image width to it
          width: ScreenWidth,
          //   paddingBottom: 11.4,
          //   backgroundColor: "pink",
        }}
      >
        <View
          style={{
            backgroundColor: "white",
            borderRadius: 7,
            paddingTop: 15,
          }}
        >
          <PostHeader
            profileUrl={item.profile_url}
            username={item.userName}
            name={item.name}
            createdAt={Date.now() + 5000}
            index={index}
          />
          <View
            style={{
              borderRadius: 3,
              paddingHorizontal: ScreenWidth * 0.05, //! using 0.05 because we want 0.04% originally and then add 0.1 of image width to it
              paddingBottom: 11.4,
            }}
          >
            <StructuredText
              // mentionHashtagPress={mentionHashtagClick}
              mentionHashtagColor={"#8759F2"}
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
        paddingTop: insets.top + 10,
      }}
    >
      <CustomText
        style={{
          fontSize: 31,
          fontFamily: "Nunito_900Black",
        }}
      >
        momenel
      </CustomText>
      <View
        style={{
          flex: 1,
          //   backgroundColor: "pink",
          width: Dimensions.get("window").width,
          //   marginBottom: insets.bottom,
          marginBottom: insets.bottom + ScreenHeight * 0.03,
          marginTop: "5%",
          //   paddingHorizontal: "7%",
          justifyContent: "space-between",
        }}
      >
        <View style={{ width: "100%", paddingHorizontal: "7%" }}>
          <CustomText style={styles.pfs} adjustsFontSizeToFit numberOfLines={1}>
            The
          </CustomText>
          <CustomText style={styles.pfs} adjustsFontSizeToFit numberOfLines={1}>
            Privacy
          </CustomText>
          <CustomText style={styles.pfs} adjustsFontSizeToFit numberOfLines={1}>
            First Social
          </CustomText>
        </View>
        {/* cards */}
        <View>
          <FlatList
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
            // viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
            // viewabilityConfig={{
            //   waitForInteraction: false,
            //   viewAreaCoveragePercentThreshold: 95,
            // }}
          />
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              justifyContent: "center",
              paddingTop: "5%",
              //   paddingTop: 23,
            }}
          >
            <PaginationDot data={data} scrollX={scrollX} marginHorizontal={5} />
          </View>
        </View>
        {/* bottom */}
        <View style={{ paddingHorizontal: "7%" }}>
          <TouchableOpacity onPress={() => setShowSignupBottomSheet(true)}>
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
          </TouchableOpacity>
          <TouchableOpacity
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
          </TouchableOpacity>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              marginTop: 10,
            }}
          >
            <CustomText
              style={styles.termsText}
              // adjustsFontSizeToFit
              // numberOfLines={2}
            >
              By signing up, I cofirmed that I have read and agreed to Momenel’s{" "}
              <CustomText
                style={[styles.termsText, styles.textUnderline]}
                onPress={() => _handlePressButtonAsync("https://expo.dev")}
              >
                Terms Of Service
              </CustomText>
              ,{" "}
              <CustomText
                style={[styles.termsText, styles.textUnderline]}
                onPress={() =>
                  _handlePressButtonAsync("https://www.momenel.com/privacy")
                }
              >
                Privacy
              </CustomText>
              .
            </CustomText>
          </View>
        </View>

        {/* <Input
          label="Email"
          leftIcon={{ type: "font-awesome", name: "envelope" }}
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="email@address.com"
          autoCapitalize={"none"}
        /> */}
        {/* <CustomText>Email</CustomText>
        <TextInput
          //   style={styles.input}
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="email@address.com"
          autoCapitalize={"none"}
        /> */}
      </View>
      {/* <View style={styles.verticallySpaced}>
        <Input
          label="Password"
          leftIcon={{ type: "font-awesome", name: "lock" }}
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true}
          placeholder="Password"
          autoCapitalize={"none"}
        />
      </View> */}
      {/* <View style={[styles.verticallySpaced, styles.mt20]}>
        <Button
          title="Sign in"
          disabled={loading}
          onPress={() => signInWithEmail()}
        />
      </View> */}
      {/* <View style={styles.verticallySpaced}>
        <Button
          title="Sign up"
          disabled={loading}
          onPress={() => signUpWithEmail()}
        />
      </View> */}
      <DetachedBottomSheet
        show={showSigninBottomSheet}
        onSheetClose={() => setShowSigninBottomSheet(false)}
        hideBottomSignup={hideBottomSignin}
      >
        <SignIn />
      </DetachedBottomSheet>
      <DetachedBottomSheet
        show={showSignupBottomSheet}
        onSheetClose={() => setShowSignupBottomSheet(false)}
      >
        <CreateAccount hideBottomSignup={hideBottomSignup} />
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
    // width: "100%",
    textAlign: "center",
    color: "black",
    // paddingVertical: "4%",
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
});
