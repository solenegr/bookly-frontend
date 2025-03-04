import React from "react";
import { View, Text } from "react-native";

const TitleAuthorBook = () => {
  return (
    <View className="items-center gap-2">
      <Text className="text-2xl font-nunitoExtraBold text-center">
        Terremer (Édition intégrale)
      </Text>
      <Text className="font-nunitoBold text-gray-600">Ursula Le Guin</Text>
    </View>
  );
};

export default TitleAuthorBook;
