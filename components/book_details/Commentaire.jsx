import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const Commentaire = ({
  item,
  isLike,
  setIsLike,
  hideComment,
  setHideComment,
  toggleState,
  userId,
}) => {
  const handleLike = async () => {
    if (!userId) return; // 🚨 Vérifie que `userId` est défini

    try {
      const response = await fetch(
        `https://bookly-backend-three.vercel.app/reviews/${item._id}/like`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId }), // ✅ Envoie `userId` directement
        }
      );

      const data = await response.json();
      if (data.result) {
        console.log("Avis mis à jour :", data.review);

        // ✅ Vérifie si l'utilisateur a liké
        const hasLiked = data.review.likes.includes(userId);

        // ✅ Met à jour `isLike` immédiatement pour un retour visuel rapide
        setIsLike(
          (prevLikes) =>
            hasLiked
              ? [...prevLikes, item._id] // Ajoute si l'utilisateur a liké
              : prevLikes.filter((id) => id !== item._id) // Supprime sinon
        );
      }
    } catch (error) {
      console.error("Erreur lors du like :", error);
    }
  };

  return (
    <View className="bg-light_gray py-3 px-3.5 rounded-lg mb-4 mx-5">
      <View className="flex flex-row items-center gap-3">
        <FontAwesome name="user-circle" color={"#2960A1"} size={28} />
        <View className={"flex-row flex-1"}>
          <Text className="text-blue-950 font-nunitoExtraBold text-base ">
            {item.user.firstname}
          </Text>
          <Text className="text-blue-950 font-medium text-base ">
            @{item.user.username}
          </Text>
        </View>

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

      <Text
        onPress={() => toggleState(item._id, hideComment, setHideComment)}
        className="text-gray-700 text-[1rem] mt-2 leading-relaxed font-nunitoMedium pl-10"
      >
        {item.content.length > 125 && !hideComment.includes(item._id)
          ? item.content.slice(0, 125) + "..."
          : item.content}
      </Text>

      <View className="w-full items-end pr-2 mt-1">
        <TouchableOpacity
          activeOpacity={0.4}
          className="w-12 h-12 items-center justify-center"
          onPress={handleLike}
        >
          <FontAwesome
            name={isLike.includes(item._id) ? "heart" : "heart-o"}
            color={"#9F5DD8"}
            size={18}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Commentaire;
