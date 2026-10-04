import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function OnboardingStart() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Onboarding Step 1 (e.g. Basic Info)</Text>
      <TouchableOpacity style={styles.button} onPress={() => router.push('/onboarding/weight')}>
        <Text style={styles.buttonText}>Next Step -> Weight</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0F172A', alignItems: 'center', justifyContent: 'center', padding: 24, gap: 16 },
  title: { color: '#FFF', fontSize: 24, fontWeight: 'bold', marginBottom: 24 },
  button: { backgroundColor: '#4F46E5', padding: 16, borderRadius: 12, width: '100%', alignItems: 'center' },
  buttonText: { color: '#FFF', fontWeight: 'bold' }
});
