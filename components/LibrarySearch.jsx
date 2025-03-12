import React, { useEffect, useState } from "react";
import {
  Image,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useSelector } from "react-redux";
import Modal from "react-native-modal";

export default function LibrarySearch({navigation}) {
  const user = useSelector((state) => state.user.value);
  const [query, setQuery] = useState("");
  const [result, setResult] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);



  const handleSubmitSearch = () => {
    fetch(`http://${process.env.IP_ADDRESS}:3000/users/${user.token}`)
      .then((response) => response.json())
      .then((dataUser) => {
        if (dataUser.result) {
            console.log("fetch dataUser", dataUser)
          fetch(
            `http://${process.env.IP_ADDRESS}:3000/libraries/user/${dataUser.user._id}?search=${query}`
          )
            .then((response) => response.json())
            .then((data) => {
                console.log("fetch libr", data.books)
              setResult(data.books);
              setIsModalVisible(true);

            });
        } else {
          console.log("Erreur : bibliothèque utilisateur non trouvée");
        }
      })
      .catch((error) => console.error("Erreur lors du fetch", error));
  };

  //hide modal
  const toggleModal = (isbn) => {
    setIsModalVisible(!isModalVisible);
    navigation.navigate("Details", {isbn : isbn});
  };

  return (
    <View className="">
      <TextInput
        placeholder="Rechercher un livre"
        value={query}
        onChangeText={(value) => setQuery(value)}
        returnKeyType="search"
        onSubmitEditing={handleSubmitSearch}
        className="border border-button_purple p-4 rounded-lg w-80 bg-light_gray font-nunitoRegular text-left"
      />
      <Modal isVisible={isModalVisible}>
        <View style={{ flex: 1 }}>
          <FlatList
            data={result}
            keyExtractor={(item) => item.title}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={()=>toggleModal(item.isbn)}
                className="flex-row bg-light_gray border border-black"
              >
                <Image
                  source={{ uri: item.cover }}
                  className=" w-16 h-24 object-scale-down"
                />
                <View className="flex-col ml-4">
                  <Text className="font-nunitoSemiBold">{item.title}</Text>
                  <Text className="font-nunitoRegular">{item.author}</Text>
                </View>
              </TouchableOpacity>
            )}
          ></FlatList>
        </View>
      </Modal>
    </View>
  );
}
