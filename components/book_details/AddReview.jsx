import Pusher from "pusher-js/react-native";
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const AddReview = ({ bookId, userId }) => {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleRating = (selectedRating) => {
    setRating(selectedRating);
  };

  const handleSubmit = async () => {
    if (!comment.trim() || rating === 0) {
      alert("Ajoute un commentaire et une note !");
      return;
    }

    setLoading(true);

    try {
      // 🔥 On envoie la review au BACKEND, qui lui va utiliser Pusher
      const response = await fetch(
        `http://${process.env.IP_ADDRESS}:3000/reviews`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            content: comment,
            book: bookId,
            user: userId,
            note: rating,
          }),
        }
      );

      const data = await response.json();

      if (data.result) {
        setComment("");
        setRating(0);
      } else {
        alert("Erreur lors de l'ajout du commentaire !");
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout de la review :", error);
    }

    setLoading(false);
  };

  return (
    <View className="p-4 bg-light_gray rounded-lg">
      <Text className="text-lg font-bold text-gray-800">Ajouter un avis</Text>

      {/* ⭐ Sélection des étoiles */}
      <View className="flex flex-row my-3">
        {Array.from({ length: 5 }).map((_, index) => (
          <TouchableOpacity key={index} onPress={() => handleRating(index + 1)}>
            <FontAwesome
              name={index < rating ? "star" : "star-o"}
              size={28}
              color={index < rating ? "#fed330" : "#ccc"}
              style={{ marginHorizontal: 4 }}
            />
          </TouchableOpacity>
        ))}
      </View>

      {/* 📝 Input du commentaire */}
      <TextInput
        placeholder="Écris ton avis ici..."
        value={comment}
        onChangeText={setComment}
        className="border p-3 rounded-md bg-white"
        multiline
      />

      {/* 🚀 Bouton d'envoi */}
      <TouchableOpacity
        onPress={handleSubmit}
        disabled={loading}
        className={`p-3 mt-4 rounded-md ${
          loading ? "bg-gray-400" : "bg-button_purple"
        }`}
      >
        <Text className="text-white text-center font-bold">
          {loading ? "Envoi..." : "Envoyer"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddReview;
