import React from "react";
import Home from "../../Screens/Home";
import HomeTabNavigator from "./HomeTabNavigator";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Stories from "../../Screens/Stories";
import Report from "../../Screens/Report";
import YourStoryCarousel from "../components/Stories/StoriesScroll/YourStory/YourStoryCarousel";
import Zoom from "../../Screens/Zoom";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import ByUserList from "../../Screens/ByUserList";
import Comments from "../../Screens/Comments";

const Stack = createNativeStackNavigator();

const StackNavigator = ({}) => {
  const navigation = useNavigation();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeTabNavigator}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Stories"
        component={Stories}
        options={{
          gestureDirection: "vertical",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="YourStory"
        component={YourStoryCarousel}
        options={{ gestureDirection: "vertical", headerShown: false }}
      />
      <Stack.Screen
        name="Comments"
        component={Comments}
        options={{
          headerTitleStyle: { fontFamily: "Nunito_700Bold" },
          headerBackTitle: "",
          headerShadowVisible: false,
          headerTintColor: "black",
        }}
      />
      <Stack.Screen
        name="Report"
        component={Report}
        options={{
          headerShown: true,
          title: "",
          headerBackTitle: "",
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="Zoom"
        component={Zoom}
        options={{
          headerLeft: (props) => (
            <TouchableOpacity
              style={{
                marginRight: 10,
                justifyContent: "flex-end",
                alignItems: "flex-end",
                paddingTop: 2,
              }}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="close" size={24} color="white" />
            </TouchableOpacity>
          ),

          gestureDirection: "vertical",
          headerTitleStyle: { fontFamily: "Nunito_700Bold" },
          headerStyle: {
            backgroundColor: "black",
          },
          headerTintColor: "white",
        }}
      />
      <Stack.Screen
        name="ByUser"
        component={ByUserList}
        options={{
          headerTitleStyle: { fontFamily: "Nunito_700Bold" },
          headerBackTitle: "",
          headerShadowVisible: false,
          headerTintColor: "black",
        }}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
