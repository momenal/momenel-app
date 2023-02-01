import { View, Text, TouchableOpacity } from "react-native";
import React, { useMemo } from "react";
import CustomText from "../customText/CustomText";
import { scale } from "../../utils/Scale";

const AmntTag = ({ value, txt, onPress, disabled = false }) => {
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
        {value}
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
