import { View, ScrollView, Button } from "react-native";
import SettingsTab from "../app/components/Settings/SettingsTab";

const Settings = ({ navigation }) => {
  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "white" }}
      contentContainerStyle={{ alignItems: "flex-end", paddingTop: "2%" }}
    >
      <SettingsTab
        title="Account"
        onPress={() => console.log("account pressed")}
      />

      <Button title="Logout" color={"#8652FF"} />
    </ScrollView>
  );
};

export default Settings;
