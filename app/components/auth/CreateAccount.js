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
import * as Haptics from "expo-haptics";

const CreateAccount = ({ onReportPress, onUserExists }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ type: "", message: "" });

  async function signUpWithEmail() {
    setLoading(true);
    setError({ type: "", message: "" });
    //check if email already exists
    const res = await supabase
      .from("profiles")
      .select("email")
      .eq("email", email.toLowerCase());

    if (res.data.length > 0) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      setError({ type: "auth", message: "User Already exists!" });
      onUserExists();
    } else {
      // if email does not exist, create user
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          emailRedirectTo: "https://www.momenel.com/confirm-email",
        },
        data: {
          dob: "12/12/1990",
        },
      });
      if (error) {
        //! error messages
        if (error.message.includes("invalid format")) {
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
          setError({ type: "email", message: "Invalid Email Format" });
        } else if (error.message.includes("provide your email")) {
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
          setError({ type: "email", message: error.message });
        } else if (
          error.message.includes("password") ||
          error.message.includes("Password")
        ) {
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
          setError({ type: "password", message: error.message });
        } else {
          setError({ type: "auth", message: error.message });
        }
        // Alert.alert(error.message);
      } else {
        onReportPress();
      }
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
      {error.type === "auth" ? (
        <CustomText
          style={{
            // marginBottom: 5,
            marginBottom: 20,
            color: "red",
            fontSize: 16,
            width: "100%",
            textAlign: "center",
          }}
        >
          {error.message}
        </CustomText>
      ) : (
        <></>
      )}
      <View style={styles.textViews}>
        {error.type === "email" ? (
          <CustomText
            style={{
              marginBottom: 5,
              color: "red",
            }}
          >
            {error.message}
          </CustomText>
        ) : (
          <></>
        )}
        <BottomSheetTextInput
          style={[
            styles.textInput,
            error.type === "email" ? styles.errorBorder : {},
          ]}
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
        {error.type === "password" ? (
          <CustomText
            style={{
              marginBottom: 5,
              color: "red",
            }}
          >
            {error.message}
          </CustomText>
        ) : (
          <></>
        )}
        <BottomSheetTextInput
          style={[
            styles.textInput,
            error.type === "password" ? styles.errorBorder : {},
          ]}
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
        <CustomText style={styles.termsText}>
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
  errorBorder: { borderColor: "red" },
  termsText: {
    fontFamily: "Nunito_500Medium",
    fontSize: 13,
    textAlign: "center",
    color: "black",
  },
  textUnderline: {
    textDecorationLine: "underline",
    textDecorationStyle: "double",
    fontFamily: "Nunito_700Bold",
  },
});
