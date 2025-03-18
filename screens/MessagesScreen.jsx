import React, { useEffect } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  SafeAreaView,
  Image,
  FlatList,
} from "react-native";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setConversations } from "../reducers/conversations";
import { IP_ADDRESS } from "@env";

export default function MessageScreen({ navigation }) {
  const userId = useSelector((state) => state.user.value._id);
  const conversations = useSelector(
    (state) => state.conversations.value.conversations
  );
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(
          `https://bookly-backend-three.vercel.app/conversations/user/${userId}`
        );

        const data = await res.json();
        if (data.result && data.conversations.length) {
          dispatch(setConversations(data.conversations)); // 🔥 Stocke dans Redux
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>
        Mes Conversations
      </Text>

      <FlatList
        data={conversations}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Chat", {
                conversationId: item._id,
                users: item.users,
                userId,
              })
            }
            style={{
              padding: 15,
              backgroundColor: "#f0f0f0",
              borderRadius: 8,
              marginBottom: 10,
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>
              {item.challenge?.title || "Conversation privée"}
            </Text>
            <Text style={{ color: "gray" }}>
              {item.challenge?.description || "Pas de challenge associé"}
            </Text>
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity
        onPress={() => navigation.navigate("Challenge")}
        className={" flex items-center"}
      >
        <Text className="bg-light_purple p-3 rounded-full">
          Creer un coin lecture
        </Text>
      </TouchableOpacity>
    </View>
  );
}
