import {
  Button,
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { supabase } from "../../app/lib/supabase";
import { Ionicons } from "@expo/vector-icons";
import CustomText from "../../app/components/customText/CustomText";
import { StatusBar } from "expo-status-bar";
import LinearGradientButton from "../../app/components/Buttons/LinearGradientButton";
import { TouchableOpacity } from "react-native-gesture-handler";

const S1 = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [isUsernameAvailable, setIsUsernameAvailable] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleUsernameChange = (text) => {
    //todo: check if username is available

    if (text.length > 0) {
      setIsUsernameAvailable(true);
    } else {
      setIsUsernameAvailable(null);
    }
    setUsername(text.replace(/\s/g, ""));
  };

  const handleNext = async () => {
    setIsLoading(true);
    //todo: check if username is available and update database with username and navigate to next screen
    setTimeout(() => {
      navigation.navigate("s2");
      setIsLoading(false);
    }, 2000);
  };
  return (
    <View style={{ backgroundColor: "#E8E8E8", flex: 1 }}>
      <Pressable style={styles.container} onPress={() => Keyboard.dismiss()}>
        <Button onPress={() => supabase.auth.signOut()} title="our" />
        <View style={{ marginBottom: "3%" }}>
          <CustomText style={styles.heading}>
            What should we call you?
          </CustomText>
          <CustomText style={styles.subtitle}>
            Your @username is unique. You can always change it later.
          </CustomText>
        </View>
        <TextInput
          style={[
            styles.input,
            {
              borderColor:
                username.length < 1
                  ? "#ccc"
                  : isUsernameAvailable
                  ? "green"
                  : isUsernameAvailable === null
                  ? "#ccc"
                  : !isUsernameAvailable
                  ? "red"
                  : "",
            },
          ]}
          placeholder="Username"
          placeholderTextColor={"#9C9C9C"}
          value={username}
          onChangeText={handleUsernameChange}
          numberOfLines={1}
        />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: "3%",
          }}
        >
          <CustomText style={[styles.subtitle, {}]}>
            {isUsernameAvailable === true ? (
              <Ionicons name="checkmark-circle" size={24} color="green" />
            ) : isUsernameAvailable === false ? (
              <Ionicons name="close-circle" size={24} color="red" />
            ) : (
              ""
            )}
          </CustomText>
          <CustomText style={[styles.subtitle]}>
            {isUsernameAvailable === true
              ? " Username is available"
              : isUsernameAvailable === false
              ? " Username is not available"
              : ""}
          </CustomText>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: "flex-end",
            marginBottom: "10%",
          }}
        >
          <TouchableOpacity
            disabled={
              username.length < 1 || !isUsernameAvailable || isLoading
                ? true
                : false
            }
            onPress={handleNext}
          >
            <LinearGradientButton
              style={{ width: "100%" }}
              disabled={
                username.length < 1 || !isUsernameAvailable || isLoading
                  ? true
                  : false
              }
            >
              <CustomText style={{ color: "white" }}>
                {isLoading ? "Updating" : "Continue"}
              </CustomText>
            </LinearGradientButton>
          </TouchableOpacity>
        </View>
      </Pressable>
      <StatusBar style="dark" animated={true} />
    </View>
  );
};

export default S1;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  heading: {
    fontFamily: "Nunito_600SemiBold",
    fontSize: 25,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 15,
    marginBottom: 10,
  },
  input: {
    fontFamily: "Nunito_500Medium",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 13,
    padding: 10,
    paddingHorizontal: 15,
    width: "100%",
    fontSize: 16,
  },
});
