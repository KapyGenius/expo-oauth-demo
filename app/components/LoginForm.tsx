import { View, Text, Button, TextInput } from "react-native";
import { useAuth } from "@/context/auth";

export default function LoginForm() {
    const { signIn } = useAuth();

    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Text>Expo Base URL: {process.env.EXPO_PUBLIC_BASE_URL}</Text>
            <Text>Login</Text>
            <Button title="Sign in with Google" onPress={signIn} />
        </View>
    );
}