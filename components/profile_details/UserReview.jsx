import React, { useState } from "react";
import { Image, Text, View } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function UserReview({ id, book, author, note, commentaire }) {
  //pour pouvoir accéder à l'image - à supprimer à la connexion BDD
  const imageMap = {
    cover: require("../../assets/temp/terremer.webp"),
  };

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
      <View className="flex-row items-start">
        <Image
          source={imageMap["cover"]}
          className=" w-16 h-24 object-scale-down"
        />
        <View className="flex-col my-4 px-2 space-y-2">
          <Text className="font-nunitoExtraBold text-base flex-1">{book}</Text>
          <Text className=" font-nunitoRegular text-sm flex-1">{author}</Text>
        </View>
        <View className="mt-4 ml-auto pr-2 ">
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
          {/* <Text className="">{note}</Text> */}
        </View>
      </View>
      <View className="flex-col" >
        {/* affichage du commentaire */}
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
            <View className="self-end mt-0,5 mr-3" ><FontAwesome
            name={"heart"}
            color={"#9F5DD8"}
            size={18}
          /></View>
            
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
