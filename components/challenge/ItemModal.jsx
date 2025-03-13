import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addUserChallenge } from "../../reducers/challenge";
import { View, TouchableOpacity, Text, Image } from "react-native";
import { TextInput } from "react-native-paper";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const ItemModal = ({ setter, addItem, type, label }) => {
  const [inputItem, setinputItem] = useState("");
  const [items, setItems] = useState([]);
  const dispatch = useDispatch();
  const [searchTimeout, setSearchTimeout] = useState(null);

  useEffect(() => {
    if (inputItem.length <= 1) return;

    // Annule le timeout précédent pour éviter de déclencher plusieurs requêtes
    if (searchTimeout) clearTimeout(searchTimeout);

    const timeout = setTimeout(async () => {
      let res =
        type === "users"
          ? await fetch(`http://192.168.199.77:3000/users/all/${inputItem}`)
          : await fetch(`http://192.168.199.77:3000/books/title/${inputItem}`);

      const data = await res.json();

      if (data.result) setItems(data.users || data.books);
    }, 450);

    // Stocke le timeout pour le nettoyer si l'utilisateur tape encore
    setSearchTimeout(timeout);

    return () => clearTimeout(timeout); // Nettoie le timeout si l'input change avant la fin du délai
  }, [inputItem]);

  const handleAddItem = (item) => {
    console.log("🔥 Objet envoyé à Redux :", item);

    setter((currentValue) => !currentValue);
    dispatch(addItem(item));
  };

  return (
    <View className={"bg-light_gray p-5 rounded-md gap-3 "}>
      <TextInput
        mode="flat"
        label={label}
        onChangeText={(value) => setinputItem(value)}
        value={inputItem}
        style={{
          backgroundColor: "#F2F2F2", // Change la couleur de fond ici
          paddingHorizontal: 10,
          marginBottom: 25,
          fontSize: 15,
        }}
        theme={{
          colors: {
            primary: "#2960A1", // Couleur du label quand focus
            onSurfaceVariant: "black", // Couleur du label quand non focus
          },
        }}
      />
      {items.map((item) => (
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => handleAddItem(item)}
          key={item._id ? item._id : item.isbn}
          className={
            "flex flex-row items-center gap-4 border border-navy_blue p-4 rounded-md"
          }
        >
          {type === "users" ? (
            <FontAwesome name="user-circle" color={"black"} size={34} />
          ) : (
            <Image
              source={{ uri: item.cover }}
              className={"w-20 h-32"}
              resizeMode="cover"
            />
          )}
          <View className={"flex-1 gap-1"}>
            <Text className={"font-nunitoBold"}>
              {type === "users" ? item.firstname : item?.title}
            </Text>
            <Text className={"font-nunitoRegular text-sm"}>
              {type === "users" ? `@${item.username}` : `${item.pages} pages`}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default ItemModal;
