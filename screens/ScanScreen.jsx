import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Linking, AppState ,Image} from 'react-native';
import { Overlay } from 'react-native-elements';
import { CameraView, CameraType, FlashMode ,Camera} from 'expo-camera';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function ScanScreen() {
  const qrLock = useRef(false);
  const appState = useRef(AppState.currentState);
  const [dataScanned, setDataScanned] = useState('');
  const [scanned, setScanned] = useState(false);
  const [hasPermission, setHasPermission] = useState(false);
  const cameraRef = useRef(null); // Utilisation de CameraView
  const [facing, setFacing] = useState('back'); // Type pour la caméra
  const [flash, setFlash] = useState('off'); // Type pour le flash
  
  // Gestion de l'état de l'application
  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      if (nextAppState === 'active' && (appState.current === 'inactive' || appState.current === 'background')) {
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
      setHasPermission(result && result?.status === 'granted');
    })();
  }, []);

  if (!hasPermission) {
    return <View />;
  }

  // Prendre une photo
  const takePicture = async () => {
    const photo = await cameraRef.current?.takePictureAsync({ quality: 0.3 });
    if (photo) {
      console.log(photo);
    }
  };

  // Activer/désactiver le flash
  const flashPicture = () => {
    setFlash((current) => (current === "off" ? "on" : "off")); 
  };

  // Changer de type de caméra (avant/arrière)
  const toggleCameraFacing = () => {
    setFacing((current) => (current === 'back' ? 'front' : 'back'));
  };

  // Gérer un nouveau scan
  const handleRescan = () => {
    setDataScanned('');
    setScanned(!scanned);
  };

  // Ajouter un book
  const handleAddBook = () => {
    console.log("ok");
      if(dataScanned){
        console.log("code:",dataScanned);
        // Linking.openURL(dataScanned);
      }
    
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleRescan}>
          <Text className="text-gray-800 font-nunitoRegular text-2xl">Scan again</Text>
      </TouchableOpacity>
      <View style={styles.containerCamera}>
        {/* {!scanned &&( */}
          <CameraView
          style={{ width: 400, height : scanned ?200:700}}
          ref={(ref) => (cameraRef.current = ref)} // Référence de CameraView
          enableTorch={scanned}
          facing={facing}
          flash={flash}
          onBarcodeScanned={({ data }) => {
            setTimeout(() => {
              setDataScanned(data);
              setScanned(true);
              console.log('data', data);
            }, 500);
          }}
        />
        {/* )} */}
      </View>
      

      {/* <Overlay isVisible={scanned} onBackdropPress={() => setScanned(false)}>
        <Text> Successuful scan!: {dataScanned}</Text>
      </Overlay> */}
      

      {scanned&& (
        <View style={styles.containerBook} className="bg-light_purple ">
     
            <Image  style = {styles.imageBook} source={require('../assets/icon.png')} />
            <Text className="font-nunitoExtraBold text-lg text-black ml-10">title</Text>
            <Text className="font- nunitoRegular text-lg text-black ml-10">Auteur</Text>
            <Text className="font-nunitoBlack text-lg text-black ml-10">4.5/5</Text>
            <TouchableOpacity style={styles.buttonAdd} className=" bg-button_purple" onPress={handleAddBook}>
            <Text style={styles.buttonTextAdd}>Add book</Text>
            </TouchableOpacity>

      </View>
    )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    
  },
  containerCamera: {
    flexDirection: 'colunm',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  button: {
    backgroundColor: 'transparent',
    width: '100%',
    height: 50,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonAdd:{
    width:'90%',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft:20,
  },
  buttonTextAdd: {
    margin: 10,
    color: 'white',
  },
  buttonText: {
    margin: 10,
    color: 'black',
  },
  containerBook: {
    with:'100%',
    borderRadius:20,
    flexDirection: 'flex',
    alignItems: 'flex-start',
    gap: 10,
    height:500,
  },
  cameraIcon: {
    paddingLeft: 150,
  },
  imageBook:{
    marginLeft:100,
    resizeMode:'cover',
    width:160,
    height:230,
  },
//   detailsBook:{
//     flexDirection: 'column',
//     justifyContent:'center',
//     alignItems:'center',
//   }
});

