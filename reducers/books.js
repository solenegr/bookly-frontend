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
    updateLibrary: (state, action) => {
      state.value.books = action.payload; // Remplace entièrement la bibliothèque par les nouvelles données
    },
    addBookLibrary: (state, action) => {
      const { _id } = action.payload;
      const bookIndex = state.value.books.findIndex((book) => book._id === _id);

      if (bookIndex === -1) {
        // ✅ Si le livre n'existe pas → on l'ajoute avec toutes ses infos
        state.value.books.push(action.payload);
      }
      console.log(state.value.books);
    },

    removeBookLibrary: (state, action) => {
      state.value.books = state.value.books.filter(
        (book) => book._id !== action.payload
      );

      console.log(state.value.books);
    },

    updateStatusBook: (state, action) => {
      const { _id, status } = action.payload;

      // 🔍 Trouve le livre dans Redux
      const bookIndex = state.value.books.findIndex((book) => book._id === _id);

      if (bookIndex !== -1) {
        // ✅ Si le livre existe déjà, met à jour son statut SANS l'ajouter
        state.value.books[bookIndex].status = status;
      } else {
        console.warn(
          `Le livre ${_id} n'était pas dans Redux, il ne devrait pas être ajouté !`
        );
      }
    },
  },
});

export const {
  addBookLibrary,
  removeBookLibrary,
  updateStatusBook,
  updateLibrary,
} = booksSlice.actions;
export default booksSlice.reducer;
