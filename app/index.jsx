import axios from "axios";
import { API_BASE_URL } from "../config/api";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

export default function Page() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getPosts() {
      try {
        //send request to API
        const response = await axios.get(`${API_BASE_URL}/`);
        //express API must send an array of posts
        setPosts(response.data);
        setLoading(false);
      } catch (err) {
        alert("Failed to fetch the posts", err);
        setLoading(false);
      }
    }
    getPosts();
  }, []);

  if (loading) {
    return (
      <Text style={{ fontSize: 40, textAlign: "center" }}>
        Loading Posts...
      </Text>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <Link href={`/post/show/${item._id}`}>
            <View style={styles.postContainer}>
              <Text style={styles.postTitle}>{item.title}</Text>
              <Text style={styles.postTitle}>{item.content}</Text>
            </View>
          </Link>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  postContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  postTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
