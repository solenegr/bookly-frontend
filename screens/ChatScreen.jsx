import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addMessagesToConversation,
  addMessageToConversation,
} from "../reducers/conversations";
import Pusher from "pusher-js/react-native";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { IP_ADDRESS} from "@env";

const ChatScreen = ({ route: { params } }) => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.value._id);

  // ✅ Mémorisation des messages par conversation pour éviter les rerenders inutiles
  const messages = useSelector(
    (state) =>
      state.conversations.value.messagesByConversation[params.conversationId] ||
      []
  );

  const memoizedMessages = useMemo(() => messages, [messages]);

  const [newMessage, setNewMessage] = useState("");

  // 🔥 Fetch des messages uniquement si `conversationId` est valide
  useEffect(() => {
    if (!params.conversationId || !userId) return;

    fetch(
      `http://${IP_ADDRESS}:3000/messages/${userId}/${params.conversationId}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          dispatch(
            addMessagesToConversation({
              conversationId: params.conversationId,
              messages: data.messages,
            })
          );
        } else {
          console.error("❌ Erreur récupération messages :", data.error);
        }
      })
      .catch((error) => console.error("❌ Erreur fetch messages :", error));
  }, [params.conversationId, userId]); // 🔥 Ajoute `userId` en dépendance

  // 🔥 Connexion à Pusher pour mise à jour en temps réel
  useEffect(() => {
    if (!params.conversationId) return;

    const pusher = new Pusher(process.env.PUSHER_KEY, {
      cluster: process.env.PUSHER_CLUSTER,
      forceTLS: false,
      authEndpoint: `http://${IP_ADDRESS}:3000/pusher/auth`,
    });

    const channel = pusher.subscribe(`private-chat-${params.conversationId}`);

    channel.bind("message", (data) => {
      if (!data.content || !data.user) {
        console.error("❌ Erreur : Message mal structuré :", data);
        return;
      }

      dispatch(
        addMessageToConversation({
          conversationId: params.conversationId,
          message: data,
        })
      );
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
      pusher.disconnect();
    };
  }, [params.conversationId]);

  // 🔥 Envoi d'un message au backend
  const sendMessage = () => {
    if (!newMessage.trim()) return;

    fetch(
      `http://${IP_ADDRESS}:3000/messages/${userId}/conv/${params.conversationId}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: newMessage }),
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Erreur HTTP ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (data.result) {
          setNewMessage("");
        }
      })
      .catch((error) => console.error("❌ Erreur envoi message :", error));
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1"
    >
      <SafeAreaView className="flex-1 bg-white">
        <FlatList
          data={memoizedMessages}
          inverted={true} // ✅ Affiche le dernier message en bas
          keyExtractor={(item) => item._id.toString()}
          contentContainerStyle={{ paddingHorizontal: 10, paddingBottom: 20 }}
          keyboardShouldPersistTaps="handled"
          renderItem={({ item }) => {
            const isMe = item.user._id === userId;

            return (
              <View
                className={`flex-row ${
                  isMe ? "justify-end" : "justify-start"
                } mb-2`}
              >
                <View
                  className={`max-w-[75%] px-4 py-3 rounded-full ${
                    isMe ? "bg-blue-500" : "bg-gray-300"
                  }`}
                >
                  {!isMe && (
                    <Text className="text-xs font-bold text-gray-700">
                      {item.user.username}
                    </Text>
                  )}
                  <Text
                    className={`text-sm ${isMe ? "text-white" : "text-black"}`}
                  >
                    {item.content}
                  </Text>
                </View>
              </View>
            );
          }}
        />

        {/* 🔥 Input + Bouton d'envoi */}
        <View className="flex-row items-center p-2 border-t border-gray-300 bg-white">
          <TextInput
            className="flex-1 border border-gray-400 rounded-lg px-3 py-2"
            placeholder="Écrire un message..."
            value={newMessage}
            onChangeText={setNewMessage}
          />
          <TouchableOpacity
            onPress={sendMessage}
            className="ml-2 px-4 py-2 bg-blue-500 rounded-lg"
          >
            <Text className="text-white font-bold">Envoyer</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default ChatScreen;
