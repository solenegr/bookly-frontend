import React, { useEffect } from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Nunito_200ExtraLight,
  Nunito_300Light,
  Nunito_400Regular,
  Nunito_500Medium,
  Nunito_600SemiBold,
  Nunito_700Bold,
  Nunito_800ExtraBold,
  Nunito_900Black,
  useFonts,
} from "@expo-google-fonts/nunito";
import * as SplashScreen from "expo-splash-screen";
import "./global.css";
import { BookDetailScreen } from "./screens";

SplashScreen.preventAutoHideAsync(); // Empêche l'écran de chargement de disparaître avant le chargement des polices

export default function App() {
  const [fontsLoaded] = useFonts({
    Nunito_200ExtraLight,
    Nunito_300Light,
    Nunito_400Regular,
    Nunito_500Medium,
    Nunito_600SemiBold,
    Nunito_700Bold,
    Nunito_800ExtraBold,
    Nunito_900Black,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync(); // Cache le splashScreen une fois que la police est chargée
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null; // Empêche le rendu tant que la police n'est pas chargée
  }

  return (
    <SafeAreaView className="">
      <BookDetailScreen />
    </SafeAreaView>
  );
}
