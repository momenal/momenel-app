import {
  ActivityIndicator,
  Alert,
  Image,
  KeyboardAvoidingView,
  LayoutAnimation,
  Platform,
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

    setTimeout(() => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setIsLoading(false);
    }, 0);
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1.0,
      allowsEditing: true,
      base64: false,
      aspect: [1, 1],
    });

    if (!result.canceled) {
      // console.log(result.assets[0].uri);

      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setImageUri(result.assets[0].uri);
      setIsChanged(true);
    }
  };

  const removeImage = () => {
    setImageUri(
      "https://images.pexels.com/photos/839011/pexels-photo-839011.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    );
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
          <View style={{ width: "100%", alignItems: "center", marginTop: 20 }}>
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
                style={{ width: scale150, height: scale150 }}
              />
            )}

            <View
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
          </View>
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
