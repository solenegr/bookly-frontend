import React from "react";
import {
  Image,
  Text,
  View,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const { height } = Dimensions.get("window");

const genres = [
  { name: "Fantasy", color: "#74C0FC" },
  { name: "Aventure", color: "#FFB347" },
  { name: "Roman initiatique", color: "#FF85A2" },
  { name: "Magie", color: "#C792EA" },
  { name: "High Fantasy", color: "#77DD77" },
  { name: "Mythologie", color: "#FFD700" },
];

const avis = [
  {
    name: "Léo",
    note: 4.5,
    commentaire: "Un chef-d'œuvre, je le relirai sans hésiter !",
  },
  {
    name: "Sophie",
    note: 3.8,
    commentaire: "Quelques longueurs, mais dans l'ensemble un bon livre.",
  },
  {
    name: "Maxime",
    note: 5.0,
    commentaire: "Très immersif, difficile à lâcher une fois commencé.",
  },
  {
    name: "Emma",
    note: 2.7,
    commentaire: "Pas à la hauteur de mes attentes, mais correct.",
  },
  {
    name: "Nathan",
    note: 1.9,
    commentaire: "Décevant, trop prévisible.",
  },
  {
    name: "Alice",
    note: 4.2,
    commentaire: "L'histoire était intéressante mais un peu longue.",
  },
  {
    name: "Lucas",
    note: 3.0,
    commentaire: "J'ai adoré le style de l'auteur.",
  },
  {
    name: "Manon",
    note: 4.8,
    commentaire: "Un livre fascinant, je recommande !",
  },
  {
    name: "Hugo",
    note: 2.3,
    commentaire: "Un bon livre pour passer le temps.",
  },
  {
    name: "Camille",
    note: 3.6,
    commentaire: "Des personnages attachants et une intrigue bien ficelée.",
  },
];

const BookDetailsScreen = () => {
  return (
    <SafeAreaView className="flex-1">
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <ImageBackground
          source={require("../assets/temp/terremer.webp")}
          className="w-full h-[400px]" // Taille fixe pour éviter les problèmes
          blurRadius={25}
          resizeMode="cover"
        >
          <View className="items-center justify-center flex-1">
            <Image
              source={require("../assets/temp/terremer.webp")}
              className="w-48 h-72 rounded-lg border-white border"
              resizeMode="contain"
            />
          </View>
        </ImageBackground>

        <View className="w-full bg-white rounded-t-[2rem] shadow-lg p-5 -mt-10 gap-5">
          <View className="items-center gap-2">
            <Text className="text-2xl font-nunitoExtraBold text-center">
              Terremer (Édition intégrale)
            </Text>
            <Text className="font-nunitoBold text-gray-600">
              Ursula Le Guin
            </Text>
          </View>

          <View className="flex flex-row items-center justify-center gap-2 mt-4">
            <View className="bg-light_gray items-center justify-center gap-2.5 rounded-md h-20 w-32">
              <View className="flex flex-row gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <FontAwesome
                    key={i}
                    name={"star"}
                    size={18}
                    color={"#fed330"}
                  />
                ))}
              </View>
              <Text className="font-nunitoLight text-gray-600 text-sm">
                Note
              </Text>
            </View>

            <TouchableOpacity
              activeOpacity={0.7}
              className="bg-light_gray items-center justify-center gap-1 h-20 w-24 rounded-md"
            >
              <Text className="font-nunitoSemiBold text-lg">1</Text>
              <Text className="font-nunitoLight text-gray-600 text-sm">
                Tome
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.7}
              className="bg-light_gray items-center justify-center gap-3 h-20 w-24 rounded-md"
            >
              <FontAwesome name="check" size={15} color="purple" />
              <Text className="font-nunitoLight text-gray-600 text-sm">
                Déjà ajouté
              </Text>
            </TouchableOpacity>
          </View>

          <View className="flex-row flex-wrap gap-2 justify-center mt-4">
            {genres.map((genre, index) => (
              <TouchableOpacity
                activeOpacity={0.7}
                key={index}
                className="px-3.5 py-1 rounded-full self-start inline-flex r"
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

          {/* Synopsis */}
          <View className="mt-6">
            <Text className="text-gray-800 font-nunitoExtraBold text-xl">
              Synopsis
            </Text>
            <Text className="text-gray-700 text-sm mt-2 leading-relaxed font-nunitoMedium">
              Dans l'archipel magique de Terremer, les noms véritables ont un
              pouvoir immense, et ceux qui les connaissent peuvent modeler la
              réalité. Ged, un jeune garçon aux talents exceptionnels, grandit
              sur l'île de Gont et attire l’attention d’un puissant mage qui
              l’initie à l’art de la magie. Mais l’ambition et l’orgueil de Ged
              le poussent à défier les limites de son savoir...
            </Text>
          </View>

          {/* Commentaire */}
          <View className="mt-6 gap-3">
            <Text className="text-gray-800 font-nunitoExtraBold text-xl">
              Commentaires
            </Text>
            {avis.map((user, i) => (
              <View key={i} className={"bg-light_gray py-3 px-3.5 rounded-lg"}>
                <View className={"flex flex-row items-center gap-3"}>
                  <FontAwesome name="user-circle" color={"#2960A1"} size={28} />
                  <Text className="text-blue-950 font-nunitoExtraBold text-base flex-1 ">
                    {user.name}
                  </Text>
                  <View className="flex flex-row gap-0.5 pr-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <FontAwesome
                        key={i}
                        name={"star"}
                        size={15}
                        color={"#fed330"}
                      />
                    ))}
                  </View>
                </View>
                <Text
                  className={
                    "text-gray-700 text-[1rem] mt-2 leading-relaxed font-nunitoMedium pl-10"
                  }
                >
                  lorem
                </Text>
              </View>
            ))}
          </View>

          {/* Espacement pour éviter la coupure en bas */}
          <View className="h-4" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default BookDetailsScreen;
