import { Button, Text, View } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

export default function WelcomeScreen({ navigation }) {
 return (
    <SafeAreaView>
        <View>
            <Text>Welcome</Text>
            <Button
            title="Start with Bookly"
            onPress={() => navigation.navigate('Connection')}
            />
        </View>
    </SafeAreaView>
 );
}