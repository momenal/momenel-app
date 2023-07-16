import { StatusBar } from "expo-status-bar";
import { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Keyboard,
  Alert,
} from "react-native";
import LinearGradientButton from "../../app/components/Buttons/LinearGradientButton";
import CustomText from "../../app/components/customText/CustomText";
import { supabase } from "../../app/lib/supabase";
let baseUrl = "https://api.momenel.com";

const S0 = ({ navigation }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  const dayRef = useRef();
  const monthRef = useRef();
  const yearRef = useRef();

  const handleMonthChange = (text) => {
    if (text.length === 2) {
      dayRef.current.focus();
    }
    setMonth(text);
  };

  const handleDayChange = (text) => {
    if (text > 31) {
      setDay("MM");
      return;
    }
    if (text.length === 2) {
      yearRef.current.focus();
    }

    setDay(text);
  };

  const handleYearChange = (text) => {
    setYear(text);
    if (text.length === 4) {
      Keyboard.dismiss();
      //check if date is valid and if user is at least 18 years old
      let age = getAge(`${text}/${month}/${day}`);

      if (age < 18 || isNaN(age)) {
        alert("You must be at least 18 years old to use this app.");
        return;
      }
    }
  };

  const getAge = (dateOfBirth) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  };

  const handleSave = async () => {
    let age = getAge(`${year}/${month}/${day}`);

    if (age < 18 || isNaN(age)) {
      alert("You must be at least 18 years old to use this app.");
      return;
    }

    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();
    if (error) {
      Alert.alert("Error", "Please try again");
    } else {
      setIsSubmitting(true);
      let headersList = {
        Accept: "*/*",
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.access_token}`,
      };
      let bodyContent = JSON.stringify({
        birthday: `${year}/${month}/${day}`,
      });
      let response = await fetch(`${baseUrl}/user/updatePersonalInfo`, {
        method: "POST",
        body: bodyContent,
        headers: headersList,
      });
      let data = await response.json();
      if (data.error) {
        Alert.alert("Error", data.error);
        setIsSubmitting(false);
      } else {
        setIsSubmitting(false);
        navigation.navigate("s1");
      }
    }
  };

  return (
    <Pressable style={styles.container} onPress={() => Keyboard.dismiss()}>
      <CustomText style={styles.title}>Enter Your Date of Birth</CustomText>
      <CustomText>
        Momenel requires users to be at least 18 years old in order to use its
        platform.
      </CustomText>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="MM"
          placeholderTextColor={"#9C9C9C"}
          value={month}
          onChangeText={handleMonthChange}
          keyboardType="number-pad"
          maxLength={2}
          ref={monthRef}
          returnKeyType="next"
        />
        <Text style={styles.separator}>/</Text>
        <TextInput
          style={styles.input}
          placeholder="DD"
          placeholderTextColor={"#9C9C9C"}
          value={day}
          onChangeText={handleDayChange}
          keyboardType="number-pad"
          maxLength={2}
          ref={dayRef}
          returnKeyType="next"
        />
        <Text style={styles.separator}>/</Text>
        <TextInput
          style={[styles.input, { width: 80 }]}
          placeholder="YYYY"
          placeholderTextColor={"#9C9C9C"}
          value={year}
          onChangeText={handleYearChange}
          keyboardType="number-pad"
          maxLength={4}
          ref={yearRef}
          returnKeyType="done"
        />
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: "flex-end",
          marginBottom: "10%",
        }}
      >
        <Pressable
          onPress={handleSave}
          disabled={
            (getAge(`${year}/${month}/${day}`) >= 18 &&
            getAge(`${year}/${month}/${day}`) < 110 &&
            year.length === 4
              ? false
              : true) || isSubmitting
          }
        >
          <LinearGradientButton
            style={{ width: "100%" }}
            disabled={
              (getAge(`${year}/${month}/${day}`) >= 18 &&
              getAge(`${year}/${month}/${day}`) < 110 &&
              year.length === 4
                ? false
                : true) || isSubmitting
            }
          >
            <CustomText style={{ color: "white" }}>Continue</CustomText>
          </LinearGradientButton>
        </Pressable>
      </View>
      <StatusBar style="dark" animated={true} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8E8E8",
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  title: {
    fontFamily: "Nunito_600SemiBold",
    fontSize: 25,
    fontWeight: "bold",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
  },
  input: {
    fontFamily: "Nunito_500Medium",
    width: 50,
    height: 50,
    backgroundColor: "#f2f2f2",
    borderRadius: 5,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    marginRight: 5,
  },
  separator: {
    fontSize: 20,
    fontWeight: "bold",
    marginHorizontal: 10,
  },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
});

export default S0;
