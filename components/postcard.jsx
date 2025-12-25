import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function PostCard({ post }) {
  return (
    <View style={styles.postContainer}>
      <Text style={styles.postDate}>{post.createdAt}</Text>
      <Text style={styles.postTitle}>{post.title}</Text>
      <Text style={styles.postContent}>{post.content}</Text>
      <Link href={`/post/show/${post._id}`}>
        <Text style={styles.infoText}>Read More</Text>
      </Link>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 17,
    paddingTop: 50,
  },

  postContainer: {
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: 5,
    height: 250,
    width: 325,
    borderColor: "black",
    borderWidth: 4,
    backgroundColor: "#030b36ff",
    borderRadius: 15,
  },
  postTitle: {
    fontSize: 30,
    fontWeight: "700",
    marginTop: -35,
    marginBottom: -28,
    color: "white,",
  },
  postContent: {
    fontSize: 22,
    fontWeight: "500",
    color: "white,",
  },
  infoText: {
    fontSize: 22,
    textAlign: "center",
    color: "green",
  },
});
