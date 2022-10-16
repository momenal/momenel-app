import React from "react";
import Home from "../components/Home";
import HomeTabNavigator from "./HomeTabNavigator";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Comments from "../components/Comments";
import Stories from "../../Screens/Stories";

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeTabNavigator}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="Cars" component={Home} />
      <Stack.Screen
        name="Stories"
        component={Stories}
        options={{ gestureDirection: "vertical", headerShown: false }}
      />
      <Stack.Screen
        name="Comments"
        component={Comments}
        options={{ gestureDirection: "vertical", headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
