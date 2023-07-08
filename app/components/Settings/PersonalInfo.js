import { View } from "react-native";

import SettingsTab from "./SettingsTab";

const PersonalInfo = ({ navigation }) => {
  return (
    <View
      style={{ flex: 1, backgroundColor: "white" }}
      contentContainerStyle={{ alignItems: "center", paddingTop: "2%" }}
    >
      <SettingsTab
        icon={"mail"}
        title="Email Address"
        onPress={() => navigation.navigate("Email")}
      />
      <SettingsTab
        icon={"md-today"}
        title="Birthday"
        onPress={() => navigation.navigate("Birthday")}
      />
    </View>
  );
};

export default PersonalInfo;
