import React from "react";
import { ImageBackground, View, Image } from "react-native";

const Background = () => {
  return (
    <ImageBackground
      source={require("../../assets/temp/terremer.webp")}
      className="w-full h-[400px]"
      blurRadius={25}
      resizeMode="cover"
    >
      <View className="items-center justify-center flex-1">
        <Image
          source={require("../../assets/temp/terremer.webp")}
          className="w-48 h-72 rounded-lg border-white border"
          resizeMode="contain"
        />
      </View>
    </ImageBackground>
  );
};

export default Background;
