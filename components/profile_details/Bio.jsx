import React, { useEffect, useState } from "react";
import { Image, View, Text } from "react-native";
import { useSelector } from "react-redux";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function Bio() {
  return (
    <View className="ml-3 mr-3 mb-4 rounded-md p-2 items-center">
      <Text className="font-nunitoRegular text-gray-800">
        Ma bio ultra catchy ⭐ Lorem Ipsum is simply dummy text of the printing
        and typesetting industry. Lorem Ipsum has been the industry's standard
        dummy{" "}
      </Text>
    </View>
  );
}
