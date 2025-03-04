import React, { useState } from "react";
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  TouchableHighlight,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const BookDetailScreen = () => {
  const [activeBtn, setActiveBtn] = useState(1);

  return (
    <SafeAreaView>
      <View className={"h-full w-full py-10 px-6"}>
        <View className={"flex flex-row gap-2"}>
          <Image
            source={require("../assets/temp/terremer.webp")}
            className={"w-40 h-60"}
            resizeMode="contain"
          />

          <View className={"flex items-center justify-center flex-1 gap-5"}>
            <View className={"flex gap-1"}>
              <Text className={"font-nunitoBold text-lg"}>
                Terremer (Edition intégrale)
              </Text>
              <Text className={"font-medium text-sm "}>Ursula Le Guin</Text>
              <View className={"flex flex-row gap-1 mt-6"}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <FontAwesome
                    key={i}
                    name={"star"}
                    size={16}
                    color={"#fed330"}
                  />
                ))}
                <Text>(5/5)</Text>
              </View>
              <View className={"flex flex-row items-center gap-2 mt-5"}>
                <TouchableOpacity
                  activeOpacity={0.7}
                  className={
                    "border-button_purple border rounded-full px-3 py-1.5"
                  }
                >
                  <Text>status</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  activeOpacity={0.8}
                  className={
                    "bg-[#FED330] border-[#FED330] rounded-full px-3 py-1.5 "
                  }
                >
                  <Text>Polar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
        <View className={"flex flex-row gap-3 mt-5"}>
          {Array.from({ length: 8 }).map((_, i) => (
            <TouchableHighlight
              key={i}
              onPress={() => setActiveBtn(i)}
              className={`w-10 h-10 flex justify-center items-center rounded-md ${
                activeBtn === i ? "bg-black" : "bg-white"
              }`}
              underlayColor="#ccc"
            >
              <Text
                className={`font-nunitoSemiBold ${
                  activeBtn === i ? "text-white" : "text-black"
                }`}
              >
                {i + 1}
              </Text>
            </TouchableHighlight>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default BookDetailScreen;
