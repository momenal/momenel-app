import {
  ActivityIndicator,
  Alert,
  Dimensions,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import * as Haptics from "expo-haptics";
import React, { useEffect, useMemo, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import CustomText from "../app/components/customText/CustomText";
import { Ionicons } from "@expo/vector-icons";
import LinearGradientButton from "../app/components/Buttons/LinearGradientButton";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Story from "../app/components/Stories/Story";
import { scale } from "../app/utils/Scale";

const UploadStory = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [bgColor, setBgColor] = useState("black");
  const bgColors = [
    // Shades of gray
    "#424242", // Dark shade
    "#9E9E9E", // Medium shade
    "#E5E4E2", // Light shade

    // Shades of red
    "#C62828", // Dark shade
    "#F44336", // Medium shade
    "#FFCDD2", // Light shade

    // Shades of purple
    "#5C50E6",
    "#7068E6",
    "#8F85F7",

    // Shades of green
    "#177245", // Dark shade
    "#8BC34A", // Medium shade
    "#C5E1A5", // Light shade

    // Shades of orange
    "#FFA000", // Dark shade
    "#FFC107", // Medium shade
    "#FFD180", // Light shade

    // Shades of blue
    "#2196F3",
    "#4B8AF7",
    "#6AB7FF",

    // Shades of pink
    "#FB2D4A",
    "#FB607F",
    "#FB92A9",

    // Light shades
    "#F4F4F4",
    "#F0F8FF",
    "#FFF0F5",
    "#FFE4E1",
    "#E9FFDB",
    "#F8F4FF",
    "#F3E5AB",
  ];

  const [content, setContent] = useState();
  const { top: insetsTop } = useSafeAreaInsets();
  useEffect(() => {
    {
      !content && pickContent();
    }
  }, []);
  const pickContent = async () => {
    setIsLoading(true);
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsMultipleSelection: false,
      base64: false,
    });
    if (!result.canceled) {
      setContent(result.assets[0]);
      setIsLoading(false);
    } else {
      setIsLoading(false);
      {
        !content && navigation.goBack();
      }
    }
  };
  const scale25 = useMemo(() => scale(25), []);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: "5%",
          position: "absolute",
          zIndex: 1,
          width: "100%",
          top: insetsTop,
          justifyContent: "space-between",
        }}
      >
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ maxWidth: "75%", paddingVertical: "2%" }}
        >
          <TouchableOpacity
            style={{
              width: scale25,
              height: scale25,
              borderRadius: 100,
              marginRight: 10,
              marginTop: 10,
              borderWidth: 1,
              borderColor: "white",
              backgroundColor: "black",
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() =>
              Alert.prompt(
                "Custom Color",
                "Enter a hex color code or a color name",
                [
                  {
                    text: "OK",
                    onPress: (color) => setBgColor(color),
                  },
                ]
              )
            }
          >
            <Ionicons name="color-fill" size={scale25 - 16} color="white" />
          </TouchableOpacity>
          {bgColors.map((color, index) => (
            <TouchableOpacity
              key={index}
              style={{
                width: scale25,
                height: scale25,
                borderRadius: 100,
                backgroundColor: color,
                marginRight: 10,
                marginTop: 10,
                borderWidth: 1,
                borderColor: "white",
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                setBgColor(color);
              }}
            ></TouchableOpacity>
          ))}
        </ScrollView>
        <TouchableOpacity
          style={{
            marginTop: 10,
            width: scale25,
            height: scale25,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "white",
            borderRadius: 100,
            marginLeft: "1%",
          }}
          onPress={() => navigation.navigate("Home")}
        >
          <Ionicons name="ios-close" size={20} color="black" />
        </TouchableOpacity>
      </View>
      {/* story */}
      <View
        style={{
          //   flex: 1,
          borderRadius: 10,
          overflow: "hidden",
          marginBottom: "2%",
          height: Dimensions.get("window").width * (16 / 9),
        }}
      >
        {content && !isLoading ? (
          <Story
            index={1}
            url={content.uri}
            type={content.type}
            onChange={() => {}}
            onPostionChange={() => {}}
            changeIsPaused={() => {}}
            storyComplete={() => {}}
            bgColor={bgColor}
          />
        ) : (
          <View
            style={{
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ActivityIndicator size={"small"} />
            <CustomText
              style={{ color: "white", marginTop: 20, textAlign: "center" }}
            >
              {`Loading content\nPlease wait`}
            </CustomText>
          </View>
        )}
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
          alignItems: "center",
          marginHorizontal: "5%",
          flex: 1,
        }}
      >
        <Ionicons
          name="add-circle"
          size={scale25 + 8}
          color="white"
          style={{ marginRight: "2%" }}
          onPress={() => pickContent()}
        />
        {/* todo: handle upload */}
        <TouchableOpacity
          style={{ width: "80%" }}
          disabled={!content || isLoading ? true : false}
        >
          <LinearGradientButton disabled={!content || isLoading ? true : false}>
            <CustomText style={{ color: "white" }}>Upload</CustomText>
          </LinearGradientButton>
        </TouchableOpacity>
      </View>
      <StatusBar style="light" />
    </SafeAreaView>
  );
};

export default UploadStory;

const styles = StyleSheet.create({});
