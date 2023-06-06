import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import CustomText from "../customText/CustomText";
import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import LinearGradientButton from "../Buttons/LinearGradientButton";
import { supabase } from "../../lib/supabase";

const SignIn = ({
  setShowForgotPasswordBottomSheet,
  setShowSigninBottomSheet,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function signInWithEmail() {
    setLoading(true);
    setError("");
    const { error, data } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      setError("Incorrect Email or Password");
      setEmail("");
      setPassword("");
    }
    setLoading(false);
  }

  async function forgetPassword() {
    setShowForgotPasswordBottomSheet(true);
    setShowSigninBottomSheet(false);
  }

  return (
    <View style={styles.container}>
      <CustomText
        style={{ fontFamily: "Nunito_700Bold", fontSize: 30, marginBottom: 20 }}
      >
        Let’s sign you in.
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
      <BottomSheetTextInput
        style={styles.textInput}
        placeholder="Password"
        placeholderTextColor={"#9C9C9C"}
        value={password}
        onChangeText={(text) => setPassword(text)}
        keyboardAppearance={"dark"}
        secureTextEntry
        blurOnSubmit={true}
        returnKeyType="done"
      />
      <TouchableOpacity disabled={loading} onPress={() => signInWithEmail()}>
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
            Sign in
          </CustomText>
        </LinearGradientButton>
      </TouchableOpacity>
      <CustomText
        onPress={forgetPassword}
        style={{
          fontSize: 14,
          width: "100%",
          textAlign: "center",
          color: "#9C9C9C",
          paddingVertical: "2%",
          marginTop: 15,
        }}
      >
        Forgot password?
      </CustomText>
    </View>
  );
};

export default SignIn;

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
