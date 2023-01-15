import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import CustomText from "../customText/CustomText";
import { scale } from "../../utils/Scale";

const PostHeaderButton = ({ onPress, disabled }) => {
  return (
    <TouchableOpacity
      onPress={onPress || null}
      style={{ marginRight: "6%" }}
      disabled={disabled}
    >
      <CustomText
        style={{
          fontFamily: "Nunito_700Bold",
          fontSize: scale(13.5),
          color: disabled ? "#999999" : "#8355E9",
        }}
      >
        Post
      </CustomText>
    </TouchableOpacity>
  );
};

export default PostHeaderButton;
