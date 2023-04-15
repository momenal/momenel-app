import React from "react";
import Settings from "../../Screens/Settings";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AccountScreen from "../components/Settings/AccountScreen";
import PersonalInfo from "../components/Settings/PersonalInfo";
import DeleteAccount from "../components/Settings/DeleteAccount";

const Stack = createNativeStackNavigator();

const BackButton = ({ onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <Ionicons name="chevron-back" size={24} color="black" />
  </TouchableOpacity>
);

const SettingsStackNavigator = ({ navigation }) => {
  return (
    <Stack.Navigator
      initialRouteName="Settings"
      screenOptions={({}) => ({
        tabBarShowLabel: false,
        headerShadowVisible: false,
        tabBarStyle: {
          backgroundColor: "#F9F9F9",
          paddingVertical: 0,
        },
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
          headerLeft: () => <BackButton onPress={() => navigation.goBack()} />,
        }}
      />
      <Stack.Screen
        name="Activity"
        component={BackButton}
        options={{
          headerShadowVisible: false,
          headerTitle: "Your Activity",
          headerLeft: () => <BackButton onPress={() => navigation.goBack()} />,
        }}
      />
      <Stack.Screen
        name="Blocked Accounts"
        component={BackButton}
        options={{
          headerShadowVisible: false,
          headerLeft: () => <BackButton onPress={() => navigation.goBack()} />,
        }}
      />
      <Stack.Screen
        name="Support"
        component={BackButton}
        options={{
          headerShadowVisible: false,
          headerLeft: () => <BackButton onPress={() => navigation.goBack()} />,
        }}
      />
      <Stack.Screen
        name="Invite Friends"
        component={BackButton}
        options={{
          headerShadowVisible: false,
          headerLeft: () => <BackButton onPress={() => navigation.goBack()} />,
        }}
      />
      <Stack.Screen
        name="PersonalInfo"
        component={PersonalInfo}
        options={{
          headerTitle: "Personal Info",
          headerShadowVisible: false,
          headerLeft: () => <BackButton onPress={() => navigation.goBack()} />,
        }}
      />
      <Stack.Screen
        name="DeleteAccount"
        component={DeleteAccount}
        options={{
          headerTitle: "Delete Account",
          headerShadowVisible: false,
          headerLeft: () => <BackButton onPress={() => navigation.goBack()} />,
        }}
      />
    </Stack.Navigator>
  );
};

export default SettingsStackNavigator;
