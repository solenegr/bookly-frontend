import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { updateStatusBook, addBookLibrary } from "../../reducers/books";

// empty: "Ajouter un status",
// reading: "En cours de lecture",
// "want to read": "A lire",
// completed: "Terminé",
const Status = () => {
  const id = 1;
  const [isOpen, setIsOpen] = useState(false);

  const books = useSelector((state) => state.books.value.status);
  const dispatch = useDispatch();
  const bookStatus = new Map(books.map((book) => [book.id, book]));
  const isExist = bookStatus.has(id);

  const inputs = [
    { text: "A lire" },
    { text: "En cours de lecture" },
    { text: "Terminé" },
  ];
  const openStatus = () => {
    setIsOpen((oldState) => !oldState);
  };

  const handleSelectStatus = (text) => {
    dispatch(updateStatusBook({ id, status: text }));
    dispatch(addBookLibrary({ id }));
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
              "w-44 py-2  bg-light_purple text-[#5D3A9B] font-nunitoBold rounded-lg text-center"
            }
          >
            {isExist ? bookStatus.get(id).status : "Suivi de lecture"}
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
                  "w-44 py-2  bg-light_purple text-[#5D3A9B] font-nunitoBold rounded-lg text-center"
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
