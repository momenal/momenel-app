import "react-native-url-polyfill/auto";
import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, Alert, StyleSheet, View } from "react-native";
import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import StackNavigator from "./app/navgation/StackNavigator";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Audio, InterruptionModeAndroid, InterruptionModeIOS } from "expo-av";
import { useEffect, useState } from "react";
import { PortalProvider } from "@gorhom/portal";
import { supabase } from "./app/lib/supabase";
import Auth from "./Screens/Auth";
import { useBoundStore } from "./app/Store/useBoundStore";
import SignupStackNavigator from "./app/navgation/SignupStackNavigator";

export default function App() {
  // async function getHashtags() {
  //   let { data: hashtags, error } = await supabase.from("hashtags").select("*");

  //   console.log(hashtags);
  //   console.log(error);
  // }

  // getHashtags();

  const [isLoading, setIsLoading] = useState(false);
  const [session, setSession] = useState(null);
  const hasCompletedOnboarding = useBoundStore(
    (state) => state.hasCompletedOnboarding
  );
  const setHasCompletedOnboarding = useBoundStore(
    (state) => state.setHasCompletedOnboarding
  );

  const SetUserData = useBoundStore((state) => state.SetUserData);
  const username = useBoundStore((state) => state.username);

  useEffect(() => {
    setIsLoading(true);
    supabase.auth.getSession().then(({ data: { session } }) => {
      //todo: get user data from database
      setTimeout(() => {
        SetUserData(
          "username_from_gloabl_state",
          "https://images.pexels.com/users/avatars/78973777/iurii-laimin-961.jpeg?auto=compress&fit=crop&h=130&w=130&dpr=2",
          null
        );
        setHasCompletedOnboarding(true);
        setSession(session);
        setIsLoading(false);
      }, 0);
    });

    supabase.auth.onAuthStateChange(async (_event, session) => {
      if (_event === "SIGNED_IN") {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        console.log("signed in");
        console.log("user", user.id);
        if (!user.id) {
          Alert.alert("Error", "Please try again");
        }
      }
      //todo: get user data from database and set it in store
      setHasCompletedOnboarding(true);
      setSession(session);
    });
  }, []);

  useEffect(() => {
    Audio.setAudioModeAsync({
      playsInSilentModeIOS: true,
      interruptionModeIOS: InterruptionModeIOS.DoNotMix,
      interruptionModeAndroid: InterruptionModeAndroid.DoNotMix,
      shouldDuckAndroid: true,
      staysActiveInBackground: false,
    });
  }, []);

  const [fontsLoaded] = useFonts({
    Nunito_400Regular: require("./assets/fonts/Nunito-Regular.ttf"),
    Nunito_500Medium: require("./assets/fonts/Nunito-Medium.ttf"),
    Nunito_600SemiBold: require("./assets/fonts/Nunito-SemiBold.ttf"),
    Nunito_700Bold: require("./assets/fonts/Nunito-Bold.ttf"),
    Nunito_800ExtraBold: require("./assets/fonts/Nunito-ExtraBold.ttf"),
    Nunito_900Black: require("./assets/fonts/Nunito-Black.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  } else if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator color="#0000ff" />
      </View>
    );
  } else {
    return session && session.user ? (
      !username || !hasCompletedOnboarding ? (
        <GestureHandlerRootView style={{ flex: 1 }}>
          <SafeAreaProvider>
            <PortalProvider>
              <NavigationContainer>
                <SignupStackNavigator />
              </NavigationContainer>
            </PortalProvider>
          </SafeAreaProvider>
        </GestureHandlerRootView>
      ) : (
        <GestureHandlerRootView style={{ flex: 1 }}>
          <SafeAreaProvider>
            <PortalProvider>
              <NavigationContainer>
                <StackNavigator />
                <StatusBar style="dark" animated={true} />
              </NavigationContainer>
            </PortalProvider>
          </SafeAreaProvider>
        </GestureHandlerRootView>
      )
    ) : (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <PortalProvider>
          <SafeAreaProvider>
            <Auth />
            <StatusBar style="dark" animated={true} />
          </SafeAreaProvider>
        </PortalProvider>
      </GestureHandlerRootView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
