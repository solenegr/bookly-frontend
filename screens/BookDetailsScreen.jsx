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
import Pusher from "pusher-js";
import { useSelector } from "react-redux";

const BookDetailsScreen = ({route}) => {
  const [book, setBook] = useState(null)
  const {isbn} = route.params;
  console.log("isbn", isbn)

  useEffect(() => {
    (async () =>  {
      const res = await fetch(`http://${process.env.IP_ADDRESS}:3000/books/isbn/${isbn}`)
    
    const data = await res.json()
    console.log(data.book)
    setBook(data.book)
    })()
  }, [isbn])

  const token = useSelector((state) => state.user.value.token);
  const [userId, setUserId] = useState(null);
  const [isLike, setIsLike] = useState([]);
  const [hideComment, setHideComment] = useState([]);
  const [avis, setAvis] = useState([]);
  const bookId = "67cef04710c8cdf4ae0941ee"; //à modifier pour dynamique(avis.length > 0 ? avis[0].book : null)

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          `http://${process.env.IP_ADDRESS}:3000/users/${token}`
        );
        const data = await response.json();
        if (data.result) {
          setUserId(data.user._id);
        }
      } catch (error) {
        console.error(
          "Erreur lors de la récupération de l'ID utilisateur :",
          error
        );
      }
    })();
  }, [token]);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          `http://${process.env.IP_ADDRESS}:3000/reviews?book=${book._id}`
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
    const channel = pusher.subscribe("book-reviews");

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
  }, []);

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
if(book === null) return
  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top"]}>
      <FlatList
        ListHeaderComponent={
          <View className={"flex-1"}>
            <Background cover={book.cover}/>
            <View className="w-full bg-white rounded-t-[2rem] p-5 -mt-10 gap-5">
              <TitleAuthorBook title={book.title} author={book.author}/>
              <Status />
              <View className="flex flex-row items-center justify-center gap-2 mt-3">
                <Note averageNote={averageNote} />
                <Tome tome={book.volume}/>
                <Bookmark
                  id={book._id}
                  title={book.title}
                  author={book.author}
                  year={book.publicationYear}
                  genre={book.genres}
                  tome={book.volume}
                  pages={992}
                  status={"none"}
                />
              </View>
              <Genres genres={book.genres}/>
              <Synopsis summary={book.summary} />
              <Text className="text-gray-800 font-nunitoExtraBold text-xl mt-6">
                Commentaires
              </Text>
            </View>
            <AddReview bookId={bookId} userId={userId} />
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
