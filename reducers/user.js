import { createSlice } from '@reduxjs/toolkit';

const initialState = {
 value: { username: null, firstname: null, lastname: null, email: null, password: null, token: null },
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
      login: (state, action) => {
        state.value.token = action.payload.token;
        state.value.email = action.payload.email;
        state.value.password = action.payload.password
      },
      signup: (state, action) => {
        state.value.username = action.payload.username;
        state.value.firstname = action.payload.firstname;
        state.value.lastname = action.payload.lastname;
        state.value.email = action.payload.email;
        state.value.password = action.payload.password;
        state.value.token = action.payload.token
      },
      logout: (state, action) => {
        state.value = { username: null, firstname: null, lastname: null, email: null, token: null };
      }
    },
  });
  
  export const { login, signup, logout } = userSlice.actions;
  export default userSlice.reducer;
