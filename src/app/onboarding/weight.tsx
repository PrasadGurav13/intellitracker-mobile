import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function OnboardingWeight() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Onboarding Step 2 (Weight)</Text>
      <TouchableOpacity style={styles.button} onPress={() => router.push('/onboarding/experience')}>
        <Text style={styles.buttonText}>Next Step -> Experience</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.secondaryButton} onPress={() => router.back()}>
        <Text style={styles.secondaryText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0F172A', alignItems: 'center', justifyContent: 'center', padding: 24, gap: 16 },
  title: { color: '#FFF', fontSize: 24, fontWeight: 'bold', marginBottom: 24 },
  button: { backgroundColor: '#4F46E5', padding: 16, borderRadius: 12, width: '100%', alignItems: 'center' },
  buttonText: { color: '#FFF', fontWeight: 'bold' },
  secondaryButton: { padding: 16 },
  secondaryText: { color: '#94A3B8' }
});
