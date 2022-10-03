import { View, Text, Image } from "react-native";
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
import MessagesIcon from "../components/icons/MessagesIcon";
import TabBarProfileIcon from "../components/TabBarProfileIcon";

// const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeNavigator = ({ navigation }) => {
  const IconSize = 21;
  return (
    <Tab.Navigator
      screenOptions={({}) => ({
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
        tabBarShowLabel: false,
        headerShadowVisible: false,
        tabBarStyle: { backgroundColor: "#F9F9F9", paddingBottom: 20 },
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
                  size={IconSize}
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
                  size={IconSize}
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
                  size={IconSize}
                  strokeColor={focused ? "black" : "#999999"}
                />
              );
            }
          },
        }}
      />
      <Tab.Screen
        name="Messages"
        component={Home}
        options={{
          title: "Messages",
          // tabBarStyle: { display: "none" },
          tabBarIcon: ({ size, focused, color }) => {
            {
              return (
                <MessagesIcon
                  color={focused ? "black" : "none"}
                  size={IconSize}
                  strokeColor={focused ? "black" : "#999999"}
                />
              );
            }
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Home}
        options={{
          title: "Profile",
          // tabBarStyle: { display: "none" },
          tabBarIcon: ({ size, focused, color }) => {
            {
              return (
                <TabBarProfileIcon size={22} focused={focused} />
                // <Image
                //   style={{
                //     height: 22,
                //     width: 22,
                //     borderRadius: 50,
                //     borderWidth: focused ? 3 : 0,
                //     borderColor: "black",
                //   }}
                //   source={{
                //     uri: "https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
                //   }}
                // />
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
