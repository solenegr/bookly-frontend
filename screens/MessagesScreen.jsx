import React from 'react';
import { View, TouchableOpacity,Text ,SafeAreaView,Image} from 'react-native';
import { useState } from 'react';
import { useSelector } from 'react-redux';
export default function MessageScreen({ navigation }) {
  const IpAdress = process.env.IP_ADDRESS;
  const[username,setUsername] = useState('');
  const user = useSelector((state) => state.user.value);
  
    const handleNavigation = () => {
        // const randomUsernames = ['Solène', 'Rania', 'Antony', 'Patrice']; // Déclarer ici
        // const username = randomUsernames[Math.floor(Math.random() * randomUsernames.length)];
        fetch(`http://${IpAdress}:3000/users/${user.token}`)
        .then(response => response.json())
        .then(data => {
          if (data.result) {
            setUsername(prev => data.user.username);
          }
        });
        navigation.navigate('Chat', { username });
      };

  return (

    <SafeAreaView>
            <View className="flex items-center justify-center" >
                <Image className="w-96 h-96 mt-20 mb-20" source={require("../assets/chat.png")}></Image>
                <TouchableOpacity  
                    className="p-4 rounded-xl items-center bg-button_purple w-96" 
                    onPress={handleNavigation}>
                    <Text className="text-white">Commencer le Chat</Text>
              </TouchableOpacity>
            </View>
        </SafeAreaView>
   
  
  );
}

