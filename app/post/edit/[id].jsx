import API from "../../../config/axios";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function PostPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [isPending, setIsPending] = useState(false);
  const { id } = useLocalSearchParams();

  useEffect(() => {
    async function fetchPost() {
      try {
        //send request to express API
        const response = await API.get(`/post/show/${id}`);
        setTitle(response.data.title);
        setContent(response.data.content);
      } catch (err) {
        alert("Failed to Load the Post to Edit", err);
      } finally {
        setLoading(false);
      }
    }
    //check if id is valid
    if (id) {
      fetchPost();
    }
  }, [id]);

  //Handle update form submission
  const handleUpdate = async () => {
    setIsPending(true);
    try {
      //create updated post data
      const updatePostData = { title, content };

      //send request to express API
      const response = await API.put(`/post/edit/${id}`, updatePostData);
      //check if response is successful
      if (response.status !== 200) {
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
      <Text style={{ fontSize: 30, textAlign: "center", marginTop: 40 }}>
        Loading the Post..
      </Text>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit your Post</Text>
      <Text style={styles.label}>Title</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter a title"
        value={title}
        onChangeText={setTitle}
      />
      <Text style={styles.label}>Content</Text>
      <TextInput
        style={styles.input2}
        placeholder="Write about something..."
        value={content}
        onChangeText={setContent}
        multiline
      />
      <TouchableOpacity
        style={styles.updateButton}
        onPress={handleUpdate}
        disabled={isPending}
      >
        <Text style={styles.buttonText}>
          {isPending ? "Updating post..." : "Save changes"}
        </Text>
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
  },
  title: {
    fontSize: 32,
    fontWeight: "600",
    marginBottom: 30,
    marginLeft: 9,
    color: "rgba(0, 0, 0, 1)",
    marginTop: 32,
  },
  input: {
    borderWidth: 3,
    borderColor: "rgba(7, 72, 170, 0.91)",
    borderRadius: 12,
    padding: 7,
    marginLeft: 8,
    marginRight: 8,
    marginBottom: 23,
    fontSize: 20,
  },
  input2: {
    borderWidth: 3,
    borderRadius: 12,
    padding: 7,
    marginLeft: 8,
    marginRight: 8,
    marginBottom: 23,
    fontSize: 20,
    height: 155,
  },
  link: {
    marginTop: 16,
    color: "blue",
    textDecorationLine: "underline",
    fontSize: 25,
    textAlign: "center",
    fontWeight: "500",
  },
  updateButton: {
    borderRadius: 12,
    height: 45,
    width: 280,
    marginLeft: 24,
    alignItems: "center",
    color: "white",
    fontSize: 20,
    paddingTop: 6,
    fontFamily: "sans-serif",
    fontWeight: 700,
    marginTop: 10,
    backgroundColor: "rgba(22, 82, 5, 0.93)",
    marginBottom: 15,
  },
  label: {
    fontSize: 18,
    fontWeight: 700,
    marginLeft: 10,
    marginBottom: 13,
  },

  buttonText: {
    color: "white",
    fontSize: 22,
    fontWeight: "500",
  },
});
