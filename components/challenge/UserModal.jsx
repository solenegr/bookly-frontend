import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addUserChallenge } from "../../reducers/challenge";
import { View, TouchableOpacity, Text } from "react-native";
import { TextInput } from "react-native-paper";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const UserModal = ({ handleAddUser }) => {
  const [inputUsername, setInputUsername] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    (async () => {
      if (inputUsername.length <= 1) return;
      const res = await fetch(
        `http://192.168.199.77:3000/users/all?username=${inputUsername}`
      );
      const data = await res.json();

      console.log(data);
      if (data.result) setUsers(data.users);
    })();
  }, [inputUsername]);
  return (
    <View className={"bg-light_gray p-5 rounded-md gap-3 "}>
      <TextInput
        mode="flat"
        label="Inviter une personne"
        onChangeText={(value) => setInputUsername(value)}
        value={inputUsername}
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
      {users.map((user) => (
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => {
            handleAddUser(user);
            setInputUsername("");
            setUsers([]);
          }}
          key={user._id}
          className={
            "flex flex-row items-center gap-4 border border-navy_blue p-4 rounded-md"
          }
        >
          <FontAwesome name="user-circle" color={"black"} size={34} />
          <View>
            <Text className={"font-nunitoBold"}>{user.firstname}</Text>
            <Text className={"font-nunitoRegular"}>@{user.username}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default UserModal;
