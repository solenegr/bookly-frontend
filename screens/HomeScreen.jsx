import React, { useState, useEffect, useMemo } from "react";
import {
  Text,
  View,
  Button,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
  Keyboard,
} from "react-native";
import Pusher from "pusher-js";
import { updateLibrary } from "../reducers/books";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Progress from "react-native-progress";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useSelector, useDispatch } from "react-redux";

import FontAwesome from "react-native-vector-icons/FontAwesome";
import { IP_ADDRESS, PUSHER_KEY, PUSHER_CLUSTER } from "@env";
// import { faSquareCheck } from '@fortawesome/free-solid-svg-icons';
const imageMap = {
  book1: require("../assets/temp/354.jpg"),
  book2: require("../assets/temp/9782246831464.jpg"),
  book3: require("../assets/temp/Preference-systeme.jpg"),
  book4: require("../assets/temp/Gone-baby-gone.jpg"),
  book5: require("../assets/temp/Un-pays-a-l-aube.jpg"),
};

const genres = [
  "#74C0FC",
  "#FFB347",
  "#FF85A2",
  "#C792EA",
  "#77DD77",
  "#FFD700",
];

const randomGenreColors = [
  "#74C0FC",
  "#FFB347",
  "#FF85A2",
  "#C792EA",
  "#af72e6",
  "#77DD77",
  "#FFD700",
  "#9e778b",
  "#817685",
  "#bec37c",
];

// Fonction pour obtenir une couleur aléatoire
const getRandomColor = () =>
  randomGenreColors[Math.floor(Math.random() * randomGenreColors.length)];

