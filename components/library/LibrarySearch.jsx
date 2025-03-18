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
import { IP_ADDRESS } from "@env";

export default function LibrarySearch({ navigation }) {
  const user = useSelector((state) => state.user.value);
  const [query, setQuery] = useState("");
  const [result, setResult] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleSubmitSearch = () => {
    fetch(`https://bookly-backend-three.vercel.app/users/${user.token}`)
      .then((response) => response.json())
      .then((dataUser) => {
        if (dataUser.result) {
          console.log("fetch dataUser", dataUser);
          fetch(
            `https://bookly-backend-three.vercel.app/libraries/user/${dataUser.user._id}?search=${query}`
          )
            .then((response) => response.json())
            .then((data) => {
              console.log("fetch libr", data.books);
              setResult(data.books);
              setIsModalVisible(true);
            })
            .catch((error) =>
              console.error("Erreur lors du fetch des livres", error)
            );
        } else {
          console.log("Erreur : bibliothèque utilisateur non trouvée");
        }
      })
      .catch((error) => console.error("Erreur lors du fetch user", error));
  };

  //hide modal et charger vers page du livre quand cliqué
  const toggleModal = (isbn) => {
    setIsModalVisible(false);
    navigation.navigate("Details", { isbn: isbn });
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
      <Modal
        isVisible={isModalVisible}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        scrollable={true}
        propagateSwipe={true}
        avoidKeyboard={true}
        backdropColor="black"
        backdropOpacity={0.5}
        onBackdropPress={() => setIsModalVisible(false)}
        className="m-0"
      >
        <View className="flex-1 justify-center items-center w-full max-h-[90%] p-4">
          <FlatList
            data={result}
            keyExtractor={(item) => item.title}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => toggleModal(item.isbn)} // Ferme la modal et navigue vers les détails
                className="flex-row bg-light_gray rounded-lg p-3 mb-4 items-center w-full max-w-[95%] mx-auto"
              >
                <Image
                  source={{ uri: item.cover }}
                  className=" w-16 h-24 object-scale-down mr-4"
                />
                <View className="flex-col ml-4 flex-shrink">
                  <Text className="font-nunitoSemiBold text-base overflow-hidden">
                    {item.title}
                  </Text>
                  <Text className="font-nunitoRegular text-sm overflow-hidden">
                    {item.author}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          ></FlatList>
        </View>
      </Modal>
    </View>
  );
}
