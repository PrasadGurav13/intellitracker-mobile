import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Plus, Check } from 'lucide-react-native';
import { useRouter } from 'expo-router';

const goals = [
  { id: "1", name: "Bench Press 100kg", type: "Strength PR", progress: 85, current: 85, target: 100, unit: "kg", color: "#4F46E5", daysLeft: 45, status: "on-track", emoji: "🦍", exercise: "Bench Press" },
  { id: "2", name: "20 Workouts / Month", type: "Frequency", progress: 65, current: 13, target: 20, unit: "sessions", color: "#22C55E", daysLeft: 20, status: "on-track", emoji: "📅", exercise: null },
  { id: "3", name: "Squat 160kg", type: "Strength PR", progress: 88, current: 145, target: 160, unit: "kg", color: "#8B5CF6", daysLeft: 7, status: "at-risk", emoji: "🦵", exercise: "Squat" },
  { id: "4", name: "Lose 5kg Bodyweight", type: "Body Weight", progress: 60, current: 82, target: 80, unit: "kg", color: "#F97316", daysLeft: 45, status: "on-track", emoji: "⚖️", exercise: null },
  { id: "5", name: "Deadlift 200kg", type: "Strength PR", progress: 100, current: 200, target: 200, unit: "kg", color: "#22C55E", daysLeft: 0, status: "completed", emoji: "🏆", exercise: "Deadlift" },
];

const statusColor = { "on-track": "#22C55E", "at-risk": "#F97316", "completed": "#4F46E5" };
const statusLabel = { "on-track": "On Track", "at-risk": "At Risk", "completed": "Completed" };

