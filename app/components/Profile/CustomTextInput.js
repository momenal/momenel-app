import { View, Text, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import CustomText from "../customText/CustomText";

const CustomTextInput = ({
  title,
  placeholder,
  value,
  onChangeText,
  multiLine = false,
  errors,
  keyboardType,
}) => {
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    errors.map((error) => {
      if (error.type === title.toLowerCase()) {
        setErrorMessage(error.message);
      }
    });
  }, [errors]);

  const OnChangeTextWrapper = (text) => {
    if (errorMessage) {
      setErrorMessage(null);
    }
    onChangeText(text);
  };
  return (
    <View
      style={{
        marginBottom: "5%",
      }}
    >
      {errorMessage && (
        <CustomText
          style={{
            color: "red",
            fontSize: 13,
            fontFamily: "Nunito_400Regular",
          }}
        >
          {errorMessage}
        </CustomText>
      )}
      <CustomText>{title}</CustomText>
      <TextInput
        style={{
          borderBottomWidth: 1,
          borderBottomColor: errorMessage ? "red" : "#999999",
          color: errorMessage ? "red" : "black",
          fontFamily: "Nunito_600SemiBold",
          fontSize: 15,
          marginTop: "2%",
          paddingBottom: "3%",
          maxHeight: multiLine ? 150 : 50,
        }}
        multiline={multiLine}
        placeholder={placeholder}
        placeholderTextColor="#999999"
        onChangeText={OnChangeTextWrapper}
        value={value}
        autoCapitalize="none"
        keyboardType={keyboardType ? keyboardType : "default"}
      />
    </View>
  );
};

export default CustomTextInput;
