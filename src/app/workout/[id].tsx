import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, MoreHorizontal } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter, useLocalSearchParams } from 'expo-router';

const detailExercises = [
  {
    name: "Bench Press", sets: [
      { set: 1, weight: 80, reps: 10, done: true },
      { set: 2, weight: 90, reps: 8, done: true },
      { set: 3, weight: 100, reps: 6, done: true },
      { set: 4, weight: 100, reps: 5, done: true },
    ]
  },
  {
    name: "Incline DB Press", sets: [
      { set: 1, weight: 32, reps: 12, done: true },
      { set: 2, weight: 36, reps: 10, done: true },
      { set: 3, weight: 36, reps: 9, done: true },
    ]
  },
  {
    name: "Cable Fly", sets: [
      { set: 1, weight: 20, reps: 15, done: true },
      { set: 2, weight: 22, reps: 12, done: true },
      { set: 3, weight: 22, reps: 11, done: true },
    ]
  },
  {
    name: "Tricep Pushdown", sets: [
      { set: 1, weight: 35, reps: 14, done: true },
      { set: 2, weight: 40, reps: 12, done: true },
      { set: 3, weight: 40, reps: 10, done: true },
    ]
  },
];

export default function WorkoutDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  
  const totalSets = detailExercises.reduce((a, e) => a + e.sets.length, 0);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Header Background Gradient */}
        <LinearGradient
          colors={['rgba(79,70,229,0.15)', 'transparent']}
          style={styles.headerGradient}
        >
          <SafeAreaView edges={['top']} />
          
          <View style={styles.headerTop}>
            <TouchableOpacity onPress={() => router.back()} style={styles.iconBtn}>
              <ChevronLeft size={24} color="#94A3B8" />
            </TouchableOpacity>
            
            <View style={styles.headerTitleBox}>
              <Text style={styles.headerTitle}>Upper Body Push</Text>
              <Text style={styles.headerSubtitle}>December 11, 2026 • 52 minutes</Text>
            </View>
            
            <TouchableOpacity style={styles.iconBtn}>
              <MoreHorizontal size={24} color="#94A3B8" />
            </TouchableOpacity>
          </View>

          {/* Stats Grid */}
          <View style={styles.statsGrid}>
            {[
              { label: "Exercises", value: "4", color: "#4F46E5" },
              { label: "Total Sets", value: String(totalSets), color: "#8B5CF6" },
              { label: "Volume", value: "7.6k", color: "#22C55E" },
              { label: "Duration", value: "52m", color: "#F97316" },
            ].map(s => (
              <View key={s.label} style={styles.statBox}>
                <Text style={[styles.statValue, { color: s.color }]}>{s.value}</Text>
                <Text style={styles.statLabel}>{s.label}</Text>
              </View>
            ))}
          </View>
        </LinearGradient>

        {/* Notes */}
        <View style={styles.section}>
          <View style={styles.notesBox}>
            <Text style={styles.notesEmoji}>🤔</Text>
            <Text style={styles.notesText}>
              Felt strong today. Increased bench weight from last session. Focus on keeping elbows at 45°.
            </Text>
          </View>
        </View>

        {/* Exercise List */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Exercises</Text>
          
          <View style={styles.exercisesContainer}>
            {detailExercises.map((exercise, index) => (
              <View key={exercise.name} style={styles.exerciseCard}>
                <View style={styles.exerciseHeader}>
                  <Text style={styles.exerciseName}>{index + 1}. {exercise.name}</Text>
                  <Text style={styles.exerciseSetsCount}>{exercise.sets.length} sets</Text>
                </View>

                {/* Sets Table Header */}
                <View style={styles.tableHeaderRow}>
                  <Text style={[styles.tableHeaderCol, { flex: 0.8 }]}>Set</Text>
                  <Text style={[styles.tableHeaderCol, { flex: 1 }]}>kg</Text>
                  <Text style={[styles.tableHeaderCol, { flex: 1 }]}>Reps</Text>
                  <Text style={[styles.tableHeaderCol, { flex: 1, textAlign: 'right' }]}>Vol</Text>
                </View>

                {/* Sets Rows */}
                {exercise.sets.map((s, setIndex) => (
                  <View key={s.set} style={[styles.setRow, setIndex % 2 === 0 && styles.setRowBg]}>
                    <View style={[styles.setCol, { flex: 0.8 }]}>
                      <Text style={styles.setText}>{s.set}</Text>
                    </View>
                    <View style={[styles.setCol, { flex: 1 }]}>
                      <Text style={styles.setText}>{s.weight}</Text>
                    </View>
                    <View style={[styles.setCol, { flex: 1 }]}>
                      <Text style={styles.setText}>{s.reps}</Text>
                    </View>
                    <View style={[styles.setCol, { flex: 1, alignItems: 'flex-end' }]}>
                      <Text style={[styles.setText, { color: '#94A3B8' }]}>{s.weight * s.reps}</Text>
                    </View>
                  </View>
                ))}
              </View>
            ))}
          </View>
        </View>
        
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0F172A' },
  scrollContent: { paddingBottom: 60 },

  headerGradient: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  headerTop: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    marginBottom: 24, marginTop: 12,
  },
  iconBtn: { padding: 4 },
  headerTitleBox: { flex: 1, paddingHorizontal: 12 },
  headerTitle: { fontSize: 22, fontWeight: '800', color: '#F8FAFC', letterSpacing: -0.5 },
  headerSubtitle: { fontSize: 13, color: '#94A3B8', marginTop: 4 },

  statsGrid: { flexDirection: 'row', gap: 10 },
  statBox: {
    flex: 1, paddingVertical: 12, paddingHorizontal: 4,
    backgroundColor: '#1E293B', borderRadius: 14,
    borderWidth: 1.5, borderColor: 'rgba(248,250,252,0.08)',
    alignItems: 'center', justifyContent: 'center'
  },
  statValue: { fontSize: 18, fontWeight: '800', marginBottom: 2 },
  statLabel: { fontSize: 10, color: '#94A3B8' },

  section: { paddingHorizontal: 24, marginBottom: 24 },
  
  notesBox: {
    flexDirection: 'row', gap: 12, padding: 16, borderRadius: 14,
    backgroundColor: 'rgba(249,115,22,0.08)', borderWidth: 1, borderColor: 'rgba(249,115,22,0.2)'
  },
  notesEmoji: { fontSize: 18 },
  notesText: { flex: 1, fontSize: 13, color: '#94A3B8', lineHeight: 20 },

  sectionTitle: { fontSize: 16, fontWeight: '700', color: '#F8FAFC', marginBottom: 16 },
  exercisesContainer: { gap: 16 },
  
  exerciseCard: {
    padding: 16, borderRadius: 18, backgroundColor: '#1E293B',
    borderWidth: 1.5, borderColor: 'rgba(248,250,252,0.08)'
  },
  exerciseHeader: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    marginBottom: 16,
  },
  exerciseName: { fontSize: 15, fontWeight: '700', color: '#F8FAFC' },
  exerciseSetsCount: { fontSize: 13, color: '#94A3B8', fontWeight: '600' },
  
  tableHeaderRow: { flexDirection: 'row', marginBottom: 8, paddingHorizontal: 8 },
  tableHeaderCol: { fontSize: 12, color: '#94A3B8', fontWeight: '600' },
  
  setRow: {
    flexDirection: 'row', alignItems: 'center', paddingVertical: 8, paddingHorizontal: 8,
    borderRadius: 8,
  },
  setRowBg: { backgroundColor: 'rgba(248,250,252,0.03)' },
  setCol: { justifyContent: 'center' },
  setText: { fontSize: 15, fontWeight: '600', color: '#F8FAFC' },
});
