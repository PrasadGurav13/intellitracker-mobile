import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, Filter, Plus, ChevronRight, MoreHorizontal, Dumbbell, TrendingUp, Clock } from 'lucide-react-native';
import { useRouter } from 'expo-router';

const workouts = [
  { id: "1", name: "Upper Body Push", date: "Today", duration: "52 min", exercises: 6, sets: 18, volume: "7,600 kg", emoji: "🏋️‍♂️" },
  { id: "2", name: "Leg Day", date: "Yesterday", duration: "68 min", exercises: 8, sets: 22, volume: "13,200 kg", emoji: "🦵" },
  { id: "3", name: "Back & Biceps", date: "Dec 8", duration: "45 min", exercises: 7, sets: 16, volume: "9,800 kg", emoji: "💪" },
  { id: "4", name: "Cardio Session", date: "Dec 7", duration: "35 min", exercises: 3, sets: 0, volume: "—", emoji: "🏃‍♂️" },
  { id: "5", name: "Shoulder & Triceps", date: "Dec 5", duration: "50 min", exercises: 7, sets: 20, volume: "6,400 kg", emoji: "🎯" },
  { id: "6", name: "Full Body", date: "Dec 3", duration: "72 min", exercises: 10, sets: 28, volume: "15,800 kg", emoji: "🔥" },
];

const filterTabs = ["All", "This Week", "This Month", "Strength", "Cardio"];

