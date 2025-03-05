import { Text, View, Button ,TouchableOpacity,ScrollView,Image} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
const imageMap = {
  book1: require('../assets/temp/terremer.webp'),
  book2: require('../assets/temp/terremer.webp'),
  book3: require('../assets/temp/terremer.webp'),
  book4: require('../assets/temp/terremer.webp'),
};
export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView className="flex-1 flex-col justify-start">
      


        <View></View>
        <View></View>
        <View></View>
        <View>
          {[{ title: "En cours", images: ['book1', 'book2', 'book3'] }].map((section, index) => (
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
        <View>
          <TouchableOpacity  
              className="p-4 rounded-xl items-center bg-button_purple w-96" 
              onPress={() => navigation.navigate("Search")}>
              <Text className="text-white">Add Book</Text>
          </TouchableOpacity>
          </View>
        
        <Button
          title="Voir les détails du livre"
          onPress={() => navigation.navigate("Details", { id: "456" })}
        />
      
    </SafeAreaView>
  );
}
