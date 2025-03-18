import "./global.css";
import React, { useEffect } from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
//components imports
import {
  BookDetailsScreen,
  ConnectionScreen,
  HomeScreen,
  LibraryScreen,
  MessagesScreen,
  ProfileScreen,
  ScanScreen,
  SignUpScreen,
  WelcomeScreen,
  ChatScreen,
  ChallengeScreen,
  ResearchScreen,
} from "./screens";
//navigate imoports
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
//redux imports
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistStore, persistReducer } from "redux-persist";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { PersistGate } from "redux-persist/integration/react";

import user from "./reducers/user";
import books from "./reducers/books";
import challenge from "./reducers/challenge";
import conversations from "./reducers/conversations";

//font imports
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

SplashScreen.preventAutoHideAsync(); // Empêche l'écran de chargement de disparaître avant le chargement des polices

const persistConfig = {
  key: "user",
  storage: AsyncStorage,
};
const persistedUserReducer = persistReducer(persistConfig, user);

const store = configureStore({
  reducer: { user: persistedUserReducer, books, challenge, conversations },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // ✅ Empêche les erreurs de Redux Persist sur des valeurs non sérialisables
    }),
});

const persistor = persistStore(store);

export default function App() {
  console.log = () => {};
  console.warn = () => {};
  console.error = () => {};

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
        <Stack.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Library" component={LibraryScreen} />
        <Tab.Screen name="Search" component={ResearchScreen} />
        <Tab.Screen name="Messages" component={MessagesScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
        <Tab.Screen
          name="Details"
          component={BookDetailsScreen}
          options={{ tabBarButton: () => null }} // 🔥 Cache l’icône de `DetailsScreen`
        />
      </Tab.Navigator>
    );
  };

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="Connection" component={ConnectionScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
            <Stack.Screen name="TabNavigator" component={TabNavigator} />
            <Stack.Screen name="BookDetails" component={BookDetailsScreen} />
            <Stack.Screen name="Chat" component={ChatScreen} />
            <Stack.Screen name="Scan" component={ScanScreen} />
            <Stack.Screen name="Challenge" component={ChallengeScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}
