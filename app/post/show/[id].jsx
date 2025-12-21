import axios from "axios";
import { API_BASE_URL } from "../../../config/api";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function PostPage({ route }) {
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = route.params;
  const router = useRouter();

  useEffect(() => {
    async function getPost() {
      try {
        //send request to express API
        const response = await axios.get(`${API_BASE_URL}/post/show/${id}`);
        setPost(response.data);
        setLoading(false);
      } catch (err) {
        alert("Failed to fetch the post", err);
        setLoading(false);
      }
    }
    getPost();
  }, [id]);

  if (loading) {
    return (
      <Text style={{ fontSize: 40, textAlign: "center" }}>
        Loading the Post...
      </Text>
    );
  }

  if (!post) {
    return (
      <Text style={{ fontSize: 40, textAlign: "center" }}>
        Post not found..
      </Text>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Post Title</Text>
      <Text style={styles.content}>Content</Text>
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
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  content: {
    fontSize: 18,
  },
  link: {
    marginTop: 16,
    color: "blue",
    textDecorationLine: "underline",
  },
});
