import React from "react";
import { TouchableOpacity, Text } from "react-native";

const Tome = () => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className="bg-light_gray items-center justify-center gap-1 h-20 w-24 rounded-md"
    >
      <Text className="font-nunitoSemiBold text-lg">1</Text>
      <Text className="font-nunitoLight text-gray-600 text-sm">Tome</Text>
    </TouchableOpacity>
  );
};

export default Tome;
