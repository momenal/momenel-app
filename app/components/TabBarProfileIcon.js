import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useBoundStore } from "../Store/useBoundStore";
import { Ionicons } from "@expo/vector-icons";

const TabBarProfileIcon = ({ size, focused }) => {
  const profile_url = useBoundStore((state) => state.profile_url);
  return (
    <LinearGradient
      colors={["#FF4082", "#B01CEC"]}
      start={{ x: 0.0, y: 1.0 }}
      end={{ x: 1.0, y: 1.0 }}
      style={{
        width: size,
        height: size,
        borderRadius: 50,
        padding: focused ? size * 0.67 : size * 0.6, // This should be the border width you want to have
        overflow: "hidden",
      }}
    >
      <View
        style={{
          flex: 1,
          borderRadius: 100,
          backgroundColor: "#ecf0f1",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          style={{
            width: !focused ? size + size * 0.6 : size,
            height: !focused ? size + size * 0.6 : size,
            borderRadius: 500,
            backgroundColor: "black",
          }}
          resizeMode="center"
          source={{
            uri: profile_url,
          }}
        />
      </View>
    </LinearGradient>
  );
};

export default TabBarProfileIcon;

const styles = StyleSheet.create({});
