import { createSlice } from '@reduxjs/toolkit';

const initialState = {
 value: { username: null, firstname: null, email: null, password: null, token: null },
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
      login: (state, action) => {
        state.value.token = action.payload.token;
        state.value.email = action.payload.email;
        state.value.password = action.payload.password;
        state.value.username = action.payload.username;
        state.value.firstname = action.payload.firstname;
      },
      logout: (state, action) => {
        state.value = { username: null, firstname: null, email: null, token: null };
      }
    },
  });
  
  export const { login, logout } = userSlice.actions;
  export default userSlice.reducer;
