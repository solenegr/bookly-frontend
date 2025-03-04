import "./global.css";
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

import FontAwesome from "react-native-vector-icons/FontAwesome";
import {
  ConnectionScreen,
  HomeScreen,
  LibraryScreen,
  MessagesScreen,
  ProfileScreen,
  ScanScreen,
  SignUpScreen,
  WelcomeScreen,
} from "./screens";
import BookDetailScreen from "./screens/BookDetailsScreen";

SplashScreen.preventAutoHideAsync(); // Empêche l'écran de chargement de disparaître avant le chargement des polices

export default function App() {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();

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
    return null;
  }

  const TabNavigator = () => {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName = "";

            if (route.name === "Home") {
              iconName = "home";
            } else if (route.name === "Library") {
              iconName = "book";
            } else if (route.name === "Search") {
              iconName = "search";
            } else if (route.name === "Messages") {
              iconName = "envelope";
            } else if (route.name === "Profile") {
              iconName = "user";
            }

            return <FontAwesome name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "#9F5DD8",
          tabBarInactiveTintColor: "grey",
          headerShown: false,
        })}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Library" component={LibraryScreen} />
        <Tab.Screen name="Search" component={ScanScreen} />
        <Tab.Screen name="Messages" component={MessagesScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
        <Tab.Screen
          name="Details"
          component={BookDetailScreen}
          options={{ tabBarButton: () => null }} // 🔥 Cache l’icône de `DetailsScreen`
        />
      </Tab.Navigator>
    );
  };

  // let environment = "DEV";
  // if (environment === "DEV") {
  //   return <BookDetailScreen />;
  // }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Connection" component={ConnectionScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="TabNavigator" component={TabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
