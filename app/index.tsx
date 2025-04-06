import { ActivityIndicator, Button, Text, View } from "react-native";
import { useAuth } from "@/context/auth";
import LoginForm from "@/app/components/LoginForm";

export default function Index() {
  const { user, signIn, signOut, fetchWithAuth, isLoading, error } = useAuth();

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator />
      </View>
    );
  }

  if (!user) {
    return <LoginForm />;
  }


  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Welcome KapyGenius the Boss ! User: {JSON.stringify(user)}</Text>
      <Button title="Sign out" onPress={signOut} />
    </View>
  );
}
