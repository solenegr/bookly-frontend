import React from "react";
import { ImageBackground, View, Image } from "react-native";

const Background = ({cover}) => {
  return (
    <ImageBackground
      source={{uri : cover}}
      className="w-full h-[27rem]"
      blurRadius={25}
      resizeMode="cover"
    >
      <View className="items-center justify-center flex-1 border -mt-9">
        <Image
          source={{uri : cover}}
          className="w-48 h-72 rounded-lg border-white border"
          resizeMode="contain"
        />
      </View>
    </ImageBackground>
  );
};

export default Background;
