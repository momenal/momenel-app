import {
  Alert,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  LayoutAnimation,
  Platform,
  Pressable,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import { useMentions, parseValue } from "react-native-controlled-mentions";
import { Ionicons } from "@expo/vector-icons";
import { useHeaderHeight } from "@react-navigation/elements";
import { scale } from "../app/utils/Scale";
import { useBoundStore } from "../app/Store/useBoundStore";
import CustomText from "../app/components/customText/CustomText";
import PostHeaderButton from "../app/components/Buttons/PostHeaderButton";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Suggestions from "../app/components/Inputs/Suggestions";
import * as ImagePicker from "expo-image-picker";
import CreatePostMedia from "../app/components/CreatePost/CreatePostMedia";
import StatusOverlay from "../app/components/StatusOverlay";

const triggersConfig = {
  mention: {
    trigger: "@",
    isInsertSpaceAfterMention: true,
    allowedSpacesCount: 0,
    textStyle: {
      fontWeight: "bold",
      color: "#7033FF",
    },
  },
  hashtag: {
    trigger: "#",
    isInsertSpaceAfterMention: true,
    allowedSpacesCount: 0,
    textStyle: {
      fontWeight: "bold",
      color: "#7033FF",
    },
  },
};

const CreatePost = ({ navigation }) => {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [isPosting, setIsPosting] = useState(false);
  const [isPostingSuccessful, setIsPostingSuccessful] = useState(false);
  const profile_url = useBoundStore((state) => state.profile_url);
  const username = useBoundStore((state) => state.username);
  const CreatePost = useBoundStore((state) => state.handleCreatePost);
  const headerHeight = useHeaderHeight();
  const insets = useSafeAreaInsets();
  const [textValue, setTextValue] = useState("");
  const [content, setContent] = useState([]);
  const MAX_CONTENT_LENGTH = 10;

  const filteredArray = (arrayA, arrayB) => {
    return arrayB.filter((element) => {
      return (
        arrayA.findIndex((item) => item.assetId === element.assetId) === -1
      );
    });
  };

  // used to generate unique id for each image/video asset to handle null id issue on android
  //! not to be used as read id on the backend
  function guidGenerator() {
    var S4 = function () {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return (
      S4() +
      S4() +
      "-" +
      S4() +
      "-" +
      S4() +
      "-" +
      S4() +
      "-" +
      S4() +
      S4() +
      S4()
    );
  }

  const removeItem = (uri) => {
    const filtered = content.filter((item) => item.uri !== uri);
    setContent(filtered);
  };

  const handleContentPick = ({ result, message }) => {
    if (result.assets.length + content.length > MAX_CONTENT_LENGTH) {
      {
        Alert.alert(
          "Oops!",
          `You can upload up to ${MAX_CONTENT_LENGTH} photos and videos per post.`
        );
      }
      return;
    }
    const newRecords = result.assets.map((item) => {
      if (item.assetId === null) {
        return { ...item, assetId: guidGenerator() };
      } else {
        return { ...item };
      }
    });
    const filtered = filteredArray(content, newRecords);
    if (filtered.length < result.assets.length) {
      Alert.alert("Oops!", message, [
        {
          text: "Ok",
          onPress: () => {
            LayoutAnimation.configureNext(
              LayoutAnimation.Presets.easeInEaseOut
            );
            setContent([...content, ...filtered]);
          },
          style: "cancel",
        },
      ]);
    } else {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setContent([...content, ...filtered]);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      orderedSelection: true,
      quality: 1.0,
      allowsEditing: false,
      base64: false,
      selectionLimit: 5,
    });

    if (!result.canceled) {
      handleContentPick({
        result,
        message:
          result.assets.length > 1
            ? "Looks like you already selected some of these photos. \n\nDon't worry, we removed the duplicates for you."
            : "Looks like you already selected this photo. \n\nDon't worry, we removed the duplicate for you.",
      });
    }
  };

  const pickVideo = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsMultipleSelection: false,
      allowsEditing: true,
      videoMaxDuration: 120,
      orderedSelection: true,
      quality: 1,
      base64: false,
      selectionLimit: 5,
    });

    if (!result.canceled) {
      handleContentPick({
        result,
        message: "Looks like you already selected this video.",
      });
    }
  };

  const handleCreatePost = async ({ posts, caption, parts }) => {
    Keyboard.dismiss();
    setIsPosting(true);
    const response = await CreatePost({ posts, caption, parts });
    if (response) {
      setIsPosting(false);
      setIsPostingSuccessful(true);
      // navigation.navigate("Home");
    } else {
      setIsPosting(false);
      setIsPostingSuccessful(false);
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <PostHeaderButton
          onPress={() =>
            handleCreatePost({ posts: content, caption: plainText, parts })
          }
          disabled={
            isPosting === true || isPostingSuccessful === true
              ? true
              : textValue.length > 0 || content.length > 0
              ? false
              : true
          }
          style={{ marginRight: "1%" }}
        />
      ),
    });
  }, [navigation, textValue, content, isPosting, isPostingSuccessful]);

  useEffect(() => {
    if (Platform.OS === "android") {
      const keyboardDidShowListener = Keyboard.addListener(
        "keyboardDidShow",
        () => {
          setKeyboardVisible(true);
        }
      );
      const keyboardDidHideListener = Keyboard.addListener(
        "keyboardDidHide",
        () => {
          setKeyboardVisible(false);
        }
      );

      return () => {
        keyboardDidHideListener.remove();
        keyboardDidShowListener.remove();
      };
    } else {
      const keyboardDidShowListener = Keyboard.addListener(
        "keyboardWillShow",
        () => {
          setKeyboardVisible(true);
        }
      );
      const keyboardDidHideListener = Keyboard.addListener(
        "keyboardWillHide",
        () => {
          setKeyboardVisible(false);
        }
      );
      return () => {
        keyboardDidHideListener.remove();
        keyboardDidShowListener.remove();
      };
    }
  }, []);

  const [isSuggestionsVisible, setisSuggestionsVisible] = useState(false);
  const { parts, plainText } = parseValue(textValue, [
    triggersConfig.mention,
    triggersConfig.hashtag,
  ]);

  const { textInputProps, triggers } = useMentions({
    value: textValue,
    onChange: setTextValue,
    triggersConfig,
  });
  function lay(params) {
    console.log("lay");
    if (params > 0) {
      setisSuggestionsVisible(true);
    } else {
      setisSuggestionsVisible(false);
    }
  }

  const sizeProfile = useMemo(() => scale(30), []);
  const fontSize = useMemo(() => scale(15), []);

  return (
    <KeyboardAvoidingView
      enabled={Platform.OS === "ios"}
      behavior="padding"
      keyboardVerticalOffset={headerHeight}
      style={{
        flex: 1,
        justifyContent: "flex-end",
        backgroundColor: "white",
      }}
    >
      <View
        keyboardShouldPersistTaps="handled"
        style={{
          flex: 1,
          justifyContent: "space-between",
          //   marginBottom: 20,
        }}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardDismissMode="interactive"
          // style={{ marginBottom: 40 }} //! change this to match keyboard accessory height
          style={{ marginBottom: isSuggestionsVisible ? 0 : 41 }} //! change this to match keyboard accessory height
        >
          {/* header */}
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
          <View>
            <TextInput
              placeholder="What's happening?"
              placeholderTextColor="#687684"
              autoFocus={true}
              selectTextOnFocus={false}
              keyboardType="twitter"
              multiline
              scrollEnabled={false}
              style={{
                fontFamily: "Nunito_600SemiBold",
                fontSize: fontSize,
                alignItems: "center",
                marginBottom: "3%",
                marginTop: "2%",
                marginHorizontal: "4%",
              }}
              {...textInputProps}
            />
            {content.length > 0 && (
              <CreatePostMedia data={content} onRemove={removeItem} />
            )}
          </View>
        </ScrollView>
        <Suggestions {...triggers.hashtag} onLayoutFunc={lay} pre={"#"} />
        <Suggestions {...triggers.mention} onLayoutFunc={lay} pre={"@"} />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingVertical: 8,
            paddingHorizontal: 12,
            alignItems: "center",
            margintop: 20,
            position: "absolute",
            bottom: isKeyboardVisible ? 0 : insets.bottom,
            width: "100%",
            zIndex: 1,
            backgroundColor: "white",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              onPress={pickImage}
              style={{ marginRight: "15%" }}
            >
              <Ionicons name="images" size={scale(18)} color="black" />
            </TouchableOpacity>
            <TouchableOpacity onPress={pickVideo}>
              <Ionicons name="ios-videocam" size={scale(19)} color="black" />
            </TouchableOpacity>
          </View>
          {isKeyboardVisible && (
            <Pressable onPress={Keyboard.dismiss}>
              <CustomText>Done</CustomText>
            </Pressable>
          )}
        </View>
      </View>
      {isPosting && (
        <StatusOverlay
          headerHeight={headerHeight}
          status={"Posting your post..."}
          message={"Please wait"}
        />
      )}
      {isPostingSuccessful && (
        <StatusOverlay
          headerHeight={headerHeight}
          status={"Post submitted successfully"}
          message={"It may take up to 20 minutes to appear on your profile"}
        />
      )}
    </KeyboardAvoidingView>
  );
};

export default CreatePost;
