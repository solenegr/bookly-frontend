import React, { useState, useEffect } from "react";
import { Text, View, FlatList, TextInput } from "react-native";
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
  Commentaire,
  AddReview,
} from "../components/book_details";
import Pusher from "pusher-js/react-native";
import { useSelector } from "react-redux";
import { IP_ADDRESS } from "@env";
const BookDetailsScreen = ({ route }) => {
  const [book, setBook] = useState(null);
  const { _id: userId, token } = useSelector((state) => state.user.value);
  const [isLike, setIsLike] = useState([]);
  const [hideComment, setHideComment] = useState([]);
  const [avis, setAvis] = useState([]);
  const { isbn } = route.params;

  useEffect(() => {
    (async () => {
      try {
        const cleanIsbn = isbn.replace(/\s+/g, "").replace(/-/g, "");
        console.log("clean", cleanIsbn);
        const res = await fetch(
          `http://${IP_ADDRESS}:3000/books/isbn/${cleanIsbn}`
        );

        const data = await res.json();

        setBook(data.book);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [isbn]);

  useEffect(() => {
    if (!!book === false) return;
    (async () => {
      try {
        const response = await fetch(
          `http://${IP_ADDRESS}:3000/reviews?book=${book._id}`
        );
        const data = await response.json();
        if (data.result) setAvis(data.reviews);
      } catch (error) {
        console.error("Erreur lors de la récupération des avis", error);
      }
    })();

    // 🔥 Initialisation de Pusher (une seule fois)
    const pusher = new Pusher(process.env.PUSHER_KEY, {
      cluster: "eu", // Remplace par ton vrai cluster
    });
    const channel = pusher.subscribe(`book-reviews-${book._id}`);

    channel.bind("new-review", (data) => {
      console.log("Nouvelle review reçue :", data);
      setAvis((prevAvis) => [data, ...prevAvis]);
    });

    return () => {
      // 🚨 Nettoyage : Se désabonner pour éviter les abonnements multiples
      channel.unbind_all();
      channel.unsubscribe();
      pusher.disconnect();
    };
  }, [book]);

  useEffect(() => {
    const pusher = new Pusher(process.env.PUSHER_KEY, {
      cluster: "eu", // Remplace par ton vrai cluster
    });
    const channel = pusher.subscribe("book-reviews");

    // 🔥 Écoute les nouveaux likes
    channel.bind("new-like", (updatedReview) => {
      console.log("Avis mis à jour (like) :", updatedReview);

      setAvis((prevAvis) =>
        prevAvis.map((review) =>
          review._id === updatedReview._id ? updatedReview : review
        )
      );

      if (userId) {
        // ✅ Vérifie si l'utilisateur a liké et met à jour `isLike`
        const hasLiked = updatedReview.likes.includes(userId);
        setIsLike(
          (prevLikes) =>
            hasLiked
              ? [...prevLikes, updatedReview._id] // Ajoute l'ID du commentaire si l'utilisateur a liké
              : prevLikes.filter((id) => id !== updatedReview._id) // Supprime sinon
        );
      }
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
      pusher.disconnect();
    };
  }, [userId]); // Dépend de `userId`

  // 🟡 Calcul de la note moyenne basé sur l'API
  const calculateAverageNote = () => {
    if (avis.length === 0) return "0.0";
    const total = avis.reduce((acc, item) => acc + item.note, 0);
    return (total / avis.length).toFixed(1);
  };

  const averageNote = calculateAverageNote();

  const toggleState = (id, state, setState) => {
    setState((prev) =>
      prev.includes(id) ? prev.filter((pId) => pId !== id) : [...prev, id]
    );
  };
  if (!!book === false) return;
  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top"]}>
      <FlatList
        ListHeaderComponent={
          <View className={"flex-1"}>
            <Background cover={book.cover} />
            <View className="w-full bg-white rounded-t-[2rem] p-5 -mt-10 gap-5">
              <TitleAuthorBook title={book.title} author={book.author} />
              <Status
                bookId={book._id}
                token={token}
                title={book.title}
                author={book.author}
                volume={book.volume}
                summary={book.summary}
                publisher={book.publisher}
                pages={book.pages}
                cover={book.cover}
                year={book.publicationYear}
                genres={book.genres}
                isbn={book.isbn}
              />
              <View className="flex flex-row items-center justify-center gap-2 mt-3">
                <Note averageNote={averageNote} />
                <Tome tome={book.volume} pages={book.pages}/>
                <Bookmark
                  _id={book._id}
                  title={book.title}
                  author={book.author}
                  volume={book.volume}
                  summary={book.summary}
                  publisher={book.publisher}
                  pages={book.pages}
                  cover={book.cover}
                  year={book.publicationYear}
                  genres={book.genres}
                  status={"Suivi de lecture"}
                  isbn={book.isbn}
                />
              </View>
              <Genres genres={book.genres} />
              <Synopsis summary={book.summary} />
              <Text className="text-gray-800 font-nunitoExtraBold text-xl mt-6">
                Commentaires
              </Text>
            </View>
            <AddReview bookId={book._id} userId={userId} />
          </View>
        }
        data={avis} // Utilisation des avis en temps réel
        keyExtractor={(item) => item._id.toString()}
        contentContainerStyle={{ paddingBottom: 20 }}
        renderItem={({ item }) => (
          <Commentaire
            item={item}
            isLike={isLike}
            setIsLike={setIsLike}
            hideComment={hideComment}
            setHideComment={setHideComment}
            toggleState={toggleState}
            userId={userId}
          />
        )}
      />
    </SafeAreaView>
  );
};

export default BookDetailsScreen;
