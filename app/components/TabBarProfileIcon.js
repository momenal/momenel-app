import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";

const TabBarProfileIcon = ({ size, focused }) => {
  return (
    <LinearGradient
      colors={[
        "#FF4082",
        "#B01CEC",
        // "#329BFF",
        // "#4C64FF",
        // "#6536FF",
        // "#8000FF",
      ]}
      start={{ x: 0.0, y: 1.0 }}
      end={{ x: 1.0, y: 1.0 }}
      style={{
        width: size,
        height: size,
        borderRadius: 50,
        padding: focused ? 14 : 0, // This should be the border width you want to have
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
          style={{ width: size, height: size, borderRadius: 500 }}
          source={{
            uri: "https://images.unsplash.com/photo-1549068106-b024baf5062d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
          }}
        />
      </View>
    </LinearGradient>
  );
};

export default TabBarProfileIcon;

const styles = StyleSheet.create({});
