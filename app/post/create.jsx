import { useRouter } from "expo-router";
import { API_BASE_URL } from "../../config/api";
import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import axios from "axios";

export default function CreatePostPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isPending, setIsPending] = useState(true);

  const handleCreatePost = async () => {
    //client-side validation
    if (!title || !content) {
      alert("Please fill in all fields");
    }
    setIsPending(true);
    try {
      //send request to express API
      //create post data
      const newPostData = { title, content };
      const response = await axios.post(
        `${API_BASE_URL}/post/create`,
        newPostData
      );
      //check if response is successfull
      if (!response.status === 200) {
        alert("Failed to Create the Post");
      }

      //navigate to home page
      alert("Post created...");
      router.push("/");
    } catch (err) {
      alert("Failed to create post", err);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <MaterialIcons name="create" size={83} color="black" />
      </View>
      <Text style={styles.title}>Create a Post</Text>
      <Text style={styles.label}>Title</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter a title"
        value={title}
        onChangeText={setTitle}
      />
      <Text style={styles.label}>Content</Text>
      <TextInput
        style={styles.input}
        placeholder="Write about something..."
        value={content}
        onChangeText={setContent}
        multiline
      />
      <TouchableOpacity
        style={styles.createButton}
        onPress={handleCreatePost}
        disabled={isPending}
      >
        {isPending ? "Posting..." : "Upload a Post"}
      </TouchableOpacity>
      <Text style={styles.link} onPress={() => router.back()}>
        Cancel
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 60,
  },
  title: {
    fontSize: 42,
    fontWeight: 700,
    fontFamily: "sans-serif",
    marginBottom: 40,
    marginTop: 30,
    marginLeft: 30,
  },
  input: {
    borderWidth: 3,
    borderColor: "#0441e8ff",
    borderRadius: 12,
    padding: 7,
    marginLeft: 8,
    marginRight: 8,
    marginBottom: 23,
    fontSize: 20,
  },
  link: {
    marginTop: 16,
    color: "blue",
    textDecorationLine: "underline",
    fontSize: 25,
    textAlign: "center",
  },
  createButton: {
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
  label: {
    fontSize: 18,
    fontWeight: 700,
    marginLeft: 10,
    marginBottom: 13,
  },
  iconContainer: {
    marginLeft: 123,
    marginBottom: -10,
  },
});
