import React from "react";
import { View, Text } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const Note = () => {
  return (
    <View className="bg-light_gray items-center justify-center gap-2.5 rounded-md h-20 w-32">
      <View className="flex flex-row gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <FontAwesome key={i} name="star" size={18} color="#fed330" />
        ))}
      </View>
      <Text className="font-nunitoLight text-gray-600 text-sm">Note</Text>
    </View>
  );
};

export default Note;
