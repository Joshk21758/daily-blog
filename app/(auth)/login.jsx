import { useRouter } from "expo-router";
import { useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../config/api";
import { MaterialIcons } from "@expo/vector-icons";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    //client-side validation
    if (!email || !password) {
      alert("Please enter a valid credentials");
      return;
    }

    setLoading(true);
    try {
      //send request to express API
      const response = await axios.post(`${API_BASE_URL}/user/login`, {
        email,
        password,
      });
      //check if successful
      if (response.status === 200) {
        alert("Logged in successfully");
        router.push("/post/create");
      } else {
        alert("Login failed");
      }
    } catch (err) {
      alert("Failed to Login", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <MaterialIcons name="account-box" size={83} color="black" />
      </View>
      <Text style={styles.title}>Login</Text>
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your Email"
        value={email}
        onChangeText={setEmail}
      />
      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity
        style={styles.loginButton}
        onPress={handleLogin}
        disabled={loading}
      >
        <Text style={styles.loginButtonText}>
          {loading ? "Signing in..." : "Sign In"}
        </Text>
      </TouchableOpacity>
      <Text style={styles.link} onPress={() => router.push("/(auth)/register")}>
        Dont have an account? Register
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
    paddingTop: 50,
  },
  title: {
    fontSize: 50,
    fontWeight: "bold",
    marginBottom: 30,
    marginTop: -40,
    textAlign: "center",
  },
  input: {
    height: 50,
    borderColor: "blue",
    borderWidth: 4,
    marginBottom: 15,
    borderRadius: 12,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    fontSize: 20,
    paddingHorizontal: 8,
  },

  link: {
    marginTop: 20,
    color: "blue",
    fontSize: 20,
    textAlign: "center",
    fontWeight: 500,
  },

  loginButton: {
    borderRadius: 12,
    height: 45,
    width: 280,
    marginLeft: 24,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 15,
    backgroundColor: "green",
  },

  loginButtonText: {
    color: "white",
    fontSize: 23,
    fontWeight: "700",
  },

  label: {
    fontSize: 18,
    fontWeight: 700,
    marginLeft: 12,
    marginTop: 10,
  },
  iconContainer: {
    marginLeft: 123,
    marginBottom: 60,
  },
  error: {
    color: "red",
    textAlign: "center",
    marginTop: 8,
    fontSize: 16,
  },
});
