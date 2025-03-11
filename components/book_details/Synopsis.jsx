import React from "react";
import { View, Text } from "react-native";

const Synopsis = ({summary}) => {

  return (
    <View className="mt-6">
      <Text className="text-gray-800 font-nunitoExtraBold text-xl">
        Synopsis
      </Text>
      <Text className="text-gray-700 text-[1rem] mt-2 leading-relaxed font-nunitoSemiBold">
      {summary}
      </Text>
    </View>
  );
};

export default Synopsis;
