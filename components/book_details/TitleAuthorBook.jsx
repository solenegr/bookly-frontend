import React from "react";
import { View, Text } from "react-native";

const TitleAuthorBook = ({title, author}) => {
  return (
    <View className="items-center gap-2">
      <Text className="text-2xl font-nunitoExtraBold text-center">
        {title}
      </Text>
      <Text className="font-nunitoBold text-gray-600">{author}</Text>
    </View>
  );
};

export default TitleAuthorBook;
