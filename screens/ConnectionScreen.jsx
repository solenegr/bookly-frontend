import { useState } from "react";
import { Text, View, TextInput, TouchableOpacity } from "react-native";
useState;
import { SafeAreaView } from "react-native-safe-area-context";

// Grabbed from emailregex.com
// const EMAIL_REGEX= /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default function ConnectionScreen({ navigation }) {
  const [firstname, setFirstname] = useState("");
  const [email, setEmail] = useState("");
  // const [emailError, setEmailError] = useState(false);

  return (
    <SafeAreaView>
      <View>
        <Text>Connection page</Text>
        <TextInput
          placeholder="Firstname"
          autoCapitalize="none"
          onChangeText={(value) => setFirstname(value)}
          value={firstname}
        ></TextInput>
        <TextInput
          placeholder="Email"
          autoCapitalize="none"
          keyboardType="email-address"
          textContentType="emailAddress"
          onChangeText={(value) => setEmail(value)}
          value={email}
        ></TextInput>
        <TouchableOpacity
          onPress={() => navigation.navigate("TabNavigator")}
          activeOpacity={0.6}
          className="w-56 h-12 bg-button_purple rounded-3xl items-center content-center  pt-2.5 mb-4"
        >
          <Text className="font-nunitoRegular  text-white items-center content-center text-xl">
            Sign-in
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("SignUp")}
          activeOpacity={0.6}
          className="w-56 h-12 bg-button_purple rounded-3xl items-center content-center  pt-2.5 mb-4"
        >
          <Text className="font-nunitoRegular  text-white items-center content-center text-xl">
            New here ? Sign-up !
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
