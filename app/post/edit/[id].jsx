import axios from "axios";
import { API_BASE_URL } from "../../../config/api";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function PostPage({ route }) {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [isPending, setIsPending] = useState(false);
  const { id } = route.params;

  useEffect(() => {
    async function fetchPost() {
      try {
        //send request to express API
        const response = await axios.get(`${API_BASE_URL}/post/show/${id}`);
        setTitle(response.data.title);
        setContent(response.data.content);
      } catch (err) {
        alert("Failed to Load the Post to Edit", err);
      } finally {
        setLoading(false);
      }
    }
    fetchPost();
  }, [id]);

  //Handle update form submission
  const handleUpdate = async () => {
    setIsPending(true);
    try {
      //create updated post data
      const updatePostData = { title, content };

      //send request to express API
      const response = await axios.post(
        `${API_BASE_URL}/post/edit/${id}`,
        updatePostData
      );
      //check if response is successful
      if (!response.status === 200) {
        alert("Failed to Update the Post");
      }
      //navigate to Home page
      alert("Updated the post successfully");
      router.push("/");
    } catch (err) {
      alert("Failed to edit the post", err);
    } finally {
      setIsPending(false);
    }
  };

  if (loading) {
    return (
      <Text style={{ fontSize: 40, textAlign: "center" }}>
        Loading the Post..
      </Text>
    );
  }

  if (isPending) {
    return (
      <Text style={{ fontSize: 40, textAlign: "center" }}>
        Updating the post..
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