export default function GoalsScreen() {
  const router = useRouter();
  const completed = goals.filter(g => g.status === "completed").length;
  const active = goals.filter(g => g.status !== "completed").length;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Goals</Text>
          <TouchableOpacity style={styles.newGoalBtn} onPress={() => router.push('/goals/create')}>
            <Plus size={16} color="#FFF" />
            <Text style={styles.newGoalBtnText}>New Goal</Text>
          </TouchableOpacity>
        </View>

        {/* Summary */}
        <View style={styles.summaryGrid}>
          {[
            { label: "Active", value: String(active), color: "#4F46E5" },
            { label: "Completed", value: String(completed), color: "#22C55E" },
            { label: "Completion", value: "80%", color: "#F97316" },
          ].map(s => (
            <View key={s.label} style={styles.summaryCard}>
              <Text style={[styles.summaryValue, { color: s.color }]}>{s.value}</Text>
              <Text style={styles.summaryLabel}>{s.label}</Text>
            </View>
          ))}
        </View>

        {/* Active goals */}
        <Text style={styles.sectionTitle}>Active Goals</Text>
        <View style={styles.listContainer}>
          {goals.filter(g => g.status !== "completed").map(goal => (
            <TouchableOpacity key={goal.id} style={styles.activeGoalCard} onPress={() => router.push(`/goals/${goal.id}`)}>
              <View style={styles.goalCardHeader}>
                <View style={[styles.emojiBox, { backgroundColor: `${goal.color}20` }]}>
                  <Text style={styles.emojiText}>{goal.emoji}</Text>
                </View>
                <View style={styles.goalInfo}>
                  <Text style={styles.goalName}>{goal.name}</Text>
                  <View style={styles.goalTypeRow}>
                    <Text style={styles.goalType}>{goal.type}</Text>
                    <View style={styles.dot} />
                    <Text style={[styles.goalStatus, { color: statusColor[goal.status as keyof typeof statusColor] }]}>
                      {statusLabel[goal.status as keyof typeof statusLabel]}
                    </Text>
                  </View>
                </View>
                <View style={styles.goalProgressInfo}>
                  <Text style={[styles.progressPercent, { color: goal.color }]}>{goal.progress}%</Text>
                  {goal.daysLeft > 0 && <Text style={styles.daysLeft}>{goal.daysLeft}d left</Text>}
                </View>
              </View>

              {/* Progress bar */}
              <View style={styles.progressBarTrack}>
                <View style={[styles.progressBarFill, { width: `${goal.progress}%`, backgroundColor: goal.color }]} />
              </View>
              <View style={styles.progressLabels}>
                <Text style={styles.progressLabelText}>Current: {goal.current} {goal.unit}</Text>
                <Text style={styles.progressLabelText}>Target: {goal.target} {goal.unit}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Completed goals */}
        <Text style={[styles.sectionTitle, { marginTop: 20 }]}>Completed 🏆</Text>
        <View style={styles.listContainer}>
          {goals.filter(g => g.status === "completed").map(goal => (
            <View key={goal.id} style={styles.completedCard}>
              <View style={[styles.completedEmojiBox, { backgroundColor: `${statusColor.completed}20` }]}>
                <Text style={styles.emojiText}>{goal.emoji}</Text>
              </View>
              <View style={styles.completedInfo}>
                <Text style={styles.goalName}>{goal.name}</Text>
                <Text style={[styles.goalType, { color: statusColor.completed }]}>{goal.type} • Achieved!</Text>
              </View>
              <View style={[styles.checkCircle, { backgroundColor: `${statusColor.completed}20` }]}>
                <Check size={16} color={statusColor.completed} strokeWidth={3} />
              </View>
            </View>
          ))}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0F172A' },
  scrollContent: { paddingBottom: 100 },
  
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 24, paddingTop: 12, paddingBottom: 20
  },
  headerTitle: { fontSize: 28, fontWeight: '800', color: '#F8FAFC', letterSpacing: -0.5 },
  newGoalBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    backgroundColor: '#4F46E5', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 12
  },
  newGoalBtnText: { color: '#FFF', fontSize: 14, fontWeight: '600' },

  summaryGrid: {
    flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 24, marginBottom: 24, gap: 10
  },
  summaryCard: {
    flex: 1, paddingVertical: 14, paddingHorizontal: 10, borderRadius: 16,
    backgroundColor: '#1E293B', borderWidth: 1.5, borderColor: 'rgba(248,250,252,0.08)',
    alignItems: 'center'
  },
  summaryValue: { fontSize: 22, fontWeight: '800' },
  summaryLabel: { fontSize: 11, color: '#94A3B8', marginTop: 2 },

  sectionTitle: { fontSize: 16, fontWeight: '700', color: '#F8FAFC', marginHorizontal: 24, marginBottom: 12 },
  
  listContainer: { paddingHorizontal: 24, gap: 12 },
  
  activeGoalCard: {
    padding: 16, borderRadius: 18, backgroundColor: '#1E293B',
    borderWidth: 1.5, borderColor: 'rgba(248,250,252,0.08)'
  },
  goalCardHeader: { flexDirection: 'row', alignItems: 'flex-start', gap: 12, marginBottom: 12 },
  emojiBox: {
    width: 44, height: 44, borderRadius: 14,
    alignItems: 'center', justifyContent: 'center'
  },
  emojiText: { fontSize: 20 },
  goalInfo: { flex: 1 },
  goalName: { fontSize: 15, fontWeight: '700', color: '#F8FAFC', marginBottom: 3 },
  goalTypeRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  goalType: { fontSize: 11, color: '#94A3B8' },
  dot: { width: 3, height: 3, borderRadius: 1.5, backgroundColor: '#94A3B8' },
  goalStatus: { fontSize: 11, fontWeight: '600' },
  
  goalProgressInfo: { alignItems: 'flex-end' },
  progressPercent: { fontSize: 18, fontWeight: '800' },
  daysLeft: { fontSize: 11, color: '#94A3B8' },

  progressBarTrack: { height: 8, borderRadius: 4, backgroundColor: '#334155', overflow: 'hidden' },
  progressBarFill: { height: '100%', borderRadius: 4 },
  progressLabels: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 6 },
  progressLabelText: { fontSize: 11, color: '#94A3B8' },

  completedCard: {
    flexDirection: 'row', alignItems: 'center', gap: 12, padding: 14,
    borderRadius: 16, backgroundColor: '#1E293B',
    borderWidth: 1.5, borderColor: 'rgba(248,250,252,0.08)', marginBottom: 10
  },
  completedEmojiBox: {
    width: 40, height: 40, borderRadius: 12,
    alignItems: 'center', justifyContent: 'center'
  },
  completedInfo: { flex: 1 },
  checkCircle: {
    width: 28, height: 28, borderRadius: 8,
    alignItems: 'center', justifyContent: 'center'
  }
});
