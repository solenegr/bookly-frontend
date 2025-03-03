import { Button, Text, View } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";


export default function ConnectionScreen({ navigation }) {
 return (
    <SafeAreaView>
        <View>
            <Text>Connection page</Text>
            <Button
            title="Sign in or Google Connect"
            onPress={() => navigation.navigate('SignUp')}
            />
        </View>
    </SafeAreaView>
 );
}