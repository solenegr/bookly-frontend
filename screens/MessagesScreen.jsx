import React from 'react';
import { View, TouchableOpacity,Text ,SafeAreaView} from 'react-native';


export default function MessageScreen({ navigation }) {
    const handleNavigation = () => {
        const randomUsernames = ['Alice', 'Bob', 'Charlie', 'David']; // Déclarer ici
        const username = randomUsernames[Math.floor(Math.random() * randomUsernames.length)];
        navigation.navigate('Chat', { username });
      };

  return (
   
    <View className="flex-1 justify-center items-center" >
       <TouchableOpacity  
                    className="p-4 rounded-xl w-32 items-center bg-button_purple" 
                    onPress={handleNavigation}>
                    <Text className="text-white">Commencer le Chat</Text>
        </TouchableOpacity>
      
    </View>
  
  );
}

