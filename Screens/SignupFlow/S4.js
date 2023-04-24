import {
  Button,
  Dimensions,
  Keyboard,
  LayoutAnimation,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { supabase } from "../../app/lib/supabase";
import { Ionicons } from "@expo/vector-icons";
import CustomText from "../../app/components/customText/CustomText";
import { StatusBar } from "expo-status-bar";
import LinearGradientButton from "../../app/components/Buttons/LinearGradientButton";
import { TouchableOpacity } from "react-native-gesture-handler";
import { scale } from "../../app/utils/Scale";
import * as ImagePicker from "expo-image-picker";
import { useRoute } from "@react-navigation/native";

const S4 = ({ route, navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isChanged, setIsChanged] = useState(false);
  const [imageUri, setImageUri] = useState();
  const [coverUrl, setCoverUrl] = useState();
  const { profile_url } = route.params;

  useEffect(() => {
    if (profile_url) {
      setImageUri(profile_url);
    }
  }, []);

  const handleNext = async () => {
    if (isChanged) {
      setIsLoading(true);
      //todo: send image to be uplaoded to server
      setTimeout(() => {
        // navigation.navigate("s4");
        setIsLoading(false);
      }, 2000);
    } else {
      navigation.navigate("s4");
    }
  };
  const pickCoverImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0,
      base64: false,
    });

    if (!result.canceled) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setCoverUrl(result.assets[0].uri);
      setIsChanged(true);
    }
  };
  const removeProfileImage = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setCoverUrl(null);
    setIsChanged(false);
  };

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#E8E8E8",
        }}
      >
        <ActivityIndicator color="#0000ff" />
        <CustomText style={{ marginTop: "5%" }}>
          Uploading cover image
        </CustomText>
      </View>
    );
  }

  return (
    <View style={{ backgroundColor: "#E8E8E8", flex: 1, padding: 20 }}>
      <View style={{ marginBottom: "3%" }}>
        <CustomText style={styles.heading}>Pick a cover image</CustomText>
        <CustomText>This will be shown on top of your profile</CustomText>
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            backgroundColor: "white",
            width: "90%",
            // height: "55%",
            borderRadius: 10,
            overflow: "hidden",
          }}
        >
          {coverUrl ? (
            <Pressable
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#9E8CFB",
                width: "100%",
                aspectRatio: 16 / 9,
              }}
              onPress={pickCoverImage}
            >
              <Image
                source={{ uri: coverUrl }}
                style={{ flex: 1, width: "100%", aspectRatio: 16 / 9 }}
              />
            </Pressable>
          ) : (
            <Pressable
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#9E8CFB",
                width: "100%",
                aspectRatio: 16 / 9,
              }}
              onPress={pickCoverImage}
            >
              <Ionicons name="image" size={24} color="#2A00FF" />
              <CustomText
                style={{
                  marginLeft: 10,
                  fontFamily: "Nunito_800ExtraBold",
                  color: "#2A00FF",
                }}
              >
                Upload Photo
              </CustomText>
            </Pressable>
          )}

          <Image
            source={{
              uri: imageUri,
            }}
            style={{
              width: scale(90),
              height: scale(90),
              resizeMode: "cover",
              backgroundColor: "#E8E8E8",
              borderRadius: 200,
              borderColor: "white",
              borderWidth: 3,
              marginTop: -scale(50),
              marginBottom: scale(20),
              marginLeft: "4%",
            }}
          />
        </View>
      </View>
      <View
        style={{
          justifyContent: "flex-end",
          marginBottom: "10%",
        }}
      >
        {isChanged && (
          <TouchableOpacity onPress={removeProfileImage} style={styles.button}>
            <CustomText style={styles.buttonText}>Remove Image</CustomText>
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={handleNext}>
          <LinearGradientButton style={{ width: "100%" }}>
            <CustomText style={{ color: "white" }}>
              {isChanged ? "Save" : "Skip"}
            </CustomText>
          </LinearGradientButton>
        </TouchableOpacity>
      </View>

      <StatusBar style="dark" animated={true} />
    </View>
  );
};

export default S4;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  heading: {
    fontFamily: "Nunito_600SemiBold",
    fontSize: 25,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 15,
    marginBottom: 10,
  },
  input: {
    fontFamily: "Nunito_500Medium",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 13,
    padding: 10,
    paddingHorizontal: 15,
    width: "100%",
    fontSize: 16,
  },
  button: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#F44336",
    padding: 10,
    borderRadius: 10,
    marginBottom: "5%",
  },
  buttonText: {
    color: "#F44336",
    fontWeight: "bold",
    textAlign: "center",
  },
});