export default function WorkoutsScreen() {
  const [activeFilter, setActiveFilter] = useState("All");
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Workouts</Text>
          <TouchableOpacity style={styles.logBtn}>
            <Plus size={16} color="#FFF" />
            <Text style={styles.logBtnText}>Log</Text>
          </TouchableOpacity>
        </View>

        {/* Search */}
        <View style={styles.searchContainer}>
          <Search size={18} color="#94A3B8" />
          <TextInput 
            style={styles.searchInput}
            placeholder="Search workouts..."
            placeholderTextColor="#94A3B8"
          />
          <Filter size={18} color="#94A3B8" />
        </View>

        {/* Filter chips */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          contentContainerStyle={styles.filterScroll}
          style={styles.filterWrapper}
        >
          {filterTabs.map(f => {
            const isActive = activeFilter === f;
            return (
              <TouchableOpacity
                key={f}
                onPress={() => setActiveFilter(f)}
                style={[styles.filterChip, isActive ? styles.filterChipActive : styles.filterChipInactive]}
              >
                <Text style={[styles.filterChipText, isActive ? styles.filterChipTextActive : styles.filterChipTextInactive]}>
                  {f}
                </Text>
              </TouchableOpacity>
            )
          })}
        </ScrollView>

        {/* Stats summary */}
        <View style={styles.statsRow}>
          {[
            { label: "Total", value: "48", unit: "workouts" },
            { label: "Avg Duration", value: "54", unit: "minutes" },
            { label: "This Month", value: "12", unit: "sessions" },
          ].map(s => (
            <View key={s.label} style={styles.statBox}>
              <Text style={styles.statBoxValue}>{s.value}</Text>
              <Text style={styles.statBoxUnit}>{s.unit}</Text>
            </View>
          ))}
        </View>

        {/* Workout list */}
        <View style={styles.listContainer}>
          {workouts.map(w => (
            <TouchableOpacity 
              key={w.id} 
              style={styles.workoutCard}
              onPress={() => router.push(`/workout/${w.id}`)}
            >
              <View style={styles.emojiBox}>
                <Text style={styles.emojiText}>{w.emoji}</Text>
              </View>

              <View style={styles.workoutBody}>
                <View style={styles.workoutHeaderRow}>
                  <View>
                    <Text style={styles.workoutName}>{w.name}</Text>
                    <Text style={styles.workoutSubtitle}>{w.date} • {w.duration}</Text>
                  </View>
                  <TouchableOpacity>
                    <MoreHorizontal size={20} color="#94A3B8" />
                  </TouchableOpacity>
                </View>

                <View style={styles.workoutStatsRow}>
                  <View style={styles.miniStat}>
                    <Dumbbell size={12} color="#94A3B8" />
                    <Text style={styles.miniStatText}>{w.exercises} exercises</Text>
                  </View>
                  <View style={styles.miniStat}>
                    <TrendingUp size={12} color="#94A3B8" />
                    <Text style={styles.miniStatText}>{w.sets > 0 ? `${w.sets} sets` : "Cardio"}</Text>
                  </View>
                  <View style={styles.miniStat}>
                    <Clock size={12} color="#94A3B8" />
                    <Text style={styles.miniStatText}>{w.volume}</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Load more */}
        <TouchableOpacity style={styles.loadMoreBtn}>
          <Text style={styles.loadMoreText}>Load more workouts</Text>
        </TouchableOpacity>
        
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0F172A' },
  scrollContent: { paddingBottom: 40 },
  
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 24, paddingTop: 12, paddingBottom: 20
  },
  headerTitle: { fontSize: 28, fontWeight: '800', color: '#F8FAFC', letterSpacing: -0.5 },
  logBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    backgroundColor: '#4F46E5', paddingHorizontal: 16, paddingVertical: 8,
    borderRadius: 12,
  },
  logBtnText: { color: '#FFF', fontSize: 14, fontWeight: '600' },

  searchContainer: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    marginHorizontal: 24, marginBottom: 16, paddingHorizontal: 16,
    height: 48, borderRadius: 14, backgroundColor: '#1E293B',
    borderWidth: 1.5, borderColor: 'rgba(248,250,252,0.08)'
  },
  searchInput: {
    flex: 1, color: '#F8FAFC', fontSize: 15,
  },

  filterWrapper: { marginBottom: 20 },
  filterScroll: { paddingHorizontal: 24, gap: 8 },
  filterChip: {
    paddingHorizontal: 14, paddingVertical: 7, borderRadius: 24,
    borderWidth: 1.5, justifyContent: 'center', alignItems: 'center'
  },
  filterChipActive: {
    backgroundColor: '#4F46E5', borderColor: '#4F46E5'
  },
  filterChipInactive: {
    backgroundColor: '#1E293B', borderColor: 'rgba(248,250,252,0.08)'
  },
  filterChipText: { fontSize: 13, fontWeight: '600' },
  filterChipTextActive: { color: '#FFF' },
  filterChipTextInactive: { color: '#94A3B8' },

  statsRow: {
    flexDirection: 'row', gap: 12, paddingHorizontal: 24, marginBottom: 24
  },
  statBox: {
    flex: 1, paddingVertical: 12, paddingHorizontal: 10,
    backgroundColor: '#1E293B', borderRadius: 14,
    borderWidth: 1.5, borderColor: 'rgba(248,250,252,0.08)',
    alignItems: 'center'
  },
  statBoxValue: { fontSize: 20, fontWeight: '800', color: '#F8FAFC' },
  statBoxUnit: { fontSize: 10, color: '#94A3B8', marginTop: 2 },

  listContainer: { paddingHorizontal: 24, gap: 10, marginBottom: 24 },
  workoutCard: {
    flexDirection: 'row', alignItems: 'flex-start', gap: 14,
    padding: 16, borderRadius: 18, backgroundColor: '#1E293B',
    borderWidth: 1.5, borderColor: 'rgba(248,250,252,0.08)'
  },
  emojiBox: {
    width: 50, height: 50, borderRadius: 16,
    backgroundColor: 'rgba(79,70,229,0.12)',
    alignItems: 'center', justifyContent: 'center'
  },
  emojiText: { fontSize: 24 },
  workoutBody: { flex: 1 },
  workoutHeaderRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start',
    marginBottom: 10
  },
  workoutName: { fontSize: 15, fontWeight: '700', color: '#F8FAFC', marginBottom: 3 },
  workoutSubtitle: { fontSize: 12, color: '#94A3B8' },
  workoutStatsRow: { flexDirection: 'row', gap: 14, flexWrap: 'wrap' },
  miniStat: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  miniStatText: { fontSize: 12, color: '#94A3B8' },

  loadMoreBtn: {
    alignSelf: 'center', paddingVertical: 10, paddingHorizontal: 24,
    borderRadius: 12, borderWidth: 1.5, borderColor: 'rgba(248,250,252,0.08)'
  },
  loadMoreText: { color: '#94A3B8', fontSize: 14, fontWeight: '500' }
});
