import { View, Text, Pressable, StyleSheet } from "react-native";
import { useAuthStore } from "@/store/authStore";
import { router } from "expo-router";

export default function HomeScreen() {
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    router.replace("/login");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Marhba 👋</Text>
      <Text style={styles.welcome}>Bienvenue, {user?.fullName}</Text>
      <Text style={styles.email}>{user?.email}</Text>

      <Pressable style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Déconnexion</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FAF2",
    justifyContent: "center",
    alignItems: "center",
    padding: 25,
  },

  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#16A34A",
    marginBottom: 20,
  },

  welcome: {
    fontSize: 22,
    fontWeight: "600",
    color: "#1E293B",
  },

  email: {
    color: "#666",
    marginTop: 8,
    marginBottom: 30,
  },

  button: {
    backgroundColor: "#16A34A",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "700",
  },
});