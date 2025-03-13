import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import { TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUserChallenge,
  addUserChallenge,
  addBookChallenge,
  setTitle,
} from "../reducers/challenge";
import { ItemModal, DatePicker } from "../components/challenge";

// white: "#FFFFFF",
// light_gray: "#F2F2F2",
// light_purple: "#F0E9F9",
// light_button_purple: "#B59DD0",
// button_purple: "#9F5DD8",
// navy_blue: "#2960A1",

const ChallengeScreen = ({ navigation }) => {
  const { users, books, title, duration } = useSelector(
    (state) => state.challenge.value
  );

  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  const dispatch = useDispatch();

  const handleRemoveUser = () => {
    dispatch(deleteUserChallenge(1));
  };
  const handleCreateChallenge = () => {
    if (!title || users.length === 0 || books.length === 0 || !duration) {
      return console.log("PAS TOUT REMPLI");
    }

    const usersId = users.map((user) => user._id);
    const booksId = books.map((book) => book.isbn);
    console.log(usersId);
    console.log(booksId);
    const postData = {
      users: usersId,
      booksId,
      title,
      duration,
    };

    fetch(`http://${process.env.IP_ADDRESS}:3000/conversations`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(postData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.result) {
          console.log("Conversation créée :", data.conversation);
          navigation.navigate("Chat", {
            conversationId: data.conversation._id,
            challengeId: data.conversation.challenge,
            users,
          });
        } else {
          console.error(
            "Erreur lors de la création de la conversation :",
            data
          );
        }
      })
      .catch((error) => console.error("Erreur fetch :", error));
  };

  return (
    <SafeAreaView className="flex-1 bg-white border px-8 py-12" edges={["top"]}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 50 }}
        keyboardShouldPersistTaps="handled"
      >
        <Text className="text-center font-nunitoBold text-2xl mb-8">
          Creer un coin lecture
        </Text>
        <View className={"gap-8"}>
          <TextInput
            label="Nom du challenge"
            mode="outlined"
            outlineColor="#F0E9F9"
            onChangeText={(value) => dispatch(setTitle(value))}
            activeOutlineColor="#2960A1"
            theme={{
              colors: {
                onSurfaceVariant: "#2960A1",
              },
            }}
          />

          <TouchableOpacity
            className={"bg-light_gray p-4 rounded-md "}
            activeOpacity={0.7}
            onPress={() => setIsUserModalOpen((currentValue) => !currentValue)}
          >
            <Text className="text-center font-nunitoSemiBold text-black">
              Ajouter un utilisateur
            </Text>
          </TouchableOpacity>

          {isUserModalOpen && (
            <ItemModal
              setter={setIsUserModalOpen}
              addItem={addUserChallenge}
              type={"users"}
              label={"Inviter une personne"}
            />
          )}

          <TouchableOpacity
            className={"bg-light_gray p-4 rounded-md "}
            activeOpacity={0.7}
            onPress={() => setIsBookModalOpen((currentValue) => !currentValue)}
          >
            <Text className="text-center font-nunitoSemiBold text-black">
              Ajouter un livre
            </Text>
          </TouchableOpacity>

          {isBookModalOpen && (
            <ItemModal
              setter={setIsBookModalOpen}
              addItem={addBookChallenge}
              type={"books"}
              label={"Ajouter un livre"}
            />
          )}

          <View className={"gap-5 bg-light_gray rounded-md p-5"}>
            <Text className={"font-bold text-gray-500"}>Invités</Text>
            <View className={"  flex-row flex gap-5 flex-wrap "}>
              {users.map((user, i) => (
                <TouchableOpacity
                  activeOpacity={0.8}
                  key={user._id}
                  className="items-center gap-1"
                  onPress={handleRemoveUser}
                >
                  <FontAwesome name="user-circle" color={"black"} size={34} />
                  <View className={"gap-1"}>
                    <Text className={"font-nunitoBold"}>{user.firstname}</Text>
                    <Text className={"font-nunitoRegular text-xs"}>
                      @{user.username}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View className={"gap-5 bg-light_gray rounded-md p-5"}>
            <Text className={"font-bold text-gray-500 "}>Livres</Text>
            <View className={"flex-row flex gap-2 flex-wrap"}>
              {books.map((book) => (
                <TouchableOpacity
                  activeOpacity={0.8}
                  key={book._id}
                  className="items-center gap-1 mb-3"
                  onPress={handleRemoveUser}
                >
                  <Image
                    source={{ uri: book.cover }}
                    className={"w-20 h-32"}
                    resizeMode="cover"
                  />
                  <View className={"items-center gap-1"}>
                    <Text className={"w-28 text-center text-sm break-words"}>
                      {book.title.length > 26
                        ? `${book.title.slice(0, 23)}...`
                        : book.title}
                    </Text>

                    <Text className={"font-nunitoRegular text-xs"}>
                      {book?.pages ? book.pages + " pages" : "incconu"}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        <DatePicker />

        <TouchableOpacity
          className="bg-button_purple p-4 rounded-md mt-6"
          activeOpacity={0.7}
          onPress={handleCreateChallenge}
        >
          <Text className="text-center font-nunitoSemiBold text-white">
            Créer le Challenge
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ChallengeScreen;
