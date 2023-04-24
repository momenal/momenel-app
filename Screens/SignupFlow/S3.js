import {
  LayoutAnimation,
  Pressable,
  StyleSheet,
  View,
  Image,
  ActivityIndicator,
} from "react-native";
import { useState } from "react";

import { Ionicons } from "@expo/vector-icons";
import CustomText from "../../app/components/customText/CustomText";
import { StatusBar } from "expo-status-bar";
import LinearGradientButton from "../../app/components/Buttons/LinearGradientButton";
import { TouchableOpacity } from "react-native-gesture-handler";
import { scale } from "../../app/utils/Scale";
import * as ImagePicker from "expo-image-picker";

const S3 = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isChanged, setIsChanged] = useState(false);
  const [imageUri, setImageUri] = useState();

  const handleNext = async () => {
    if (isChanged) {
      setIsLoading(true);
      //todo: send image to be uplaoded to server
      setTimeout(() => {
        navigation.navigate("s4", { profile_url: imageUri });
        setIsLoading(false);
      }, 0);
    } else {
      //   navigation.navigate("s4");
      navigation.navigate("s4", { profile_url: null });
    }
  };
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
          Saving profile image
        </CustomText>
      </View>
    );
  }

  return (
    <View style={{ backgroundColor: "#E8E8E8", flex: 1, padding: 20 }}>
      <View style={{ marginBottom: "3%" }}>
        <CustomText style={styles.heading}>Add profile photo</CustomText>
        <CustomText>
          Add a profile photo so your friends know it’s you.
        </CustomText>
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {!imageUri && (
          <Pressable
            onPress={pickProfileImage}
            style={{
              height: scale(200),
              width: scale(200),
              borderRadius: scale(200) / 2,
              backgroundColor: "white",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Ionicons name="ios-person-add" size={scale(50)} color="#999999" />
          </Pressable>
        )}
        {imageUri && (
          <View
            style={
              {
                // width: scale(126),
              }
            }
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
                height: scale(200),
                width: scale(200),
                borderRadius: scale(200) / 2,
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
                marginTop: -scale(200) / 3,
              }}
            >
              <TouchableOpacity
                style={{
                  width: scale(35),
                  height: scale(35),
                  borderRadius: 80,
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
                  width: scale(35),
                  height: scale(35),
                  borderRadius: 80,
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
      </View>
      <View
        style={{
          justifyContent: "flex-end",
          marginBottom: "10%",
        }}
      >
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

export default S3;

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
});
