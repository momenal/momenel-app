import { View, Text } from "react-native";
import React from "react";
import CustomText from "../../customText/CustomText";

const TipMenuButton = () => {
  return (
    <View>
      <CustomText
        style={{
          fontFamily: "Nunito_700Bold",
          color: "white",
          fontSize: 18,
        }}
      >
        20
      </CustomText>
    </View>
  );
};

export default TipMenuButton;
