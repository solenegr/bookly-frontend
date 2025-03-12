import React from "react";
import { TouchableOpacity, Text } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useDispatch, useSelector } from "react-redux";
import { addBookLibrary, removeBookLibrary } from "../../reducers/books";

const Bookmark = ({
  _id,
  title,
  author,
  volume,
  summary,
  publisher,
  pages,
  cover,
  year,
  genres,
  status,
  isbn,
}) => {
  const books = useSelector((state) => state.books.value.books);
  const dispatch = useDispatch();
  const bookIds = new Set(books.map((book) => book._id));
  const isBookmarked = bookIds.has(_id); // check si le livre est deja ajouté dans la biblio
  const token = useSelector((state) => state.user.value.token);
  const handleAddBook = async () => {
    dispatch(
      addBookLibrary({
        _id,
        title,
        author,
        volume,
        summary,
        publisher,
        pages,
        cover,
        year,
        genres,
        status,
        isbn,
      })
    );

    fetch(`http://${process.env.IP_ADDRESS}:3000/users/${token}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.result) {
          fetch(
            `http://${process.env.IP_ADDRESS}:3000/libraries/add-to-library`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                bookId: _id,
                genres,
                status,
                userId: data.user._id,
              }),
            }
          );
        }
      });
  };

  const handleDeleteBook = () => {
    dispatch(removeBookLibrary(_id));
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
