import {
  Button,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  LayoutAnimation,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useMemo, useRef, useState } from "react";
import PostHeaderButton from "../app/components/Buttons/PostHeaderButton";
import { useBoundStore } from "../app/Store/useBoundStore";
import { scale } from "../app/utils/Scale";
import CustomText from "../app/components/customText/CustomText";
import KeyboardAccessoryView from "../app/components/KeyboardAccessoryView";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useHeaderHeight } from "@react-navigation/elements";
import InputScrollView from "../app/components/InputScrollView";

const CreatePost = ({ navigation }) => {
  const [text, setText] = useState("");
  const [content, setContent] = useState(null);
  const headerHeight = useHeaderHeight();

  const [textInputOffset, settextInputOffset] = useState(0);
  const scrollViewRef = useRef(null);
  const profile_url = useBoundStore((state) => state.profile_url);
  const username = useBoundStore((state) => state.username);
  const insets = useSafeAreaInsets();
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{ flexDirection: "row" }}>
          <Ionicons name="images" size={scale(18)} color="black" />
          <PostHeaderButton
            onPress={() => console.log("press")}
            disabled={text.length > 0 ? false : true}
          />
        </View>
      ),
    });
  }, [navigation]);
  console.log(textInputOffset);
  //   styles
  const sizeProfile = useMemo(() => scale(30), []);
  const fontSize = useMemo(() => scale(15), []);

  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <InputScrollView
        androidAdjustResize={true}
        keyboardDismissMode="on-drag"
        topOffset={headerHeight + 20}
        keyboardAvoidingViewProps={{
          keyboardVerticalOffset: headerHeight,
        }}
        // useAnimatedScrollView={true}
        height="100%"
        multilineInputStyle={{
          fontSize: fontSize,
          fontFamily: "Nunito_600SemiBold",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: "3%",
          }}
        >
          <Image
            source={{ uri: profile_url }}
            style={{
              height: sizeProfile,
              width: sizeProfile,
              borderRadius: sizeProfile / 2,
              marginRight: "2%",
            }}
          />
          <CustomText style={{ fontSize: scale(15) }}>@{username}</CustomText>
        </View>
        <TextInput
          value={text}
          onChangeText={setText}
          multiline
          placeholder="What's happening?"
          placeholderTextColor="#687684"
          autoFocus={true}
          scrollEnabled={false}
          selectTextOnFocus={false}
          style={{
            fontFamily: "Nunito_600SemiBold",
            fontSize: fontSize,
            alignItems: "center",
            marginBottom: "3%",
            marginTop: "2%",
            marginHorizontal: "5%",
            // backgroundColor: "pink",
          }}
        />
        <View style={{ paddingBottom: 100 }}>
          <Image
            source={{ uri: profile_url }}
            style={{
              height: 200,
              width: 200,
              borderRadius: 10,
              marginRight: "2%",
            }}
          />
        </View>
      </InputScrollView>

      {/* <KeyboardAccessoryView
        alwaysVisible={true}
        inSafeAreaView={true}
        animateOn={"none"}
        hideBorder={true}
        androidAdjustResize
        style={{
          backgroundColor: "white",
          paddingHorizontal: "3%",
          //   borderTopColor: "#E5E5E5",
          //   borderTopWidth: 0.6,
        }}
      >
        {({ isKeyboardVisible }) => {
          return (
            <View
              style={{
                // paddingBottom: isKeyboardVisible ? 0 : insets.bottom + 5,
                paddingTop: isKeyboardVisible ? 0 : "3%",
                flexDirection: "row",
                justifyContent: "space-between",
                alignContent: "center",
                // backgroundColor: "red",
              }}
              onLayout={(event) => {
                var { height } = event.nativeEvent.layout;
                settextInputOffset(isKeyboardVisible ? height : 0);
              }}
            >
              <Ionicons name="images" size={scale(18)} color="black" />
              {isKeyboardVisible && (
                <TouchableOpacity onPress={() => Keyboard.dismiss()}>
                  <CustomText
                    style={{
                      fontFamily: "Nunito_700Bold",
                      fontSize: scale(12.5),
                    }}
                  >
                    Done
                  </CustomText>
                </TouchableOpacity>
              )}
            </View>
          );
        }}
      </KeyboardAccessoryView> */}
    </View>
  );
};

export default CreatePost;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
