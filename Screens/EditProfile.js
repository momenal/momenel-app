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

import React, { useEffect, useMemo, useState } from "react";
import { scale } from "../app/utils/Scale";
import { useHeaderHeight } from "@react-navigation/elements";
import CustomText from "../app/components/customText/CustomText";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as ImagePicker from "expo-image-picker";
import LinearGradientButton from "../app/components/Buttons/LinearGradientButton";
import { Ionicons } from "@expo/vector-icons";
import { supabase } from "../app/lib/supabase";

const EditProfile = ({ navigation }) => {
  const headerHeight = useHeaderHeight();
  const [isLoading, setIsLoading] = useState(false);
  const [imageUri, setImageUri] = useState(null);
  const [cover_url, setCover_url] = useState(null);
  const [name, setName] = useState(null);
  const [bio, setBio] = useState(null);
  const [website, setWebsite] = useState(null);
  const [username, setUsername] = useState("farhanverse");
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
  const bgColors = [
    "#C7EFCF",
    "#FEC7C7",
    "#C7DFFD",
    "#363946",
    "#EDA2C0",
    "#f5bfd7",
    "#f0eafc",
  ];

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
    setCover_url(null);
    // setImageUri(
    //   "https://images.unsplash.com/photo-1677264547603-d67614ae255b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
    // );

    // setCover_url(
    //   "https://images.unsplash.com/photo-1485965120184-e220f721d03e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
    // );

    setTimeout(() => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setIsLoading(false);
    }, 0);
  }, []);

  // update header right button
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button title="Save" disabled={!isChanged} onPress={handleSubmit} />
      ),
    });
  }, [navigation, isChanged]);

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
  const pickCoverImage = async () => {
    let result;
    Platform.OS === "ios"
      ? (result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          quality: 1.0,
          base64: false,
        }))
      : (result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          quality: 1.0,
          allowsEditing: true,
          base64: false,
          aspect: [9, 16],
        }));

    if (!result.canceled) {
      // console.log(result.assets[0].uri);

      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setCover_url(result.assets[0].uri);
      setIsChanged(true);
    }
  };

  const removeProfileImage = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setImageUri(null);
    setIsChanged(true);
  };
  const removeCoverImage = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setCover_url(null);
    setIsChanged(true);
  };

  // validate url function
  function isValidHttpUrl(string) {
    let url;
    try {
      url = new URL(string);
    } catch (_) {
      return false;
    }
    return url.protocol === "https:";
  }

  //handle submit
  const handleSubmit = () => {
    // validate inputs
    if (website && !isValidHttpUrl(website)) {
      setErrors([
        {
          message: "Invalid URL",
          type: "link",
        },
      ]);
      return;
    }

    //todo: send data to server

    // if errors show errors else show success
    // setErrors([
    //   {
    //     message: "Username already taken",
    //     type: "username",
    //   },
    // ]);

    setIsChanged(false);
    // Alert.alert("Success", "Profile updated successfully");
  };

  const scale150 = useMemo(() => scale(150), []);
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
          {!cover_url && (
            <Pressable
              style={{
                height: (Dimensions.get("window").width * 9) / 16,
                maxHeight: (Dimensions.get("window").width * 9) / 16,
                backgroundColor: "white",
                alignItems: "flex-end",
                justifyContent: "flex-end",
                backgroundColor:
                  bgColors[Math.floor(Math.random() * bgColors.length)],
              }}
            >
              <TouchableOpacity
                style={{
                  padding: "2%",
                  borderRadius: 20,
                  backgroundColor: "white",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: 10,
                }}
                onPress={pickCoverImage}
              >
                <Ionicons name="camera" size={scale(18)} color="black" />
              </TouchableOpacity>
            </Pressable>
          )}
          {cover_url && (
            <ImageBackground
              source={
                cover_url
                  ? {
                      uri: cover_url,
                    }
                  : null
              }
              resizeMode="cover"
              style={{
                height: (Dimensions.get("window").width * 9) / 16,
                maxHeight: (Dimensions.get("window").width * 9) / 16,
                backgroundColor: "white",
                alignItems: "flex-end",
                justifyContent: "flex-end",
                backgroundColor:
                  bgColors[Math.floor(Math.random() * bgColors.length)],
              }}
              imageStyle={{
                //   height: Dimensions.get("window").width,
                height: (Dimensions.get("window").width * 9) / 16,
                //   maxHeight: (Dimensions.get("window").width * 9) / 16,
              }}
            >
              <TouchableOpacity
                style={{
                  padding: "2%",
                  borderRadius: 20,
                  backgroundColor: "white",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: 10,
                }}
                onPress={pickCoverImage}
              >
                <Ionicons name="camera" size={scale(18)} color="black" />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  padding: "2%",
                  borderRadius: 20,
                  backgroundColor: "white",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: 10,
                }}
                onPress={removeCoverImage}
              >
                <Ionicons name="trash" size={scale(15)} color="red" />
              </TouchableOpacity>
            </ImageBackground>
          )}
          {/* profile image */}
          {!imageUri && (
            <Pressable
              onPress={pickProfileImage}
              style={{
                marginLeft: "3%",
                height: scale(126),
                width: scale(126),
                borderRadius: scale(126) / 2,
                marginTop: (-Dimensions.get("window").width * 9) / 44,
                backgroundColor: "white",
                alignItems: "center",
                justifyContent: "center",
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
                marginTop: (-Dimensions.get("window").width * 9) / 44,
                width: scale(126),
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
                  height: scale(126),
                  width: scale(126),
                  borderRadius: scale(126) / 2,
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
                  marginTop: -scale(126) / 3,
                  // width: scale(25),
                  // backgroundColor: "red",
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
          {/* <View style={{ width: "100%", alignItems: "center", marginTop: 20 }}> 
            {!imageUri ? (
              <Ionicons
                name="person-circle-sharp"
                size={scale150 - 70}
                color="#999999"
              />
            ) : (
              <Image
                source={
                  imageUri
                    ? {
                        uri: imageUri,
                      }
                    : null
                }
                style={{
                  width: scale150,
                  height: scale150,
                  borderRadius: scale150 / 2,
                }}
              />
            )} */}

          {/* <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                width: "100%",
                marginTop: "5%",
              }}
            >
              <TouchableOpacity
                style={{ width: 200, marginRight: "4%" }}
                onPress={pickImage}
              >
                <LinearGradientButton>
                  <CustomText style={{ color: "white" }}>Upload</CustomText>
                </LinearGradientButton>
              </TouchableOpacity>
              <TouchableOpacity style={{ padding: 5 }} onPress={removeImage}>
                <Ionicons name="md-trash-outline" size={24} color="red" />
              </TouchableOpacity>
            </View>
          </View>*/}
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
          {/* <TouchableOpacity
            style={{ width: "100%", paddingHorizontal: "10%", marginTop: "6%" }}
            disabled={!isChanged || username === ""}
            onPress={handleSubmit}
          >
            <LinearGradientButton disabled={!isChanged || username === ""}>
              <CustomText style={{ color: "white" }}>Save</CustomText>
            </LinearGradientButton>
          </TouchableOpacity> */}
        </ScrollView>
      )}
    </KeyboardAvoidingView>
  );
};

