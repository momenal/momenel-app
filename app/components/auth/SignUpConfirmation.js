import { Animated, Easing, StyleSheet, View } from "react-native";
import { Image } from "expo-image";
import { useEffect, useRef } from "react";
import CustomText from "../customText/CustomText";

const SignUpConfirmation = () => {
  const animationProgress = useRef(new Animated.Value(0));
  useEffect(() => {
    Animated.timing(animationProgress.current, {
      toValue: 1,
      duration: 10000,
      easing: Easing.linear,
      useNativeDriver: false,
      delay: 200,
    }).start();
  }, []);
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: "6%",
        paddingBottom: "5%",
      }}
    >
      <CustomText
        style={{
          fontFamily: "Nunito_700Bold",
          fontSize: 30,
          width: "100%",
        }}
      >
        Confirm Email!
      </CustomText>
      <Image
        style={{ width: 200, height: 200, marginRight: 20 }}
        source={require("../../../assets/paperPlane.png")}
        contentFit="contain"
      />
      <CustomText
        style={{
          width: "100%",
          fontSize: 17,
          marginBottom: 20,
        }}
      >
        A confirmation email has been sent to your email address.
      </CustomText>
    </View>
  );
};

export default SignUpConfirmation;

const styles = StyleSheet.create({});
