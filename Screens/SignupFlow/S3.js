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

const S3 = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleUsernameChange = (text) => {
    setUsername(text.replace(/\s/g, ""));
  };

  const handleNext = async () => {
    if (username.length < 1) {
      navigation.navigate("s3");
      return;
    } else {
      setIsLoading(true);
      //todo: check if username is available and update database with username and navigate to next screen
      setTimeout(() => {
        navigation.navigate("s3");
        setIsLoading(false);
      }, 2000);
    }
  };
  return (
    <View style={{ backgroundColor: "#E8E8E8", flex: 1 }}>
      <Pressable style={styles.container} onPress={() => Keyboard.dismiss()}>
        <View style={{ marginBottom: "3%" }}>
          <CustomText style={styles.heading}>more</CustomText>
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
          <TouchableOpacity onPress={handleNext}>
            <LinearGradientButton style={{ width: "100%" }}>
              <CustomText style={{ color: "white" }}>
                {isLoading
                  ? "Updating"
                  : username.length < 1
                  ? "Skip"
                  : "Continue"}
              </CustomText>
            </LinearGradientButton>
          </TouchableOpacity>
        </View>
      </Pressable>
      <StatusBar style="dark" animated={true} />
    </View>
  );
};

export default S3;

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
