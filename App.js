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
import ScanScreen from './screens/ScanScreen'

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
<<<<<<< HEAD
    <SafeAreaView className="h-screen w-full bg-white">
      <ScanScreen></ScanScreen>
      {/* <Text className="font-nu text-lg text-black">Nunito ExtraLight</Text>
=======
    <SafeAreaView className="h-screen w-full bg-navy_blue">
      <Text className="font-nu text-lg text-black">Nunito ExtraLight</Text>
>>>>>>> e3af0ae618b57c45039cf3039f30a7ed96148c48
      <Text className="font-nunitoLight text-lg text-black">Nunito Light</Text>
      <Text className="font-nunitoRegular text-lg text-black">
        Nunito Regular
      </Text>
      <Text className="font-nunitoMedium text-lg text-black">
        Nunito Medium
      </Text>
      <Text className="font-nunitoSemiBold text-lg text-black">
        Nunito SemiBold
      </Text>
      <Text className="font-nunitoBold text-lg text-black">Nunito Bold</Text>
      <Text className="font-nunitoExtraBold text-lg text-black">
        Nunito ExtraBold
      </Text>
      <Text className="font-nunitoBlack text-lg text-black">Nunito Black</Text> */}
    </SafeAreaView>
  );
}
