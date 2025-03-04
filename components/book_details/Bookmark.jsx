import React from "react";
import { TouchableOpacity, Text } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const Bookmark = () => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className="bg-light_gray items-center justify-center gap-3 h-20 w-24 rounded-md"
    >
      <FontAwesome name="check" size={15} color="purple" />
      <Text className="font-nunitoLight text-gray-600 text-sm">
        Déjà ajouté
      </Text>
    </TouchableOpacity>
  );
};

export default Bookmark;
