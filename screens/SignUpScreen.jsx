import { useState } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../reducers/user";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { IP_ADDRESS } from "@env";
// Grabbed from emailregex.com
const EMAIL_REGEX =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;



export default function SignUpScreen({ navigation }) {
  const [firstname, setFirstname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

 
  const user = useSelector((state) => state.user.value);

  const [emailError, setEmailError] = useState(false);


  const handleRegister = () => {
    if (EMAIL_REGEX.test(email)) {
      fetch(`http://${IP_ADDRESS}:3000/users/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstname,
          username,
          email,
          password,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          dispatch(
            login({
              firstname: data.user.firstname,
              username: data.user.username,
              email: data.user.email,
              password: data.user.password,
            })
          );
          navigation.navigate("TabNavigator", { screen: "Home" });
        });
      console.log("reducer", user);
    } else {
      setEmailError(true);
    }
  };

  return (
    <SafeAreaView>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 80}
      >
        <ScrollView className="grow">
          <View className="items-center justify-center mt-24">
            <Text className="text-center text-button_purple font-nunitoBold text-5xl pt-2 mb-12">
              BOOKLY
              <FontAwesome name="book" size="34" color="#9F5DD8" />{" "}
            </Text>
            <TextInput
              placeholder="Firstname"
              autoCapitalize="none"
              onChangeText={(value) => setFirstname(value)}
              value={firstname}
              className="border-button_purple border w-64 h-12 m-3 rounded-md"
            ></TextInput>
            <TextInput
              placeholder="Username"
              autoCapitalize="none"
              textContentType="username"
              onChangeText={(value) => setUsername(value)}
              value={username}
              className="border-button_purple border w-64 h-12 m-3 rounded-md"
            ></TextInput>
            <TextInput
              placeholder="Email"
              autoCapitalize="none"
              keyboardType="email-address"
              textContentType="emailAddress"
              onChangeText={(value) => setEmail(value)}
              value={email}
              className="border-button_purple border w-64 h-12 m-3 rounded-md"
            ></TextInput>
            <TextInput
              placeholder="Password"
              autoCapitalize="none"
              autoComplete="none"
              textContentType="password"
              secureTextEntry={true}
              onChangeText={(value) => setPassword(value)}
              value={password}
              className="border-button_purple border w-64 h-12 m-3 rounded-md"
            ></TextInput>
            {emailError && (
              <Text className="mt-3 text-red-500">Invalid email adress</Text>
            )}
            <TouchableOpacity
              onPress={() => handleRegister()}
              activeOpacity={0.6}
              className="w-64 h-12 bg-button_purple rounded-3xl items-center content-center  pt-2.5 m-3 mt-12"
            >
              <Text className="font-nunitoRegular  text-white items-center content-center text-xl">
                Sign-up
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
