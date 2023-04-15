import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
  LayoutAnimation,
  Alert,
} from "react-native";
import LinearGradientButton from "../Buttons/LinearGradientButton";
import CustomText from "../customText/CustomText";

const PersonalInfo = () => {
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const handleUpdate = () => {
    // TODO: Implement update logic
    console.log("Update");
    console.log(email + " ");
    console.log(birthday);

    Alert.alert(
      "Updated",
      "Your personal information has been updated successfully.",
      [
        {
          text: "OK",
          onPress: () => console.log("OK Pressed"),
        },
      ],
      { cancelable: false }
    );
  };

  useEffect(() => {
    fetch("https://run.mocky.io/v3/8ca7dda6-3f85-4934-93fb-a9110a2ecd79")
      .then((response) => response.json())
      .then((data) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setEmail(data.email);
        setBirthday(data.birthday);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        {isLoading ? (
          <ActivityIndicator size="small" />
        ) : (
          <>
            <CustomText style={styles.label}>Email Address</CustomText>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              autoCompleteType="email"
              keyboardType="email-address"
              textContentType="emailAddress"
              selectTextOnFocus={true}
              spellCheck={false}
            />
            <CustomText style={styles.label}>Birthday</CustomText>
            <TextInput
              style={styles.input}
              value={birthday}
              onChangeText={setBirthday}
              autoCapitalize="none"
              autoCompleteType="off"
              keyboardType="numeric"
              textContentType="none"
              selectTextOnFocus={true}
              spellCheck={false}
            />
            <TouchableOpacity
              style={{
                width: "100%",
                alignItems: "center",
                marginBottom: "5%",
              }}
              onPress={handleUpdate}
            >
              <LinearGradientButton
                style={{
                  width: "100%",
                  marginTop: "5%",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <CustomText
                  style={{
                    color: "white",
                    fontFamily: "Nunito_700Bold",
                    fontSize: 17,
                    marginRight: "2%",
                  }}
                >
                  Update
                </CustomText>
              </LinearGradientButton>
            </TouchableOpacity>
          </>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Nunito_700Bold",
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
    marginBottom: 16,
  },
});

export default PersonalInfo;
