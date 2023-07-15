import { View, Text, Pressable } from "react-native";
import React, { useMemo } from "react";
import CustomText from "../customText/CustomText";
import { scale } from "../../utils/Scale";

const AmntTag = ({ value, txt, onPress, disabled = false }) => {
  function kFormatter(num) {
    return Math.abs(num) <= 9999
      ? num.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      : Math.abs(num) > 9999 && Math.abs(num) <= 999940
      ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + "k"
      : Math.abs(num) > 999940
      ? Math.sign(num) * (Math.abs(num) / 1000000).toFixed(2) + "M"
      : Math.sign(num) * Math.abs(num);
  }

  const scale12 = useMemo(() => scale(12), []);
  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      style={{
        alignItems: "center",
      }}
    >
      <CustomText
        style={{
          fontFamily: "Nunito_700Bold",
          fontSize: scale12 + 6,
        }}
      >
        {kFormatter(value)}
      </CustomText>
      <CustomText
        style={{
          fontFamily: "Nunito_500Medium",
          fontSize: scale12 - 1,
          paddingLeft: "1%",
          color: "#757575",
        }}
      >
        {txt}
      </CustomText>
    </Pressable>
  );
};

export default AmntTag;
