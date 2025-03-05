import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    books: [],
  },
};

const booksSlice = createSlice({
  name: "books",
  initialState,

  reducers: {
    addBookLibrary: (state, action) => {
      state.value.books.push(action.payload);
      console.log(state);
    },

    removeBookLibrary: (state, action) => {
      state.value.books = state.value.books.filter(
        (book) => book.id !== action.payload
      );
    },
  },
});

export const { addBookLibrary, removeBookLibrary } = booksSlice.actions;
export default booksSlice.reducer;
