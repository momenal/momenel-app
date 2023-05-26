import {
  ActivityIndicator,
  Alert,
  Button,
  Dimensions,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  LayoutAnimation,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { scale } from "../app/utils/Scale";
import { useHeaderHeight } from "@react-navigation/elements";
import CustomText from "../app/components/customText/CustomText";
import CustomTextInput from "../app/components/Profile/CustomTextInput";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { supabase } from "../app/lib/supabase";
import LinearGradientButton from "../app/components/Buttons/LinearGradientButton";

const EditProfile = ({ navigation }) => {
  const headerHeight = useHeaderHeight();
  const [isLoading, setIsLoading] = useState(false);
  const [imageUri, setImageUri] = useState(null);
  const [imageUriChanged, setimageUriChanged] = useState(false);
  const [name, setName] = useState(null);
  const [bio, setBio] = useState(null);
  const [website, setWebsite] = useState(null);
  const [username, setUsername] = useState("");
  const [isChanged, setIsChanged] = useState(false);
  const [Errors, setErrors] = useState([
    // {
    //   message: "Username already taken",
    //   type: "username",
    // },
    // {
    //   type: "name",
    //   message: "MAX 30 characters",
    // },
    // {
    //   type: "bio",
    //   message: "MAX 150 characters",
    // },
    // {
    //   type: "link",
    //   message: "Invalid URL",
    // },
  ]);

  //get session
  const gS = async () => {
    let data = (await supabase.auth.getSession()).data.session.access_token;
    // console.log(data);
  };

  useEffect(() => {
    setIsLoading(true);
    //todo: get user data
    gS(); // gets session token

    //todo: then set the user info
    setUsername("farhanverse");
    setName("Farhan");
    setBio(`Developer | Designer | Writer | Photographer | Gamer | Foodie`);
    setImageUri(null);
    setImageUri(
      "https://pbs.twimg.com/profile_images/1548735070030204929/SE6zZzFV_400x400.jpg"
    );

    setTimeout(() => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setIsLoading(false);
    }, 0);
  }, []);

  const pickProfileImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0,
      allowsEditing: true,
      base64: false,
      aspect: [1, 1],
    });

    if (!result.canceled) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setImageUri(result.assets[0].uri);
      setIsChanged(true);
    }
  };

  const removeProfileImage = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setImageUri(null);
    setIsChanged(true);
  };

  function isValidURL(url) {
    var pattern = new RegExp(
      "^(https?:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$",
      "i"
    ); // fragment locator
    return !!pattern.test(url);
  }

  //handle submit
  const handleSubmit = () => {
    setErrors([]);

    if (username?.length < 1) {
      setErrors([
        ...Errors,
        {
          message: "Username is required",
          type: "username",
        },
      ]);
      setIsChanged(false);
      return;
    }
    if (website?.length >= 1 && !isValidURL(website)) {
      setErrors([
        ...Errors,
        {
          message: "Invalid URL",
          type: "link",
        },
      ]);
      setIsChanged(false);
      return;
    }

    //todo: send data to server

    // if errors show errors else show success

    setIsChanged(false);

    if (Errors.length === 0) {
      Alert.alert("Success", "Profile updated successfully", [
        {
          text: "OK",
          onPress: () => {
            navigation.goBack();
          },
        },
      ]);
    }
  };

  // memoize scale
  const scaledSize = useMemo(() => scale(155), []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "position" : "height"}
      keyboardVerticalOffset={-38}
      style={{
        backgroundColor: "white",
        height: "100%",
        width: "100%",
      }}
    >
      {isLoading ? (
        <View
          style={{
            height: "100%",
            backgroundColor: "white",
            alignItems: "center",
            justifyContent: "center",
            paddingBottom: headerHeight,
          }}
        >
          <ActivityIndicator />
        </View>
      ) : (
        <ScrollView
          style={{ height: "100%", backgroundColor: "white" }}
          keyboardDismissMode={"on-drag"}
        >
          {/* profile image */}
          {!imageUri && (
            <Pressable
              onPress={pickProfileImage}
              style={{
                marginLeft: "3%",
                height: scaledSize,
                width: scaledSize,
                borderRadius: scaledSize / 2,
                backgroundColor: "white",
                alignItems: "center",
                justifyContent: "center",
                alignSelf: "center",
                marginTop: "4%",
              }}
            >
              <Ionicons
                name="ios-person-add"
                size={scale(50)}
                color="#999999"
              />
            </Pressable>
          )}
          {imageUri && (
            <View
              style={{
                marginLeft: "3%",
                width: scaledSize,
                height: scaledSize,
                alignSelf: "center",
                marginTop: "4%",
              }}
            >
              <Image
                source={
                  imageUri
                    ? {
                        uri: imageUri,
                      }
                    : null
                }
                resizeMode="cover"
                style={{
                  height: scaledSize,
                  width: scaledSize,
                  borderRadius: scaledSize / 2,
                  borderColor: "white",
                  borderWidth: 6,
                  backgroundColor: "white",
                  alignItems: "flex-end",
                }}
              />
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: -scaledSize / 3,
                  // width: scale(25),
                }}
              >
                <TouchableOpacity
                  style={{
                    width: scale(25),
                    height: scale(25),
                    borderRadius: 20,
                    backgroundColor: "white",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: 10,
                  }}
                  onPress={removeProfileImage}
                >
                  <Ionicons name="trash" size={scale(18)} color="red" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    width: scale(25),
                    height: scale(25),
                    borderRadius: 20,
                    backgroundColor: "white",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: 10,
                  }}
                  onPress={pickProfileImage}
                >
                  <Ionicons name="camera" size={scale(18)} color="black" />
                </TouchableOpacity>
              </View>
            </View>
          )}
          <View
            style={{ width: "100%", paddingHorizontal: "5%", marginTop: "6%" }}
          >
            <CustomTextInput
              title="Name"
              placeholder="Optional"
              value={name}
              onChangeText={(text) => {
                setIsChanged(true);
                setName(text);
              }}
              errors={Errors}
            />
            <CustomTextInput
              title="Username"
              placeholder="This is unique to you"
              value={username}
              onChangeText={(text) => {
                setIsChanged(true);
                setUsername(text);
              }}
              errors={Errors}
            />
            <CustomTextInput
              title="Bio"
              placeholder="Introduce yourself to the world 👋"
              value={bio}
              onChangeText={(text) => {
                setIsChanged(true);
                setBio(text);
              }}
              multiLine={true}
              errors={Errors}
            />
            <CustomTextInput
              title="Link"
              placeholder="https://..."
              value={website}
              onChangeText={(text) => {
                setIsChanged(true);
                setWebsite(text);
              }}
              errors={Errors}
            />
          </View>
          <TouchableOpacity
            style={{ width: "100%", paddingHorizontal: "10%", marginTop: "6%" }}
            disabled={!isChanged || username === ""}
            onPress={handleSubmit}
          >
            <LinearGradientButton disabled={!isChanged || username === ""}>
              <CustomText style={{ color: "white" }}>Save</CustomText>
            </LinearGradientButton>
          </TouchableOpacity>
        </ScrollView>
      )}
    </KeyboardAvoidingView>
  );
};

export default EditProfile;
