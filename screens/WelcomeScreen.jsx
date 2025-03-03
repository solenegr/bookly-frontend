import { Text, View, Image, TouchableOpacity, TouchableHighlight} from 'react-native';
import React, { useState } from 'react'; 
import { SafeAreaView } from "react-native-safe-area-context";
 
export default function WelcomeScreen({ navigation }) {



 return (
    <SafeAreaView>
        <View className="flex items-center justify-center" >
            <Image className="w-96 h-96 mt-20 mb-20" source={require("../assets/Bookly-welcome-.png")}></Image>
            <TouchableOpacity
            onPress={() => navigation.navigate('Connection')}
            activeOpacity={0.6}
            className="w-56 h-12 bg-button_purple border-button_purple border rounded-3xl items-center content-center  pt-2.5"
            ><Text className="font-nunitoRegular  text-white items-center content-center text-xl" >Start with Bookly</Text>
            </TouchableOpacity>
        </View>
    </SafeAreaView>
 );
}