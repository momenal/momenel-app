import React from "react";
import Settings from "../../Screens/Settings";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AccountScreen from "../components/Settings/AccountScreen";
import PersonalInfo from "../components/Settings/PersonalInfo";
import DeleteAccount from "../components/Settings/DeleteAccount";
import BlockedAccounts from "../components/Settings/BlockedAccounts";
import SupportScreen from "../components/Settings/SupportScreen";
import InviteScreen from "../components/Settings/InviteScreen";
import { scale } from "../utils/Scale";
import ChangeEmail from "../components/Settings/ChangeEmail";
import ChangeBirthday from "../components/Settings/ChangeBirthday";

const Stack = createNativeStackNavigator();

const BackButton = ({ onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <Ionicons name="chevron-back" size={scale(24)} color="black" />
  </TouchableOpacity>
);

const SettingsStackNavigator = ({ navigation }) => {
  return (
    <Stack.Navigator
      initialRouteName="Settings"
      screenOptions={({}) => ({
        headerShadowVisible: false,
        headerTitleStyle: { fontFamily: "Nunito_700Bold" },
      })}
    >
      <Stack.Screen
        name="Settings"
        component={Settings}
        options={{
          headerShadowVisible: false,
          headerLeft: () => <BackButton onPress={() => navigation.goBack()} />,
        }}
      />
      <Stack.Screen
        name="Account"
        component={AccountScreen}
        options={{
          headerShadowVisible: false,
          headerBackTitle: "",
          headerTintColor: "black",
        }}
      />
      <Stack.Screen
        name="Email"
        component={ChangeEmail}
        options={{
          headerShadowVisible: false,
          headerBackTitle: "",
          headerTintColor: "black",
        }}
      />
      <Stack.Screen
        name="Birthday"
        component={ChangeBirthday}
        options={{
          headerShadowVisible: false,
          headerBackTitle: "",
          headerTintColor: "black",
        }}
      />

      <Stack.Screen
        name="Blocked"
        component={BlockedAccounts}
        options={{
          headerTitle: "Blocked Accounts",
          headerShadowVisible: false,
          headerBackTitle: "",
          headerTintColor: "black",
        }}
      />
      <Stack.Screen
        name="Support"
        component={SupportScreen}
        options={{
          headerShadowVisible: false,
          headerBackTitle: "",
          headerTintColor: "black",
        }}
      />
      <Stack.Screen
        name="Invite"
        component={InviteScreen}
        options={{
          headerTitle: "",
          headerShadowVisible: false,
          headerBackTitle: "",
          headerTintColor: "black",
        }}
      />
      <Stack.Screen
        name="PersonalInfo"
        component={PersonalInfo}
        options={{
          headerTitle: "Personal Info",
          headerShadowVisible: false,
          headerBackTitle: "",
          headerTintColor: "black",
        }}
      />
      <Stack.Screen
        name="DeleteAccount"
        component={DeleteAccount}
        options={{
          headerTitle: "Delete Account",
          headerShadowVisible: false,
          headerBackTitle: "",
          headerTintColor: "black",
        }}
      />
    </Stack.Navigator>
  );
};

export default SettingsStackNavigator;
