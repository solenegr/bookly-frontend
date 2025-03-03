import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const BookDetailScreen = () => {
  return (
    <View className={"h-full w-full py-10 px-8"}>
      <View className={"flex flex-row"}>
        <Image
          source={require("../assets/temp/terremer.webp")}
          className={"w-40 h-60"}
          resizeMode="contain"
        />

        <View className={"flex items-center justify-center"}>
          <TouchableOpacity
            className={
              "bg-button_purple rounded-full w-14 h-14 flex justify-center items-center py-2.5"
            }
          >
            <Text className="font-nunitoMedium text-4xl text-white">+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default BookDetailScreen;
