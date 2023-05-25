import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  LayoutAnimation,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import { useEffect, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ReportSelect from "../app/components/Buttons/ReportSelect";
import CustomText from "../app/components/customText/CustomText";
import LinearGradientButton from "../app/components/Buttons/LinearGradientButton";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as Haptics from "expo-haptics";
import { Ionicons } from "@expo/vector-icons";
import { baseUrl } from "@env";
import { supabase } from "../app/lib/supabase";

const Report = ({ route, navigation }) => {
  const { contentId, username, contentType } = route.params;
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeIndex, setactiveIndex] = useState(null);
  const [text, onChangeText] = useState("");
  const [data, setData] = useState([]);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    fetchOptions();
  }, []);

  const fetchOptions = async () => {
    setIsLoading(true);
    const { data, error } = await supabase.auth.getSession();
    if (error) {
      navigation.navigate("Login");
      return false;
    }

    let response = await fetch(`${baseUrl}/report/${contentType}`, {
      method: "GET",
      headers: {
        Accept: "*/*",
        Authorization: `Bearer ${data.session.access_token}`,
      },
    });

    if (!response.ok) {
      setIsLoading(false);
      Alert.alert("Oops!", "Something went wrong.\nPlease try again later.");
      return false;
    }
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    let json = await response.json();
    setData(json);
    setIsLoading(false);
  };

  const setActiveIndexState = (index) => {
    setactiveIndex(index);
  };

  const onReport = async () => {
    //todo: send req to server

    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    onChangeText("");
    setactiveIndex(null);

    setIsLoading(true);
    const { data: session, error } = await supabase.auth.getSession();
    if (error) {
      navigation.navigate("Login");
      return false;
    }
    let reportId = data[activeIndex].id;
    let bodyContent = JSON.stringify({
      reason: text,
    });
    //todo: change the url to add correct item id /8
    let response = await fetch(
      `${baseUrl}/report/${contentId}/${contentType}/${reportId}`,
      {
        method: "POST",
        body: bodyContent,
        headers: {
          Accept: "*/*",
          Authorization: `Bearer ${session.session.access_token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      response.json().then((text) => {
        setIsLoading(false);
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        Alert.alert("Oops!", `${text.error}!`);
      });

      return false;
    }
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    setIsSubmitted(true);
    setIsLoading(false);
  };

  const onDone = () => {
    setIsSubmitted(false);
    navigation.goBack();
  };

  if (isLoading === true) {
    return (
      <View
        style={{
          flex: 1,
          paddingTop: "4%",
          alignItems: "center",
          backgroundColor: "white",
        }}
      >
        <ActivityIndicator color="#8456E9" />
      </View>
    );
  }

  if (isSubmitted === true) {
    return (
      <View
        style={[
          styles.container,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <Ionicons name="checkmark-circle-outline" size={50} color="#8456E9" />
        <CustomText
          style={{
            fontSize: 18,
            textAlign: "center",
            marginTop: 40,
            width: "80%",
          }}
        >
          Thank you for reporting this {contentType}
        </CustomText>
        <CustomText
          style={{
            fontSize: 13,
            fontFamily: "Nunito_400Regular",
            textAlign: "center",
            marginTop: 10,
            width: "90%",
          }}
        >
          Your feedback is important to us and helps us keep the Momenel
          community safe.
        </CustomText>
        <TouchableOpacity
          onPress={onDone}
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 40,
            marginBottom: 10,
            width: Dimensions.get("window").width * 0.5,
          }}
        >
          <LinearGradientButton>
            <CustomText
              style={{
                fontFamily: "Nunito_600SemiBold",
                fontSize: 18,
                textAlign: "center",
                color: "white",
                marginVertical: 5,
              }}
              adjustsFontSizeToFit={true}
              numberOfLines={1}
            >
              Done
            </CustomText>
          </LinearGradientButton>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "position" : null}
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 70}
      style={{
        backgroundColor: "white",
        height: "100%",
        paddingBottom: insets.bottom + 10,
      }}
    >
      <ScrollView
        style={{ marginHorizontal: "5%" }}
        showsVerticalScrollIndicator={false}
      >
        <CustomText
          style={{
            fontFamily: "Nunito_800ExtraBold",
            fontSize: 20,
            // paddingHorizontal: 20,
            marginVertical: 8,
          }}
          // numberOfLines={1}
        >
          Report @{username}'s {contentType}
        </CustomText>

        {data.map((i, index) => {
          return (
            <ReportSelect
              key={index}
              activeIndex={activeIndex}
              setActiveIndexState={setActiveIndexState}
              index={index}
              heading={i.heading}
              description={i.description}
            />
          );
        })}
        <CustomText
          style={{
            fontFamily: "Nunito_800ExtraBold",
            fontSize: 20,
            marginVertical: 20,
          }}
          adjustsFontSizeToFit={true}
          numberOfLines={1}
        >
          Provide us with additional information.
        </CustomText>
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={text}
          placeholder="Optional"
          keyboardAppearance={"dark"}
          // multiline={true}
          // returnKeyType="done"
          keyboardType="default"
          returnKeyType="done"
          multiline={true}
          blurOnSubmit={true}
          onSubmitEditing={() => {
            Keyboard.dismiss();
          }}
        />

        <TouchableOpacity
          disabled={activeIndex != null ? false : true}
          onPress={() => onReport()}
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <LinearGradientButton
            disabled={activeIndex != null ? false : true}
            style={{ marginTop: 20, marginBottom: 10 }}
          >
            <CustomText
              style={{
                fontFamily: "Nunito_800ExtraBold",
                fontSize: 18,
                width: "40%",
                textAlign: "center",
                color: "white",
              }}
              adjustsFontSizeToFit={true}
              numberOfLines={1}
            >
              Report
            </CustomText>
          </LinearGradientButton>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Report;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    height: "100%",
  },
  input: {
    borderWidth: 1,
    borderColor: "#999999",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: "#818181",
    minHeight: Dimensions.get("window").height / 8,
  },
});
