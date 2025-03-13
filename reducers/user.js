import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    _id: null,
    username: null,
    firstname: null,
    email: null,
    token: null,
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.value = { ...action.payload };
      console.log("MOIIIII", state.value);
    },
    logout: (state, action) => {
      state.value = {
        _id: null,
        username: null,
        firstname: null,
        email: null,
        token: null,
      };
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
