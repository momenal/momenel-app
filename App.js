import "react-native-url-polyfill/auto";
import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, Alert, StyleSheet, View } from "react-native";
import {
  useFonts,
  Nunito_400Regular,
  Nunito_500Medium,
  Nunito_600SemiBold,
  Nunito_700Bold,
  Nunito_800ExtraBold,
  Nunito_900Black,
} from "@expo-google-fonts/nunito";
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
  const [isLoading, setIsLoading] = useState(false);
  const [session, setSession] = useState(null);
  const hasCompletedOnboarding = useBoundStore(
    (state) => state.hasCompletedOnboarding
  );
  const setHasCompletedOnboarding = useBoundStore(
    (state) => state.setHasCompletedOnboarding
  );
  const SetUserId = useBoundStore((state) => state.SetUserId);
  const SetUserData = useBoundStore((state) => state.SetUserData);
  const username = useBoundStore((state) => state.username);

  useEffect(() => {
    setIsLoading(true);
    supabase.auth.getSession().then(({ data: { session } }) => {
      //todo: get user data from database
      setTimeout(() => {
        SetUserData(
          "user",
          "https://images.pexels.com/photos/1317712/pexels-photo-1317712.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
          null
        );
        setHasCompletedOnboarding(false);
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
        SetUserId(user.id);
      }
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

  let [fontsLoaded] = useFonts({
    Nunito_400Regular,
    Nunito_500Medium,
    Nunito_600SemiBold,
    Nunito_700Bold,
    Nunito_800ExtraBold,
    Nunito_900Black,
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
            <StatusBar style="dark" animated={true} hidden />
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
