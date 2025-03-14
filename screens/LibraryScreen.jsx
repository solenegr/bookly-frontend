import {
  Text,
  View,
  TouchableOpacity,
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
  const readingBooks = books.books.filter(e => e.status === "En cours de lecture").map(e => ({ cover: e.cover, isbn: e.isbn }));
  const completedBooks = books.books.filter(e => e.status === "Terminé").map(e => ({ cover: e.cover, isbn: e.isbn }));
  const wantToReadBooks = books.books.filter(e => e.status === "A lire").map(e => ({ cover: e.cover, isbn: e.isbn }));
  const myBooks = books.books.map(e => ({ cover: e.cover, isbn: e.isbn }));

  const groupByGenre = (books) => {
    if (!Array.isArray(books)) {
      console.error("La variable 'books' n'est pas un tableau.");
      return {};
    }

    return books.reduce((acc, book) => {
      const genres = Array.isArray(book.genre) 
        ? book.genre 
        : book.genre ? book.genre.split(",") : [];

      genres.forEach((genre) => {
        genre = genre.trim();
        acc[genre] = acc[genre] || [];
        acc[genre].push({ cover: book.cover, isbn: book.isbn });
      });

      return acc;
    }, {});
  };

  const booksByGenre = groupByGenre(books.books);

  const handleClickGenre = () => {
    setGenreCliked(true);
    setStatusCliked(false);
  };
  
  const handleClickStatus = () => {
    setGenreCliked(false);
    setStatusCliked(true);
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
          {!genreCliked && [
            { title: "En cours", images: readingBooks },
            { title: "Livres lus", images: completedBooks},
            { title: "Livre à lire", images: wantToReadBooks},
            { title: "Tous mes livres", images: myBooks },
          ].map((section, index) => (
            <View key={index} className="flex flex-col gap-4">
              <Text className="text-gray-800 font-nunitoRegular text-lg">{section.title}</Text>
              <ScrollView horizontal={true} className="flex-row">
                {section.images.map((book, imgIndex) => (
                  <Image
                    key={imgIndex}
                    className="w-40 h-56 object-scale-down rounded-lg mr-2"
                    source={{uri: book.cover}} // Utilisation de la couverture
                    onTouchEnd={() => navigation.navigate("Details", { isbn: book.isbn })} // Passage de l'ISBN
                  />
                ))}
              </ScrollView>
            </View>
          ))}

          {genreCliked && Object.entries(booksByGenre).map(([genre, booksList]) => (
            <View key={genre} className="flex flex-col gap-4">
              <Text className="text-gray-800 font-nunitoRegular text-lg">{genre}</Text>
              <ScrollView horizontal={true} className="flex-row">
                {booksList.map((book, index) => (
                  <Image
                    key={index}
                    className="w-40 h-56 object-cover rounded-lg mr-2"
                    source={{uri: book.cover}} // Utilisation de la couverture
                    onTouchEnd={() => navigation.navigate("Details", { isbn: book.isbn })} // Passage de l'ISBN
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
