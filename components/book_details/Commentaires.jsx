import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const Commentaires = ({
  item,
  isLike,
  setIsLike,
  hideComment,
  setHideComment,
  toggleState,
}) => {
  return (
    <View className="bg-light_gray py-3 px-3.5 rounded-lg mb-4 mx-5">
      <View className="flex flex-row items-center gap-3">
        <FontAwesome name="user-circle" color={"#2960A1"} size={28} />
        <Text className="text-blue-950 font-nunitoExtraBold text-base flex-1">
          {item.name}
        </Text>

        <View className="flex flex-row gap-0.5 pr-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <FontAwesome
              key={i}
              name={i < Math.floor(item.note) ? "star" : "star-o"}
              size={15}
              color={"#fed330"}
            />
          ))}
        </View>
      </View>

      <Text  onPress={() => toggleState(item.id, hideComment, setHideComment)} className="text-gray-700 text-[1rem] mt-2 leading-relaxed font-nunitoMedium pl-10">
        {item.commentaire.length > 125 && !hideComment.includes(item.id)
          ? item.commentaire.slice(0, 125) + "..."
          : item.commentaire}
      </Text>

      {/* {item.commentaire.length > 125 && (
        <TouchableOpacity
          className="w-40 py-1"
          activeOpacity={0.8}
          onPress={() => toggleState(item.id, hideComment, setHideComment)}
        >
          <Text className="text-navy_blue text-[1rem] mt-2 leading-relaxed font-nunitoBold pl-10">
            {!hideComment.includes(item.id) ? "Voir plus" : "Voir Moins"}
          </Text>
        </TouchableOpacity>
      )} */}

      <View className="w-full items-end pr-2 mt-1">
        <TouchableOpacity
          activeOpacity={0.4}
          className="w-12 h-12 items-center justify-center"
          onPress={() => toggleState(item.id, isLike, setIsLike)}
        >
          <FontAwesome
            name={`${isLike.includes(item.id) ? "heart" : "heart-o"}`}
            color={"#9F5DD8"}
            size={18}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Commentaires;
