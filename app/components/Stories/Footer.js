import { Image, StyleSheet, Text, View } from "react-native";
import React, { useRef, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { RelativeTime } from "../../utils/RelativeTime";

const Footer = ({ profileUrl, username, time }) => {
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
          <Text style={[styles.text, { marginBottom: 4 }]}>{username}</Text>
          <Text style={{ color: "#FFFFFF", opacity: 0.8, fontSize: 13 }}>
            {RelativeTime(time)}
          </Text>
        </View>
      </View>
      <Ionicons name="ios-ellipsis-vertical" size={22} color="white" />
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
  },
  profile: {
    height: "100%",
    resizeMode: "cover",
    borderRadius: 500,
    marginRight: 10,
  },
  text: {
    color: "white",
  },
});
