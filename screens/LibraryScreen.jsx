import { Text, View, TouchableOpacity, TextInput, ScrollView, Image } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from 'react';

// Table de correspondance des images
const imageMap = {
  book1: require('../assets/icon.png'),
  book2: require('../assets/icon.png'),
  book3: require('../assets/icon.png'),
  book4: require('../assets/icon.png'),
  book5: require('../assets/icon.png'),
  book6: require('../assets/icon.png'),
  book7: require('../assets/icon.png'),
  book8: require('../assets/icon.png'),
  book9: require('../assets/icon.png'),
  book10: require('../assets/icon.png'),
  book11: require('../assets/icon.png'),
  book12: require('../assets/icon.png'),
};

export default function LibraryScreen({ navigation }) {
  const [search, setSearch] = useState('');
  const [genreCliked, setGenreCliked] = useState(false);
  const [statusCliked, setStatusCliked] = useState(true);
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
            { title: "En cours", images: ['book1', 'book2', 'book3'] },
            { title: "Livres lus", images: ['book4', 'book5', 'book6'] },
            { title: "Livre à lire", images: ['book7', 'book8', 'book9'] },
            { title: "Tous mes livres", images: ['book10', 'book11', 'book12'] },
          ].map((section, index) => (
            <View key={index} className="flex flex-col gap-4 ">
              <Text className="text-gray-800 font-nunitoRegular text-lg">{section.title}</Text>
              <ScrollView horizontal={true} className="flex-row">
                {section.images.map((img, imgIndex) => (
                  <Image
                    key={imgIndex}
                    className="w-40 h-56 object-cover rounded-lg mr-2"
                    source={imageMap[img]} // Utilisation de l'objet imageMap
                  />
                ))}
              </ScrollView>
            </View>
          ))}

{genreCliked && [
            { title: "Comédie", images: ['book1', 'book2', 'book3'] },
            { title: "Drame", images: ['book4', 'book5', 'book6'] },
            { title: "Horreur", images: ['book7', 'book8', 'book9'] },
            { title: "Fantastique", images: ['book10', 'book11', 'book12'] },
          ].map((section, index) => (
            <View key={index} className="flex flex-col gap-4 ">
              <Text className="text-gray-800 font-nunitoRegular text-lg">{section.title}</Text>
              <ScrollView horizontal={true} className="flex-row">
                {section.images.map((img, imgIndex) => (
                  <Image
                    key={imgIndex}
                    className="w-40 h-56 object-cover rounded-lg mr-2"
                    source={imageMap[img]} // Utilisation de l'objet imageMap
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
