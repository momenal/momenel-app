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
import * as WebBrowser from "expo-web-browser";

const CreateAccount = ({ hideBottomSignup }) => {
  const [username, setUsername] = useState("");
  const [isunique, setIsunique] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function signUpWithEmail() {
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: { username: username },
      },
    });

    if (error) {
      Alert.alert(error.message);
    } else {
      //registered
      hideBottomSignup(false);
      setUsername("");
      setEmail("");
      setPassword("");
    }
    setLoading(false);
  }

  const _handlePressButtonAsync = async (url) => {
    await WebBrowser.openBrowserAsync(url);
  };

  return (
    <View style={styles.container}>
      <View>
        <CustomText
          style={{
            fontFamily: "Nunito_700Bold",
            fontSize: 30,
            // marginBottom: 20,
          }}
        >
          Create an Account
        </CustomText>
        <CustomText
          style={{
            fontSize: 14,
            marginBottom: 20,
          }}
        >
          Welcome to Momenel 👋
        </CustomText>
      </View>
      <View style={styles.textViews}>
        <BottomSheetTextInput
          style={styles.textInput}
          placeholder="Username"
          placeholderTextColor={"#9C9C9C"}
          value={username}
          onChangeText={(text) => setUsername(text)}
          keyboardAppearance={"dark"}
          blurOnSubmit={true}
          returnKeyType="done"
        />
        {isunique === false && (
          <CustomText style={styles.errorText}>
            Username already exists!
          </CustomText>
        )}
      </View>
      <View style={styles.textViews}>
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
        />
      </View>
      <View style={styles.textViews}>
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
      </View>

      <TouchableOpacity disabled={loading} onPress={() => signUpWithEmail()}>
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
            Create Account
          </CustomText>
        </LinearGradientButton>
      </TouchableOpacity>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          marginTop: 20,
        }}
      >
        <CustomText
          style={styles.termsText}
          // adjustsFontSizeToFit
          // numberOfLines={2}
        >
          By signing up, I cofirmed that I have read and agreed to Momenel’s{" "}
          <CustomText
            style={[styles.termsText, styles.textUnderline]}
            onPress={() => _handlePressButtonAsync("https://expo.dev")}
          >
            Terms Of Service
          </CustomText>
          ,{" "}
          <CustomText
            style={[styles.termsText, styles.textUnderline]}
            onPress={() =>
              _handlePressButtonAsync("https://www.momenel.com/privacy")
            }
          >
            Privacy
          </CustomText>
          .
        </CustomText>
      </View>
    </View>
  );
};

export default CreateAccount;

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
  },
  textViews: { marginBottom: 20 },
  errorText: { color: "red" },
  termsText: {
    fontFamily: "Nunito_500Medium",
    fontSize: 13,
    // width: "100%",
    textAlign: "center",
    color: "black",
    // paddingVertical: "4%",
  },
  textUnderline: {
    textDecorationLine: "underline",
    textDecorationStyle: "double",
    fontFamily: "Nunito_700Bold",
  },
});