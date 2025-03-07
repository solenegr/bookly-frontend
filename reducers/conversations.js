import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    messages: [{content: null, user:null, conversation:null}],
    users: [], //contient les id des users qui participe a cette conversation
  },
};

const conversationsSlice = createSlice({
  name: "conversations",
  initialState,

  reducers: {
    addMessageConversation: (state, action) => {
      state.value.messages.push(action.payload);
      console.log(state.value.messages);
      console.log(state.value.users);
    },

    removeMessageConversation: (state, action) => {
      state.value.messages = state.value.messages.filter(
        (message) => message.id !== action.payload
      );
    },
    addUserConversation: (state, action) => {
      state.value.users.push(action.payload);
      console.log(state.value.users);
    },

    removeUserConversation: (state, action) => {
      state.value.users = state.value.users.filter(
        (user) => user.id !== action.payload
      );
    },

   
  },
});

export const { addMessageConversation, removeMessageConversation, addUserConversation, removeUserConversation} =
conversationsSlice.actions;
export default conversationsSlice.reducer;
