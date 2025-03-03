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

  // Ouvrir le lien scanné
  const handleFollowLink = () => {
      
      if(scanned){
        Linking.openURL(dataScanned);
      }
    
  };

  return (
    <View style={styles.container}>
      
      <View style={styles.containerCamera}>
      <TouchableOpacity style={styles.button} onPress={handleRescan}>
          <Text style={styles.buttonText}>Scan again</Text>
        </TouchableOpacity>
        <CameraView
          style={{ width: 250, height: 250 }}
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
      </View>

      <Overlay isVisible={scanned} onBackdropPress={() => setScanned(false)}>
        <Text> Successuful scan!: {dataScanned}</Text>
      </Overlay>
      

      {/* {scanned&& ( */}
        <View style={styles.containerBook}>
     
            <Image  style = {styles.imageBook} source={require('../assets/icon.png')} />
            <Text className="font-nunitoExtraBold text-lg text-black">title</Text>
            <Text >Auteur</Text>
            <Text >4.5/5</Text>
            <TouchableOpacity style={styles.buttonAdd} onPress={handleFollowLink}>
            <Text style={styles.buttonTextAdd}>Add book</Text>
            </TouchableOpacity>
      
        {/* <TouchableOpacity style={styles.buttonAdd} onPress={handleFollowLink}>
          <Text style={styles.buttonText}>Follow link</Text>
        </TouchableOpacity> */}
        
      </View>
    {/* )} */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingTop: 70,
    gap: 30,
  },
  containerCamera: {
    flexDirection: 'colunm',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    gap: 10,
    flex: 6,
  },
  button: {
    backgroundColor: 'transparent',
    width: 150,
    height: 70,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonAdd:{
    backgroundColor: 'green',
    width:'100%',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
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
    borderColor:'red',
    borderWidth:2,
    flex: 8,
    flexDirection: 'column',
    alignItems: 'center',
    gap: 2,
    padding: 10,
    margin: 10,
  },
  cameraIcon: {
    paddingLeft: 150,
  },
  imageBook:{
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

