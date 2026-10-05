import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Modal, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, X, ChevronRight } from 'lucide-react-native';
import { useRouter } from 'expo-router';

const categories = [
  { name: "Chest", emoji: "🦍", count: 42, color: "#4F46E5" },
  { name: "Back", emoji: "🦇", count: 38, color: "#22C55E" },
  { name: "Legs", emoji: "🦵", count: 56, color: "#F97316" },
  { name: "Arms", emoji: "💪", count: 45, color: "#EF4444" },
  { name: "Shoulders", emoji: "🥥", count: 32, color: "#8B5CF6" },
  { name: "Core", emoji: "🍫", count: 64, color: "#14B8A6" },
  { name: "Cardio", emoji: "🫀", count: 28, color: "#F43F5E" },
  { name: "Full Body", emoji: "🔥", count: 15, color: "#EAB308" },
];

const exercises = [
  { name: "Bench Press", muscle: "Pectoralis Major", category: "Chest", difficulty: "Intermediate", type: "Barbell", emoji: "🏋️‍♂️" },
  { name: "Squat", muscle: "Quadriceps, Glutes", category: "Legs", difficulty: "Advanced", type: "Barbell", emoji: "🦵" },
  { name: "Deadlift", muscle: "Hamstrings, Lower Back", category: "Back", difficulty: "Advanced", type: "Barbell", emoji: "🦍" },
  { name: "Pull-up", muscle: "Latissimus Dorsi", category: "Back", difficulty: "Intermediate", type: "Bodyweight", emoji: "🦇" },
  { name: "Overhead Press", muscle: "Deltoids", category: "Shoulders", difficulty: "Intermediate", type: "Barbell", emoji: "🥥" },
  { name: "Bicep Curl", muscle: "Biceps Brachii", category: "Arms", difficulty: "Beginner", type: "Dumbbell", emoji: "💪" },
  { name: "Tricep Extension", muscle: "Triceps Brachii", category: "Arms", difficulty: "Beginner", type: "Cable", emoji: "⚡" },
  { name: "Leg Press", muscle: "Quadriceps", category: "Legs", difficulty: "Beginner", type: "Machine", emoji: "🏗️" },
  { name: "Plank", muscle: "Rectus Abdominis", category: "Core", difficulty: "Beginner", type: "Bodyweight", emoji: "🍫" },
];

const difficultyColor = { 
  Beginner: "#22C55E", 
  Intermediate: "#F97316", 
  Advanced: "#EF4444" 
};

