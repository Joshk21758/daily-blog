import { useLocalSearchParams, useRouter } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { posts } from '../../data/posts';

export default function PostPage() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const post = posts.find((p) => p.id === Number(id));

  if (!post) {
    return <Text>Post not found</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{post.title}</Text>
      <Text style={styles.content}>{post.content}</Text>
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
    fontWeight: 'bold',
    marginBottom: 16,
  },
  content: {
    fontSize: 18,
  },
  link: {
    marginTop: 16,
    color: 'blue',
    textDecorationLine: 'underline',
  },
});
