import { Text, View, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView>
      <View>
        <Text>Page d'accueil</Text>
        <Button
          title="Voir les détails du livre"
          onPress={() => navigation.navigate("Details", { id: "456" })}
        />
      </View>
    </SafeAreaView>
  );
}
