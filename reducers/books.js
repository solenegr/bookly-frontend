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
      console.log(_id);
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
      const { id, status, title, author, year, genre, tome, pages, cover } =
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
          cover,
        });
      }
      console.log(state.value.books);
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
