import { View, Text, TouchableOpacity } from "react-native";
import React, { useMemo } from "react";
import CustomText from "../customText/CustomText";
import { scale } from "../../utils/Scale";

const AmntTag = ({ value, txt, onPress, disabled = false }) => {
  function kFormatter(num) {
    return Math.abs(num) <= 9999
      ? num.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      : Math.abs(num) > 9999 && Math.abs(num) <= 999940
      ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + "k"
      : Math.abs(num) > 999940 //999999
      ? Math.sign(num) * (Math.abs(num) / 1000000).toFixed(2) + "M"
      : Math.sign(num) * Math.abs(num);
  }

  const scale12 = useMemo(() => scale(12), []);
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={{
        flexDirection: "row",
        alignItems: "baseline",
      }}
    >
      <CustomText
        style={{
          fontFamily: "Nunito_800ExtraBold",
          fontSize: scale12 + 6,
        }}
      >
        {kFormatter(value)}
      </CustomText>
      <CustomText
        style={{
          fontFamily: "Nunito_400Regular",
          fontSize: scale12,
          paddingLeft: "1%",
        }}
      >
        {txt}
      </CustomText>
    </TouchableOpacity>
  );
};

export default AmntTag;
