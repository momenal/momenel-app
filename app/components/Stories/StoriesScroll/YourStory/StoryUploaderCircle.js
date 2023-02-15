import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useMemo } from "react";
// import * as Haptics from "expo-haptics";
import CustomText from "../../../customText/CustomText";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useBoundStore } from "../../../../Store/useBoundStore";
import * as Haptics from "expo-haptics";

const StoryUploaderCircle = ({ navigation }) => {
  const Height = useMemo(() => Dimensions.get("window").height, []);
  const Width = useMemo(() => Dimensions.get("window").width, []);
  const stories = useBoundStore((state) => state.stories);
  const preview_url = useBoundStore((state) => state.preview_url);

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("YourStory");
        // Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      }}
    >
      <View
        style={{
          alignItems: "center",
          marginRight: 14,
        }}
      >
        {preview_url ? (
          <ImageBackground
            style={{
              // height: 135,
              // width: 96,
              height: Height * 0.148,
              width: Width * 0.23,
              alignItems: "center",
              justifyContent: "flex-end",
            }}
            imageStyle={{ borderRadius: 15 }}
            source={{
              uri: preview_url,
            }}
          >
            <CamIconWrapper Height={Height} navigation={navigation} />
          </ImageBackground>
        ) : (
          <LinearGradient
            colors={["#C3C3C3", "#626262"]}
            style={{
              // height: 135,
              // width: 96,
              height: Height * 0.148,
              width: Width * 0.23,
              alignItems: "center",
              justifyContent: "flex-end",
              borderRadius: 15,
            }}
          >
            <CamIconWrapper Height={Height} navigation={navigation} />
          </LinearGradient>
        )}

        <CustomText
          style={{
            fontSize: 12,
            maxWidth: 75,
            fontFamily: "Nunito_600SemiBold",
            marginTop: 4,
          }}
          numberOfLines={1}
        >
          Your Story
        </CustomText>
      </View>
    </TouchableOpacity>
  );
};

const CamIconWrapper = ({ Height, navigation }) => {
  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    navigation.navigate("UploadStory");
  };
  return (
    <TouchableOpacity
      style={{
        backgroundColor: "#2C2C2C",
        width: Height * 0.044,
        height: Height * 0.044,
        borderRadius: 50,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 2.5,
        borderColor: "#C9C9C9",
        marginBottom: 8,
      }}
      onPress={handlePress}
    >
      {/* <Ionicons name="camera-outline" size={21} color="#DADADA" /> */}

      <Ionicons name="camera-outline" size={Height * 0.024} color="#DADADA" />
    </TouchableOpacity>
  );
};

export default StoryUploaderCircle;

const styles = StyleSheet.create({});
