import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useRef, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { RelativeTime } from "../../utils/RelativeTime";
import CustomText from "../customText/CustomText";

const Footer = ({ profileUrl, username, time, StoryId, navigation }) => {
  const [Height, setHeight] = useState(0);

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Image
          onLayout={(event) => {
            setHeight(event.nativeEvent.layout.height);
          }}
          style={[styles.profile, { width: Height }]}
          source={{
            uri: profileUrl,
          }}
        />
        <View style={{ justifyContent: "center" }}>
          <CustomText style={{ marginBottom: 2, color: "white" }}>
            {username}
          </CustomText>
          <CustomText
            style={{
              color: "#FFFFFF",
              opacity: 0.7,
              fontSize: 12,
              marginTop: -2,
            }}
          >
            {RelativeTime(time)}
          </CustomText>
        </View>
      </View>
      <TouchableOpacity
        style={{
          width: "10%",

          alignItems: "center",
        }}
        onPress={() =>
          navigation.replace("Report", {
            itemId: StoryId,
            otherParam: "anything you want here",
          })
        }
      >
        <Ionicons name="ios-ellipsis-vertical" size={22} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default Footer;

const styles = StyleSheet.create({
  container: {
    flex: 2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    overflow: "hidden",
    marginVertical: 15,
    paddingHorizontal: 10,
  },
  profileContainer: {
    flexDirection: "row",
    flex: 1,
    height: "100%",

    alignItems: "center",
  },
  profile: {
    height: "85%",
    resizeMode: "cover",
    borderRadius: 500,
    marginRight: 10,
  },
  text: {
    color: "white",
  },
});
