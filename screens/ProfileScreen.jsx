import { Text, View, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Identity,
  GrayBlock,
  Bio,
  UserReview,
} from "../components/profile_details";
import FontAwesome from "react-native-vector-icons/FontAwesome";

import userAvis from "../data/userAvis.json";

export default function ProfileScreen({ navigation }) {
  return (
    <SafeAreaView edges={["top"]} className="bg-white flex-1 w-full h-full">
      <FlatList
        ListHeaderComponent={
          <View className="bg-light_purple flex">
            <View className="absolute top-0 right-0 p-4">
              <FontAwesome name="gear" size={24} color="#1f2937" />
            </View>

            <Identity />
            <View className="bg-white rounded-t-[2rem] p-5 mt-2">
              <Bio />
              <View className="flex flex-row items-center justify-center gap-2">
                <GrayBlock mainText="142" subText="livres lus" />
                <GrayBlock mainText="35" subText="avis publiés" />
                <GrayBlock mainText="234" subText="avis likés" />
              </View>
            </View>
            <View className="bg-white">
              <Text className="text-gray-800 font-nunitoExtraBold text-xl mt-5 pl-6">
                Mes livres en cours
              </Text>
              <Text className="text-gray-800 font-nunitoExtraBold text-xl mt-5 pl-6">
                Mes genres favoris
              </Text>
              <Text className="text-gray-800 font-nunitoExtraBold text-xl mt-5 pl-6">
                Mes derniers avis
              </Text>
            </View>
          </View>
        }
        data={userAvis}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingBottom: 20 }}
        renderItem={({ item }) => {
          // console.log(item)
          return <UserReview {...item} />; //<UserReview book={item.book}... />
        }}
      />
    </SafeAreaView>
  );
}

{
  /* <SafeAreaView edges={["top"]}>
<View className="bg-white flex w-full h-full">
  <Identity />
  <View className="m-1 flex flex-row items-center justify-center gap-2">
    <GrayBlock mainText="142" subText="livres lus" />
    <GrayBlock mainText="35" subText="avis publiés" />
    <GrayBlock mainText="234" subText="avis likés" />
  </View>
  <Text className="text-gray-800 font-nunitoExtraBold text-xl mt-5 pl-4">
    Mes livres en cours
  </Text>
  <Text className="text-gray-800 font-nunitoExtraBold text-xl mt-5 pl-4">
    Mes genres favoris
  </Text>
  <Text className="text-gray-800 font-nunitoExtraBold text-xl mt-5 pl-4">
    Mes derniers avis
  </Text>
</View>
</SafeAreaView> */
}
