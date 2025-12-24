import axios from "axios";
import { API_BASE_URL } from "../config/api";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getPosts() {
      try {
        //send request to API
        const response = await axios.get(`${API_BASE_URL}/post/`);
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
      <Text style={{ fontSize: 32, textAlign: "center" }}>
        Loading Posts...
      </Text>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(post) => post._id}
        renderItem={({ item: post }) => (
          <View style={styles.postContainer}>
            <Text style={styles.postTitle}>{post.title}</Text>
            <Link href={`/post/show/${post._id}`}>
              <Text>Read More</Text>
            </Link>
          </View>
        )}
      />
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
});
