import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import S1 from "../../Screens/SignupFlow/S1";
import S2 from "../../Screens/SignupFlow/S2";
import S3 from "../../Screens/SignupFlow/S3";
import S0 from "../../Screens/SignupFlow/S0";
import S4 from "../../Screens/SignupFlow/S4";

const Stack = createNativeStackNavigator();

const SignupStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={"s3"}
      screenOptions={{
        headerShadowVisible: false,
        headerTitleStyle: { fontFamily: "Nunito_600SemiBold" },
        headerTintColor: "#000",
        headerStyle: {
          backgroundColor: "#E8E8E8",
        },
      }}
    >
      <Stack.Screen
        name="s0"
        component={S0}
        options={{
          title: "Getting Started",
          headerTitleStyle: { fontFamily: "Nunito_600SemiBold" },
        }}
      />
      <Stack.Screen
        name="s1"
        component={S1}
        options={{
          title: "Getting Started",
          headerTitleStyle: { fontFamily: "Nunito_600SemiBold" },
        }}
      />
      <Stack.Screen
        name="s2"
        component={S2}
        options={{
          title: "Getting Started",
          headerBackTitle: "",
          headerTitleStyle: { fontFamily: "Nunito_600SemiBold" },
        }}
      />
      <Stack.Screen
        name="s3"
        component={S3}
        options={{
          title: "Getting Started",
          headerBackTitle: "",
          headerTitleStyle: { fontFamily: "Nunito_600SemiBold" },
        }}
      />
      <Stack.Screen
        name="s4"
        component={S4}
        options={{
          title: "Getting Started",
          headerBackTitle: "",
          headerTitleStyle: { fontFamily: "Nunito_600SemiBold" },
        }}
      />
    </Stack.Navigator>
  );
};

export default SignupStackNavigator;
