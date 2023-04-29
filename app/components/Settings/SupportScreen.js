import React from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as Clipboard from "expo-clipboard";
import CustomText from "../customText/CustomText";

const SupportScreen = () => {
  const handleCopyEmail = () => {
    Clipboard.setStringAsync("hello@momenel.com");
    Alert.alert(
      "Email copied",
      "The email address has been copied to your clipboard."
    );
  };

  return (
    <View style={styles.container}>
      <CustomText style={styles.title}>Contact Us</CustomText>
      <CustomText style={styles.text}>
        If you have any questions or issues, please send an email to:
      </CustomText>
      <TouchableOpacity onPress={handleCopyEmail}>
        <CustomText style={styles.email}>hello@momenel.com</CustomText>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  text: {
    fontSize: 16,
    textAlign: "center",
  },
  email: {
    color: "#007aff",
    textDecorationLine: "underline",
  },
});

export default SupportScreen;
