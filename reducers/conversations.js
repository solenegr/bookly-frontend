import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    messagesByConversation: {}, // Clé = conversationId, Valeur = tableau de messages
    users: [], // ID des utilisateurs de la conversation
    conversations: [], // Toutes les conversations avec leurs challenges
  },
};

const conversationsSlice = createSlice({
  name: "conversations",
  initialState,

  reducers: {
    addMessagesToConversation: (state, action) => {
      const { conversationId, messages } = action.payload;

      if (!state.value.messagesByConversation[conversationId]) {
        state.value.messagesByConversation[conversationId] = [];
      }

      const existingIds = new Set(
        state.value.messagesByConversation[conversationId].map((msg) => msg._id)
      );

      const newMessages = messages.filter((msg) => !existingIds.has(msg._id));

      state.value.messagesByConversation[conversationId].push(...newMessages);
    },

    addMessageToConversation: (state, action) => {
      const { conversationId, message } = action.payload;

      if (!state.value.messagesByConversation[conversationId]) {
        state.value.messagesByConversation[conversationId] = [];
      }

      const exists = state.value.messagesByConversation[conversationId].some(
        (msg) => msg._id === message._id
      );

      if (!exists) {
        state.value.messagesByConversation[conversationId].push(message);
      }
    },

    setConversations: (state, action) => {
      state.value.conversations = action.payload;
    },
  },
});

export const {
  addMessagesToConversation,
  addMessageToConversation,
  setConversations,
} = conversationsSlice.actions;

export default conversationsSlice.reducer;
