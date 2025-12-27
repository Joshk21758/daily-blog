import API from "../../../config/axios";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";
import PostCard from "../../../components/postcard";
import { MaterialIcons } from "@expo/vector-icons";

export default function PostPage() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useLocalSearchParams();
  const router = useRouter();

  useEffect(() => {
    async function getPost() {
      try {
        //send request to express API
        const response = await API.get(`/post/show/${id}`);
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

  //handle delete submission
  const handleDelete = async () => {
    try {
      //Send request to Express API
      const response = await API.delete(`/post/show/${id}`);
      if (response.status !== 200) {
        alert("Failed to Delete the post..");
      }
      alert("Post deleted successfully..");
      router.push("/post/create");
    } catch (err) {
      alert("Failed to delete post!", err);
    }
  };

  if (loading) {
    return (
      <Text
        style={{
          fontSize: 35,
          textAlign: "center",
          marginTop: 40,
          fontWeight: "500",
        }}
      >
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
      <Text style={styles.title}>Post Details</Text>
      <PostCard post={post} />
      <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
        <View>
          <MaterialIcons name="delete-outline" size={33} color="white" />
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.editButton}
        onPress={() => router.push(`/post/edit/${id}`)}
      >
        <MaterialIcons name="edit-note" size={33} color="white" />
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
    paddingTop: 50,
  },
  title: {
    fontSize: 30,
    marginLeft: 8,
    fontWeight: "500",
    fontFamily: "sans-serif",
    marginBottom: 15,
  },
  content: {
    fontSize: 18,
  },
  link: {
    marginTop: 60,
    color: "blue",
    textDecorationLine: "underline",
    fontSize: 25,
    textAlign: "center",
    fontWeight: "500",
  },
  buttonText: {
    color: "white",
    fontSize: 25,
    fontWeight: "700",
  },
  editButton: {
    borderRadius: 12,
    width: 40,
    height: 42,
    marginLeft: 90,
    marginTop: -92,
    backgroundColor: "rgba(0, 0, 0, 0.97)",
  },

  deleteButton: {
    borderRadius: 12,
    height: 40,
    width: 38,
    marginLeft: 15,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 50,
    backgroundColor: "rgba(0, 0, 0, 0.97)",
  },
});
