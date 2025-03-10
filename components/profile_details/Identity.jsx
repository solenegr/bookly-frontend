import React, { useEffect, useState } from "react";
import { Image, View, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import ProfilePic from "./ProfilePic";

export default function Identity() {
  // const [username, setUsername] = useState();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  const IpAdress = process.env.IP_ADDRESS;

  fetch(`http://${IpAdress}:3000/users/${user.token}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (data.result) {
        dispatch(data.user.username);
        // setUsername(data.user.username);
      }
    });

  return (
    <View className="flex items-center gap-2">
      <Image
        source={require("../../assets/temp/fille.png")}
        className="w-32 h-32 rounded-full border-2 border-white mt-12"
      />
      <Text className="text-2xl font-nunitoExtraBold text-center">
        @{user.username}{" "}
        <FontAwesome name="envelope" size={24} color="#1f2937" />
      </Text>
      {/* <View className="mt-2 ml-8 mr-8 mb-4 rounded-md p-2 items-center bg-light_purple">
        <Text className="font-nunitoRegular text-gray-600 ">
          Ma bio ultra catchy ⭐ Lorem Ipsum is simply dummy text of the
          printing and typesetting industry. Lorem Ipsum has been the industry's
          standard dummy{" "}
        </Text>
      </View> */}
    </View>
  );
}
