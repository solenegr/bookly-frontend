import React, { useEffect } from "react";
import { Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
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
import WelcomeScreen from "./screens/WelcomeScreen";
import ConnectionScreen from "./screens/SignUpScreen";
import SignUpScreen from "./screens/SignUpScreen";
import ScanScreen from "./screens/ScanScreen";
import LibraryScreen from "./screens/LibraryScreen";
import ProfileScreen from "./screens/ProfileScreen";
import HomeScreen from "./screens/HomeScreen.jsx";
import MessagesScreen from "./screens/MessagesScreen.jsx";

SplashScreen.preventAutoHideAsync(); // Empêche l'écran de chargement de disparaître avant le chargement des polices

export default function App() {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();

  const TabNavigator = () => {
    return (
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Library" component={LibraryScreen} />
        <Tab.Screen name="Scan" component={ScanScreen} />
        <Tab.Screen name="Scan" component={ScanScreen} />
        <Tab.Screen name="Messages" component={MessagesScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    );
  };

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
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Connection" component={ConnectionScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
      </Stack.Navigator>
      {/* <SafeAreaView className="h-screen w-full bg-white">
        <Text className="font-nu text-lg text-black">Nunito ExtraLight</Text>
        <Text className="font-nunitoLight text-lg text-black">
          Nunito Light
        </Text>
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
        <Text className="font-nunitoBlack text-lg text-black">
          Nunito Black
        </Text>
      </SafeAreaView> */}
    </NavigationContainer>
  );
}
