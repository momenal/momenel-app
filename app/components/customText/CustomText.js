import { StyleSheet, Text, View } from "react-native";
import React from "react";

const CustomText = (props) => {
  return (
    <Text style={[styles.defaultText, props.style]} {...props}>
      {props.children}
    </Text>
  );
};

export default CustomText;

const styles = StyleSheet.create({
  defaultText: {
    fontFamily: "Nunito_600SemiBold",
    fontSize: 15,
  },
});
