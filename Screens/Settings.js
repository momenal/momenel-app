import { ScrollView, Pressable } from "react-native";
import SettingsTab from "../app/components/Settings/SettingsTab";
import { supabase } from "../app/lib/supabase";
import CustomText from "../app/components/customText/CustomText";

const Settings = ({ navigation }) => {
  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "white" }}
      contentContainerStyle={{ alignItems: "center", paddingTop: "2%" }}
    >
      <SettingsTab
        icon={"person-circle-outline"}
        title="Account"
        onPress={() => navigation.navigate("Account")}
      />

      <SettingsTab
        icon={"close-circle"}
        title="Blocked Accounts"
        onPress={() => navigation.navigate("Blocked")}
      />
      <SettingsTab
        icon={"mail"}
        title="Support"
        onPress={() => navigation.navigate("Support")}
      />
      <SettingsTab
        icon={"ios-megaphone"}
        title="Invite Friends"
        onPress={() => navigation.navigate("Invite")}
      />

      <Pressable
        onPress={() => supabase.auth.signOut()}
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          width: "90%",
          paddingHorizontal: "5%",
          paddingVertical: "3%",
          backgroundColor: "#e7e7e7",
          borderRadius: 10,
          marginTop: 20,
        }}
      >
        <CustomText
          style={{
            fontSize: 17,
            fontWeight: "bold",
            fontFamily: "Nunito_600SemiBold",
            marginLeft: 0,
            color: "black",
          }}
        >
          Logout
        </CustomText>
      </Pressable>
    </ScrollView>
  );
};

export default Settings;
