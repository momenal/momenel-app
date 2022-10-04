import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import Home from "../components/Home";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CreatePost from "../components/CreatePost";
import Comments from "../components/Comments";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import DiscoverIcon from "../components/icons/DiscoverIcon";
import HomeIcon from "../components/icons/HomeIcon";
import PlusIcon from "../components/icons/PlusIcon";
import MessagesIcon from "../components/icons/MessagesIcon";
import TabBarProfileIcon from "../components/TabBarProfileIcon";
import Header from "../components/Header/Header";

// const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeNavigator = ({ navigation }) => {
  const IconSize = 21;
  return (
    <Tab.Navigator
      screenOptions={({}) => ({
        tabBarShowLabel: false,
        headerShadowVisible: false,
        tabBarStyle: { backgroundColor: "#F9F9F9", paddingBottom: 20 },
      })}
    >
      <Tab.Screen
        name="Feed"
        component={Home}
        options={{
          // title: "",
          // headerStyle: { backgroundColor: "red", height: 115 },
          // headerLeft: () => {
          //   return (
          //     <View style={{ paddingLeft: 20 }}>
          //       <Logo size={35} />
          //     </View>
          //   );
          // },
          // headerRight: () => {
          //   return (
          //     <View style={[styles.views, { paddingRight: 20 }]}>
          //       <Text style={{ marginRight: 10 }}>Noti</Text>
          //       <BalanceTab />
          //     </View>
          //   );
          // },
          // headerTitleAlign: "left",
          header: ({ navigation, route, options, back }) => {
            // const title = getHeaderTitle(options, route.name);

            return (
              <Header
              // title={title}
              // leftButton={
              //   back ? <MyBackButton onPress={navigation.goBack} /> : undefined
              // }
              />
            );
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
              return <TabBarProfileIcon size={22} focused={focused} />;
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

const styles = StyleSheet.create({
  container: {
    backgroundColor: "pink",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 18,
    paddingTop: 20,
    height: 99,
    // borderWidth: 2,
    backgroundColor: "#E5E5E5",
  },
  views: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

// options={{
//   title: "Feed",
//   // headerStyle: {
//   //   backgroundColor: "#f4511e",
//   // },
//   headerTitleStyle: { fontFamily: "Nunito_700Bold", color: "#999999" },
//   tabBarIcon: ({ size, focused, color }) => {
//     {
//       return (
//         <HomeIcon
//           color={focused ? "black" : "none"}
//           isSelected={focused}
//           size={IconSize}
//           strokeColor={focused ? "black" : "#999999"}
//         />
//       );
//     }
//   },
// }}