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
import { baseUrl } from "@env";

export default function App() {
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
      if (session) {
        console.log("session", session.access_token);
        getIntialData(session.access_token);
      } else {
        setIsLoading(false);
      }
      setSession(session);
    });

    supabase.auth.onAuthStateChange(async (_event, session) => {
      if (_event === "SIGNED_IN") {
        console.log("signed in");
        const {
          data: { user },
        } = await supabase.auth.getUser();
        // getIntialData(session.access_token);
        // console.log("signed in");
        // console.log("user", user.id);
        if (!user.id) {
          Alert.alert("Error", "Please try again");
        }
        setSession(session);
        console.log("session sign in", session);
      } else if (_event === "SIGNED_OUT") {
        setSession(null);
        SetUserData(null, null);
        setHasCompletedOnboarding(null);
        setIsLoading(false);
      }
    });
  }, []);

  const getIntialData = async (access_token) => {
    let headersList = {
      Authorization: `Bearer ${access_token}`,
    };
    let response = await fetch(`${baseUrl}/user/intial`, {
      method: "GET",
      headers: headersList,
    });
    let data = await response.json();
    if (data.error) {
      Alert.alert("Error", "Please try again");
      console.log("error", data.error);
    } else {
      console.log("data", data);
      SetUserData(data.username, data.profile_url);
      setHasCompletedOnboarding(data.has_onboarded);
      setIsLoading(false);
    }
  };

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
