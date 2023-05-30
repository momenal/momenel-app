import { useState, useEffect } from "react";
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
import { supabase } from "../../lib/supabase";

const ChangeEmail = ({ navigation }) => {
  const [oldEmail, setOldEmail] = useState();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const handleUpdate = async () => {
    if (oldEmail !== email) {
      const { data, error } = await supabase.auth.updateUser({ email: email });
      if (error) {
        Alert.alert("Error", error.message);
      } else {
        Alert.alert(
          "Email Verification sent.",
          "Please Verify your email address to change your email.",
          [{ text: "OK", onPress: () => navigation.navigate("PersonalInfo") }]
        );
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    //get current email
    const {
      data: {
        user: { email },
      },
    } = await supabase.auth.getUser();
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setEmail(email);
    setOldEmail(email);
    setIsLoading(false);
  };

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
              onChangeText={(t) => {
                setEmail(t);
              }}
              autoCapitalize="none"
              autoCompleteType="email"
              keyboardType="email-address"
              textContentType="emailAddress"
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
              disabled={oldEmail === email}
            >
              <LinearGradientButton
                disabled={oldEmail === email}
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

export default ChangeEmail;

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
