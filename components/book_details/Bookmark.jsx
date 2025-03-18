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
  const isBookmarked = bookIds.has(_id) || bookIds.has(isbn);
  const { token } = useSelector((state) => state.user.value);

  const handleAddBook = async () => {
    console.log(token);
    try {
      const userRes = await fetch(
        `https://bookly-backend-three.vercel.app/users/${token}`
      );
      const userData = await userRes.json();

      if (userData.result) {
        const res = await fetch(
          `https://bookly-backend-three.vercel.app/libraries/add-to-library`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              bookId: _id || isbn,
              genres,
              status: status || "A lire",
              userId: userData.user._id,
            }),
          }
        );

        const data = await res.json();

        if (data.result) {
          dispatch(
            addBookLibrary({
              _id: _id || isbn,
              title,
              author,
              volume,
              summary,
              publisher,
              pages,
              cover,
              year,
              genres,
              status: status || "A lire",
              isbn,
            })
          );
        } else {
          console.error("Erreur API :", data);
        }
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout du livre :", error);
    }
  };

  const handleDeleteBook = () => {
    dispatch(removeBookLibrary(_id || isbn));
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
