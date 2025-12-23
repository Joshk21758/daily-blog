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

export default function RegisterPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    //client-side validation
    if (!username || !email || !password) {
      alert("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      //Send request to express API
      const response = await axios.post(`${API_BASE_URL}/user/register`, {
        username,
        email,
        password,
      });

      //check if response successful
      if (response.status === 200) {
        //navigate to Home page
        alert("Successfully registered...");
        router.push("/post/create");
      } else {
        alert("Registration failed");
      }
    } catch (err) {
      alert("Failed to register", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <MaterialIcons name="account-circle" size={85} color="black" />
      </View>
      <Text style={styles.title}>Sign Up</Text>
      <Text style={styles.label}>Full names</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your Name"
        value={username}
        onChangeText={setUsername}
      />
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
        style={styles.regButton}
        onPress={handleRegister}
        disabled={loading}
      >
        <Text style={styles.regButtonText}>
          {loading ? "Signing up..." : "Create an Account"}
        </Text>
      </TouchableOpacity>
      <Text style={styles.link} onPress={() => router.push("/(auth)/login")}>
        Already have an account? Login
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 17,
    paddingTop: 20,
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 25,
    marginTop: -30,
    textAlign: "center",
  },
  input: {
    height: 48,
    borderColor: "blue",
    borderWidth: 4,
    borderRadius: 12,
    marginBottom: 20,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    fontSize: 20,
    paddingHorizontal: 8,
  },
  link: {
    marginTop: 30,
    color: "blue",
    textAlign: "center",
    fontSize: 20,
    fontWeight: 500,
  },
  regButton: {
    borderRadius: 12,
    height: 45,
    width: 280,
    marginLeft: 24,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    backgroundColor: "green",
  },

  regButtonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "700",
  },

  label: {
    fontSize: 18,
    fontWeight: 700,
    marginLeft: 12,
  },

  iconContainer: {
    marginLeft: 128,
    marginBottom: 30,
  },
  error: {
    color: "red",
    textAlign: "center",
    marginTop: 12,
    fontSize: 16,
  },
});
