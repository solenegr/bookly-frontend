import React, { useState, useEffect } from "react";
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
import { useSelector,useDispatch } from "react-redux";

import FontAwesome from "react-native-vector-icons/FontAwesome";
import { IP_ADDRESS, PUSHER_KEY, PUSHER_CLUSTER} from "@env";
// import { faSquareCheck } from '@fortawesome/free-solid-svg-icons';
const imageMap = {
  book1: require("../assets/temp/terremer.webp"),
  book2: require("../assets/temp/terremer.webp"),
  book3: require("../assets/temp/terremer.webp"),
  book4: require("../assets/temp/terremer.webp"),
};

const genres = [
  { name: "Fantasy", color: "#74C0FC" },
  { name: "Action & Adventure", color: "#FFB347" },
  { name: "Genre Fiction", color: "#FF85A2" },
  { name: "Literature & Fiction", color: "#C792EA" },
  { name: "Contemporary", color: "#77DD77" },
  { name: "Categories", color: "#FFD700" },
];

export default function HomeScreen({ navigation }) {
  const [pagesReadForBooks, setPagesReadForBooks] = useState({});
  const [updatedGenres, setUpdatedGenres] = useState([]);
  const user = useSelector((state) => state.user.value);
  const [firstname, setFirstname] = useState("");
  const [plusClicked, setPlusClicked] = useState(false);
  const [readinBooks, setReadinBooks] = useState([]);
  const [allGenreLabrary, setAllGenreLabrary ] = useState([]);
  const dispatch = useDispatch();
  const plusAjoutes = [
    { title: "Les plus ajoutés", images: ["book1", "book2", "book3"] },
  ];
  
  useEffect(() => {
    // Initialiser Pusher avec la clé de votre application
    const pusher = new Pusher(PUSHER_KEY, {
      cluster: PUSHER_CLUSTER, // Assurez-vous que cela correspond à votre configuration Pusher
    });

    // S'abonner au canal
    const channel = pusher.subscribe('book-channel');

    // Lier l'événement pour la mise à jour des livres
    channel.bind('update-books', (data) => {
      console.log('Mise à jour des livres reçue :', data.books);
      setReadinBooks(data.books); // Mettre à jour les livres dans l'état
    });

    // Fonction de nettoyage lors du démontage du composant
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
      pusher.disconnect();
    };
  }, []);
  



  useEffect(() => {

    if (allGenreLabrary.length > 0) {
      const defaultColor = "#D3D3D3";
      const newGenres = allGenreLabrary.map((genre) => {
        const existingGenre = genres.find((g) => g.name === genre);
        return existingGenre ? existingGenre : { name: genre, color: defaultColor };
      });
  
      setUpdatedGenres(newGenres);
    }
  }, [allGenreLabrary]);

  
  useEffect(() => {
    if (!user?.token) return; // Vérifier si le token existe
      fetch(`http://${IP_ADDRESS}:3000/users/${user.token}`)
        .then(response => response.json())
        .then(data => {
          if (data.result && data.user?._id) {
            return fetch(`http://${IP_ADDRESS}:3000/libraries/user/${data.user._id}`);
          } else {
            throw new Error("Utilisateur non trouvé");
          }
        })
        .then(res => res?.json())
        .then(data => {
          if (data?.success) {
            dispatch(updateLibrary(data.books)); // Mise à jour du Redux Store
            setReadinBooks(data.books.filter((e) => e.status === "En cours de lecture"));
            const uniqueGenres = [...new Set(data.books.flatMap(e => e.genre))];
            setAllGenreLabrary(uniqueGenres);
            
          } else {
            console.error("Erreur : bibliothèque non trouvée");
          }
        })
        .catch(error => console.error("Erreur lors du fetch :", error));
    
      
  
  }, []); // Ajout de 'user?.token' dans les dépendances  


  const handlePageChange = (isbn, value) => {
    setPagesReadForBooks((prev) => ({
      ...prev,
      [isbn]: value,
    }));
  };

 
  useEffect(() => {
   
    
    fetch(`http://${IP_ADDRESS}:3000/users/${user.token}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          setFirstname(
            data.user.firstname.charAt(0).toUpperCase() +
              data.user.firstname.slice(1)
          );
        }
      });
  }, []);



  return (
    <SafeAreaView className="flex-1 flex-col justify-start mt-5 gap-4">
      <ScrollView>
        {/* Header */}
        <View className="flex-row justify-evenly">
          <Text className="font-nunitoBold text-lg">Hello {firstname}</Text>
          <Text className="font-nunitoBold text-lg bg-light_purple">
            Livre en cours
          </Text>
        </View>

        {/* Livre en cours de lecture */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row">
      {readinBooks.map((book) => (
        <View key={book.isbn || book._id} className="flex-row gap-2 pt-4 bg-light_purple rounded-xl w-auto">
          <Image
            className="w-32 h-52 mb-5"
            resizeMode="contain"
            source={{ uri: book.cover }}
            onTouchEnd={() => navigation.navigate('Details', { isbn: book.isbn })}
          />
          <View className="flex-col gap-1 pt-7">
            <Text className="font-nunitoBold text-lg">{book.title}</Text>
            <Text className="font-medium text-sm">{book.author}</Text>
            {/* Afficher la progression des pages lues */}
            <Text>Pages lues : {pagesReadForBooks[book.isbn] || 0} / {book.pages}</Text>
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
        <View className="flex-row justify-between px-5">
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
          {updatedGenres
            .slice(0, plusClicked ? updatedGenres.length : 4)
            .map((genre, index) => (
              <TouchableOpacity
                activeOpacity={0.7}
                key={index}
                className="px-3.5 py-1 rounded-full"
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

        {/* Les plus ajoutés */}
        <View className="px-5">
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
