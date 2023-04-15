import { View, ScrollView, Button } from "react-native";
import SettingsTab from "../app/components/Settings/SettingsTab";

const Settings = ({ navigation }) => {
  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "white" }}
      contentContainerStyle={{ alignItems: "center", paddingTop: "2%" }}
    >
      <SettingsTab
        title="Account"
        onPress={() => navigation.navigate("Account")}
      />
      <SettingsTab
        title="Your Activity"
        onPress={() => navigation.navigate("Activity")}
      />
      <SettingsTab
        title="Blocked Accounts"
        onPress={() => navigation.navigate("Blocked")}
      />
      <SettingsTab
        title="Support"
        onPress={() => navigation.navigate("Support")}
      />
      <SettingsTab
        title="Invite Friends"
        onPress={() => navigation.navigate("Invite")}
      />

      <Button title="Logout" color={"#8652FF"} />
    </ScrollView>
  );
};

export default Settings;
