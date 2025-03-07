import React from 'react';
import { View, TouchableOpacity,Text ,SafeAreaView,Image} from 'react-native';
import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { addUserConversation, removeUserConversation } from "../reducers/conversations";
export default function MessageScreen({ navigation }) {
  const IpAdress = process.env.IP_ADDRESS;
  const[username,setUsername] = useState('');
  const[userId,setUserId] = useState('');
  const user = useSelector((state) => state.user.value);
  
    const handleSendMessage = () => {
        fetch(`http://${IpAdress}:3000/users/${user.token}`)
        .then(response => response.json())
        .then(data => {
          if (data.result) {
            setUserId(data.user._id);
            // setUsername(data.user.username.charAt(0).toUpperCase() + data.user.username.slice(1));
            //useDispatch(addUserConversation(data.user._id));
          }
        });
        setUsername(user.username.charAt(0).toUpperCase() + user.username.slice(1));

        navigation.navigate('Chat', { username, conversationId : "67c9c14804b42ddf121de680", userId: userId});
      };

      const handlecreateConv =() =>{
        console.log("ok");
        fetch(`http://${IpAdress}:3000/conversations`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ users :["67cad0df83c4dbc6e60de21f","67caffbfdc6a7955b63a1c5b"], challengeId : "67c985d2d9437c138e7b22fb"}),
        })
        .then(response => response.json())
        .then(data => {
          if (data.result) {
            console.log("Conversation créée :", data.conversation);
          } else {
            console.log("Erreur côté serveur :", data);
          }
        })
        .catch(error => console.error("Erreur fetch :", error));
      }

  return (

    <SafeAreaView>
            <View className="flex items-center justify-center gap-2" >
                <Image className="w-96 h-96 mt-20 mb-20" source={require("../assets/chat.png")}></Image>
                <TouchableOpacity  
                    className="p-4 rounded-xl items-center bg-button_purple w-96" 
                    onPress={handleSendMessage}>
                    <Text className="text-white">Commencer le Chat</Text>
              </TouchableOpacity>
              <TouchableOpacity  
                    className="p-4 rounded-xl items-center bg-button_purple w-96" 
                    onPress={handlecreateConv}>
                    <Text className="text-white">Créer une Conversation</Text>
              </TouchableOpacity>
            </View>
        </SafeAreaView>
   
  
  );
}

