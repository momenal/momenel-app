import React, { useEffect, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Lottie from "lottie-react-native";

const Loader = ({ play }) => {
  const animationRef = useRef(null);
  useEffect(() => {
    console.log("play loader");
    animationRef.current?.play(21, 125);
  }, [play]);
  return (
    <Lottie
      // autoPlay
      style={{ width: 220, height: 220 }}
      autoSize
      ref={animationRef}
      source={require("../../assets/loader.json")}
      loop={true}
    />
    // </SafeAreaView>
  );
};

export default Loader;
