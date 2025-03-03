import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import "./global.css";

export default function App() {
  return (
    <View className={"bg-red-500 h-screen w-screen"}>
      <Text className="text-red-500 border border-black">
        Open up App.js to start working on your app!
      </Text>
      <StatusBar style="auto" />
    </View>
  );
}
