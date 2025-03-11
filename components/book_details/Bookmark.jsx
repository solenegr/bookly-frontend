import React from "react";
import { TouchableOpacity, Text } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useDispatch, useSelector } from "react-redux";
import { addBookLibrary, removeBookLibrary } from "../../reducers/books";

const Bookmark = ({ id, title, author, year, genre,pages, tome,status }) => {
  const books = useSelector((state) => state.books.value.books);
  const dispatch = useDispatch();
  const bookIds = new Set(books.map((book) => book.id));
  const isBookmarked = bookIds.has(id); // check si le livre est deja ajouté dans la biblio

  const handleAddBook = () => {
    dispatch(addBookLibrary({ id, title, author, year, genre, tome }));
  };

  const handleDeleteBook = () => {
    dispatch(removeBookLibrary(id));
  };

  return (
    <>
      {isBookmarked ? (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={handleDeleteBook}
          className="bg-light_gray items-center justify-center gap-3 h-20 w-24 rounded-md"
        >
          <FontAwesome name="check" size={15} color="purple" />
          <Text className="font-nunitoLight text-gray-600 text-sm">
            Déjà ajouté
          </Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={handleAddBook}
          className="bg-light_gray items-center justify-center gap-3 h-20 w-24 rounded-md"
        >
          <FontAwesome name="plus" size={15} color="purple" />
          <Text className="font-nunitoMedium text-gray-600 text-sm">
            Ajouter
          </Text>
        </TouchableOpacity>
      )}
    </>
  );
};

export default Bookmark;
