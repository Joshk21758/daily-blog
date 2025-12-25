import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function PostCard({ post }) {
  return (
    <View style={styles.postContainer}>
      <Text style={styles.postDate}>
        {new Date(post.createdAt).toLocaleString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })}
      </Text>
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
    backgroundColor: "#030b36ff",
    borderRadius: 15,
    boxShadow: "0 4px 4px rgba(0, 0, 0, 0.1)",
    paddingBottom: 15,
    paddingLeft: 13,
    paddingTop: 10,
  },
  postTitle: {
    fontSize: 30,
    fontWeight: "700",
    color: "white",
    marginBottom: -32,
  },
  postContent: {
    fontSize: 22,
    fontWeight: "500",
    color: "white",
  },
  infoText: {
    fontSize: 22,
    textAlign: "center",
    color: "#24ee0eff",
  },
  postDate: {
    fontSize: 19,
    color: "white",
    marginBottom: -45,
  },
});
