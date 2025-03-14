import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { updateStatusBook, addBookLibrary } from "../../reducers/books";
import { IP_ADDRESS } from "@env";

const Status = ({
  bookId,
  token,
  title,
  author,
  volume,
  summary,
  publisher,
  pages,
  cover,
  year,
  genres,
  isbn,
}) => {
  const books = useSelector((state) => state.books.value.books);
  const existingBook = books.find((b) => b._id === bookId);
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  const inputs = [
    { text: "A lire" },
    { text: "En cours de lecture" },
    { text: "Terminé" },
  ];

  const openStatus = () => setIsOpen((prev) => !prev);

  const handleSelectStatus = async (text) => {
    try {
      const res = await fetch(
        `http://${IP_ADDRESS}:3000/libraries/readings/${bookId}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ newStatus: text }),
        }
      );

      const data = await res.json();

      if (data.result) {
        console.log("Mise à jour réussie :", data);

        if (existingBook) {
          dispatch(updateStatusBook({ ...existingBook, status: text }));
        } else {
          dispatch(
            addBookLibrary({
              _id: bookId,
              title,
              author,
              volume,
              summary,
              publisher,
              pages,
              cover,
              year,
              genres,
              status: text,
              isbn,
            })
          );
        }
      } else {
        console.error("Erreur API :", data);
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error);
    }

    setIsOpen(false);
  };

  return (
    <>
      {!isOpen ? (
        <TouchableOpacity
          className="flex-1 items-center mt-2"
          activeOpacity={0.8}
          onPress={openStatus}
        >
          <Text className="w-44 py-2 bg-light_purple text-[#5D3A9B] font-nunitoBold rounded-lg text-center">
            {existingBook ? existingBook.status : "Suivi de lecture"}
          </Text>
        </TouchableOpacity>
      ) : (
        inputs.map(({ text }, index) => (
          <TouchableOpacity
            key={index}
            className="flex-1 items-center"
            activeOpacity={0.8}
            onPress={() => handleSelectStatus(text)}
          >
            <Text className="w-44 py-2 bg-light_purple text-[#5D3A9B] font-nunitoBold rounded-lg text-center">
              {text}
            </Text>
          </TouchableOpacity>
        ))
      )}
    </>
  );
};

export default Status;
