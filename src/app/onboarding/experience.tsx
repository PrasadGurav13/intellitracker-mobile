import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Check } from 'lucide-react-native';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { PrimaryButton } from '../../components/ui/PrimaryButton';
import { StepHeader } from '../../components/ui/StepHeader';

const levels = [
  { id: 'beginner', label: 'Beginner', desc: 'Less than 1 year of training', emoji: '🌱', color: '#22C55E' },
  { id: 'intermediate', label: 'Intermediate', desc: '1-3 years of consistent training', emoji: '🔥', color: '#4F46E5' },
  { id: 'advanced', label: 'Advanced', desc: '3+ years, serious lifter', emoji: '💪', color: '#F97316' },
  { id: 'athlete', label: 'Athlete', desc: 'Competitive or professional', emoji: '🏆', color: '#8B5CF6' },
];

export default function OnboardingExperience() {
  const router = useRouter();
  const [selected, setSelected] = useState('intermediate');

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <StepHeader
          step={4}
          total={5}
          title="Experience level?"
          subtitle="We'll tailor workout intensity and rest times."
          onBack={() => router.back()}
        />

        <ScrollView contentContainerStyle={styles.content} bounces={false}>
          {levels.map(l => {
            const isSelected = selected === l.id;
            return (
              <TouchableOpacity
                key={l.id}
                activeOpacity={0.8}
                onPress={() => setSelected(l.id)}
                style={[
                  styles.card,
                  {
                    borderColor: isSelected ? l.color : 'rgba(248,250,252,0.08)',
                    backgroundColor: isSelected ? `${l.color}14` : '#1E293B',
                  }
                ]}
              >
                <View style={[styles.emojiBox, { backgroundColor: `${l.color}20` }]}>
                  <Text style={styles.emojiText}>{l.emoji}</Text>
                </View>

                <View style={styles.textContainer}>
                  <Text style={styles.label}>{l.label}</Text>
                  <Text style={styles.desc}>{l.desc}</Text>
                </View>

                <View style={[
                  styles.checkCircle,
                  isSelected ? { backgroundColor: l.color, borderColor: l.color } : null
                ]}>
                  {isSelected && <Check size={14} color="#FFF" strokeWidth={3} />}
                </View>
              </TouchableOpacity>
            )
          })}
        </ScrollView>

        <View style={styles.footer}>
          <PrimaryButton label="Continue" onPress={() => router.push('/onboarding/goals')} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#0F172A' },
  container: { flex: 1, paddingTop: 20 },
  content: { paddingHorizontal: 24, paddingVertical: 16, gap: 12 },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1.5,
  },
  emojiBox: {
    width: 48, height: 48, borderRadius: 14,
    alignItems: 'center', justifyContent: 'center',
    marginRight: 16,
  },
  emojiText: {
    fontSize: 22,
  },
  textContainer: {
    flex: 1,
  },
  label: {
    fontSize: 16, fontWeight: '700', color: '#F8FAFC', marginBottom: 2,
  },
  desc: {
    fontSize: 13, color: '#94A3B8',
  },
  checkCircle: {
    width: 22, height: 22, borderRadius: 11,
    borderWidth: 2, borderColor: 'rgba(248,250,252,0.08)',
    alignItems: 'center', justifyContent: 'center',
    marginLeft: 16,
  },
  footer: { padding: 24, paddingBottom: 50 },
});
