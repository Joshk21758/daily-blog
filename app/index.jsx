import { Link } from 'expo-router';
import { FlatList, StyleSheet, Text, View } from 'react-native';

import { posts } from '../data/posts';

export default function Page() {
  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Link href={`/post/${item.id}`}>
            <View style={styles.postContainer}>
              <Text style={styles.postTitle}>{item.title}</Text>
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
    borderBottomColor: '#ccc',
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
