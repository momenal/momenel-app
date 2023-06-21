import {
  Dimensions,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React from "react";
import Home from "../../Screens/Home";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import DiscoverIcon from "../components/icons/DiscoverIcon";
import HomeIcon from "../components/icons/HomeIcon";
import PlusIcon from "../components/icons/PlusIcon";
import TabBarProfileIcon from "../components/TabBarProfileIcon";
import Header from "../components/Header/Header";
import NotificationsIcon from "../components/icons/Notifications";

import PlaceholderScreen from "../components/PlaceholderScreen";
import Discover from "../../Screens/Discover";

import { useBoundStore } from "../Store/useBoundStore";

import Profile from "../components/Profile/Profile";
import Notifications from "../../Screens/Notifications";

// const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeNavigator = ({ navigation }) => {
  const Height = Dimensions.get("window").height * 0.024;
  const username = useBoundStore((state) => state.username);
  // const IconSize = 21;
  const IconSize = Height > 21 ? 21 : Height < 18 ? 18 : Height;

  return (
    <Tab.Navigator
      // initialRouteName="Feed"
      initialRouteName="Discover"
      screenOptions={({}) => ({
        tabBarShowLabel: false,
        headerShadowVisible: false,
        tabBarStyle: {
          backgroundColor: "#F9F9F9",
          paddingVertical: 0,
        },
        headerTitleStyle: { fontFamily: "Nunito_700Bold" },
        // unmountOnBlur: true,
        freezeOnBlur: true,
      })}
    >
      <Tab.Screen
        name="Feed"
        component={Home}
        options={{
          header: () => {
            return <Header navigation={navigation} />;
          },
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
        component={Discover}
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
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Create"
        component={PlaceholderScreen}
        options={{
          title: "",
          unmountOnBlur: true,
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            {
              return (
                <PlusIcon
                  color={focused ? "black" : "none"}
                  size={IconSize}
                  strokeColor={focused ? "black" : "#A8A8A8"}
                />
              );
            }
          },
        }}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            // Prevent default action
            e.preventDefault();
            navigation.navigate("CreatePost");
          },
        })}
      />
      <Tab.Screen
        name="Notifications"
        component={Notifications}
        options={{
          title: "Notifications",
          // tabBarStyle: { display: "none" },
          tabBarIcon: ({ size, focused }) => {
            {
              return (
                <NotificationsIcon
                  size={IconSize}
                  focused={focused}
                  color={focused ? "black" : "#A8A8A8"}
                />
              );
            }
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
          title: "",
          tabBarIcon: ({ focused }) => {
            {
              return <TabBarProfileIcon size={IconSize} focused={focused} />;
            }
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default HomeNavigator;
