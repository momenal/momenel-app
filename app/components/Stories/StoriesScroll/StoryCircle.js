import {
  Image,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React from "react";
import CustomText from "../../customText/CustomText";
import { LinearGradient } from "expo-linear-gradient";

const StoryCircle = ({
  navigation,
  index,
  profile_url,
  username,
  preview_url,
  hasSeen,
}) => {
  return (
    <TouchableWithoutFeedback
      onPress={() => navigation.navigate("Stories", { snapToIndex: index })}
    >
      <View
        style={{
          marginHorizontal: 10,
          //   backgroundColor: "red",
          alignItems: "center",
        }}
      >
        <ImageBackground
          style={{
            height: 135,
            width: 96,
            alignItems: "center",
            justifyContent: "flex-end",
          }}
          imageStyle={{ borderRadius: 15 }}
          source={{
            uri: preview_url,
          }}
        >
          <LinearGradient
            colors={!hasSeen ? ["#F62E8E", "#AC1AF0"] : ["#A0A0A0", "#FFFFFF"]}
            start={{ x: 0.0, y: 1.0 }}
            end={{ x: 1.0, y: 1.0 }}
            style={{
              width: 40,
              height: 40,
              borderRadius: 50,
              padding: 23, // This should be the border width you want to have
              overflow: "hidden",
              borderRadius: 100,
              marginBottom: 5,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              style={{
                width: 40,
                height: 40,
                borderRadius: 100,
                alignItems: "center",
                justifyContent: "center",
              }}
              source={{
                uri: profile_url,
              }}
            />
          </LinearGradient>
        </ImageBackground>
        {/* <View style={styles.ImageContainer}>
          <Image
            //   onLayout={(event) => {
            //     setHeight(event.nativeEvent.layout.height);
            //   }}
            style={[styles.preview]}
            source={{
              uri: preview_url,
            }}
          />
          <Image
            style={[{ width: 40, height: 40, borderRadius: 100 }]}
            source={{
              uri: profile_url,
            }}
          />
        </View> */}
        <CustomText
          style={{
            fontSize: 12,
            maxWidth: 75,
            fontFamily: "Nunito_600SemiBold",
          }}
          numberOfLines={1}
        >
          {username}
        </CustomText>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default StoryCircle;

const styles = StyleSheet.create({
  ImageContainer: {
    marginBottom: 3.84,
    alignItems: "center",
  },
  preview: { height: 135, width: 96, borderRadius: 15, resizeMode: "cover" },
});
