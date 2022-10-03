import { View, Text } from "react-native";
import React from "react";
import Home from "../components/Home";
import Hidden from "../components/Hidden";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CreatePost from "../components/CreatePost";
import Comments from "../components/Comments";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import DiscoverIcon from "../components/icons/DiscoverIcon";

// const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeNavigator = ({ navigation }) => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        // tabBarIcon: ({ focused, color, size }) => {
        //   let iconName;
        //   console.log(focused);
        //   if (route.name === "Home") {
        //     iconName = focused
        //       ? "ios-information-circle"
        //       : "ios-information-circle-outline";
        //   } else if (route.name === "Settings") {
        //     iconName = focused ? "ios-list-outline" : "ios-list";
        //   }

        //   // You can return any component that you like here!
        //   return <Text>icon</Text>;
        // },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
        tabBarShowLabel: false,
      })}
    >
      <Tab.Screen
        name="Feed"
        component={Home}
        options={{
          title: "Feed",
          tabBarShowLabel: false,
          tabBarIcon: ({ size, focused, color }) => {
            {
              return (
                <DiscoverIcon
                  color={focused ? "red" : "blue"}
                  isSelected={focused}
                  size={size}
                  strokeColor={focused ? "red" : "blue"}
                />
              );
            }
          },
        }}
      />
      <Tab.Screen name="Notifications" component={Home} />
    </Tab.Navigator>

    // <Stack.Navigator
    //   screenOptions={{
    //     // headerShown: false,
    //     headerShadowVisible: false,
    //   }}
    // >
    //   <Stack.Screen
    //     name="Feed"
    //     component={Home}
    //     options={{
    //       headerTransparent: false,
    //     }}
    //   />
    //   <Stack.Screen
    //     name="Comments"
    //     component={Comments}
    //     // options={{
    //     //   title: "Comments",
    //     //   tabBarStyle: { display: "none" },
    //     // }}
    //     options={{ tabBarStyle: { display: "none" } }}
    //   />
    //   <Stack.Screen name="CreatePost" component={CreatePost} />
    // </Stack.Navigator>
  );
};

export default HomeNavigator;
