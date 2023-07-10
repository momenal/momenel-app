import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { supabase } from "../../lib/supabase";
import { baseUrl } from "@env";
import CustomText from "../customText/CustomText";

const DeleteAccount = ({ navigation }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteAccount = async () => {
    setIsDeleting(true);
    const { data: session, error } = await supabase.auth.getSession();
    if (error) {
      navigation.navigate("Login");
      return;
    }

    // delete user
    let response = await fetch(`${baseUrl}/user/delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.session.access_token}`,
      },
    });

    if (!response.ok) {
      response = await response.json();
      Alert.alert(
        "Oops",
        "Something went wrong!\nTry again or contact support.",
        [{ text: "OK" }]
      );
      navigation.goBack();
      return;
    }
    setIsDeleting(false);
    if (response.status === 200) {
      Alert.alert(
        "Account deleted",
        "Your account has been permanently deleted",
        [{ text: "OK", onPress: () => supabase.auth.signOut() }]
      );
    }
  };

  return (
    <View style={styles.container}>
      <CustomText style={styles.text}>
        Are you sure that you want to delete your account? Your account will be
        permanently deleted.
      </CustomText>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={handleDeleteAccount}
        disabled={isDeleting}
      >
        {isDeleting ? (
          <CustomText style={styles.buttonText}>Deleting...</CustomText>
        ) : (
          <CustomText style={styles.buttonText}>Delete Account</CustomText>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
    paddingTop: 16,
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    marginBottom: 32,
    textAlign: "center",
  },
  deleteButton: {
    backgroundColor: "#ff3b30",
    borderRadius: 4,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: "center",
    marginBottom: 16,
  },
  cancelButton: {
    backgroundColor: "#007aff",
    borderRadius: 4,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
});

export default DeleteAccount;
