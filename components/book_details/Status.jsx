import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { updateStatusBook, addBookLibrary } from "../../reducers/books";
import { IP_ADDRESS } from "@env";
const Status = ({bookId, libraryId}) => {
  const [isOpen, setIsOpen] = useState(false);

  const books = useSelector((state) => state.books.value.books);
  const dispatch = useDispatch();

  // ✅ Vérifie si le livre existe déjà dans `books`
  const bookStatus = books.find((book) => book.id === bookId);
  const isExist = !!bookStatus; // Convertit en boolean

  const inputs = [
    { text: "A lire" },
    { text: "En cours de lecture" },
    { text: "Terminé" },
  ];

  const openStatus = () => {
    setIsOpen((oldState) => !oldState);
  };

  const handleSelectStatus = (text) => {
     fetch(`http://${IP_ADDRESS}:3000/libraries/${libraryId}/readings/${bookId}/status`, {
              method: 'PATCH',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ newStatus : text}),
            })
    dispatch(
      updateStatusBook({
        id: bookId,
        status: text,
        title: "Terremer (Édition intégrale)",
        author: "Ursula K. Le Guin",
        year: 2017,
        genre: "Fantasy",
        tome: 1,
        pages: 992,
        cover: "http://books.google.com/books/content?id=LjRjDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
      })
    );
    setIsOpen(false);
  };

  return (
    <>
      {!isOpen ? (
        <TouchableOpacity
          className={"flex-1 items-center mt-2"}
          activeOpacity={0.8}
          onPress={openStatus}
        >
          <Text
            className={
              "w-44 py-2 bg-light_purple text-[#5D3A9B] font-nunitoBold rounded-lg text-center"
            }
          >
            {isExist ? bookStatus.status : "Suivi de lecture"}
          </Text>
        </TouchableOpacity>
      ) : (
        <>
          {inputs.map(({ text }, index) => (
            <TouchableOpacity
              key={index}
              className={"flex-1 items-center"}
              activeOpacity={0.8}
              onPress={() => handleSelectStatus(text)}
            >
              <Text
                className={
                  "w-44 py-2 bg-light_purple text-[#5D3A9B] font-nunitoBold rounded-lg text-center"
                }
              >
                {text}
              </Text>
            </TouchableOpacity>
          ))}
        </>
      )}
    </>
  );
};

export default Status;
