
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

export default function FeedbackPage() {
  const router = useRouter();
  const [feedback, setFeedback] = useState('');

  const handleSend = () => {
    // Implement your feedback logic here
    console.log('Sending feedback:', { feedback });
    router.push('/'); // Redirect to home page after sending feedback
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Feedback</Text>
      <TextInput
        style={styles.input}
        placeholder="Write your feedback here..."
        value={feedback}
        onChangeText={setFeedback}
        multiline
      />
      <Button title="Send" onPress={handleSend} />
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
  input: {
    height: 120,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    textAlignVertical: 'top',
  },
  link: {
    marginTop: 16,
    color: 'blue',
    textAlign: 'center',
  },
});
