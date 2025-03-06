import React from "react";
import { Image, View, Text } from "react-native";

export default function GrayBlock({ mainText, subText }) {
  return (
    <View>
      <View className="bg-light_gray items-center justify-center gap-1 rounded-md h-20 w-24">
        <Text className="font-nunitoBold text-lg">{mainText}</Text>
        <Text className="font-nunitoMedium text-gray-600 text-sm">
          {subText}
        </Text>
      </View>
    </View>
  );
}