export default function HomeScreen({ navigation }) {
  const books = useSelector((state) => state.books.value.books);

  const [pagesReadForBooks, setPagesReadForBooks] = useState({});
  const [updatedGenres, setUpdatedGenres] = useState([]);
  const user = useSelector((state) => state.user.value);
  const [plusClicked, setPlusClicked] = useState(false);
  const [allGenreLabrary, setAllGenreLabrary] = useState([]);
  const dispatch = useDispatch();
  const plusAjoutes = [
    { title: "Les plus ajoutés", images: ["book1", "book2", "book3"] },
  ];

  const uniqueGenres = useMemo(() => {
    const allGenres = books
      .filter((e) => e.status === "En cours de lecture")
      .flatMap((book) => book.genre); // Récupère tous les genres

    return [...new Set(allGenres)]; // Supprime les doublons
  }, [books]);

  // Fonction pour choisir une couleur aléatoire
  // Stocker une couleur fixe pour chaque genre lors du premier rendu
  // const genreColors = useMemo(() => {
  //   return genres.reduce((acc, genre) => {
  //     acc[genre.name] = getRandomColor();
  //     return acc;
  //   }, {});
  // }, [genres]);

  useEffect(() => {
    if (allGenreLabrary.length > 0) {
      const defaultColor = "#D3D3D3";
      const newGenres = allGenreLabrary.map((genre) => {
        const existingGenre = genres.find((g) => g.name === genre);
        return existingGenre
          ? existingGenre
          : { name: genre, color: defaultColor };
      });

      setUpdatedGenres(newGenres);
    }
  }, [allGenreLabrary]);

  useEffect(() => {
    if (!user._id && !books.length) return; // Vérifier si l'id existe
    (async () => {
      try {
        const res = await fetch(
          `https://bookly-backend-three.vercel.app/libraries/user/${user._id}`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );

        const data = await res.json();

        if (data.result) {
          dispatch(updateLibrary(data.books)); // Mise à jour du Redux Store
          console.log("MAJ REDUX BOOKS", books);
          const uniqueGenres = [...new Set(data.books.flatMap((e) => e.genre))];
          setAllGenreLabrary(uniqueGenres);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [user._id]); // Ajout de 'user?.token' dans les dépendances

  const handlePageChange = (isbn, value) => {
    setPagesReadForBooks((prev) => ({
      ...prev,
      [isbn]: value,
    }));
  };

  return (
    <SafeAreaView className="flex-1 flex-col justify-start mt-8 gap-4  px-5">
      <ScrollView className={""}>
        {/* Header */}
        <View className="flex-row justify-evenly mb-10 items-center">
          <Text className="font-nunitoBold text-lg px-4 py-2">
            Hello {user.firstname}
          </Text>
          <Text className="font-nunitoBold text-lg bg-light_purple rounded-full px-4 py-2">
            Livre en cours
          </Text>
        </View>

        {/* Livre en cours de lecture */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="flex-row "
        >
          {books
            .filter((e) => e.status === "En cours de lecture")
            .map((book) => (
              <View
                key={book.isbn || book._id}
                className="flex-row gap-2 pt-4 bg-light_purple rounded-xl w-auto ml-5 px-4"
              >
                <Image
                  className="w-32 h-52 mb-5"
                  resizeMode="contain"
                  source={{ uri: book.cover }}
                  onTouchEnd={() =>
                    navigation.navigate("Details", { isbn: book.isbn })
                  }
                />
                <View className="flex-col gap-1 pt-7 ml-2">
                  <Text className="font-nunitoBold text-lg">{book.title}</Text>
                  <Text className="font-medium text-sm">{book.author}</Text>
                  {/* Afficher la progression des pages lues */}
                  <Text>
                    Pages lues : {pagesReadForBooks[book.isbn] || 0} /{" "}
                    {book.pages}
                  </Text>
                  <Progress.Bar
                    progress={(pagesReadForBooks[book.isbn] || 0) / book.pages}
                    width={220}
                    height={15}
                    color="#2960A1"
                  />
                  <Text>Ajouter un marque-page</Text>
                  {/* Input et bouton pour modifier les pages lues */}
                  <View className="flex-row justify-start items-center">
                    <TextInput
                      keyboardType="numeric"
                      onChangeText={(value) =>
                        handlePageChange(book.isbn, parseInt(value) || 0)
                      }
                      value={(pagesReadForBooks[book.isbn] || 0).toString()}
                      className="border-navy_blue border w-20 h-10 rounded-md p-2 "
                    />
                    <TouchableOpacity>
                      <MaterialIcons
                        name={"check"}
                        color={
                          pagesReadForBooks[book.isbn] !== 0 ? "green" : "gray"
                        }
                        size={24}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))}
        </ScrollView>

        {/* Genres */}
        <View className="flex-row justify-between mt-10">
          <Text className="text-navy_blue text-[1rem] font-nunitoBold">
            Genres
          </Text>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setPlusClicked(!plusClicked)}
          >
            <Text className="text-navy_blue text-[1rem] font-nunitoBold">
              {plusClicked ? "Voir Moins" : "Voir Plus"}
            </Text>
          </TouchableOpacity>
        </View>

        <View className="flex-row flex-wrap gap-2 justify-center mt-2">
          {uniqueGenres.length > 0 ? (
            uniqueGenres.map((genre, index) => (
              <TouchableOpacity
                activeOpacity={0.7}
                key={index}
                className="px-3.5 py-1 rounded-full bg-gray-200"
                style={{
                  backgroundColor: genres[index % genres.length],
                  shadowColor: genres[index % genres.length],
                  shadowOpacity: 0.5,
                  shadowRadius: 2.62,
                  shadowOffset: { width: 500, height: 3 },
                  elevation: 4,
                }}
              >
                <Text className="text-gray-800 text-base font-nunitoBold">
                  {genre}
                </Text>
              </TouchableOpacity>
            ))
          ) : (
            <Text className="text-gray-500 text-sm">Aucun genre</Text>
          )}
        </View>

        {/* Les plus ajoutés */}
        <View className="mt-10">
          {plusAjoutes.map((section, index) => (
            <View key={index} className="flex flex-col gap-4">
              <Text className="font-nunitoBold text-lg">{section.title}</Text>
              <ScrollView horizontal className="flex-row">
                {section.images.map((img, imgIndex) => (
                  <Image
                    key={imgIndex}
                    className="w-40 h-56 object-cover rounded-lg mr-2"
                    source={imageMap[img]}
                  />
                ))}
              </ScrollView>
            </View>
          ))}
        </View>

        {/* Bouton pour ajouter un livre */}
        <TouchableOpacity
          className="w-64 h-12 bg-button_purple rounded-3xl items-center justify-center mx-auto my-8"
          onPress={() => navigation.navigate("Scan")}
        >
          <View className="flex-row gap-3">
            <Text className="text-white">Add Book </Text>
            <FontAwesome name="barcode" size={24} color="#fff" />
          </View>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
