import { Button, Text, View } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignUpScreen({ navigation }) {
 return (
    <SafeAreaView><View>
    <Text>Welcome</Text>
    <Button
      title="Sign-up"
      onPress={() => navigation.navigate('Home')}
    />
  </View></SafeAreaView>
 );
}