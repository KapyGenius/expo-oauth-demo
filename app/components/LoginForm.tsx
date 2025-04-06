import { View, Text, Button, TextInput } from "react-native";

export default function LoginForm() {

    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Text>Login</Text>
            <Button title="Sign in with Google" onPress={() => {}} />
        </View>
    );
}