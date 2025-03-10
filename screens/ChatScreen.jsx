
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";

import { addMessageConversation, removeMessageConversation } from "../reducers/conversations";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Pusher from 'pusher-js/react-native';
import { Audio } from 'expo-av';
const pusher = new Pusher('PUSHER_KEY', { cluster: 'PUSHER_CLUSTER' });

 const BACKEND_ADDRESS = 'http://10.0.2.146:3000';
export default function ChatScreen({ navigation, route: { params } }) {
  const [recording, setRecording] = useState();
  const [permissionResponse, requestPermission] = Audio.usePermissions();
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState('');
  const [audioText, setAudioText] = useState('');
  const user = useSelector((state) => state.user.value);
  const [tabMessages, setTabMessages] = useState([])
  useEffect(() => {
    (() => {
      
      fetch(`${BACKEND_ADDRESS}/conversations/${params.conversationId}/add-user/${params.userId}`, { method: 'PUT' });
      // fetch(`${BACKEND_ADDRESS}/conversations/users/${params.username}`, { method: 'PUT' });

      const subscription = pusher.subscribe('chat');
      subscription.bind('pusher:subscription_succeeded', () => {
        subscription.bind('message', handleReceiveMessage);
      });
      
      fetch(`${BACKEND_ADDRESS}/challenges/${params.challengeId}/messages`)
    .then(response => response.json()).then(data => {
      if(data.result){
        console.log(data.messages);
          setTabMessages(data.messages);
          
      }

    })
    }
  
    
  )();

    return () => fetch(`${BACKEND_ADDRESS}/conversations/${params.conversationId}/remove-user/${params.userId}`, { method: 'DELETE' });
  }, [params.username]);

  const handleReceiveMessage = (data) => {
    console.log("okkkkkkkkkkkkkkkkkkkkkkkk",messages)
    setMessages(prevMessages => [...prevMessages, data]);
  };

  const handleSendMessage = () => {

    
    if (!messageText && !audioText) {
      return;
    }
    let payload;
    if (audioText.includes('file://')) {
      //dispatch(addMessageConversation({ audioText,user.id }));

      payload = {
        content: audioText,
        type: 'audio',
        username: params.username,
        createdAt: new Date(),
        id: Math.floor(Math.random() * 100000),
      };
    }else{
      payload = {
        content: messageText,
        type: 'text',
        username: params.username,
        createdAt: new Date(),
        id: Math.floor(Math.random() * 100000),
      };

    }
    
    
    handleReceiveMessage(payload);
    
    fetch(`${BACKEND_ADDRESS}/messages/${params.userId}/conv/${params.conversationId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ payload,content:payload.content , user : params.userId}),
    });

    // fetch(`${BACKEND_ADDRESS}/messages/message`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(payload),
    // });
    setAudioText('');
    setMessageText('');
  };


  async function startRecording() {
    try {
      if (permissionResponse.status !== 'granted') {
        console.log('Requesting permission..');
        await requestPermission();
      }
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      console.log('Starting recording..');
      const { recording } = await Audio.Recording.createAsync( Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);

      console.log('Recording started'); 
      setMessageText("recording...");
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  }
  async function stopRecording() {
    console.log('Stopping recording..');
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    await Audio.setAudioModeAsync(
      {
        allowsRecordingIOS: false,
      }
    );
    const uri = recording.getURI();
    setAudioText(uri);
    setMessageText("");
    console.log('Recording stopped and stored at', uri);
  }
  const [currentSound, setCurrentSound] = useState(null);

  const playAudio = async (uri) => {
    try {
      // Si un son est déjà en cours de lecture, on l'arrête
      if (currentSound) {
        await currentSound.stopAsync();
        await currentSound.unloadAsync();
        setCurrentSound(null);
        return;
      }
  
      // On charge et on joue le nouvel audio
      const { sound } = await Audio.Sound.createAsync({ uri });
      setCurrentSound(sound);
      await sound.playAsync();
      
      // On écoute la fin de la lecture pour réinitialiser le state
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.didJustFinish) {
          setCurrentSound(null);
        }
      });
    } catch (error) {
      console.error('Erreur lors de la lecture de l\'audio', error);
    }
  };
  
  
  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={styles.banner}>
        <MaterialIcons name="keyboard-backspace" color="gray" size={24} onPress={() => navigation.goBack()} />
        <Text style={styles.greetingText}>Welcome {user.username.charAt(0).toUpperCase() + user.username.slice(1)} 👋</Text>
      </View>

      <View style={styles.inset}>
        <ScrollView style={styles.scroller}>
            {tabMessages.map((message, i) => (
              <View key={i} style={[styles.messageWrapper, { ...(message.user.username === user.username ? styles.messageSent : styles.messageRecieved) }]}>
                <View style={[styles.message, { ...(message.user.username === user.username ? styles.messageSentBg : styles.messageRecievedBg) }]}>
                <Text  style={styles.usernameText}>{message.user.username}</Text>

                {message.content.includes('file://') ? (
                <TouchableOpacity onPress={() => playAudio(message.content)}>
                <MaterialIcons 
                  name={currentSound ? "stop-circle" : "play-circle-fill"} 
                  color="#506568" 
                  size={24} 
                />
                </TouchableOpacity>
                ) : (
                <Text style={styles.messageText}> {message.content}</Text>
                )}
                </View>
              
                <Text style={styles.timeText}>{new Date(message.createdAt).getHours()}:{String(new Date(message.createdAt).getMinutes()).padStart(2, '0')}</Text>
                

              </View>             
            ))}
          {  
           
            messages.map((message, i) => (
              <View key={i} style={[styles.messageWrapper, { ...(message.username === params.username ? styles.messageSent : styles.messageRecieved) }]}>
                <View style={[styles.message, { ...(message.username === params.username ? styles.messageSentBg : styles.messageRecievedBg) }]}>
                  
                {message.type === 'audio' ? (
                <TouchableOpacity onPress={() => playAudio(message.content)}>
                <MaterialIcons 
                  name={currentSound ? "stop-circle" : "play-circle-fill"} 
                  color="#506568" 
                  size={24} 
                />
                </TouchableOpacity>
                ) : (
                <Text style={styles.messageText}> {message.content}</Text>
                )}
               </View>
                <Text style={styles.timeText}>{new Date(message.createdAt).getHours()}:{String(new Date(message.createdAt).getMinutes()).padStart(2, '0')}</Text>
              </View>
            ))
          }
        </ScrollView>

        <View style={styles.inputContainer}>
          <TextInput onChangeText={(value) => setMessageText(value)} value={messageText} style={styles.input} autoFocus />
          <TouchableOpacity style={[styles.recordButton , recording && {backgroundColor: 'rgba(248, 83, 83, 0.5)'}]}
          title={recording ? 'Stop Recording' : 'Start Recording'}
          onPress={recording ? stopRecording : startRecording}>
            <MaterialIcons name="mic" color="#ffffff" size={24} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleSendMessage()} className="bg-button_purple" style={styles.sendButton}>
            <MaterialIcons name="send" color="#ffffff" size={24} />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#000',
  },
  inset: {
    flex: 1,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    backgroundColor: 'white',
    width: '100%',
    paddingTop: 20,
    position: 'relative',
    borderTopColor: '#B59DD0',
    borderLeftColor: '#B59DD0',
    borderRightColor: '#B59DD0',
    borderTopWidth: 4,
    borderRightWidth: 0.1,
    borderLeftWidth: 0.1,
  },
  banner: {
    width: '100%',
    height: '15%',
    paddingTop: 20,
    paddingLeft: 20,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  greetingText: {
    color: 'gray',
    fontWeight: 'bold',
    fontSize: 18,
    marginLeft: 15,
  },
  message: {
    paddingTop: 12,
    paddingBottom: 12,
    paddingRight: 20,
    paddingLeft: 20,
    borderRadius: 24,
    alignItems: 'flex-end',
    justifyContent: 'center',
    maxWidth: '65%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 6.41,
    elevation: 1.2,
  },
  messageWrapper: {
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  messageRecieved: {
    alignSelf: 'flex-end',
    alignItems: 'flex-end'
  },
  messageSent: {
    alignSelf: 'flex-start',
    alignItems: 'flex-start'
  },
  messageSentBg: {
    backgroundColor: '#B59DD0',
  },
  messageRecievedBg: {
    backgroundColor: '#d6fff9'
  },
  messageText: {
    color: 'black',
    fontWeight: '400',
  },
  timeText: {
    color: '#506568',
    opacity: 0.5,
    fontSize: 10,
    marginTop: 2,
  },
  inputContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    justifySelf: 'flex-end',
    alignContent: 'flex-start',
    marginBottom: 30,
    marginTop: 'auto',
    background: 'transparent',
    paddingLeft: 20,
    paddingRight: 20,
  },
  input: {
    backgroundColor: '#f0f0f0',
    width: '60%',
    padding: 14,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 6.41,
    elevation: 1.2,
  },
  recordButton: {
    borderRadius: 50,
    padding: 16,
    backgroundColor: '#FF85A2',
    marginLeft: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 6.41,
    elevation: 1.2,
  },
  sendButton: {
    borderRadius: 50,
    padding: 16,
    
    marginLeft: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 6.41,
    elevation: 1.2,
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: '800',
    textTransform: 'uppercase'
  },
  scroller: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  usernameText: {
    
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333', // Pour afficher le nom de l'utilisateur
    
  },
});
