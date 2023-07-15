import React from "react";
import { View, Alert } from "react-native";
import { Pressable } from "react-native-gesture-handler";
import * as Clipboard from "expo-clipboard";
import CustomText from "../customText/CustomText";
import { composeAsync } from "expo-mail-composer";
import { useBoundStore } from "../../Store/useBoundStore";
import { Ionicons } from "@expo/vector-icons";
import { scale } from "../../utils/Scale";

const SupportScreen = () => {
  const username = useBoundStore((state) => state.username);
  const handleCopyEmail = () => {
    Clipboard.setStringAsync("hello@momenel.com");
    Alert.alert(
      "Email copied",
      "The email address has been copied to your clipboard."
    );
  };
  const sendFeedback = () => {
    composeAsync({
      recipients: ["hello@momenel.com"],
      subject: `Support: @${username}`,
      body: "Please describe your issue or feedback below:",
    }).catch(() =>
      Alert.alert(
        "Unable To Send Feedback",
        "Copy the support email and please add your username in the subject line.",
        [
          {
            text: "Copy support email",
            onPress: () => handleCopyEmail(),
          },
          {
            text: "OK",
          },
        ]
      )
    );
  };
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View
        style={{
          backgroundColor: "#e7e7e9",
          padding: "5%",
          marginHorizontal: "7%",
          marginTop: "4%",
          borderRadius: 10,
        }}
      >
        <Ionicons name="mail-open" size={scale(24)} color="#007aff" />
        <CustomText
          style={{
            fontSize: 20,
            fontWeight: "bold",
            marginBottom: 16,
            marginTop: "2%",
          }}
        >
          Need help?
        </CustomText>
        <CustomText>
          Our team is here to help. If you have any questions or issues, please
          press the button below to send us an email.
        </CustomText>
        <Pressable
          style={{
            backgroundColor: "#007aff",
            padding: "5%",
            marginTop: "9%",
            borderRadius: 10,
          }}
          onPress={sendFeedback}
        >
          <CustomText
            style={{
              color: "white",
            }}
          >
            Email us {"\u2794"}
          </CustomText>
        </Pressable>
      </View>

      <View
        style={{
          marginHorizontal: "7%",
          marginTop: "5%",
          backgroundColor: "#e7e7e9",
          paddingHorizontal: "5%",
          paddingVertical: "5%",
          borderRadius: 10,
        }}
      >
        <CustomText
          style={{
            fontSize: 14,
          }}
        >
          If the button above does not work, please send an email to:
        </CustomText>
        <Pressable onPress={handleCopyEmail}>
          <CustomText
            style={{
              color: "#007aff",
              textDecorationLine: "underline",
            }}
          >
            hello@momenel.com
          </CustomText>
        </Pressable>
      </View>
    </View>
  );
};

export default SupportScreen;
