import { Text, View ,TouchableOpacity,TextInput,ScrollView,Image} from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from 'react';
export default function LibraryScreen({ navigation }) {
  const [search, setSearch] = useState('');
 return (
    <SafeAreaView>
    <View className="flex flex-col gap-2 justify-center">
      
    <View className="flex flex-row gap-2 justify-center">
    <TextInput
        className="border-2 border-button_purple p-4 rounded-lg w-80 bg-light_gray text-center"
        placeholder="Chercher sur ma biblio"
        value={search}
        onChangeText={setSearch}
      />
    </View>
    <View className="flex flex-row gap-2 justify-center ">
      <TouchableOpacity  className=" bg-button_purple p-4 rounded-xl " >
            <Text className="text-white">Status</Text>
       </TouchableOpacity>
      <TouchableOpacity className=" bg-button_purple p-4 rounded-xl" >
            <Text className="text-white ">Genre</Text>
      </TouchableOpacity>
    </View>
    <View className="flex">
  <ScrollView horizontal={true} className="flex-row">
    <Image
      className="w-40 h-60 p-2 object-cover mr-2"
      source={require('../assets/icon.png')}
    />
    <Image
      className="w-40 h-60 p-2 object-cover mr-2"
      source={require('../assets/icon.png')}
    />
    <Image
      className="w-40 h-60 p-2 object-cover mr-2"
      source={require('../assets/icon.png')}
    />
  </ScrollView>
</View>


    <View className="flex flex-row">
      <Text>4</Text>
      <Text>4</Text>
      </View>
    <View className="flex flex-row">
      <Text>5</Text>
      <Text>5</Text>
      </View>
    <View className="flex flex-row">
      <Text>6</Text>
      <Text>6</Text>
      </View>
    
  </View>
  </SafeAreaView>
 );
}