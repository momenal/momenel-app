import { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Pressable,
  StyleSheet,
  Keyboard,
  ActivityIndicator,
  LayoutAnimation,
  Alert,
} from "react-native";
import LinearGradientButton from "../Buttons/LinearGradientButton";
import CustomText from "../customText/CustomText";
import { supabase } from "../../lib/supabase";
import { baseUrl } from "@env";

const ChangeBirthday = ({ navigation }) => {
  const [oldData, setOldData] = useState({});
  const [birthday, setBirthday] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const handleUpdate = async () => {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();
    if (error) {
      Alert.alert("Error", "Please try again");
    } else {
      let headersList = {
        Accept: "*/*",
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.access_token}`,
      };

      let bodyContent = JSON.stringify({
        birthday: oldData.date_of_birth === birthday ? null : birthday,
      });
      let response = await fetch(`${baseUrl}/user/updatePersonalInfo`, {
        method: "POST",
        body: bodyContent,
        headers: headersList,
      });
      let data = await response.json();
      if (data.error) {
        Alert.alert("Error", data.error);
      } else {
        Alert.alert(
          "Updated",
          data.message ? data.message : "Your information has been updated",
          [{ text: "OK", onPress: () => navigation.navigate("PersonalInfo") }]
        );
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    // get access token from supabase
    const { data, error } = await supabase.auth.getSession();
    if (error) {
      Alert.alert("Error", "Please try again");
    }
    let headersList = {
      Authorization: `Bearer ${data.session.access_token}`,
    };
    let response = await fetch(`${baseUrl}/user/dob`, {
      method: "GET",
      headers: headersList,
    });
    let dataResponse = await response.json();
    if (dataResponse.error) {
      Alert.alert("Error", "Please try again");
    } else {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

      const [year, month, day] = dataResponse.date_of_birth.split("-");
      const outputDate = `${month}/${day}/${year}`;

      setOldData({ date_of_birth: outputDate });
      setBirthday(outputDate);
    }

    setIsLoading(false);
  };
  const formatDate = (text) => {
    // Format the date string as MM/DD/YYYY
    let formattedDate = text.replace(/[^0-9]/g, "");
    if (formattedDate.length > 2) {
      formattedDate = `${formattedDate.slice(0, 2)}/${formattedDate.slice(2)}`;
    }
    if (formattedDate.length > 5) {
      formattedDate = `${formattedDate.slice(0, 5)}/${formattedDate.slice(
        5,
        9
      )}`;
    }
    return formattedDate;
  };
  return (
    <Pressable onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        {isLoading ? (
          <ActivityIndicator size="small" />
        ) : (
          <>
            <CustomText style={styles.label}>Birthday</CustomText>
            <TextInput
              style={styles.input}
              value={birthday}
              onChangeText={(t) => {
                setBirthday(formatDate(t));
              }}
              autoCapitalize="none"
              autoCompleteType="off"
              keyboardType="numeric"
              textContentType="none"
              selectTextOnFocus={true}
              spellCheck={false}
            />
            <Pressable
              style={{
                width: "100%",
                alignItems: "center",
                marginBottom: "5%",
              }}
              onPress={handleUpdate}
              disabled={oldData.date_of_birth === birthday}
            >
              <LinearGradientButton
                disabled={oldData.date_of_birth === birthday}
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
            </Pressable>
          </>
        )}
      </View>
    </Pressable>
  );
};

export default ChangeBirthday;

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
