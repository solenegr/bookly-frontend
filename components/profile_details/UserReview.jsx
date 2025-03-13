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
    <View className="bg-light_gray py-3 px-3.5 rounded-lg mb-4 mx-5">
      {/* Bloc image+titre + auteur + etoiles */}
      <View className="flex-row items-start">
        {/* Affichage image */}
        <TouchableOpacity
          onPress={() => navigation.navigate("Details", { isbn })}
        >
          <Image
            source={{ uri: cover }}
            className="w-16 h-24 object-scale-down"
          />
        </TouchableOpacity>

        {/* Affichage titre + auteur +note */}
        <View className="flex-row">
          <View className="flex-col my-4 px-2 space-y-2 border border-black">
            <Text className="font-nunitoExtraBold text-base flex-1">
              {title.length > 23 ? title.slice(0, 20) + "..." : title}
            </Text>
            <Text className="font-nunitoRegular text-sm flex-1">{author}</Text>
          </View>
          <View className="mt-4 ml-auto pr-2 border border-red-600">
            <View className="flex flex-row gap-0.5">
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
        </View>
      </View>
      {/* affichage du commentaire */}
      <View className="flex-col pl-[4.5rem] border border-green-700">
        <Text
          className="font-nunitoRegular "
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
  );
}

// const userAvis = [
//   {
//     id: 1,
//     book: "Terremer",
//     author: "Ursula Le Guin",
//     couv: "../../assets/temp/terremer.webp",
//     note: 4.5,
//     commentaire:
//       "Un chef-d'œuvre absolu ! L'écriture est fluide et captivante, et les personnages sont incroyablement bien développés. Je le relirai sans hésiter tant il m'a transporté dans un autre monde.",
//   },
//   {
//     id: 2,
//     book: "Terremer",
//     author: "Ursula Le Guin",
//     couv: "../../assets/temp/terremer.webp",
//     note: 4.5,
//     commentaire:
//       "Un chef-d'œuvre absolu ! L'écriture est fluide et captivante, et les personnages sont incroyablement bien développés. Je le relirai sans hésiter tant il m'a transporté dans un autre monde.",
//   },
//   {
//     id: 3,
//     book: "Terremer",
//     author: "Ursula Le Guin",
//     couv: "../../assets/temp/terremer.webp",
//     note: 4.5,
//     commentaire:
//       "Un chef-d'œuvre absolu ! L'écriture est fluide et captivante, et les personnages sont incroyablement bien développés. Je le relirai sans hésiter tant il m'a transporté dans un autre monde.",
//   },
// ];
