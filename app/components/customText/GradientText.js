import React from "react";
import { Text } from "react-native";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";

const GradientText = (props) => {
  return (
    <MaskedView
      maskElement={
        <Text
          {...props}
          style={[{ opacity: 1, fontFamily: "Nunito_500Medium" }, props.style]}
        />
      }
    >
      <LinearGradient
        colors={["#8355E9", "#C149B4", "#FF3E80"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0.5, y: 0 }}
      >
        <Text
          {...props}
          style={[{ opacity: 0, fontFamily: "Nunito_500Medium" }, props.style]}
        />
      </LinearGradient>
    </MaskedView>
  );
};

export default GradientText;
