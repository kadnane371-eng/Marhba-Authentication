import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useAuthStore } from "@/store/authStore";
import { authApi } from "@/services/api";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const login = useAuthStore((state) => state.login);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert("Erreur", "Veuillez remplir votre email et votre mot de passe.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await authApi.login({ email, password });
      login(response.data.token, response.data.user);
      router.replace("/home");
    } catch (error: any) {
      const message = error?.response?.data?.message || "Connexion impossible.";
      Alert.alert("Erreur", message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <Ionicons name="leaf" size={32} color="#16A34A" />
      </View>

      <Text style={styles.title}>Bon retour parmi nous</Text>
      <Text style={styles.subtitle}>Connectez-vous pour continuer</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#999"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Mot de passe"
          placeholderTextColor="#999"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <Ionicons name="eye-off-outline" size={22} color="#888" />
      </View>

      <Pressable style={[styles.button, isSubmitting && styles.buttonDisabled]} onPress={handleLogin} disabled={isSubmitting}>
        <Text style={styles.buttonText}>{isSubmitting ? "Connexion..." : "Se connecter"}</Text>
      </Pressable>

    
      <View style={styles.footer}>
        
        <Pressable onPress={() => router.push("/register")}>
          <Text style={styles.link}>S'inscrire</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FAF2",
    justifyContent: "center",
    paddingHorizontal: 25,
  },

  logo: {
    width: 80,
    height: 80,
    borderRadius: 20,
    backgroundColor: "#fff",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    textAlign: "center",
    color: "#1E293B",
  },

  subtitle: {
    textAlign: "center",
    color: "#666",
    marginTop: 8,
    marginBottom: 30,
  },

  input: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 15,
    marginBottom: 15,
  },

  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 14,
    paddingHorizontal: 15,
    marginBottom: 20,
  },

  passwordInput: {
    flex: 1,
    paddingVertical: 15,
  },

  button: {
    backgroundColor: "#16A34A",
    padding: 16,
    borderRadius: 30,
    alignItems: "center",
  },

  buttonDisabled: {
    opacity: 0.7,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },


  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 30,
    gap: 5,
  },

  link: {
    color: "#16A34A",
    fontWeight: "700",
  },
});