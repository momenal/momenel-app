import { View, Text } from "react-native";
import React from "react";
import SettingsTab from "./SettingsTab";

const AccountScreen = ({ navigation }) => {
  return (
    <View
      style={{ flex: 1, backgroundColor: "white" }}
      contentContainerStyle={{ alignItems: "center", paddingTop: "2%" }}
    >
      <SettingsTab
        icon={"person-circle-outline"}
        title="Personal info"
        onPress={() => navigation.navigate("PersonalInfo")}
      />
      <SettingsTab
        icon={"md-alert-circle-outline"}
        title="Delete Account"
        onPress={() => navigation.navigate("DeleteAccount")}
      />
    </View>
  );
};

export default AccountScreen;
