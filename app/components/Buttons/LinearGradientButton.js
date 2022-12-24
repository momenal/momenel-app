import React from "react";
import { LinearGradient } from "expo-linear-gradient";

const LinearGradientButton = (props) => {
  return (
    <LinearGradient
      colors={!props.disabled ? ["#FF4082", "#8456E9"] : ["#999999", "#999999"]}
      start={{ x: 0.3, y: 1.0 }}
      end={{ x: 1, y: 1.0 }}
      style={[
        {
          width: "40%",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 9,
          paddingVertical: 8,
        },
        props.style,
      ]}
    >
      {props.children}
    </LinearGradient>
  );
};

export default LinearGradientButton;
