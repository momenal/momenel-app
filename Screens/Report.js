import {
  Alert,
  Button,
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  LayoutAnimation,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import { useEffect, useRef, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useBoundStore } from "../app/Store/useBoundStore";
import ReportSelect from "../app/components/Buttons/ReportSelect";
import CustomText from "../app/components/customText/CustomText";
import LinearGradientButton from "../app/components/Buttons/LinearGradientButton";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as Haptics from "expo-haptics";
import { Ionicons } from "@expo/vector-icons";

const Report = ({ route, navigation }) => {
  const { contentId, username, contentType } = route.params;
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeIndex, setactiveIndex] = useState(null);
  const [text, onChangeText] = useState("");
  // const handleReport = useBoundStore((state) => state.reportPost);
  const [data, setData] = useState([]);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    if (contentType === "post") {
      setData([
        {
          id: 1,
          heading: "Spam",
          description:
            "Posting malicious content or links, inauthentic engagement,misusing hashtags, repetitive replies and Reposts",
        },
        {
          id: 2,
          heading: "Hate Speech",
          description:
            "Posting content that promotes or encourages violence, hatred, or harm against an individual or group of people. For example Islamophobia, anti-Semitism, homophobia, transphobia,and racism",
        },
        {
          id: 3,
          heading: "Scam or Fraud",
          description:
            "Posting content or links in an attempt to sell or promote a product or service in a false or misleading manner. Posts attempting to defraud others of their money or personal information should also be reported.",
        },
        {
          id: 4,
          heading: "Privacy Violations",
          description:
            "Posting content that violates another person's privacy, including posting private information about others without their consent.",
        },
        {
          id: 5,
          heading: "Illegal activity and behavior",
          description:
            "Content that depicts illegal or criminal acts, threats of violence.",
        },
        {
          id: 6,
          heading: "Intellectual property infringement",
          description:
            "Impersonating another account or business, infringing on intellectual property rights.",
        },
        {
          id: 7,
          heading: "Sensitive Content",
          description:
            "Content that depicts graphic violence, sexual activity, nudity, gore, or other sensitive subjects.",
        },
        {
          id: 8,
          heading: "Underage Content",
          description:
            "Content that depicts minors in a sexualized manner or in a manner that is otherwise inappropriate for their age.",
        },
        {
          id: 9,
          heading: "Doxxing",
          description:
            "Sharing or threatening to share another person's personal information, including their name, address, phone number, email address, or other identifying information without their consent.",
        },
        {
          id: 10,
          heading: "Prostitution",
          description:
            "Solicitation or advertising for illegal sexual activity or sex for hire.",
        },
        {
          id: 11,
          heading: "Suicide or self-injury",
          description:
            "Posts or comments that encourage or promote self-injury, including suicide and cutting.",
        },
        {
          id: 12,
          heading: "I don't like this content",
          description: "Content that you dislike and/or this user is a troll",
        },
        {
          id: 1000,
          heading: "Other",
          description: "Provide us with additional information below.",
        },
      ]);
    } else {
      setData([
        {
          id: 1,
          heading: "Fake Account",
          description: `Flag this account for impersonating you or someone else. This doesn't include accounts that are parody or satire.`,
        },
        {
          id: 2,
          heading: "Underage user",
          description:
            "Flag this user for being under the minimum age requirement.",
        },
        {
          id: 3,
          heading: "Impersonating a brand or business",
          description:
            "Flag this account for pretending to be a brand or business.",
        },
        {
          id: 4,
          heading: "Hate speech or graphic violence",
          description:
            "Flag this account for promoting hate or displaying violent content.",
        },
        {
          id: 1000,
          heading: "Other",
          description: "Provide us with additional information below.",
        },
      ]);
    }
  }, []);

  const setActiveIndexState = (index) => {
    setactiveIndex(index);
  };

  const onReport = () => {
    //todo: send req to server
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsSubmitted(true);
    onChangeText("");
    setactiveIndex(null);

    //todo: show error message if something went wrong
    //       Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    //       Alert.alert(
    //         "Oops!",
    //         "Something went wrong.\nPlease try again later."
    //       );
  };

  const onDone = () => {
    setIsSubmitted(false);
    navigation.goBack();
  };

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
