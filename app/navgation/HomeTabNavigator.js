import { Dimensions, StyleSheet } from "react-native";
import React from "react";
import Home from "../../Screens/Home";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import DiscoverIcon from "../components/icons/DiscoverIcon";
import HomeIcon from "../components/icons/HomeIcon";
import PlusIcon from "../components/icons/PlusIcon";
import TabBarProfileIcon from "../components/TabBarProfileIcon";
import Header from "../components/Header/Header";
import FakeLogout from "../components/FakeLogout";
import Notifications from "../components/icons/Notifications";
import CreatePost from "../../Screens/CreatePost";
import PlaceholderScreen from "../components/PlaceholderScreen";
import Discover from "../../Screens/Discover";

// const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeNavigator = ({ navigation }) => {
  const Height = Dimensions.get("window").height * 0.024;
  // const IconSize = 21;
  const IconSize = Height > 21 ? 21 : Height < 18 ? 18 : Height;

  return (
    <Tab.Navigator
      screenOptions={({}) => ({
        tabBarShowLabel: false,
        headerShadowVisible: false,
        tabBarStyle: { backgroundColor: "#F9F9F9", paddingVertical: 0 },
        headerTitleStyle: { fontFamily: "Nunito_700Bold" },
        // unmountOnBlur: true,
        freezeOnBlur: true,
      })}
    >
      <Tab.Screen
        name="Feed"
        component={Home}
        options={{
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
        component={Home}
        options={{
          title: "Notifications",
          // tabBarStyle: { display: "none" },
          tabBarIcon: ({ size, focused }) => {
            {
              return (
                <Notifications
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
        component={FakeLogout}
        options={{
          title: "Profile",
          // tabBarStyle: { display: "none" },
          tabBarIcon: ({ size, focused, color }) => {
            {
              return <TabBarProfileIcon size={IconSize} focused={focused} />;
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
