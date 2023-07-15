import {
  Alert,
  Keyboard,
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";
import CustomText from "../../app/components/customText/CustomText";
import { StatusBar } from "expo-status-bar";
import LinearGradientButton from "../../app/components/Buttons/LinearGradientButton";
import { baseUrl } from "@env";
import { supabase } from "../../app/lib/supabase";

const S2 = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleUsernameChange = (text) => {
    setUsername(text);
  };

  const handleNext = async () => {
    if (username.length < 1) {
      navigation.navigate("s3");
      return;
    } else {
      setIsLoading(true);

      const { data, error } = await supabase.auth.getSession();
      if (error) {
        return navigation.navigate("Login");
      }

      try {
        let response = await fetch(`${baseUrl}/user/name/${username}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${data.session.access_token}`,
          },
        });
        if (!response.ok) {
          response = await response.json();
          throw new Error(response.error);
        }
        navigation.navigate("s3");
        setIsLoading(false);
      } catch (error) {
        Alert.alert("Error", error.message);
        setIsLoading(false);
      }
    }
  };
  return (
    <View style={{ backgroundColor: "#E8E8E8", flex: 1 }}>
      <Pressable style={styles.container} onPress={() => Keyboard.dismiss()}>
        <View style={{ marginBottom: "3%" }}>
          <CustomText style={styles.heading}>
            What is your display name?
          </CustomText>
          <CustomText>
            This can be your real name, an alias or anything.
          </CustomText>
          <CustomText style={styles.subtitle}>
            Don't worry, this is optional.
          </CustomText>
        </View>
        <TextInput
          style={[styles.input]}
          placeholder="Display Name"
          placeholderTextColor={"#9C9C9C"}
          value={username}
          onChangeText={handleUsernameChange}
          numberOfLines={1}
        />
        <View
          style={{
            flex: 1,
            justifyContent: "flex-end",
            marginBottom: "10%",
          }}
        >
          <Pressable onPress={handleNext}>
            <LinearGradientButton style={{ width: "100%" }}>
              <CustomText style={{ color: "white" }}>
                {isLoading
                  ? "Updating"
                  : username.length < 1
                  ? "Skip"
                  : "Continue"}
              </CustomText>
            </LinearGradientButton>
          </Pressable>
        </View>
      </Pressable>
      <StatusBar style="dark" animated={true} />
    </View>
  );
};

export default S2;

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
