import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useDispatch } from "react-redux";
import { addUserChallenge, deleteUserChallenge } from "../reducers/challenge";

// white: "#FFFFFF",
// light_gray: "#F2F2F2",
// light_purple: "#F0E9F9",
// light_button_purple: "#B59DD0",
// button_purple: "#9F5DD8",
// navy_blue: "#2960A1",

const Challenge = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const id = 1;

  const handleAddUser = () => {
    setIsModalOpen(false);
    dispatch(addUserChallenge({ name: "Antony", id }));
  };

  const handleRemoveUser = () => {
    dispatch(deleteUserChallenge(id));
  };

  return (
    <SafeAreaView className="flex-1 bg-white border" edges={["top"]}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 50 }}
        keyboardShouldPersistTaps="handled"
      >
        <Text className="text-center font-nunitoBold text-2xl">
          Creer un coin lecture
        </Text>
        <View className={"gap-8"}>
          <TextInput
            label="Nom du challenge"
            mode="outlined"
            outlineColor="#F0E9F9"
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
            onPress={() => setIsModalOpen(true)}
          >
            <Text className="text-center font-nunitoSemiBold text-black">
              Ajouter un utilisateur
            </Text>
          </TouchableOpacity>

          {isModalOpen && (
            <View className={"bg-light_gray p-5 rounded-md gap-3 "}>
              <TextInput
                mode="flat"
                label="Inviter une personne"
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
              {Array.from({ length: 5 }).map((_, i) => (
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={handleAddUser}
                  key={i}
                  className={
                    "flex flex-row items-center gap-4 border border-navy_blue p-4 rounded-md"
                  }
                >
                  <FontAwesome name="user-circle" color={"black"} size={34} />
                  <Text className={"font-nunitoBold"}>Antony</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          <View className={"gap-5 bg-light_gray rounded-md p-5"}>
            <Text className={"font-bold text-gray-500 "}>Invités</Text>
            <View className={"  flex-row flex gap-5 flex-wrap "}>
              {Array.from({ length: 5 }).map((_, i) => (
                <TouchableOpacity
                  activeOpacity={0.8}
                  key={i}
                  className="items-center gap-1"
                  onPress={handleRemoveUser}
                >
                  <FontAwesome name="user-circle" color={"black"} size={34} />
                  <Text className={"font-nunitoMedium text-gray-500"}>
                    Antony
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Challenge;
