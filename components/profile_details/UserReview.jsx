import React from "react";
import { Image, Text, View } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function UserReview({ book, author, note, commentaire }) {
  //pour pouvoir accéder à l'image - à supprimer à la connexion BDD
  const imageMap = {
    cover: require("../../assets/temp/terremer.webp"),
  };

  return (
    <View className="bg-light_gray py-3 px-3.5 rounded-lg mb-4 mx-5">
      <View className="flex-row items-start border border-black">
        <Image
          source={imageMap["cover"]}
          className=" w-16 h-24 object-scale-down"
        />
        <View className="flex-col my-4 px-2 space-y-2 border border-black">
          <Text className="font-nunitoExtraBold text-base flex-1">{book}</Text>
          <Text className=" font-nunitoRegular text-sm flex-1">{author}</Text>
        </View>
        <View className="border border-black mt-4 ml-auto pr-2 ">
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
      <View>
        <Text className="font-nunitoRegular">{commentaire}</Text>
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
