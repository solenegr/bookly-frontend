import React from "react";
import { View, Text } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const Note = ({ averageNote }) => {
  const fullStars = Math.floor(averageNote);
  const halfStar = averageNote % 1 >= 0.5 ? 1 : 0;
  const emptyStars = 5 - (fullStars + halfStar);

  return (
    <View className="bg-light_gray items-center justify-center gap-2.5 rounded-md h-20 w-32">
      <View className="flex flex-row gap-0.5">
        {/* Étoiles pleines */}
        {[...Array(fullStars)].map((_, i) => (
          <FontAwesome key={i} name="star" size={18} color="#fed330" />
        ))}

        {/* Étoile à moitié remplie */}
        {halfStar === 1 && (
          <FontAwesome name="star-half-full" size={18} color="#fed330" />
        )}

        {/* Étoiles vides */}
        {[...Array(emptyStars)].map((_, i) => (
          <FontAwesome
            key={i + fullStars + 1}
            name="star-o"
            size={18}
            color="#fed330"
          />
        ))}
      </View>
      <Text className="font-nunitoMedium text-gray-600 text-sm">
        Note ({averageNote})
      </Text>
    </View>
  );
};

export default Note;
//fed330
