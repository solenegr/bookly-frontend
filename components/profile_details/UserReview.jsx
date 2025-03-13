import React, { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function UserReview({
  id,
  title,
  author,
  note,
  commentaire,
  cover,
  isbn,
  navigation,
}) {
  //pour pouvoir accéder à l'image - à supprimer à la connexion BDD
  // const imageMap = {
  //   cover: require("../../assets/temp/terremer.webp"),
  // };
  console.log("cover", cover);
  const [hideComment, setHideComment] = useState([]);

  const handleToggleComment = () => {
    setHideComment((prev) => {
      //si l'id est déjà dans hideComment(donc que le commentaire est masqué), on le retire``
      if (prev.includes(id)) {
        return prev.filter((pId) => pId !== id);
      }
      //sinon on l'ajoute
      return [...prev, id];
    });
  };

  return (
    <View className="bg-light_gray py-3 px-3.5 rounded-lg mb-4 mx-5 flex flex-row">
      {/* Couv livre */}
      <TouchableOpacity
        onPress={() => navigation.navigate("Details", { isbn })}
      >
        <Image
          source={{ uri: cover }}
          className="w-16 h-24 object-scale-down"
        />
      </TouchableOpacity>
      <View>
        <View className="flex-row w-80" >
          {/* Title + author */}
          <View className="mb-3 px-2 space-y-2 flex-1">
            <Text className="font-nunitoExtraBold text-base flex-1">
              {title.length > 23 ? title.slice(0, 20) + "..." : title}
            </Text>
            <Text className="font-nunitoRegular text-sm flex-1">{author}</Text>
          </View>

          {/* Etoiles */}
          <View className="flex flex-row gap-0.5 pr-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <FontAwesome
                key={i}
                name={i < Math.floor(note) ? "star" : "star-o"}
                size={15}
                color={"#fed330"}
              />
            ))}
          </View>
        </View>
        {/* affichage du commentaire */}
        <View className="pl-3 w-80">
          <Text
            className="font-nunitoRegular"
            onPress={() => handleToggleComment()}
          >
            {commentaire.length > 125 && !hideComment.includes(id)
              ? commentaire.slice(0, 125) + "...voir plus"
              : commentaire}
          </Text>
          {/* affichage du nombre de likes si on clique sur ...plus -> ajouter le nb de like total après connexion BDD */}
          {commentaire.length > 125 && hideComment.includes(id) && (
            <View className="self-end mt-0,5 mr-3">
              <FontAwesome name={"heart"} color={"#9F5DD8"} size={18} />
            </View>
          )}
        </View>
      </View>
    </View>
  );
}
