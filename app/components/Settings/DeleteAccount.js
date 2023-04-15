import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { supabase } from "../../lib/supabase";
import CustomText from "../customText/CustomText";

const DeleteAccount = ({}) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteAccount = () => {
    setIsDeleting(true);
    // TODO: Implement delete account logic
    setTimeout(() => {
      setIsDeleting(false);
      Alert.alert(
        "Account deleted",
        "Your account has been permanently deleted",
        [{ text: "OK", onPress: () => supabase.auth.signOut() }]
      );
    }, 3000); // Simulate the deletion process with a delay of 3 seconds
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
