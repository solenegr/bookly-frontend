import React from "react";
import { TouchableOpacity, Text } from "react-native";

const Tome = ({tome}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className="bg-light_gray items-center justify-center gap-1 h-20 w-24 rounded-md"
    >
      <Text className="font-nunitoBold text-lg">992</Text>
      <Text className="font-nunitoMedium text-gray-600 text-sm">Pages</Text>
    </TouchableOpacity>
  );
};

export default Tome;
