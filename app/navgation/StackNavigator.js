import React from "react";
import HomeTabNavigator from "./HomeTabNavigator";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Stories from "../../Screens/Stories";
import Report from "../../Screens/Report";
import YourStoryCarousel from "../components/Stories/StoriesScroll/YourStory/YourStoryCarousel";
import Zoom from "../../Screens/Zoom";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity, View } from "react-native";
import ByUserList from "../../Screens/ByUserList";
import Comments from "../../Screens/Comments";
import CreatePost from "../../Screens/CreatePost";
import PostHeaderButton from "../components/Buttons/PostHeaderButton";
import Search from "../../Screens/Search";

const Stack = createNativeStackNavigator();

const StackNavigator = ({}) => {
  const navigation = useNavigation();
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleStyle: { fontFamily: "Nunito_700Bold" },
      }}
    >
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
        name="CreatePost"
        component={CreatePost}
        options={{
          gestureDirection: "vertical",
          headerTitle: "",
          headerBackTitle: "",
          headerShadowVisible: false,
          gestureEnabled: false,
          // headerShown: false,
          headerLeft: () => (
            <TouchableOpacity
              style={{
                marginRight: 10,
                justifyContent: "flex-end",
                alignItems: "flex-end",
                paddingTop: 2,
              }}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="close" size={24} color="black" />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <View style={{ flexDirection: "row" }}>
              {/* <Ionicons name="images" size={16} color="black" /> */}
              <PostHeaderButton />
            </View>
          ),
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
      <Stack.Screen
        name="Search"
        component={Search}
        options={{
          headerShown: false,
          headerTitleStyle: { fontFamily: "Nunito_700Bold" },
          headerBackTitle: "",
          headerShadowVisible: false,
          headerTintColor: "black",
          gestureDirection: "vertical",
          gestureEnabled: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
