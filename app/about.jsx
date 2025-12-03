
import { useRouter } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

export default function AboutPage() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>About Us</Text>
      <Text style={styles.content}>
        We are a community of developers creating universal apps.
      </Text>
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
