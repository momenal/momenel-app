import { StyleSheet, Text, View } from "react-native";
import React from "react";

const CustomText = (props) => {
  return (
    <Text
      {...props}
      style={[{ fontFamily: "Nunito_500Medium", fontSize: 15 }, props.style]}
      selectable={props.selectable ? props.selectable : false}
    >
      {props.children}
    </Text>
  );
};

export default CustomText;
