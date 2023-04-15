import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Share,
  Alert,
} from "react-native";
import * as Clipboard from "expo-clipboard";
import CustomText from "../customText/CustomText";
import LinearGradientButton from "../../components/Buttons/LinearGradientButton";

const InviteFriendsScreen = () => {
  const [link, setLink] = useState("");

  useEffect(() => {
    setLink(`https://momenel.com/download`);
  }, []);

  const handleCopyLink = () => {
    Clipboard.setStringAsync(link);
    Alert.alert("Link copied", "The link has been copied to your clipboard.");
  };

  const handleShare = () => {
    Share.share({
      message: `Say goodbye to data collection with Momenel - the new privacy-first social media app. Join now and connect with others without compromising your privacy! #Momenel #PrivacyFirst\n${link}`,
      url: link,
      title: "Invite your friends",
    });
  };

  return (
    <View style={styles.container}>
      <CustomText style={styles.title}>Invite Your Friends</CustomText>
      <Text style={styles.description}>
        Share this link with your friends to invite them to join:
      </Text>
      <TouchableOpacity style={styles.linkContainer} onPress={handleCopyLink}>
        <Text style={styles.link}>
          {link} {`\n(click to copy)`}
        </Text>
      </TouchableOpacity>
      {/* <TouchableOpacity style={styles.button} onPress={handleShare}>
        <Text style={styles.buttonText}>Share</Text>
      </TouchableOpacity> */}
      <TouchableOpacity
        style={{
          width: "100%",
          alignItems: "center",
          marginBottom: "5%",
        }}
        onPress={handleShare}
      >
        <LinearGradientButton
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
            Share
          </CustomText>
        </LinearGradientButton>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    marginBottom: 16,
  },
  linkContainer: {
    padding: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    marginBottom: 16,
    alignSelf: "stretch",
  },
  link: {
    fontSize: 16,
    textAlign: "center",
    color: "#007aff",
    textDecorationLine: "underline",
  },
  button: {
    padding: 12,
    backgroundColor: "#007aff",
    borderRadius: 8,
    alignSelf: "stretch",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
});

export default InviteFriendsScreen;
