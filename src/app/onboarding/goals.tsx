import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Check } from 'lucide-react-native';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { PrimaryButton } from '../../components/ui/PrimaryButton';
import { StepHeader } from '../../components/ui/StepHeader';

const goalsList = [
  { id: 'strength', label: 'Build Strength', emoji: '🏋️‍♂️', color: '#4F46E5' },
  { id: 'muscle', label: 'Gain Muscle', emoji: '🔥', color: '#8B5CF6' },
  { id: 'weight-loss', label: 'Lose Weight', emoji: '📉', color: '#F97316' },
  { id: 'endurance', label: 'Endurance', emoji: '🏃', color: '#22C55E' },
  { id: 'flexibility', label: 'Flexibility', emoji: '🧘', color: '#06B6D4' },
  { id: 'general', label: 'Stay Active', emoji: '🏆', color: '#F59E0B' },
];

export default function OnboardingGoals() {
  const router = useRouter();
  const [selected, setSelected] = useState<string[]>(['strength']);

  const toggle = (id: string) => {
    setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <StepHeader
          step={5}
          total={5}
          title="Your fitness goals?"
          subtitle="Select all that apply. You can change these anytime."
          onBack={() => router.back()}
        />

        <ScrollView contentContainerStyle={styles.content} bounces={false}>
          <View style={styles.grid}>
            {goalsList.map(goal => {
              const isSelected = selected.includes(goal.id);
              return (
                <TouchableOpacity
                  key={goal.id}
                  activeOpacity={0.8}
                  onPress={() => toggle(goal.id)}
                  style={[
                    styles.card,
                    {
                      borderColor: isSelected ? goal.color : 'rgba(248,250,252,0.08)',
                      backgroundColor: isSelected ? `${goal.color}14` : '#1E293B',
                    }
                  ]}
                >
                  <Text style={styles.emojiText}>{goal.emoji}</Text>
                  <Text style={styles.label}>{goal.label}</Text>

                  {isSelected && (
                    <View style={[styles.checkCircle, { backgroundColor: goal.color }]}>
                      <Check size={12} color="#FFF" strokeWidth={3} />
                    </View>
                  )}
                </TouchableOpacity>
              )
            })}
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <PrimaryButton
            label="Let's Go! 🚀"
            onPress={() => router.push('/(tabs)/dashboard')}
            disabled={selected.length === 0}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#0F172A' },
  container: { flex: 1, paddingTop: 20 },
  content: { paddingHorizontal: 24, paddingVertical: 16 },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  card: {
    width: '48%', // Approx half minus gap
    alignItems: 'center',
    padding: 20,
    borderRadius: 18,
    borderWidth: 1.5,
    marginBottom: 4,
  },
  emojiText: {
    fontSize: 32,
    marginBottom: 8,
  },
  label: {
    fontSize: 14, fontWeight: '700', color: '#F8FAFC',
  },
  checkCircle: {
    position: 'absolute',
    bottom: 12, // or near the label
    // Wait, the design has it under the label. 
    // Let's just put it below the label.
    marginTop: 8,
    width: 20, height: 20, borderRadius: 10,
    alignItems: 'center', justifyContent: 'center',
  },
  footer: { padding: 24, paddingBottom: 50 },
});
