import { Dimensions } from "react-native";
import Home from "../../Screens/Home";
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import DiscoverIcon from "../components/icons/DiscoverIcon";
import HomeIcon from "../components/icons/HomeIcon";
import TabBarProfileIcon from "../components/TabBarProfileIcon";
import Header from "../components/Header/Header";
import NotificationsIcon from "../components/icons/Notifications";
import PlaceholderScreen from "../components/PlaceholderScreen";
import Discover from "../../Screens/Discover";
import Profile from "../../Screens/Profile";
import Notifications from "../../Screens/Notifications";

const Tab = createBottomTabNavigator();

const HomeNavigator = ({ navigation }) => {
  const Height = Dimensions.get("window").height * 0.024;
  const IconSize = Height > 21 ? 21 : Height < 18 ? 18 : Height;

  return (
    <Tab.Navigator
      initialRouteName="Feed"
      screenOptions={({}) => ({
        tabBarShowLabel: false,
        headerShadowVisible: false,
        tabBarStyle: {
          backgroundColor: "#F9F9F9",
          paddingVertical: 0,
        },
        headerTitleStyle: { fontFamily: "Nunito_700Bold" },
        freezeOnBlur: true,
      })}
    >
      <Tab.Screen
        name="Feed"
        component={Home}
        options={{
          unmountOnBlur: false,
          header: () => {
            return <Header navigation={navigation} />;
          },
          tabBarIcon: ({ focused }) => {
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
          tabBarIcon: () => {
            {
              return (
                <Ionicons name="create" size={IconSize + 6} color="#A8A8A8" />
              );
            }
          },
          unmountOnBlur: true,
        }}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
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
          tabBarIcon: ({ focused }) => {
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
          unmountOnBlur: true,
        }}
      />
    </Tab.Navigator>
  );
};

export default HomeNavigator;
