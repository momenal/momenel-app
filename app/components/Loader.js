import { View, Text } from "react-native";
import React, { useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Lottie from "lottie-react-native";

const Loader = () => {
  const animationRef = useRef(null);
  return (
    <SafeAreaView
      style={{
        // backgroundColor: "pink",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Lottie
        autoPlay
        style={{ width: 220, height: 220 }}
        autoSize
        ref={animationRef}
        source={require("../../assets/loader.json")}
      />
    </SafeAreaView>
  );
};

export default Loader;