export default function ExerciseLibraryScreen() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [selectedExercise, setSelectedExercise] = useState<typeof exercises[0] | null>(null);
  const [query, setQuery] = useState("");

  const filtered = exercises.filter(e =>
    (!activeCategory || e.category === activeCategory) &&
    (!query || e.name.toLowerCase().includes(query.toLowerCase()))
  );

  return (
    <>
      <SafeAreaView style={styles.container} edges={['top']}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Exercise Library</Text>
        </View>

        {/* Search */}
        <View style={styles.searchContainer}>
          <Search size={18} color="#94A3B8" />
          <TextInput
            style={styles.searchInput}
            value={query}
            onChangeText={setQuery}
            placeholder="Search exercises, muscles..."
            placeholderTextColor="#64748B"
          />
          {query.length > 0 && (
            <TouchableOpacity onPress={() => setQuery("")}>
              <X size={18} color="#94A3B8" />
            </TouchableOpacity>
          )}
        </View>

        {/* Total count */}
        <Text style={styles.countText}>500+ exercises in library</Text>

        {/* Categories grid */}
        <View style={styles.categoriesGrid}>
          {categories.map(cat => {
            const isActive = activeCategory === cat.name;
            return (
              <TouchableOpacity
                key={cat.name}
                onPress={() => setActiveCategory(isActive ? null : cat.name)}
                style={[
                  styles.categoryBox,
                  isActive && { backgroundColor: `${cat.color}20`, borderColor: cat.color, borderWidth: 2 }
                ]}
              >
                <Text style={styles.catEmoji}>{cat.emoji}</Text>
                <Text style={[styles.catName, isActive && { color: cat.color }]}>{cat.name}</Text>
                <Text style={styles.catCount}>{cat.count}</Text>
              </TouchableOpacity>
            )
          })}
        </View>

        {/* Active Category Header */}
        {activeCategory && (
          <View style={styles.activeCatHeader}>
            <Text style={styles.activeCatTitle}>{activeCategory} Exercises</Text>
            <TouchableOpacity onPress={() => setActiveCategory(null)}>
              <Text style={styles.showAllText}>Show all</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Exercise list */}
        <View style={styles.listContainer}>
          {filtered.map(ex => (
            <TouchableOpacity
              key={ex.name}
              onPress={() => setSelectedExercise(ex)}
              style={styles.exerciseRow}
            >
              <View style={styles.exEmojiBox}>
                <Text style={styles.exEmoji}>{ex.emoji}</Text>
              </View>

              <View style={styles.exInfo}>
                <Text style={styles.exName}>{ex.name}</Text>
                <Text style={styles.exMuscle}>{ex.muscle}</Text>
                <View style={styles.pillsRow}>
                  <View style={[styles.pill, { backgroundColor: `${difficultyColor[ex.difficulty as keyof typeof difficultyColor]}20` }]}>
                    <Text style={[styles.pillText, { color: difficultyColor[ex.difficulty as keyof typeof difficultyColor] }]}>
                      {ex.difficulty}
                    </Text>
                  </View>
                  <View style={styles.pill}>
                    <Text style={styles.pillText}>{ex.type}</Text>
                  </View>
                </View>
              </View>

              <ChevronRight size={20} color="#94A3B8" />
            </TouchableOpacity>
          ))}
        </View>

      </ScrollView>
      </SafeAreaView>

      {/* Exercise detail modal */}
      <Modal visible={!!selectedExercise} transparent animationType="slide" statusBarTranslucent onRequestClose={() => setSelectedExercise(null)}>
        {selectedExercise && (
          <View style={styles.modalOverlay}>
            <Pressable style={StyleSheet.absoluteFill} onPress={() => setSelectedExercise(null)} />
            <View style={styles.modalContent}>
              
              <View style={styles.modalHandle} />

              <View style={styles.modalHeaderRow}>
                <View style={styles.modalEmojiBox}>
                  <Text style={styles.modalEmoji}>{selectedExercise.emoji}</Text>
                </View>
                <View style={styles.modalHeaderInfo}>
                  <Text style={styles.modalTitle}>{selectedExercise.name}</Text>
                  <View style={styles.pillsRow}>
                    <View style={[styles.pill, { backgroundColor: `${difficultyColor[selectedExercise.difficulty as keyof typeof difficultyColor]}20` }]}>
                      <Text style={[styles.pillText, { color: difficultyColor[selectedExercise.difficulty as keyof typeof difficultyColor] }]}>
                        {selectedExercise.difficulty}
                      </Text>
                    </View>
                    <View style={styles.pill}>
                      <Text style={styles.pillText}>{selectedExercise.type}</Text>
                    </View>
                  </View>
                </View>
                <TouchableOpacity onPress={() => setSelectedExercise(null)} style={{ padding: 4 }}>
                  <X size={24} color="#94A3B8" />
                </TouchableOpacity>
              </View>

              <View style={styles.infoGrid}>
                {[
                  { label: "Primary Muscle", value: selectedExercise.muscle.split(", ")[0] },
                  { label: "Category", value: selectedExercise.category },
                  { label: "Equipment", value: selectedExercise.type },
                  { label: "Difficulty", value: selectedExercise.difficulty },
                ].map(info => (
                  <View key={info.label} style={styles.infoBox}>
                    <Text style={styles.infoLabel}>{info.label}</Text>
                    <Text style={styles.infoValue}>{info.value}</Text>
                  </View>
                ))}
              </View>

              <View style={styles.howToBox}>
                <Text style={styles.howToTitle}>How to perform</Text>
                <Text style={styles.howToText}>
                  1. Set up the equipment with appropriate weight.{"\n"}
                  2. Position yourself correctly with proper form.{"\n"}
                  3. Perform the movement through full range of motion.{"\n"}
                  4. Control the eccentric (lowering) phase.{"\n"}
                  5. Breathe in on the way down, out on the way up.
                </Text>
              </View>

              <View style={styles.modalActions}>
                <TouchableOpacity onPress={() => setSelectedExercise(null)} style={styles.closeBtn}>
                  <Text style={styles.closeBtnText}>Close</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.addBtn}>
                  <Text style={styles.addBtnText}>Add to Workout</Text>
                </TouchableOpacity>
              </View>

            </View>
          </View>
        )}
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0F172A' },
  scrollContent: { paddingBottom: 60 },
  
  header: { paddingHorizontal: 24, paddingTop: 12, paddingBottom: 20 },
  headerTitle: { fontSize: 28, fontWeight: '800', color: '#F8FAFC', letterSpacing: -0.5 },
  
  searchContainer: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    marginHorizontal: 24, marginBottom: 12, paddingHorizontal: 16,
    height: 48, borderRadius: 14, backgroundColor: '#1E293B',
    borderWidth: 1.5, borderColor: 'rgba(248,250,252,0.08)'
  },
  searchInput: { flex: 1, color: '#F8FAFC', fontSize: 15 },
  countText: { fontSize: 13, color: '#94A3B8', paddingHorizontal: 24, marginBottom: 16 },
  
  categoriesGrid: {
    flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 24, gap: 10, marginBottom: 24
  },
  categoryBox: {
    width: '22.5%', paddingVertical: 12, borderRadius: 14, backgroundColor: '#1E293B',
    borderWidth: 1.5, borderColor: 'rgba(248,250,252,0.08)',
    alignItems: 'center', justifyContent: 'center'
  },
  catEmoji: { fontSize: 22, marginBottom: 4 },
  catName: { fontSize: 11, fontWeight: '600', color: '#F8FAFC', marginBottom: 2 },
  catCount: { fontSize: 10, color: '#94A3B8' },

  activeCatHeader: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 24, marginBottom: 12
  },
  activeCatTitle: { fontSize: 16, fontWeight: '700', color: '#F8FAFC' },
  showAllText: { fontSize: 13, fontWeight: '600', color: '#4F46E5' },

  listContainer: { paddingHorizontal: 24, gap: 10 },
  exerciseRow: {
    flexDirection: 'row', alignItems: 'center', gap: 14,
    padding: 14, borderRadius: 16, backgroundColor: '#1E293B',
    borderWidth: 1.5, borderColor: 'rgba(248,250,252,0.08)'
  },
  exEmojiBox: {
    width: 48, height: 48, borderRadius: 14, backgroundColor: 'rgba(79,70,229,0.12)',
    alignItems: 'center', justifyContent: 'center'
  },
  exEmoji: { fontSize: 24 },
  exInfo: { flex: 1 },
  exName: { fontSize: 15, fontWeight: '700', color: '#F8FAFC', marginBottom: 3 },
  exMuscle: { fontSize: 12, color: '#94A3B8', marginBottom: 6 },
  
  pillsRow: { flexDirection: 'row', gap: 6 },
  pill: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6, backgroundColor: 'rgba(248,250,252,0.08)' },
  pillText: { fontSize: 11, fontWeight: '600', color: '#94A3B8' },

  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'flex-end', margin: 0, bottom: 0 },
  modalContent: {
    backgroundColor: '#1E293B', borderTopLeftRadius: 28, borderTopRightRadius: 28,
    padding: 24, paddingBottom: 50, maxHeight: '85%'
  },
  modalHandle: {
    width: 36, height: 4, borderRadius: 2, backgroundColor: 'rgba(248,250,252,0.1)',
    alignSelf: 'center', marginBottom: 20
  },
  modalHeaderRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 16, marginBottom: 24 },
  modalEmojiBox: {
    width: 64, height: 64, borderRadius: 20, backgroundColor: 'rgba(79,70,229,0.12)',
    alignItems: 'center', justifyContent: 'center'
  },
  modalEmoji: { fontSize: 32 },
  modalHeaderInfo: { flex: 1 },
  modalTitle: { fontSize: 22, fontWeight: '800', color: '#F8FAFC', marginBottom: 8, letterSpacing: -0.3 },
  
  infoGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 24 },
  infoBox: {
    width: '48%', padding: 12, borderRadius: 14, backgroundColor: 'rgba(248,250,252,0.05)'
  },
  infoLabel: { fontSize: 11, color: '#94A3B8', fontWeight: '500', marginBottom: 4 },
  infoValue: { fontSize: 14, fontWeight: '700', color: '#F8FAFC' },
  
  howToBox: {
    padding: 16, borderRadius: 14, backgroundColor: 'rgba(248,250,252,0.05)', marginBottom: 24
  },
  howToTitle: { fontSize: 13, fontWeight: '700', color: '#F8FAFC', marginBottom: 8 },
  howToText: { fontSize: 13, color: '#94A3B8', lineHeight: 22 },
  
  modalActions: { flexDirection: 'row', gap: 12 },
  closeBtn: {
    flex: 1, height: 52, borderRadius: 14, backgroundColor: 'rgba(248,250,252,0.1)',
    alignItems: 'center', justifyContent: 'center'
  },
  closeBtnText: { color: '#F8FAFC', fontSize: 15, fontWeight: '600' },
  addBtn: {
    flex: 2, height: 52, borderRadius: 14, backgroundColor: '#4F46E5',
    alignItems: 'center', justifyContent: 'center'
  },
  addBtnText: { color: '#FFF', fontSize: 15, fontWeight: '700' }
});
