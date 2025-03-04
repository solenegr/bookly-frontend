import React from 'react';
import { View, Button } from 'react-native';


export default function ChatScreen({ navigation }) {
    const handleNavigation = () => {
        const randomUsernames = ['Alice', 'Bob', 'Charlie', 'David']; // Déclarer ici
        const username = randomUsernames[Math.floor(Math.random() * randomUsernames.length)];
        navigation.navigate('Chat', { username });
      };

  return (
    <View>
      <Button title="Ouvrir le Chat" onPress={() => handleNavigation()}/>
    </View>
  );
}
