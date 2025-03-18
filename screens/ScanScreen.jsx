import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Linking,
  AppState,
  Image,
  SafeAreaView,
} from "react-native";
import { Overlay } from "react-native-elements";
import { CameraView, CameraType, FlashMode, Camera } from "expo-camera";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useIsFocused } from "@react-navigation/native";
import { addBookLibrary, removeBookLibrary } from "../reducers/books";
import { useDispatch, useSelector } from "react-redux";
import { IP_ADDRESS } from "@env";

export default function ScanScreen({ navigation }) {
  const [bookData, setBookData] = useState(null);
  const [userId, setUserId] = useState("");
  const books = useSelector((state) => state.books.value.books);
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();

  const qrLock = useRef(false);
  const appState = useRef(AppState.currentState);
  const [dataScanned, setDataScanned] = useState("");
  const [scanned, setScanned] = useState(false);
  const [hasPermission, setHasPermission] = useState(false);
  const cameraRef = useRef(null); // Utilisation de CameraView
  const [facing, setFacing] = useState("back"); // Type pour la caméra
  const [flashStatus, setFlashStatus] = useState("off");
  const [isVisible, setIsVisible] = useState(false);
  const isFocused = useIsFocused();
  // Gestion de l'état de l'application
  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (
        nextAppState === "active" &&
        (appState.current === "inactive" || appState.current === "background")
      ) {
        qrLock.current = false;
      }
      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, []);

  // Demande de permission pour accéder à la caméra
  useEffect(() => {
    (async () => {
      const result = await Camera.requestCameraPermissionsAsync();
      setHasPermission(result && result?.status === "granted");
    })();
  }, []);

  if (!hasPermission || !isFocused) {
    return <View />;
  }

  // Activer/désactiver le flash

  const toggleFlashStatus = () => {
    setFlashStatus((prev) => (prev === "on" ? "off" : "on"));
  };

  // Changer de type de caméra (avant/arrière)
  const toggleCameraFacing = () => {
    setFacing((current) => (current === "back" ? "front" : "back"));
  };

  // Gérer un nouveau scan
  const handleRescan = () => {
    setDataScanned("");
    setScanned(false);
    setIsVisible(false);
  };
  const handleclickOver = () => {
    setFlashStatus("off");
    setIsVisible(false);
    setScanned(true);
    fetch(`http://${IP_ADDRESS}:3000/users/${user.token}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          setUserId(data.user._id);
        }
      });
    if (dataScanned) {
      console.log(dataScanned);
      fetch(`http://${IP_ADDRESS}:3000/books/isbn/${dataScanned}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.result) {
            console.log("depuis apit", data.book);
            setBookData(data.book);
          } else {
            console.log("Livre non existe");
          }
        })
        .catch((error) =>
          console.error("Erreur lors de la récupération du livre :", error)
        );
      // navigation.navigate("BookDetails"); // Naviguer vers l'écran "Search"
    } else {
      console.log("No data scanned");
    }
  };
  // Ajouter un book
  const handleAddBook = () => {
    if (dataScanned) {
      console.log(dataScanned);
      fetch(`http://${IP_ADDRESS}:3000/books/isbn/${dataScanned}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.result) {
            dispatch(
              addBookLibrary({
                title: data.book.title,
                author: data.book.author,
                volume: data.book.volume,
                summary: data.book.summary,
                publisher: data.book.publisher,
                pages: data.book.pages,
                cover: data.book.cover,
                publicationYear: data.book.publicationYear,
                genres: data.book.genres,
                rating: data.book.rating,
                reviewCount: data.book.reviewCount,
                isbn: data.book.isbn,
              })
            );
            console.log("depuis store", books);
            console.log("user:", userId);
            console.log("book:", data.book._id);
            console.log("status:", books.status);
            fetch(`http://${IP_ADDRESS}:3000/libraries/add-to-library`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user.token}`,
              },
              body: JSON.stringify({
                userId: userId,
                bookId: data.book._id,
                status: books.status || "Suivi de lecture",
                genres: data.book.genres || [],
              }),
            });
          }
        });
    } else {
      console.log("No data scanned");
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleRescan}>
        <Text className="text-gray-800 font-nunitoRegular text-2xl">
          Scan again
        </Text>
      </TouchableOpacity>

      <View style={styles.containerCamera}>
        <CameraView
          style={{ width: 400, height: scanned ? 200 : 700 }}
          ref={(ref) => (cameraRef.current = ref)} // Référence de CameraView
          enableTorch={flashStatus === "on"}
          onBarcodeScanned={({ data }) => {
            setTimeout(() => {
              setDataScanned(data);
              setIsVisible(true);
            }, 500);
          }}
        >
          <SafeAreaView className="flex-row items-end justify-end m-3">
            <TouchableOpacity
              onPress={toggleFlashStatus}
              style={styles.settingButton}
            >
              <FontAwesome
                name="flash"
                size={24}
                color={flashStatus === "on" ? "#e8be4b" : "white"}
              />
            </TouchableOpacity>
          </SafeAreaView>
        </CameraView>
      </View>

      <Overlay
        isVisible={(dataScanned.length != 0 && isVisible) || dataScanned}
        onBackdropPress={() => handleclickOver()}
        overlayStyle={styles.overlay} // Application du style personnalisé pour positionner l'Overlay
      >
        <Text> code ISBN: {dataScanned}</Text>
      </Overlay>

      {scanned && bookData && (
        <View style={styles.containerBook} className="bg-light_purple ">
          <Image
            style={styles.imageBook}
            source={{ uri: bookData.cover }}
            onTouchEnd={() => {
              navigation.navigate("Details", { isbn: dataScanned });
            }}
          />
          <Text className="font-nunitoExtraBold text-lg text-black ml-32">
            {bookData.title}
          </Text>
          <Text className="font- nunitoRegular text-lg text-black ml-32">
            {bookData.author}
          </Text>
          <Text className="font-nunitoBlack text-lg text-black ml-32">
            {bookData.rating}/5
          </Text>
          <TouchableOpacity
            style={styles.buttonAdd}
            className=" bg-button_purple"
            onPress={handleAddBook}
          >
            <Text style={styles.buttonTextAdd}>Add book</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 70,
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  containerCamera: {
    flexDirection: "colunm",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  button: {
    backgroundColor: "transparent",
    width: "100%",
    height: 50,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonAdd: {
    width: "50%",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 90,
  },
  buttonTextAdd: {
    margin: 10,
    color: "white",
  },
  buttonText: {
    margin: 10,
    color: "black",
  },
  containerBook: {
    with: "100%",
    borderRadius: 20,
    flexDirection: "flex",
    alignItems: "flex-start",
    gap: 2,
    height: 500,
  },
  cameraIcon: {
    paddingLeft: 150,
  },
  imageBook: {
    marginTop: 30,
    marginLeft: 100,
    resizeMode: "cover",
    width: 160,
    height: 230,
  },
  overlay: {
    position: "absolute",
    top: 200, // Décalage du haut
    left: 0,
    right: 0,

    backgroundColor: "rgba(255, 255, 255, 0.8)", // Pour rendre l'overlay légèrement transparent
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    zIndex: 1, // S'assurer que l'overlay est au-dessus des autres éléments
  },
  settingButton: {
    width: 40,
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
