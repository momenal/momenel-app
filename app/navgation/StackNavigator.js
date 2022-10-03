import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TabBar from "../components/TabBar";
import Home from "../components/Home";
import { BlurView } from "expo-blur";
import HomeTabNavigator from "./HomeTabNavigator";
import { Text } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Comments from "../components/Comments";

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Profile" component={Home} />
      <Stack.Screen
        name="Comments"
        component={Comments}
        options={{ gestureDirection: "vertical" }}
      />
    </Stack.Navigator>

    // <Tab.Navigator tabBar={(props) => <TabBar {...props} />}>
    // <Tab.Navigator
    //   screenOptions={({ route }) => ({
    //     headerShown: false,
    //     tabBarIcon: ({ focused, color, size }) => {
    //       let iconName;

    //       if (route.name === "Home") {
    //         iconName = focused
    //           ? "ios-information-circle"
    //           : "ios-information-circle-outline";
    //       } else if (route.name === "Settings") {
    //         iconName = focused ? "ios-list-outline" : "ios-list";
    //       }

    //       // You can return any component that you like here!
    //       return <Text>icon</Text>;
    //     },
    //     tabBarActiveTintColor: "tomato",
    //     tabBarInactiveTintColor: "gray",
    //   })}
    // >
    //   <Tab.Screen
    //     name="Home"
    //     component={HomeNavigator}
    //     options={{ headerShown: false }}
    //   />
    //   <Tab.Screen
    //     name="CreatePost"
    //     initialRouteName={"Post"}
    //     component={CreatePostNavigator}
    //     options={{
    //       // headerShown: false,
    //       gestureDirection: "vertical",
    //       // tabBarStyle: { display: "none" },
    //     }}
    //   />
    //   {/* <Tab.Screen
    //     name="Discover"
    //     component={Home}
    //     options={{
    //       headerTransparent: true,
    //     }}
    //     // initialParams={{ icon: "like2" }}
    //   />
    //   <Tab.Screen
    //     name="CreatePost"
    //     component={CreatePostNavigator}
    //     options={{
    //       headerShown: false,
    //       gestureDirection: "vertical",
    //       // tabBarStyle: { display: "none" },
    //     }}
    //   /> */}
    // </Tab.Navigator>
  );
};

export default StackNavigator;
