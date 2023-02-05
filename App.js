import "react-native-url-polyfill/auto";
import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
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
  const [session, setSession] = useState(null);
  const SetUserId = useBoundStore((state) => state.SetUserId);
  const username = useBoundStore((state) => state.username);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange(async (_event, session) => {
      if (_event === "SIGNED_IN") {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        console.log("signed in");
        console.log("user", user.id);
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
  } else {
    return session && session.user ? (
      !username ? (
        <GestureHandlerRootView style={{ flex: 1 }}>
          <SafeAreaProvider>
            <PortalProvider>
              <NavigationContainer>
                <SignupStackNavigator />
                {/* <StackNavigator /> */}
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
