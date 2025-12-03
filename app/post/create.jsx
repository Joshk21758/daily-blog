import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

import { addPost } from '../../data/posts';

export default function CreatePostPage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleCreatePost = () => {
    const newPost = {
      id: Date.now(),
      title,
      content,
    };
    addPost(newPost);
    router.push(`/post/${newPost.id}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create a New Post</Text>
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Content"
        value={content}
        onChangeText={setContent}
        multiline
      />
      <Button title="Create Post" onPress={handleCreatePost} />
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
    fontSize: 16,
  },
  link: {
    marginTop: 16,
    color: 'blue',
    textDecorationLine: 'underline',
    textAlign: 'center',
  },
});
