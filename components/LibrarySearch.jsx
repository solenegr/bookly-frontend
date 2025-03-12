import React, { useEffect, useState } from "react";
import { Image, View, Text, TextInput } from "react-native";
import { useSelector } from "react-redux";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function LibrarySearch() {
  const user = useSelector((state) => state.user.value);
  const [query, setQuery] = useState("");

  const handleSearch = (textInput) => {
    setQuery(textInput);
    if (textInput.length > 3) {
      //modal true
    } else {
    }
  };
  const handleSubmitSearch = () => {
    console.log("test")
    fetch(`http://${process.env.IP_ADDRESS}/users/${user.token}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("recup data user library search", data);
        
        // fetch(`http://${process.env.IP_ADDRESS}/libraries/user/${data.}`)
      });
  };
  return (
    <View className="">
      <TextInput
        placeholder="Rechercher un livre"
        valuel={query}
        onChangeText={handleSearch}
        returnKeyType="search"
        onSubmitEditing={handleSubmitSearch}
        className="border border-button_purple p-4 rounded-lg w-80 bg-light_gray font-nunitoRegular text-left"
      />
    </View>
  );
}
