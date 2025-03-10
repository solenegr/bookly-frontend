import { useState } from "react";
import { Text, View, TextInput, TouchableOpacity, Image } from "react-native";
useState;
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../reducers/user";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { IP_ADDRESS } from "@env";

// Grabbed from emailregex.com
const EMAIL_REGEX =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

//pour modifier l'adresse IP et mettre la votre -> créer fichier .env.local

export default function ConnectionScreen({ navigation }) {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const IpAdress = process.env.IP_ADDRESS;

  const user = useSelector((state) => state.user.value);

  const [emailError, setEmailError] = useState(false);

  const handleConnection = () => {
    if (EMAIL_REGEX.test(email)) {
      console.log("test env", IpAdress);
      fetch(`http://${IpAdress}:3000/users/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data.user);
          if (data.result) {
            dispatch(
              login({
                username: data.user.username,
                firstname: data.user.firstname,
                email: data.user.email,
                password: data.user.password,
                token: data.user.token,
              })
            );
            console.log("reducer", user);
            setPassword("");
            setEmail("");
            navigation.navigate("TabNavigator", { screen: "Home" });
          }
        });
    } else {
      setEmailError(true);
    }
  };
  return (
    <SafeAreaView className="flex">
      <View className="items-center justify-center mt-24">
        <Text className="text-center text-button_purple font-nunitoBold text-5xl pt-2 mb-12">
          BOOKLY
          <FontAwesome name="book" size="34" color="#9F5DD8" />{" "}
        </Text>
        <TextInput
          placeholder="Email"
          autoCapitalize="none"
          autoComplete="email"
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
          onPress={() => handleConnection()}
          activeOpacity={0.6}
          className="w-64 h-12 bg-button_purple rounded-3xl items-center content-center  pt-2.5 m-3"
        >
          <Text className="font-nunitoRegular  text-white items-center content-center text-xl">
            Sign-in
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("SignUp")}
          activeOpacity={0.6}
          className="w-64 h-12 border-button_purple border rounded-3xl items-center content-center  pt-2.5 m-3 mb-8"
        >
          <Text className="font-nunitoRegular  text-gray-500 items-center content-center text-xl">
            New here ? Sign-up
          </Text>
        </TouchableOpacity>
      </View>
      <View className="w-4/5 self-center h-0.5 bg-button_purple shadow-md shadow-gray-500 my-4"></View>
      <View className="items-center justify-center">
        <TouchableOpacity
          onPress={() => navigation.navigate("TabNavigator")}
          activeOpacity={0.6}
          className="w-64 h-12 border-button_purple border rounded-3xl items-center content-center  pt-2.5 m-3 mt-8"
        >
          <Text className="font-nunitoRegular  text-gray-500 items-center justify-center text-xl">
            Connect with Google
          </Text>
          {/* <Image className="w-8 h-8 items-center" source={require("../assets/google-icon.png")}></Image> */}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
