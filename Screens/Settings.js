import { ScrollView, Button } from "react-native";
import SettingsTab from "../app/components/Settings/SettingsTab";
import { supabase } from "../app/lib/supabase";

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
        title="Liked Posts"
        onPress={() => navigation.navigate("Likes")}
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
      <Button
        title="Logout"
        color={"#8652FF"}
        onPress={() => supabase.auth.signOut()}
      />
    </ScrollView>
  );
};

export default Settings;
