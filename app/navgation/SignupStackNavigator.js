import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import S1 from "../../Screens/SignupFlow/S1";
import S2 from "../../Screens/SignupFlow/S2";

const Stack = createNativeStackNavigator();

const SignupStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={"s1"}
      screenOptions={{
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen
        name="s1"
        component={S1}
        options={{
          title: "Complete Profile",
          headerTitleStyle: { fontFamily: "Nunito_600SemiBold" },
        }}
      />
      <Stack.Screen
        name="s2"
        component={S2}
        options={{
          title: "Complete Profile",
          headerBackTitle: "",
          headerTitleStyle: { fontFamily: "Nunito_600SemiBold" },
        }}
      />
    </Stack.Navigator>
  );
};

export default SignupStackNavigator;
