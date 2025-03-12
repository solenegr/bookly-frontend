import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useEffect } from "react";
import { updateLibrary } from "../reducers/books";
import { useSelector, useDispatch } from "react-redux";
import LibrarySearch from "../components/LibrarySearch";
import { IP_ADDRESS } from "@env";

export default function LibraryScreen({ navigation }) {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();

  const [genreCliked, setGenreCliked] = useState(false);
  const [statusCliked, setStatusCliked] = useState(true);
  const books = useSelector((state) => state.books.value);
  const user = useSelector((state) => state.user.value);

  const [library, setLibrary] = useState(books);
  const readingBooks = books.books
    .filter((e) => e.status === "En cours de lecture")
    .map((e) => e.cover);
  const completedBooks = books.books
    .filter((e) => e.status === "Terminé")
    .map((e) => e.cover);
  const wantToReadBooks = books.books
    .filter((e) => e.status === "A lire")
    .map((e) => e.cover);
  const myBooks = books.books.map((e) => e.cover);
  console.log("reduce", books);
  useEffect(() => {
    if (!user?.token) return; // Vérifier si le token existe

    fetch(`http://${process.env.IP_ADDRESS}:3000/users/${user.token}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.result && data.user?._id) {
          return fetch(
            `http://${process.env.IP_ADDRESS}:3000/libraries/user/${data.user._id}`
          );
        } else {
          throw new Error("Utilisateur non trouvé");
        }
      })
      .then((res) => res?.json())
      .then((data) => {
        if (data?.success) {
          console.log("Données de la bibliothèque :", data.books);
          dispatch(updateLibrary(data.books)); // Mise à jour du Redux Store
        } else {
          console.error("Erreur : bibliothèque non trouvée");
        }
      })
      .catch((error) => console.error("Erreur lors du fetch :", error));
  }, [dispatch, user.token]); // Ajout des dépendances correctes

  console.log("readingBooks", readingBooks);
  console.log("completedBooks", completedBooks);
  console.log("wantToReadBooks", wantToReadBooks);
  console.log("myBooks", myBooks);

  const groupByGenre = (books) => {
    if (!Array.isArray(books)) {
      console.error("La variable 'books' n'est pas un tableau.");
      return {};
    }

    return books.reduce((acc, book) => {
      // Assurer que book.genre est un tableau
      const genres = Array.isArray(book.genre)
        ? book.genre
        : book.genre
        ? book.genre.split(",")
        : [];

      genres.forEach((genre) => {
        genre = genre.trim(); // Supprimer les espaces inutiles
        acc[genre] = acc[genre] || [];
        acc[genre].push(book.cover);
      });

      return acc;
    }, {});
  };

  const booksByGenre = groupByGenre(books.books);
  console.log("length", booksByGenre);
  const handleClickGenre = () => {
    setGenreCliked(true);
    setStatusCliked(false);
    console.log(genreCliked);
  };
  const handleClickStatus = () => {
    setGenreCliked(false);
    setStatusCliked(true);
    console.log(statusCliked);
  };

  return (
    <SafeAreaView className="flex-1" edges={["top"]}>
      <ScrollView
        className="flex-1"
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        <View className="flex flex-col gap-4 p-4">
          {/* Barre de recherche */}
          <View className="flex flex-row justify-center">
            <LibrarySearch navigation={navigation}/>
            {/* <TextInput
              className="border-2 border-button_purple p-4 rounded-lg w-80 bg-light_gray text-center"
              placeholder="Chercher sur ma biblio"
              value={search}
              onChangeText={setSearch}
            /> */}
          </View>

          {/* Boutons de filtre */}
          <View className="flex flex-row gap-4 justify-center">
            <TouchableOpacity
              className={`p-4 rounded-xl w-32 items-center ${
                statusCliked ? "bg-button_purple" : "bg-white"
              }`}
              onPress={handleClickStatus}
            >
              <Text
                className={`${
                  statusCliked ? "text-white" : "text-button_purple"
                }`}
              >
                Status
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className={`p-4 rounded-xl w-32 items-center ${
                genreCliked ? "bg-button_purple" : "bg-white"
              }`}
              onPress={handleClickGenre}
            >
              <Text
                className={`${
                  genreCliked ? "text-white" : "text-button_purple"
                }`}
              >
                Genre
              </Text>
            </TouchableOpacity>
          </View>

          {/* Sections des livres */}
          {!genreCliked &&
            [
              { title: "En cours", images: readingBooks },
              { title: "Livres lus", images: completedBooks },
              { title: "Livre à lire", images: wantToReadBooks },
              { title: "Tous mes livres", images: myBooks },
            ].map((section, index) => (
              <View key={index} className="flex flex-col gap-4 ">
                <Text className="text-gray-800 font-nunitoRegular text-lg">
                  {section.title}
                </Text>
                <ScrollView horizontal={true} className="flex-row">
                  {section.images.map((img, imgIndex) => (
                    <Image
                      key={imgIndex}
                      className="w-40 h-56 object-scale-down rounded-lg mr-2"
                      // source={imageMap[img]} // Utilisation de l'objet imageMap
                      source={{ uri: img }}
                    />
                  ))}
                </ScrollView>
              </View>
            ))}

          {genreCliked &&
            Object.entries(booksByGenre).map(([genre, covers]) => (
              <View key={genre} className="flex flex-col gap-4 ">
                <Text className="text-gray-800 font-nunitoRegular text-lg">
                  {genre}
                </Text>
                <ScrollView horizontal={true} className="flex-row">
                  {covers.map((cover, index) => (
                    <Image
                      key={index}
                      className="w-40 h-56 object-scale-down rounded-lg mr-2"
                      source={{ uri: cover }} // Utilisation de l'objet imageMap
                    />
                  ))}
                </ScrollView>
              </View>
            ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
