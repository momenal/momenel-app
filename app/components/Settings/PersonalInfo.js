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
import { supabase } from "../../lib/supabase";
import { baseUrl } from "@env";
import SettingsTab from "./SettingsTab";

const PersonalInfo = ({ navigation }) => {
  //todo: sepereate email and birthday into two different screens
  const [oldData, setOldData] = useState({});
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // const handleUpdate = async () => {
  //   if (oldData.email !== email) {
  //     const { data, error } = await supabase.auth.updateUser({ email: email });
  //     if (error) {
  //       console.log(error);
  //       Alert.alert("Error", "Please try again");
  //     } else {
  //       Alert.alert(
  //         "Email Verification sent.",
  //         "Please Verify your email address to change your email."
  //       );
  //     }
  // }

  // const {
  //   data: { session },
  //   error,
  // } = await supabase.auth.getSession();
  // if (error) {
  //   console.log(error);
  //   Alert.alert("Error", "Please try again");
  // } else {
  //   let headersList = {
  //     Accept: "*/*",
  //     "Content-Type": "application/json",
  //     Authorization: `Bearer ${session.access_token}`,
  //   };

  //   let bodyContent = JSON.stringify({
  //     email: oldData.email === email ? null : email,
  //     birthday: oldData.date_of_birth === birthday ? null : birthday,
  //   });
  //   let response = await fetch(`${baseUrl}/user/updatePersonalInfo`, {
  //     method: "POST",
  //     body: bodyContent,
  //     headers: headersList,
  //   });
  //   let data = await response.json();
  //   if (data.error) {
  //     console.log("error");
  //     Alert.alert("Error", data.error);
  //   } else {
  //
  //     console.log(data.date_of_birth);
  //     Alert.alert(
  //       "Updated",
  //       data.message ? data.message : "Your information has been updated"
  //     );
  //   }
  // }
  // };

  // useEffect(() => {
  //   fetchData();
  // }, []);

  const fetchData = async () => {
    // get access token from supabase
    const { data, error } = await supabase.auth.getSession();
    if (error) {
      console.log(error);
      Alert.alert("Error", "Please try again");
    }
    let headersList = {
      Authorization: `Bearer ${data.session.access_token}`,
    };
    let response = await fetch(`${baseUrl}/user/personalInfo`, {
      method: "GET",
      headers: headersList,
    });
    let dataResponse = await response.json();
    if (dataResponse.error) {
      Alert.alert("Error", "Please try again");
      console.log("error", dataResponse.error);
    } else {
      console.log("dataResponse", dataResponse);
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setOldData(dataResponse);
      setEmail(dataResponse.email);

      const [year, month, day] = dataResponse.date_of_birth.split("-");
      const outputDate = `${month}/${day}/${year}`;

      setOldData((oldData) => ({ ...oldData, date_of_birth: outputDate }));
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
    <View
      style={{ flex: 1, backgroundColor: "white" }}
      contentContainerStyle={{ alignItems: "center", paddingTop: "2%" }}
    >
      <SettingsTab
        title="Email Address"
        onPress={() => navigation.navigate("Email")}
      />
      <SettingsTab
        title="Birthday"
        onPress={() => navigation.navigate("Birthday")}
      />
    </View>
    // <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    //   <View style={styles.container}>
    //     {isLoading ? (
    //       <ActivityIndicator size="small" />
    //     ) : (
    //       <>
    //         <CustomText style={styles.label}>Email Address</CustomText>
    //         <TextInput
    //           style={styles.input}
    //           value={email}
    //           onChangeText={(t) => {
    //             setEmail(t);
    //           }}
    //           autoCapitalize="none"
    //           autoCompleteType="email"
    //           keyboardType="email-address"
    //           textContentType="emailAddress"
    //           selectTextOnFocus={true}
    //           spellCheck={false}
    //         />
    //         <CustomText style={styles.label}>Birthday</CustomText>
    //         <TextInput
    //           style={styles.input}
    //           value={birthday}
    //           onChangeText={(t) => {
    //             setBirthday(formatDate(t));
    //           }}
    //           autoCapitalize="none"
    //           autoCompleteType="off"
    //           keyboardType="numeric"
    //           textContentType="none"
    //           selectTextOnFocus={true}
    //           spellCheck={false}
    //         />
    //         <TouchableOpacity
    //           style={{
    //             width: "100%",
    //             alignItems: "center",
    //             marginBottom: "5%",
    //           }}
    //           onPress={handleUpdate}
    //           disabled={
    //             oldData.email === email && oldData.date_of_birth === birthday
    //           }
    //         >
    //           <LinearGradientButton
    //             disabled={
    //               oldData.email === email && oldData.date_of_birth === birthday
    //             }
    //             style={{
    //               width: "100%",
    //               marginTop: "5%",
    //               flexDirection: "row",
    //               alignItems: "center",
    //             }}
    //           >
    //             <CustomText
    //               style={{
    //                 color: "white",
    //                 fontFamily: "Nunito_700Bold",
    //                 fontSize: 17,
    //                 marginRight: "2%",
    //               }}
    //             >
    //               Update
    //             </CustomText>
    //           </LinearGradientButton>
    //         </TouchableOpacity>
    //       </>
    //     )}
    //   </View>
    // </TouchableWithoutFeedback>
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
