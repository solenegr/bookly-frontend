import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    books: [],
    status: [], //{id : jfdslkfj, status : ""}
  },
};
{
  /* reading", "completed", "want to read */
}
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

    updateStatusBook: (state, action) => {
      // J'ai mis un Map, c'est plus optimisé qu'un findIndex
      //Avec un Map on doit pas iterrer sur chaque element du tableau il arrive à retrouver directement l'element
      const bookStatusMap = new Map(
        state.value.status.map((item) => [item.id, item])
      );

      if (bookStatusMap.has(action.payload.id)) {
        bookStatusMap.get(action.payload.id).status = action.payload.status;
      } else {
        state.value.status.push(action.payload);
      }
    },
  },
});

export const { addBookLibrary, removeBookLibrary, updateStatusBook } =
  booksSlice.actions;
export default booksSlice.reducer;
