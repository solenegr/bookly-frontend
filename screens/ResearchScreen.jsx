import React, { useState } from "react";
import { Switch } from "react-native-paper";
import {
  Image,
  View,
  Text,
  TextInput,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
// import { SearchBar } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ResearchHome({navigation}) {
  const [searchQuery, setSearchQuery] = useState(""); // saisie TextInput
  const [books, setBooks] = useState([]); // stocker les livres récupérés
  const [loading, setLoading] = useState(false); // gérer l'état de chargement
  const [isSwitchOn, setIsSwitchOn] = React.useState(false); //gestion du switch - base false = nom du livre

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);
  console.log('data de book', books)

  // Fonction pour effectuer la recherche
  const fetchBooks = (query) => {
    if (query.length < 3) {
      setBooks([]); // Si la requête est vide, on vide les livres affichés
      return;
    }

    setLoading(true); // On commence à charger

    if(isSwitchOn){
        fetch(`http://${process.env.IP_ADDRESS}:3000/books/author/${query}`)
    .then((response) => response.json())
    .then((data) => {
    // console.log('fetch test author', data);
    setBooks(data.books); //màj état avec result
    setLoading(false);})
    .catch((error) => {
        console.error('Erreur:', error);
        setLoading(false);
    })
} else {
    fetch(`http://${process.env.IP_ADDRESS}:3000/books/title/${query}`)
    .then((response) => response.json())
    .then((data) => {
    // console.log('fetch test title', data);
    setBooks(data.books); //màj état avec result
    setLoading(false);})
    .catch((error) => {
        console.error('Erreur:', error);
        setLoading(false);
    })
}
  };

  // Fonction pour gérer le changement de texte dans le champ de recherche - MàJ du texte dans l'état
  const handleSearch = (text) => {
    setSearchQuery(text);
    if (text.length >= 3) {
        fetchBooks(text); // On lance la recherche seulement si la longueur est >= 3
      } else {
        setBooks([]);} // Si moins de 3 caractères, vider la liste
  };


  return (
    <SafeAreaView className="bg-white h-full">
      <View className="mt-8">
        {/* Champ de recherche */}
        <TextInput
          className="h-14 border border-button_purple rounded-lg p-4 mb-4 mx-2 font-nunitoRegular"
          placeholder={
            isSwitchOn
              ? "Rechercher un auteur ou une autrice"
              : "Rechercher un livre"
          }
            onChangeText={handleSearch}
          value={searchQuery}
        />
        <View className="flex-row items-center justify-center mt-4" >
        <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
        {/* Bouton */}
        <TouchableOpacity
          className="w-44 h-12 bg-button_purple rounded-3xl items-center justify-center mx-auto"
            onPress={() => fetchBooks(searchQuery)}
        >
          <Text className="font-nunitoSemiBold text-white">Rechercher</Text>
        </TouchableOpacity>
        </View>
        {/* Affichage du chargement */}
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <FlatList
            data={books}
            keyExtractor={(item) => item.isbn}
            renderItem={({item}) => (
                <TouchableOpacity
                className="bg-light_gray py-3 px-3.5 rounded-lg mb-4 mx-5 flex-row"
                onPress={() => navigation.navigate("Details", {isbn : item.isbn})}
              >
                <Image source={{uri: item.cover}} className=" w-16 h-24 object-scale-down" />
                <View className="flex-col ml-4" >
                <Text className="text-lg font-nunitoSemiBold">{item.title}</Text>
                <Text className="text-gray-600 font-nunitoRegular">{item.author}</Text>
                </View>
              </TouchableOpacity>
            )}
            className="mt-24"
          />
        )}
      </View>
  
    </SafeAreaView>
  );
}
