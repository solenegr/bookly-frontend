import React, { useState } from "react";
import { Text, View, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Background,
  TitleAuthorBook,
  Note,
  Tome,
  Bookmark,
  Status,
  Genres,
  Synopsis,
  Commentaires,
} from "../components/book_details";

import avis from "../data/avis.json";
const BookDetailsScreen = () => {
  const [isLike, setIsLike] = useState([]);
  const [hideComment, setHideComment] = useState([]);

  //calcul moyenne avis
  const calculateAverageNote = () => {
    if (avis.length < 0) return;

    const total = avis.reduce((acc, item) => (acc += item.note), 0);
    return (total / avis.length).toFixed(1);
  };

  const averageNote = calculateAverageNote();

  const toggleState = (id, state, setState) => {
    setState((prev) =>
      prev.includes(id) ? prev.filter((pId) => pId !== id) : [...prev, id]
    );
  };
  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top"]}>
      <FlatList
        ListHeaderComponent={
          <View className={"flex-1"}>
            <Background />
            <View className="w-full bg-white rounded-t-[2rem] p-5 -mt-10 gap-5">
              <TitleAuthorBook />
              <Status />
              <View className="flex flex-row items-center justify-center gap-2 mt-3">
                <Note averageNote={averageNote} />
                <Tome />
                <Bookmark
                  id={1}
                  title={"Terremer (Édition intégrale)"}
                  author={"Ursula K. Le Guin"}
                  year={2017}
                  genre={"Fantasy"}
                  tome={1}
                  pages={992}
                  status={"reading"}
                />
              </View>
              <Genres />
              <Synopsis />
              <Text className="text-gray-800 font-nunitoExtraBold text-xl mt-6">
                Commentaires
              </Text>
            </View>
          </View>
        }
        data={avis}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingBottom: 20 }}
        renderItem={({ item }) => (
          <Commentaires
            item={item}
            isLike={isLike}
            setIsLike={setIsLike}
            hideComment={hideComment}
            setHideComment={setHideComment}
            toggleState={toggleState}
          />
        )}
      />
    </SafeAreaView>
  );
};

export default BookDetailsScreen;
