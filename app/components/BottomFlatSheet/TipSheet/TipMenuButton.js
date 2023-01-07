import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import CustomText from "../../customText/CustomText";
import CoinIcon from "../../icons/CoinIcon";
import { LinearGradient } from "expo-linear-gradient";
import { scale } from "../../../utils/Scale";

const TipMenuButton = ({ txt, onPress, focused }) => {
  //haddle press
  const handlePress = () => {};

  return (
    <LinearGradient
      colors={["#FF4082", "#B01CEC"]}
      start={{ x: 0.0, y: 0.6 }}
      end={{ x: 1.0, y: 1.0 }}
      style={{
        borderRadius: 6,
        padding: focused ? 4 : 0,
        overflow: "hidden",
      }}
    >
      <TouchableOpacity style={styles.container} onPress={() => onPress(txt)}>
        <CoinIcon size={scale(20)} />
        <CustomText
          style={{
            color: "black",
            fontSize: 17,
            marginHorizontal: 3,
            fontFamily: "Nunito_700Bold",
          }}
        >
          {txt}
        </CustomText>
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default TipMenuButton;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 6,
    // width: 68,
    width: scale(56),
  },
  flex: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
