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
<<<<<<< HEAD
import { BookDetailScreen } from "./screens";
=======
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
>>>>>>> 544927898f6a72a7892a40763f9d393166f34656

SplashScreen.preventAutoHideAsync(); // Empêche l'écran de chargement de disparaître avant le chargement des polices

export default function App() {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();

  //Menu du bas et choix couleurs icônes
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
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Library" component={LibraryScreen} />
        <Tab.Screen name="Search" component={ScanScreen} />
        <Tab.Screen name="Messages" component={MessagesScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    );
  };

  //Gestion font nunito
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
    <SafeAreaView className="">
      <BookDetailScreen />
    </SafeAreaView>
=======
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Connection" component={ConnectionScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="TabNavigator" component={TabNavigator} />
      </Stack.Navigator>
      {/* <SafeAreaView className="h-screen w-full bg-navy_blue">
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
>>>>>>> 544927898f6a72a7892a40763f9d393166f34656
  );
}
