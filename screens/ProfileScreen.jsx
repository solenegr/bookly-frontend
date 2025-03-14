import {
  Text,
  View,
  FlatList,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Identity,
  GrayBlock,
  Bio,
  UserReview,
} from "../components/profile_details";
import FontAwesome from "react-native-vector-icons/FontAwesome";

import { useSelector, useDispatch } from "react-redux";
import { IP_ADDRESS } from "@env";
import userAvis from "../data/userAvis.json";
import { useState, useEffect } from "react";

export default function ProfileScreen({ navigation }) {
  const user = useSelector((state) => state.user.value);

  const [userReviews, setUserReviews] = useState([]);
  console.log("userReview", userReviews);

  const [userGenres, setUserGenres] = useState([]);

  useEffect(() => {
    fetch(`http://${IP_ADDRESS}:3000/users/${user.token}`)
      .then((response) => response.json())
      .then((dataUser) => {
        if (dataUser.result) {
          fetch(`http://${IP_ADDRESS}:3000/reviews/${dataUser.user._id}`)
            .then((response) => response.json())
            .then((data) => {
              if (data.result) {
                console.log(data);
                setUserReviews(data.reviews);
                setUserGenres(data.reviews.book.genre);
              }
            });
        }
      });
  }, []);

  const imageMap = {
    book1: require("../assets/temp/354.jpg"),
    book2: require("../assets/temp/9782246831464.jpg"),
    book3: require("../assets/temp/Gone-baby-gone.jpg"),
    book4: require("../assets/temp/les_guerriers_du_silence_tome_1.jpg"),
    book5: require("../assets/temp/Preference-systeme.jpg"),
    book6: require("../assets/temp/terremer.webp"),
  };

  const genres = [
    { name: "Fantasy", color: "#74C0FC" },
    { name: "Aventure", color: "#FFB347" },
    { name: "Roman initiatique", color: "#FF85A2" },
    { name: "Magie", color: "#C792EA" },
    { name: "High Fantasy", color: "#77DD77" },
    { name: "Mythologie", color: "#FFD700" },
  ];
  const books = useSelector((state) => state.books.value);
  const readingBooks = books.books
    .filter((e) => e.status === "En cours de lecture")
    .map((e) => ({ cover: e.cover, isbn: e.isbn }));
  const completedBooks = books.books
    .filter((e) => e.status === "Terminé")
    .map((e) => ({ cover: e.cover, isbn: e.isbn }));

  return (
    <SafeAreaView edges={["top"]} className="bg-white flex-1 w-full h-full">
      <FlatList
        ListHeaderComponent={
          <View className="bg-light_purple flex">
            <View className="absolute top-0 right-0 p-4">
              <FontAwesome name="gear" size={24} color="#1f2937" />
            </View>

            <Identity />
            <View className="bg-white rounded-t-[2rem] p-5 mt-2">
              <Bio />
              {/* Liens à faire */}
              <View className="flex flex-row items-center justify-center gap-2">
                <GrayBlock
                  mainText={completedBooks.length}
                  subText="livres lus"
                />
                <GrayBlock
                  mainText={userReviews.length}
                  subText="avis publiés"
                />
                <GrayBlock mainText="24" subText="avis likés" />
              </View>
            </View>
            <View className="bg-white">
              <View className="mb-5">
                <Text className="text-gray-800 font-nunitoExtraBold text-xl mt-5 mb-2 pl-6">
                  Mes livres en cours
                </Text>
                {/* A rendre dynamique avec BDD */}
                {readingBooks.length > 0 && (
                  <View className="flex flex-col gap-4">
                    <ScrollView
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      className="flex-row px-4"
                    >
                      {readingBooks.map((book, index) => (
                        <TouchableOpacity
                          key={book.isbn || index}
                          onPress={() =>
                            navigation.navigate("Details", { isbn: book.isbn })
                          }
                        >
                          <Image
                            className="w-40 h-56 object-cover rounded-lg mr-2"
                            source={{ uri: book.cover }}
                          />
                        </TouchableOpacity>
                      ))}
                    </ScrollView>
                  </View>
                )}
              </View>
              <View className="mb-5">
                <Text className="text-gray-800 font-nunitoExtraBold text-xl mt-5 mb-2 pl-6">
                  Mes genres favoris
                </Text>
                {/* A rendre dynamique avec BDD */}
                <View className="flex-row flex-wrap pl-6 pr-4 ">
                  {genres.map((genre, index) => (
                    <TouchableOpacity
                      activeOpacity={0.7}
                      key={index}
                      className="px-3.5 py-1 rounded-full mr-1 mb-2"
                      style={{
                        backgroundColor: genre.color,
                        shadowColor: genre.color,
                        shadowOpacity: 0.5,
                        shadowRadius: 2.62,
                        shadowOffset: { width: 500, height: 3 },
                        elevation: 4,
                      }}
                    >
                      <Text className="text-gray-800 text-base font-nunitoBold">
                        {genre.name}
                      </Text>
                    </TouchableOpacity>
                  ))}
                  <View className="w-5"></View>
                </View>
              </View>
              <Text className="text-gray-800 font-nunitoExtraBold text-xl mt-5 mb-2 pl-6">
                Mes derniers avis
              </Text>
            </View>
          </View>
        }
        data={userReviews}
        keyExtractor={(item) => item._id.toString()}
        contentContainerStyle={{ paddingBottom: 20 }}
        renderItem={({ item }) => {
          // console.log(item)
          // if (!!item.book == false) return;
          return (
            <UserReview
              cover={item.book.cover}
              title={item.book.title}
              author={item.book.author}
              commentaire={item.content}
              isbn={item.book.isbn}
              note={item.note}
              navigation={navigation}
            />
          ); //ou <UserReview {...item} />
        }}
      />
    </SafeAreaView>
  );
}

{
}
