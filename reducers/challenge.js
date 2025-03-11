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
      const { _id } = action.payload; //recupere id de l'user
      const isExist = state.value.users.some((user) => user._id === _id); //verifie si l'utilisateur est deja present
      if (isExist) return;
      state.value.users.push(action.payload); //ajout l'utilisateur s'il n'est pas present
      console.log("Après ajout:", state.value.users);
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
