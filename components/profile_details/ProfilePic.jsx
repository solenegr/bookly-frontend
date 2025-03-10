// import React, { useState } from "react";
// import { Image, View, Text, Button } from "react-native";
// import * as ImagePicker from 'expo-image-picker';
// import FontAwesome from "react-native-vector-icons/FontAwesome";
// useState

// export default function ProfilePic() {
//     const [image, setImage] = useState(null);

//     const randomImages = [
//         require('../../assets/temp/fille.png'),
//         require('../../assets/temp/homme.png')

//     const pickImage = async () => {
//         // No permissions request is necessary for launching the image library
//         // let result = await ImagePicker.launchImageLibraryAsync({
//           mediaTypes: ['images'],
//           allowsEditing: true,
//           aspect: [4, 3],
//           quality: 1,
//         });
    
//         console.log(result);

//         if (!result.canceled) {
//             const uri = result.assets[0].uri;
//             if (typeof uri === 'string') { // Vérifie que l'URI est bien une chaîne de caractères
//               setImage(uri);
//               setProfileImage(uri);
//             } else {
//               console.error('URI sélectionnée non valide:', uri);
//             }
//           }
//         };
    
//     //     if (!result.canceled) {
//     //       setImage(result.assets[0].uri);
//     //       setProfileImage(result.assets[0].uri)
//     //     }
//     //   };

//       const handleRandomImage = () => {
//         const randomIndex = Math.floor(Math.random() * randomImages.length);
//         const randomImage = randomImages[randomIndex];
//         setImage(randomImage);
//         setProfileImage(randomImage);
//       };
    
//       return (
//         <View className="flex items-center">
//           <Button title="Pick an image from camera roll" onPress={pickImage} />
//           <Button title="Choose Random Image" onPress={handleRandomImage} />
//           {image && <Image source={{ uri: image }} className="w-32 h-32 rounded-full border-2 border-white mt-2" />}
//         </View>
//       );
// }
