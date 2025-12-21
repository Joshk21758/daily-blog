import { useRouter } from "expo-router";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function FeedbackPage() {
  const router = useRouter();
  const [feedback, setFeedback] = useState("");

  const handleSend = () => {
    // Implement your feedback logic here
    console.log("Sending feedback:", { feedback });
    router.push("/"); // Redirect to home page after sending feedback
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Feedback</Text>
      <TextInput
        style={styles.input}
        placeholder="Write your Feedback here..."
        value={feedback}
        onChangeText={setFeedback}
        multiline
      />
      <TouchableOpacity style={styles.button} onPress={handleSend}>
        Send feedback
      </TouchableOpacity>
      <Text style={styles.link} onPress={() => router.back()}>
        Go back
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 47,
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: 45,
  },
  input: {
    height: 120,
    borderColor: "black",
    borderWidth: 2,
    marginBottom: 30,
    marginTop: 15,
    borderRadius: 12,
    fontSize: 18,
    paddingHorizontal: 8,
    textAlignVertical: "top",
  },
  link: {
    marginTop: 20,
    color: "blue",
    fontSize: 20,
    textAlign: "center",
  },

  button: {
    borderRadius: 12,
    height: 45,
    width: 280,
    marginLeft: 24,
    alignItems: "center",
    color: "white",
    fontSize: 20,
    paddingTop: 10,
    fontFamily: "sans-serif",
    fontWeight: 700,
    marginTop: 10,
    backgroundColor: "green",
  },
});
