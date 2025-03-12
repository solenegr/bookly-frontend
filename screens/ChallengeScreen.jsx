import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useDispatch, useSelector } from "react-redux";
import { addUserChallenge, deleteUserChallenge } from "../reducers/challenge";
import { UserModal } from "../components/challenge";

// white: "#FFFFFF",
// light_gray: "#F2F2F2",
// light_purple: "#F0E9F9",
// light_button_purple: "#B59DD0",
// button_purple: "#9F5DD8",
// navy_blue: "#2960A1",

const Challenge = () => {
  const usersChallenge = useSelector((state) => state.challenge.value.users);
  const [isUserModalIsOpen, setIsUserModalIsOpen] = useState(false);
  const id = 1;
  const dispatch = useDispatch();

  const handleRemoveUser = () => {
    dispatch(deleteUserChallenge(id));
  };

  const handleAddUser = (user) => {
    setIsUserModalIsOpen(false);
    dispatch(addUserChallenge(user));

    setUsers([]);
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
            onPress={() => setIsUserModalIsOpen(true)}
          >
            <Text className="text-center font-nunitoSemiBold text-black">
              Ajouter un utilisateur
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className={"bg-light_gray p-4 rounded-md "}
            activeOpacity={0.7}
            onPress={() => setIsUserModalIsOpen(true)}
          >
            <Text className="text-center font-nunitoSemiBold text-black">
              Ajouter un utilisateur
            </Text>
          </TouchableOpacity>

          {isUserModalIsOpen && <UserModal handleAddUser={handleAddUser} />}

          <View className={"gap-5 bg-light_gray rounded-md p-5"}>
            <Text className={"font-bold text-gray-500 "}>Invités</Text>
            <View className={"  flex-row flex gap-5 flex-wrap "}>
              {usersChallenge.map((user, i) => (
                <TouchableOpacity
                  activeOpacity={0.8}
                  key={user._id}
                  className="items-center gap-1"
                  onPress={handleRemoveUser}
                >
                  <FontAwesome name="user-circle" color={"black"} size={34} />
                  <View>
                    <Text className={"font-nunitoBold"}>{user.firstname}</Text>
                    <Text className={"font-nunitoRegular"}>
                      @{user.username}
                    </Text>
                  </View>
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
