import { View, Text } from "react-native";
import React from "react";
import Home from "../components/Home";
import Hidden from "../components/Hidden";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CreatePost from "../components/CreatePost";
import Comments from "../components/Comments";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import DiscoverIcon from "../components/icons/DiscoverIcon";
import HomeIcon from "../components/icons/HomeIcon";
import PlusIcon from "../components/icons/PlusIcon";

// const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeNavigator = ({ navigation }) => {
  return (
    <Tab.Navigator
      screenOptions={({}) => ({
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
        tabBarShowLabel: false,
        headerShadowVisible: false,
      })}
    >
      <Tab.Screen
        name="Feed"
        component={Home}
        options={{
          title: "Feed",
          tabBarIcon: ({ size, focused, color }) => {
            {
              return (
                <HomeIcon
                  color={focused ? "black" : "none"}
                  isSelected={focused}
                  size={20}
                  strokeColor={focused ? "black" : "#999999"}
                />
              );
            }
          },
        }}
      />
      <Tab.Screen
        name="Discover"
        component={Home}
        options={{
          tabBarIcon: ({ size, focused, color }) => {
            {
              return (
                <DiscoverIcon
                  color={focused ? "black" : "none"}
                  isSelected={focused}
                  size={20}
                  strokeColor={focused ? "black" : "#999999"}
                />
              );
            }
          },
        }}
      />
      <Tab.Screen
        name="CreatePost"
        component={Home}
        options={{
          title: "Create Post",
          // tabBarStyle: { display: "none" },
          tabBarIcon: ({ size, focused, color }) => {
            {
              return (
                <PlusIcon
                  color={focused ? "black" : "none"}
                  size={20}
                  strokeColor={focused ? "black" : "#999999"}
                />
              );
            }
          },
        }}
      />
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
