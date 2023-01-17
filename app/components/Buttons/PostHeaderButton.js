import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import CustomText from "../customText/CustomText";
import { scale } from "../../utils/Scale";

const PostHeaderButton = ({ onPress, disabled, style }) => {
  return (
    <TouchableOpacity
      onPress={onPress || null}
      style={style}
      disabled={disabled}
    >
      <CustomText
        style={{
          fontFamily: "Nunito_700Bold",
          fontSize: scale(14),
          color: disabled ? "#999999" : "#8355E9",
        }}
      >
        Post
      </CustomText>
    </TouchableOpacity>
  );
};

export default PostHeaderButton;
