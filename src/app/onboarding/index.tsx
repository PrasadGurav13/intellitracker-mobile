import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NumberSelector } from '../../components/ui/NumberSelector';
import { PrimaryButton } from '../../components/ui/PrimaryButton';
import { StepHeader } from '../../components/ui/StepHeader';

export default function OnboardingAge() {
  const router = useRouter();
  const [age, setAge] = useState(27);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <StepHeader
          step={1}
          total={5}
          title="How old are you?"
          subtitle="We'll personalize your training plan based on your age."
          onBack={() => router.push('/auth/register')}
        />

        <View style={styles.content}>
          <NumberSelector value={age} onChange={setAge} min={5} max={120} unit="years old" />

          <View style={styles.infoBox}>
            <Text style={styles.infoText}>
              💡 Age helps us calculate safe training intensity and recovery recommendations for your workouts.
            </Text>
          </View>
        </View>

        <View style={styles.footer}>
          <PrimaryButton label="Continue" onPress={() => router.push('/onboarding/height')} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#0F172A' },
  container: { flex: 1, paddingTop: 20 },
  content: { flex: 1, paddingHorizontal: 24, paddingTop: 24 },
  infoBox: {
    marginTop: 40,
    padding: 16,
    borderRadius: 14,
    backgroundColor: 'rgba(79,70,229,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(79,70,229,0.15)',
  },
  infoText: {
    color: '#94A3B8',
    fontSize: 13,
    lineHeight: 20,
  },
  footer: { padding: 24, paddingBottom: 50 },
});
