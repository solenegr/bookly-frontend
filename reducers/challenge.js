import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    users: [],
    books: [],
  },
};

const challengeSlice = createSlice({
  name: "challenge",
  initialState,
  reducers: {
    addUserChallenge: (state, action) => {
      state.value.users.push(action.payload);
      console.log(state.value.users);
    },

    deleteUserChallenge: (state, action) => {
      console.log(action.payload);
      state.value.users = state.value.users.filter(
        (user) => user.id !== action.payload
      );
      console.log(state.value.users);
    },
  },
});

export const { addUserChallenge, deleteUserChallenge } = challengeSlice.actions;
export default challengeSlice.reducer;
