import {
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useMemo } from "react";
import CustomText from "../../customText/CustomText";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

const StoryCircle = ({
  navigation,
  index,
  profile_url,
  username,
  preview_url,
  hasSeen,
}) => {
  const Height = useMemo(() => Dimensions.get("window").height, []);
  const Width = useMemo(() => Dimensions.get("window").width, []);
  const bgColors = [
    "#C7EFCF",
    "#FEC7C7",
    "#C7DFFD",
    "#EDA2C0",
    "#f5bfd7",
    "#f0eafc",
    "#b7a2ed",
    "#a2edeb",
  ];

  //scaled Width to keep height 40
  // console.log(Height * 0.03);
  // console.log(Width * 0.23);
  return (
    <TouchableWithoutFeedback
      onPress={() => navigation.navigate("Stories", { snapToIndex: index })}
    >
      <View
        style={{
          alignItems: "center",
          marginRight: 14,
        }}
      >
        <ImageBackground
          style={{
            height: Height * 0.148,
            width: Width * 0.23,
            alignItems: "center",
            justifyContent: "flex-end",
          }}
          imageStyle={{ borderRadius: 15 }}
          source={{
            uri: preview_url,
          }}
        >
          <LinearGradient
            colors={!hasSeen ? ["#F62E8E", "#AC1AF0"] : ["#A0A0A0", "#F0F0F0"]}
            start={[0, 0]}
            end={[1.1, 0]}
            style={{
              width: Height * 0.025,
              height: Height * 0.025,
              borderRadius: 50,
              // padding: 23, //! This should be the border width you want to have
              padding: Height * 0.026, //! This should be the border width you want to have
              // padding: Height * 0.06, //! This should be the border width you want to have
              overflow: "hidden",
              borderRadius: 100,
              marginBottom: 8,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              style={{
                width: Height * 0.044,
                height: Height * 0.044,
                borderRadius: 100,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor:
                  bgColors[Math.floor(Math.random() * bgColors.length)],
              }}
              source={{
                uri: profile_url,
              }}
            />
          </LinearGradient>
        </ImageBackground>
        <CustomText
          style={{
            fontSize: 12,
            maxWidth: 75,
            fontFamily: "Nunito_600SemiBold",
            marginTop: 4,
          }}
          numberOfLines={1}
        >
          {username}
        </CustomText>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default React.memo(StoryCircle);
