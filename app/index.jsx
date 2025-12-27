import API from "../config/axios";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import PostCard from "../components/postcard";

export default function Page() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getPosts() {
      try {
        //send request to API
        const response = await API.get("/post/");
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
      <Text style={{ fontSize: 30, textAlign: "center", marginTop: 20 }}>
        Loading Posts...
      </Text>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recent Posts💭</Text>
      <FlatList
        data={posts}
        keyExtractor={(post) => post._id}
        renderItem={({ item }) => <PostCard post={item} />}
      ></FlatList>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 17,
    paddingTop: 50,
  },

  title: {
    fontSize: 32,
    marginLeft: 8,
    fontWeight: "500",
    fontFamily: "sans-serif",
    marginBottom: 15,
  },
});
