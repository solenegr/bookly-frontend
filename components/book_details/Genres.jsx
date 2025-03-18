import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

const genresColor = [
  "#74C0FC",
  "#FFB347",
  "#FF85A2",
  "#C792EA",
  "#77DD77",
  "#FFD700",
];

const Genres = ({ genres }) => {
  return (
    <View className="flex-row flex-wrap gap-2 justify-center -mt-1">
      {genres.map((genre, index) => (
        <TouchableOpacity
          activeOpacity={0.7}
          key={index}
          className="px-3.5 py-1 rounded-full"
          style={{
            backgroundColor: genresColor[index % genres.length],
            shadowColor: genresColor[index % genres.length],
            shadowOpacity: 0.5,
            shadowRadius: 2.62,
            shadowOffset: { width: 500, height: 3 },
            elevation: 4,
          }}
        >
          <Text
            className={`text-gray-800 text-base font-nunitoBold ${`bg-[${genres[index]}]`}`}
          >
            {genre}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default Genres;
