import { Keyboard, Pressable, StyleSheet, TextInput, View } from "react-native";
import { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import CustomText from "../../app/components/customText/CustomText";
import { StatusBar } from "expo-status-bar";
import LinearGradientButton from "../../app/components/Buttons/LinearGradientButton";
import { supabase } from "../../app/lib/supabase";

let baseUrl = "https://api.momenel.com";

const S1 = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [isUsernameAvailable, setIsUsernameAvailable] = useState(null);
  const [isError, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(false);
    if (!username.match(/^[a-zA-Z0-9_]+$/) && username.length > 0) {
      setError("Username can only contain letters, numbers and underscores.");
      setIsUsernameAvailable(null);
    } else if (username.length > 38) {
      setError("Username can only be 38 characters long.");
      setIsUsernameAvailable(null);
    } else if (username.length < 1) {
      setIsUsernameAvailable(null);
      setError("");
    } else {
      isUsernameAvailableFunc(username);
    }
  }, [username]);

  const isUsernameAvailableFunc = async (username) => {
    const { data, error } = await supabase.auth.getSession();
    if (error) {
      return navigation.navigate("Login");
    }
    try {
      let response = await fetch(`${baseUrl}/user/checkUsername/${username}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${data.session.access_token}`,
        },
      });
      if (!response.ok) {
        response = await response.json();
        throw new Error(response.error);
      }
      if (username.length > 0) {
        setIsUsernameAvailable(true);
      }
    } catch (error) {
      setError(error.message);
      setIsUsernameAvailable(null);
    }
  };

  const handleUsernameChange = async (text) => {
    setUsername(text.replace(/\s/g, ""));
    setError("");
  };

  const handleNext = async () => {
    setIsLoading(true);

    const { data, error } = await supabase.auth.getSession();
    if (error) {
      return navigation.navigate("Login");
    }

    try {
      let response = await fetch(`${baseUrl}/user/username/${username}`, {
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
      response = await response.json();
      setUsername("");
      setIsLoading(false);
      navigation.navigate("s2");
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };
  return (
    <View style={{ backgroundColor: "#E8E8E8", flex: 1 }}>
      <Pressable style={styles.container} onPress={() => Keyboard.dismiss()}>
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
          autoCapitalize="none"
          maxLength={38}
        />
        {/* errors */}
        {isError.length > 0 ? (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: "3%",
            }}
          >
            <CustomText style={[styles.subtitle, {}]}>
              {isError.length > 0 === true ? (
                <Ionicons name="warning" size={24} color="red" />
              ) : (
                ""
              )}
            </CustomText>
            <CustomText style={[styles.subtitle]}>
              {isError.length > 0 === true ? isError : ""}
            </CustomText>
          </View>
        ) : null}
        {/* is available */}
        {username.length > 0 && (
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
        )}
        <View
          style={{
            flex: 1,
            justifyContent: "flex-end",
            marginBottom: "10%",
          }}
        >
          <Pressable
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
          </Pressable>
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
  error: {
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
