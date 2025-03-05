import { Text, View, Button ,TouchableOpacity,ScrollView,Image, TextInput} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState,useEffect } from "react";
import * as Progress from 'react-native-progress';
import {
  TitleAuthorBook,
  Genres,
} from "../components/book_details";
const imageMap = {
  book1: require('../assets/temp/terremer.webp'),
  book2: require('../assets/temp/terremer.webp'),
  book3: require('../assets/temp/terremer.webp'),
  book4: require('../assets/temp/terremer.webp'),
};
const genres = [
  { name: "Fantasy", color: "#74C0FC" },
  { name: "Aventure", color: "#FFB347" },
  { name: "Roman initiatique", color: "#FF85A2" },
  { name: "Magie", color: "#C792EA" },
  { name: "High Fantasy", color: "#77DD77" },
  { name: "Mythologie", color: "#FFD700" },
];
export default function HomeScreen({ navigation}) {
  const plusAjoutes =[{ title: "Les plus ajoutés", images: ['book1', 'book2', 'book3'] }];
  const [plusClicked, setPlusClicked] = useState(false);
  const totalPages = 100;
  const [pagesRead,setPagesRead] = useState(50);
  const [pagesReadToDay,setPagesReadToDay] = useState(50);
  const progress = pagesRead / totalPages;
  const handelPlus=() =>{
    setPlusClicked(!plusClicked);
  }
  return (
    <SafeAreaView className="flex-1 flex-col justify-start mt-5 gap-4">
     
        <View className="flex-row justify-evenly">
          <Text  className={"font-nunitoBold text-lg text-navy_blue"}>Hello User</Text>
          <Text  className={"font-nunitoBold text-lg bg-light_purple"}>Livre en cours</Text>
        </View>
        <View className="flex-row gap-4 pt-4 bg-light_purple rounded-xl">
           <Image
                        className={"w-32 h-40 mb-5"}
                        resizeMode="contain"
                        source={require('../assets/temp/terremer.webp')}
                        onTouchEnd={() => { navigation.navigate("Details", { id: "456" }) }}
            /> 
            <View className="flex-col gap-3 pt-7">
              <Text className={"font-nunitoBold text-lg"}>
                              Terremer (Edition intégrale)
              </Text>
              <Text className={"font-medium text-sm "}>Ursula Le Guin</Text>
              <View >
                  <Text style={{ fontSize: 18, marginBottom: 10 }}>
                    Pages lues : {pagesRead} / {totalPages}
                  </Text>
                  <Progress.Bar progress={progress} width={220} height={15} color="#2960A1" />
                  <TextInput
                            placeholder="number of pages reading today"
                            autoCapitalize="none"
                            autoComplete="number of pages reading today"
                            textContentType="number of pages reading todayilAddress"
                            onChangeText={(value) => setPagesReadToDay(value)}
                            value={pagesReadToDay}
                            className="border-button_purple border w-64 h-12 m-3 rounded-md"
                          ></TextInput>
                  <Button
                      title={`Lire ${pagesReadToDay} pages`}
                      onPress={() => setPagesRead((prev) => Math.min(prev + pagesReadToDay, totalPages))}
                    />
                </View>
            </View>

        </View>
        
        <View className="flex-row justify-start gap-56">
          <Text  className="text-navy_blue text-[1rem] leading-relaxed font-nunitoBold ml-7">Genres</Text>
          {/* {item.commentaire.length > 134 && (
                  <TouchableOpacity
                    className="w-40 py-3"
                    activeOpacity={0.8}
                    onPress={() => toggleState(item.id, hideComment, setHideComment)}
                  >
                    <Text className="text-navy_blue text-[1rem] mt-2 leading-relaxed font-nunitoBold pl-10">
                      {!hideComment.includes(item.id) ? "Voir plus" : "Voir Moins"}
                    </Text>
                  </TouchableOpacity>
                )} */}
                <TouchableOpacity
                    className="w-40 py-3"
                    activeOpacity={0.8}
                    onPress={() => handelPlus()}
                  >
                  <Text  className="text-navy_blue text-[1rem] leading-relaxed font-nunitoBold pl-10">
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
                  <Text className="text-gray-800 text-base font-nunitoBold">
                    {genre.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
       
        <View></View>
        <View>
        
          {plusAjoutes.map((section, index) => (
                      <View key={index} className="flex flex-col gap-4 ">
                        <Text className={"font-nunitoBold text-lg"}>{section.title}</Text>
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
        <View>
          <TouchableOpacity  
              className="p-4 ml-32 rounded-xl items-center bg-button_purple w-52" 
              onPress={() => navigation.navigate("Search")}>
              <Text className="text-white">Add Book</Text>
          </TouchableOpacity>
          </View>
                  
        </View>
        
          <TouchableOpacity  
              className="w-64 h-12 bg-button_purple rounded-3xl items-center justify-center ml-20"
              onPress={() => navigation.navigate("Search")}>
              <Text className="text-white">Add Book</Text>
          </TouchableOpacity>
          
        
        <Button
          title="Voir les détails du livre"
          onPress={() => navigation.navigate("Details", { id: "456" })}
        />
     
      
    </SafeAreaView>
  );
}
