import { View } from "react-native";

import SettingsTab from "./SettingsTab";

const PersonalInfo = ({ navigation }) => {
  return (
    <View
      style={{ flex: 1, backgroundColor: "white" }}
      contentContainerStyle={{ alignItems: "center", paddingTop: "2%" }}
    >
      <SettingsTab
        title="Email Address"
        onPress={() => navigation.navigate("Email")}
      />
      <SettingsTab
        title="Birthday"
        onPress={() => navigation.navigate("Birthday")}
      />
    </View>
  );
};

export default PersonalInfo;
