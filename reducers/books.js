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
      console.log(state.value.books);
    },

    removeBookLibrary: (state, action) => {
      state.value.books = state.value.books.filter(
        (book) => book.id !== action.payload
      );

      console.log(state.value.books);
    },

    updateStatusBook: (state, action) => {
      const { id, status, title, author, year, genre, tome, pages } =
        action.payload;

      // 🔍 Vérifie si le livre existe déjà
      const bookIndex = state.value.books.findIndex((book) => book.id === id);

      if (bookIndex !== -1) {
        // ✅ Si le livre existe déjà → on met juste à jour le statut
        state.value.books[bookIndex].status = status;
      } else {
        // ✅ Si le livre n'existe pas → on l'ajoute avec toutes ses infos
        state.value.books.push({
          id,
          title,
          author,
          year,
          genre,
          tome,
          pages,
          status,
        });
      }
      console.log(state.value.books);
    },
  },
});

export const { addBookLibrary, removeBookLibrary, updateStatusBook } =
  booksSlice.actions;
export default booksSlice.reducer;
