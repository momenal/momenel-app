// https://github.com/dabakovich/react-native-controlled-mentions/blob/3.0.0-feat-use-mentions/example/mentions-app.tsx#L90

import {
  Alert,
  Dimensions,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  LayoutAnimation,
  Platform,
  Pressable,
  ScrollView,
  Text,
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

let users = [
  {
    id: "1",
    name: "David Tabaka",
  },
  {
    id: "2",
    name: "Mary",
  },
  {
    id: "3",
    name: "Tony",
  },
  {
    id: "4",
    name: "Mike",
  },
  {
    id: "5",
    name: "Grey",
  },
];

let hashtags = [
  {
    id: "todo",
    name: "todo",
  },
  {
    id: "help",
    name: "help",
  },
  {
    id: "loveyou",
    name: "loveyou",
  },
  {
    id: "loveyou2",
    name: "loveyou",
  },
];

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
  const profile_url = useBoundStore((state) => state.profile_url);
  const username = useBoundStore((state) => state.username);
  const headerHeight = useHeaderHeight();
  const insets = useSafeAreaInsets();
  const [textValue, setTextValue] = useState("");
  const [content, setContent] = useState([]);
  const MAX_CONTENT_LENGTH = 8; //todoL: change after meeting

  const filteredArray = (arrayA, arrayB) => {
    return arrayB.filter((element) => {
      return (
        arrayA.findIndex((item) => item.assetId === element.assetId) === -1
      );
    });
  };

  // remove item from content array by assetId
  // const removeItem = (assetId) => {
  //   const filtered = content.filter((item) => item.assetId !== assetId);
  //   setContent(filtered);
  // };
  const removeItem = (uri) => {
    const filtered = content.filter((item) => item.uri !== uri);
    setContent(filtered);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      // orderedSelection: true,
      quality: 1.0,
      allowsEditing: false,
      //TODO:SET TO TRUE base64: true,
      // base64: true,
      selectionLimit: 5,
    });

    if (!result.canceled) {
      if (result.assets.length + content.length > MAX_CONTENT_LENGTH) {
        {
          Alert.alert(
            "Oops!",
            `You can upload up to ${MAX_CONTENT_LENGTH} photos and videos at a time.`
          );
        }
        return;
      }
      if (Platform.OS === "ios") {
        const filtered = filteredArray(content, result.assets);
        if (filtered.length === 0) {
          Alert.alert(
            "Oops!",
            "Looks like you already selected some of these images. \n\n Don't worry, we removed the duplicates for you."
          );
          // Alert.alert(
          //   "Looks like you already selected some of these images. \n Don't worry, we removed the duplicates for you."
          // );
        }
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setContent([...content, ...filtered]);
      } else {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setContent([...content, ...result.assets]);
      }
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
      //TODO:SET TO TRUE base64: true,
      selectionLimit: 5,
    });

    if (!result.canceled) {
      const filtered = filteredArray(content, result.assets);
      if (result.assets.length + content.length > MAX_CONTENT_LENGTH) {
        {
          Alert.alert(
            "Oops!",
            `You can upload up to ${MAX_CONTENT_LENGTH} photos and videos at a time.`
          );
        }
        return;
      }
      if (Platform.OS === "ios") {
        const filtered = filteredArray(content, result.assets);
        if (filtered.length === 0) {
          Alert.alert(
            "Oops!",
            "Looks like you already selected some of these videos. \n\n Don't worry, we removed the duplicates for you."
          );
        }
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setContent([...content, ...filtered]);
      } else {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setContent([...content, ...result.assets]);
      }
    }
  };

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

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <PostHeaderButton
          onPress={() => console.log("press")}
          disabled={textValue.length > 0 || content.length > 0 ? false : true}
          style={{ marginRight: "1%" }}
        />
      ),
    });
  }, [navigation, textValue]);

  const [isSuggestionsVisible, setisSuggestionsVisible] = useState(false);
  const { parts, plainText } = parseValue(textValue, [
    triggersConfig.mention,
    triggersConfig.hashtag,
  ]);

  //   console.log("parts", parts);
  //   console.log("textValue", plainText);

  const { textInputProps, triggers } = useMentions({
    value: textValue,
    onChange: setTextValue,
    triggersConfig,
  });
  function lay(params) {
    console.log(params);
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
        <Suggestions
          suggestions={hashtags}
          {...triggers.hashtag}
          onLayoutFunc={lay}
          pre={"#"}
        />
        <Suggestions
          suggestions={users}
          {...triggers.mention}
          onLayoutFunc={lay}
          pre={"@"}
        />
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
    </KeyboardAvoidingView>
  );
};

export default CreatePost;
