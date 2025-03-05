import React, { useState, useEffect } from "react";
import { 
  Text, View, Button, TouchableOpacity, ScrollView, Image, TextInput,Keyboard
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Progress from "react-native-progress";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faSquareCheck } from '@fortawesome/free-solid-svg-icons'; 
const imageMap = {
  book1: require("../assets/temp/terremer.webp"),
  book2: require("../assets/temp/terremer.webp"),
  book3: require("../assets/temp/terremer.webp"),
  book4: require("../assets/temp/terremer.webp"),
};

const genres = [
  { name: "Fantasy", color: "#74C0FC" },
  { name: "Aventure", color: "#FFB347" },
  { name: "Roman initiatique", color: "#FF85A2" },
  { name: "Magie", color: "#C792EA" },
  { name: "High Fantasy", color: "#77DD77" },
  { name: "Mythologie", color: "#FFD700" },
];

export default function HomeScreen({ navigation }) {
  const totalPages = 300; // Nombre total de pages du livre
  const [pagesRead, setPagesRead] = useState(50); // Pages déjà lues
  const [progress, setProgress] = useState(pagesRead / totalPages);
  const [pagesReadToDay, setPagesReadToDay] = useState(0);
  const [plusClicked, setPlusClicked] = useState(false);
  const [sauvegardeNumberPage, setSauvegardeNumberPage] = useState(false);
  const plusAjoutes = [{ title: "Les plus ajoutés", images: ["book1", "book2", "book3"] }];

  useEffect(() => {
    setProgress(pagesRead / totalPages);
  }, [pagesRead]);
  const handleClick =() =>{
    setPagesRead((prev) => Math.min(pagesReadToDay, totalPages));
    setSauvegardeNumberPage(true);
    Keyboard.dismiss();
  }

  return (
    <SafeAreaView className="flex-1 flex-col justify-start mt-5 gap-4">
      {/* Header */}
      <View className="flex-row justify-evenly">
        <Text className="font-nunitoBold text-lg">Hello User</Text>
        <Text className="font-nunitoBold text-lg bg-light_purple">Livre en cours</Text>
      </View>

      {/* Livre en cours de lecture */}
      <View className="flex-row gap-2 pt-4 bg-light_purple rounded-xl">
        <Image
          className="w-32 h-52 mb-5"
          resizeMode="contain"
          source={require("../assets/temp/terremer.webp")}
          onTouchEnd={() => navigation.navigate("Details", { id: "456" })}
        />
        <View className="flex-col gap-1 pt-7">
          <Text className="font-nunitoBold text-lg">Terremer (Edition intégrale)</Text>
          <Text className="font-medium text-sm">Ursula Le Guin</Text>

          {/* Barre de progression */}
          <Text >
            Pages lues : {pagesRead}/ {totalPages}
          </Text>
          <Progress.Bar progress={progress} width={220} height={15} color="#2960A1" />
          <Text >
            Ajouter un marque-page
          </Text>
          {/* Input et bouton de mise à jour */}
          <View className="flex-row justify-start items-center">
          <TextInput
              placeholder="Nombre de pages lues aujourd'hui"
              keyboardType="numeric"
              onChangeText={(value) => setPagesReadToDay(parseInt(value) || 0)}
              value={pagesReadToDay.toString()}
              className="border-button_purple border w-20 h-8  rounded-md p-2 "
            />
          <TouchableOpacity onPress={() => handleClick()}>
              <MaterialIcons 
                name={"check"} 
                color={sauvegardeNumberPage && pagesReadToDay != 0? "green" : "gray"} 
                size={24} 
              />
          </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Genres */}
      <View className="flex-row justify-between px-5">
        <Text className="text-navy_blue text-[1rem] font-nunitoBold">Genres</Text>
        <TouchableOpacity activeOpacity={0.8} onPress={() => setPlusClicked(!plusClicked)}>
          <Text className="text-navy_blue text-[1rem] font-nunitoBold">
            {plusClicked ? "Voir Moins" : "Voir Plus"}
          </Text>
        </TouchableOpacity>
      </View>

      <View className="flex-row flex-wrap gap-2 justify-center -mt-2">
        {genres.slice(0, plusClicked ? genres.length : 4).map((genre, index) => (
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
            <Text className="text-gray-800 text-base font-nunitoBold">{genre.name}</Text>
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
        className="w-64 h-12 bg-button_purple rounded-3xl items-center justify-center mx-auto"
        onPress={() => navigation.navigate("Search")}
      >
        <Text className="text-white">Add Book</Text>
      </TouchableOpacity>

      {/* Bouton pour voir les détails */}
      <Button title="Voir les détails du livre" onPress={() => navigation.navigate("Details", { id: "456" })} />
    </SafeAreaView>
  );
}
