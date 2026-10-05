import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NumberSelector } from '../../components/ui/NumberSelector';
import { PrimaryButton } from '../../components/ui/PrimaryButton';
import { StepHeader } from '../../components/ui/StepHeader';

export default function OnboardingHeight() {
  const router = useRouter();
  const [cm, setCm] = useState(178);
  const [unit, setUnit] = useState<'cm' | 'ft'>('cm');

  const feetVal = `${Math.floor(cm / 30.48)}'${Math.round((cm % 30.48) / 2.54)}"`;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <StepHeader
          step={2}
          total={5}
          title="What's your height?"
          subtitle="Used for BMI and body measurements."
          onBack={() => router.back()}
        />

        <View style={styles.content}>
          <View style={styles.toggleContainer}>
            <TouchableOpacity
              style={[styles.toggleBtn, unit === 'cm' && styles.toggleActive]}
              onPress={() => setUnit('cm')}
            >
              <Text style={[styles.toggleText, unit === 'cm' && styles.toggleTextActive]}>cm</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.toggleBtn, unit === 'ft' && styles.toggleActive]}
              onPress={() => setUnit('ft')}
            >
              <Text style={[styles.toggleText, unit === 'ft' && styles.toggleTextActive]}>ft</Text>
            </TouchableOpacity>
          </View>

          <NumberSelector
            value={cm}
            onChange={setCm}
            min={1} max={300}
            unit={unit === 'cm' ? 'cm' : feetVal}
          />
        </View>

        <View style={styles.footer}>
          <PrimaryButton label="Continue" onPress={() => router.push('/onboarding/weight')} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#0F172A' },
  container: { flex: 1, paddingTop: 20 },
  content: { flex: 1, paddingHorizontal: 24 },
  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: '#263348',
    borderRadius: 12,
    padding: 4,
    marginTop: 20,
    marginBottom: 8,
  },
  toggleBtn: {
    flex: 1,
    height: 36,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  toggleActive: {
    backgroundColor: '#4F46E5',
  },
  toggleText: {
    color: '#94A3B8',
    fontWeight: '600',
    fontSize: 14,
  },
  toggleTextActive: {
    color: '#FFF',
  },
  footer: { padding: 24, paddingBottom: 50 },
});