const CustomTextInput = ({
  title,
  placeholder,
  value,
  onChangeText,
  multiLine = false,
  errors,
}) => {
  const [isErrors, setIsErrors] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  useEffect(() => {
    errors.map((error) => {
      if (error.type === title.toLowerCase()) {
        setErrorMessage(error.message);
      }
    });
  }, [errors]);

  const OnChangeTextWrapper = (text) => {
    if (errorMessage) {
      setErrorMessage(null);
    }
    onChangeText(text);
  };
  return (
    <View
      style={{
        marginBottom: "5%",
      }}
    >
      {errorMessage && (
        <CustomText
          style={{
            color: "red",
            fontSize: 13,
            fontFamily: "Nunito_400Regular",
          }}
        >
          {errorMessage}
        </CustomText>
      )}
      <CustomText>{title}</CustomText>
      <TextInput
        style={{
          borderBottomWidth: 1,
          borderBottomColor: errorMessage ? "red" : "#999999",
          color: errorMessage ? "red" : "black",
          fontFamily: "Nunito_600SemiBold",
          fontSize: 15,
          marginTop: "2%",
          paddingBottom: "3%",
          maxHeight: multiLine ? 150 : 50,
        }}
        multiline={multiLine}
        placeholder={placeholder}
        placeholderTextColor="#999999"
        onChangeText={OnChangeTextWrapper}
        value={value}
        autoCapitalize="none"
      />
    </View>
  );
};

export default EditProfile;
