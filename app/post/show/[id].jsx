import axios from "axios";
import { API_BASE_URL } from "../../../config/api";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import PostCard from "../../../components/postcard";

export default function PostPage() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useLocalSearchParams();
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
      } finally {
        setLoading(false);
      }
    }
    //check if id is valid
    if (id) {
      getPost();
    }
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
      <PostCard post={post} />
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
    fontWeight: "600",
    marginBottom: 16,
  },
  content: {
    fontSize: 18,
  },
  link: {
    marginTop: 16,
    color: "blue",
    textDecorationLine: "underline",
    fontSize: 20,
    marginLeft: 10,
    fontWeight: "500",
  },
});
