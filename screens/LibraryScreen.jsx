import { Text, View, TouchableOpacity, TextInput, ScrollView, Image } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { useState ,useEffect} from 'react';


import {useSelector } from "react-redux";
// Table de correspondance des images
const imageMap = {
  book1: require('../assets/temp/terremer.webp'),
  book2: require('../assets/temp/terremer.webp'),
  book3: require('../assets/temp/terremer.webp'),
  book4: require('../assets/temp/terremer.webp'),
  book5: require('../assets/temp/terremer.webp'),
  book6: require('../assets/temp/terremer.webp'),
  book7: require('../assets/temp/terremer.webp'),
  book8: require('../assets/temp/terremer.webp'),
  book9: require('../assets/temp/terremer.webp'),
  book10: require('../assets/temp/terremer.webp'),
  book11: require('../assets/temp/terremer.webp'),
  book12: require('../assets/temp/terremer.webp'),
};

export default function LibraryScreen({ navigation }) {
  const [search, setSearch] = useState('');
  const [genreCliked, setGenreCliked] = useState(false);
  const [statusCliked, setStatusCliked] = useState(true);
  const [readingBooks, setReadingBooks] = useState([]);
  const [completedBooks, setCompletedBooks] = useState([]);
  const [wantToReadBooks, setWantToReadBooks] = useState([]);
  const [myBooks, setMyBooks] = useState([]);
  const books = useSelector((state) => state.books.value);
  console.log("ok",books);

  useEffect(() => {
    setReadingBooks(books.books.filter(e => e.status === "En cours de lecture").map(e =>e.cover));
    setCompletedBooks(books.books.filter(e => e.status === "Terminé").map(e =>e.cover));
    setWantToReadBooks(books.books.filter(e => e.status === "A lire").map(e =>e.cover));
    setMyBooks(books.books.map(e => e.cover));
  }, [books]); // 🔥 Exécuté une seule fois au montage
  
  console.log("readingBooks",readingBooks);
  console.log("completedBooks",completedBooks);
   console.log("wantToReadBooks",wantToReadBooks);
   console.log("myBooks",myBooks);

   const groupByGenre = (books) => {
    if (!Array.isArray(books)) {
      console.error("La variable 'books' n'est pas un tableau.");
      return {};
    }
  
    return books.reduce((acc, book) => {
      acc[book.genre] = acc[book.genre] || [];
      acc[book.genre].push(book.cover);
      return acc;
    }, {});
  };
  
  const booksByGenre = groupByGenre(books.books);
  const handleClickGenre = () =>{
    setGenreCliked(true);
    setStatusCliked(false);
    console.log(genreCliked);
  }
  const handleClickStatus = () =>{
    setGenreCliked(false);
    setStatusCliked(true);
    console.log(statusCliked);
  }

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
            <TextInput
              className="border-2 border-button_purple p-4 rounded-lg w-80 bg-light_gray text-center"
              placeholder="Chercher sur ma biblio"
              value={search}
              onChangeText={setSearch}
            />
          </View>

          {/* Boutons de filtre */}
          <View className="flex flex-row gap-4 justify-center">
            <TouchableOpacity  
              className={`p-4 rounded-xl w-32 items-center ${statusCliked ? 'bg-button_purple' : 'bg-white'}`} 
              onPress={handleClickStatus}>
              <Text className={`${statusCliked ? 'text-white' : 'text-button_purple'}`}>Status</Text>
            </TouchableOpacity>

            <TouchableOpacity  
              className={`p-4 rounded-xl w-32 items-center ${genreCliked ? 'bg-button_purple' : 'bg-white'}`} 
              onPress={handleClickGenre}>
              <Text className={`${genreCliked ? 'text-white' : 'text-button_purple'}`}>Genre</Text>
            </TouchableOpacity>
          </View>

          {/* Sections des livres */}
          {!genreCliked && [
            { title: "En cours", images: readingBooks },
            { title: "Livres lus", images: completedBooks},
            { title: "Livre à lire", images: wantToReadBooks},
            { title: "Tous mes livres", images: myBooks },
          ].map((section, index) => (
            <View key={index} className="flex flex-col gap-4 ">
              <Text className="text-gray-800 font-nunitoRegular text-lg">{section.title}</Text>
              <ScrollView horizontal={true} className="flex-row">
                {section.images.map((img, imgIndex) => (
                  <Image
                    key={imgIndex}
                    className="w-40 h-56 object-cover rounded-lg mr-2"
                    // source={imageMap[img]} // Utilisation de l'objet imageMap
                    source={{uri: img}}
                  />
                ))}
              </ScrollView>
            </View>
          ))}

{genreCliked && Object.entries(booksByGenre).map(([genre, covers]) => (
            <View key={genre} className="flex flex-col gap-4 ">
              <Text className="text-gray-800 font-nunitoRegular text-lg">{genre}</Text>
              <ScrollView horizontal={true} className="flex-row">
              {covers.map((cover, index) => (
                  <Image
                    key={index}
                    className="w-40 h-56 object-cover rounded-lg mr-2"
                    source={{uri: cover}} // Utilisation de l'objet imageMap
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