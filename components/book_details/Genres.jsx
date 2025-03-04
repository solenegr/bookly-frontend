import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

const genres = [
  { name: "Fantasy", color: "#74C0FC" },
  { name: "Aventure", color: "#FFB347" },
  { name: "Roman initiatique", color: "#FF85A2" },
  { name: "Magie", color: "#C792EA" },
  { name: "High Fantasy", color: "#77DD77" },
  { name: "Mythologie", color: "#FFD700" },
];

const Genres = () => {
  return (
    <View className="flex-row flex-wrap gap-2 justify-center -mt-2">
      {genres.map((genre, index) => (
        <TouchableOpacity
          activeOpacity={0.7}
          key={index}
          className="px-3.5 py-1 rounded-full"
          style={{
            backgroundColor: genre.color,
            shadowColor: genre.color,
            shadowOpacity: 0.5,
            shadowRadius: 2.62,
            shadowOffset: { width: 500, height: 3 },
            elevation: 4,
          }}
        >
          <Text className="text-gray-800 text-base font-nunitoBold">
            {genre.name}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default Genres;
