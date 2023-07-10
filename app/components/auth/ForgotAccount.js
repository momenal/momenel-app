import {
  Alert,
  Keyboard,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import CustomText from "../customText/CustomText";
import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import LinearGradientButton from "../Buttons/LinearGradientButton";
import { supabase } from "../../lib/supabase";

const ForgotAccount = ({ setShowForgotPasswordBottomSheet }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const resetPassword = async () => {
    setLoading(true);
    setError("");

    if (email.length < 1) {
      setError("Please enter your email address");
      setLoading(false);
      return;
    }

    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "https://www.momenel.com/update",
    });

    if (error) {
      setEmail("");

      setError("oops! something went wrong. Please contact support.");
    }

    if (data) {
      Keyboard.dismiss();
      Alert.alert(
        "Email Sent",
        "Check your email for the password reset link.",
        [
          {
            text: "OK",
            onPress: () => {
              setEmail("");
              setLoading(false);
              setShowForgotPasswordBottomSheet(false);
            },
          },
        ]
      );
    }
  };

  return (
    <View style={styles.container}>
      <CustomText
        style={{ fontFamily: "Nunito_700Bold", fontSize: 30, marginBottom: 20 }}
      >
        Forgot Password?
      </CustomText>
      {error ? (
        <CustomText style={{ marginBottom: 5, marginLeft: 5, color: "red" }}>
          {error}
        </CustomText>
      ) : (
        <></>
      )}
      <BottomSheetTextInput
        style={styles.textInput}
        placeholder="Email"
        placeholderTextColor={"#9C9C9C"}
        value={email}
        onChangeText={(text) => setEmail(text)}
        keyboardAppearance={"dark"}
        keyboardType={"email-address"}
        blurOnSubmit={true}
        returnKeyType="done"
        autoComplete="email"
        autoCapitalize="none"
      />
      <TouchableOpacity disabled={loading} onPress={() => resetPassword()}>
        <LinearGradientButton style={{ width: "100%", borderRadius: 10 }}>
          <CustomText
            style={{
              fontFamily: "Nunito_800ExtraBold",
              fontSize: 14,
              width: "100%",
              textAlign: "center",
              color: "white",
              paddingVertical: "2%",
            }}
          >
            Reset Password
          </CustomText>
        </LinearGradientButton>
      </TouchableOpacity>
    </View>
  );
};

export default ForgotAccount;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: "6%",
    paddingBottom: "5%",
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#9C9C9C",
    borderRadius: 8,
    paddingHorizontal: 13,
    paddingVertical: "4%",
    color: "black",
    fontFamily: "Nunito_500Medium",
    fontSize: 15,
    marginBottom: 20,
  },
});
