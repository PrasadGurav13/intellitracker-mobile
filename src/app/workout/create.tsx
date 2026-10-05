import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Modal, KeyboardAvoidingView, Platform, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronDown, Dumbbell, Trash2, Plus, X, Clock } from 'lucide-react-native';
import { useRouter } from 'expo-router';

// Initial state data
const initialExercises = [
  {
    name: "Bench Press",
    sets: [
      { weight: 80, reps: 10 },
      { weight: 90, reps: 8 },
    ]
  }
];

const availableExercises = [
  "Bench Press", "Squat", "Deadlift", "Shoulder Press", 
  "Incline DB Press", "Pull-ups", "Barbell Row", "Cable Fly"
];

export default function CreateWorkoutScreen() {
  const router = useRouter();
  const [workoutName, setWorkoutName] = useState("Evening Workout");
  const [exercises, setExercises] = useState(initialExercises);
  const [notes, setNotes] = useState("");
  const [showPicker, setShowPicker] = useState(false);

  const handleAddSet = (exIndex: number) => {
    const updated = [...exercises];
    // Copy the last set's weight and reps, or use default
    const lastSet = updated[exIndex].sets[updated[exIndex].sets.length - 1];
    updated[exIndex].sets.push({ 
      weight: lastSet ? lastSet.weight : 0, 
      reps: lastSet ? lastSet.reps : 0 
    });
    setExercises(updated);
  };

  const handleRemoveSet = (exIndex: number, setIndex: number) => {
    const updated = [...exercises];
    updated[exIndex].sets.splice(setIndex, 1);
    setExercises(updated);
  };

  const handleRemoveExercise = (exIndex: number) => {
    const updated = [...exercises];
    updated.splice(exIndex, 1);
    setExercises(updated);
  };

  const handleUpdateSet = (exIndex: number, setIndex: number, field: 'weight' | 'reps', value: string) => {
    const updated = [...exercises];
    updated[exIndex].sets[setIndex][field] = Number(value.replace(/[^0-9]/g, '')) || 0;
    setExercises(updated);
  };

  const handleAddExercise = (name: string) => {
    setExercises([...exercises, { name, sets: [{ weight: 0, reps: 0 }] }]);
    setShowPicker(false);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <KeyboardAvoidingView 
        style={{ flex: 1 }} 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
          
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()} style={styles.iconBtn}>
              <ChevronDown size={28} color="#94A3B8" />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.saveBtn} onPress={() => router.back()}>
              <Text style={styles.saveBtnText}>Save</Text>
            </TouchableOpacity>
          </View>

          {/* Workout Name & Timer */}
          <View style={styles.topSection}>
            <TextInput
              style={styles.nameInput}
              value={workoutName}
              onChangeText={setWorkoutName}
              placeholder="Workout Name"
              placeholderTextColor="#64748B"
            />

            <View style={styles.timerBadge}>
              <Clock size={16} color="#4F46E5" />
              <Text style={styles.timerText}>00:23:47</Text>
              <Text style={styles.timerSub}>elapsed</Text>
            </View>
          </View>

          {/* Exercises */}
          <View style={styles.exercisesSection}>
            {exercises.map((exercise, exIndex) => (
              <View key={`${exercise.name}-${exIndex}`} style={styles.exerciseCard}>
                
                {/* Exercise Header */}
                <View style={styles.exerciseHeader}>
                  <View style={styles.exerciseHeaderLeft}>
                    <View style={styles.iconBox}>
                      <Dumbbell size={18} color="#4F46E5" />
                    </View>
                    <Text style={styles.exerciseName}>{exercise.name}</Text>
                  </View>
                  <TouchableOpacity onPress={() => handleRemoveExercise(exIndex)} style={styles.iconBtn}>
                    <Trash2 size={18} color="#94A3B8" />
                  </TouchableOpacity>
                </View>

                {/* Sets Header */}
                <View style={styles.setsHeaderRow}>
                  <Text style={[styles.setsHeaderCol, { width: 30, textAlign: 'center' }]}>#</Text>
                  <Text style={[styles.setsHeaderCol, { flex: 1, textAlign: 'center' }]}>Weight (kg)</Text>
                  <Text style={[styles.setsHeaderCol, { flex: 1, textAlign: 'center' }]}>Reps</Text>
                  <Text style={[styles.setsHeaderCol, { width: 36 }]}></Text>
                </View>

                {/* Sets Rows */}
                {exercise.sets.map((set, setIndex) => (
                  <View key={setIndex} style={styles.setRow}>
                    <View style={styles.setIndexBox}>
                      <Text style={styles.setIndexText}>{setIndex + 1}</Text>
                    </View>
                    
                    <TextInput
                      style={styles.setInput}
                      value={String(set.weight)}
                      onChangeText={(v) => handleUpdateSet(exIndex, setIndex, 'weight', v)}
                      keyboardType="numeric"
                      selectTextOnFocus
                    />
                    
                    <TextInput
                      style={styles.setInput}
                      value={String(set.reps)}
                      onChangeText={(v) => handleUpdateSet(exIndex, setIndex, 'reps', v)}
                      keyboardType="numeric"
                      selectTextOnFocus
                    />
                    
                    <TouchableOpacity onPress={() => handleRemoveSet(exIndex, setIndex)} style={styles.removeSetBtn}>
                      <X size={16} color="#94A3B8" />
                    </TouchableOpacity>
                  </View>
                ))}

                {/* Add Set Button */}
                <TouchableOpacity style={styles.addSetBtn} onPress={() => handleAddSet(exIndex)}>
                  <Plus size={14} color="#4F46E5" />
                  <Text style={styles.addSetBtnText}>Add Set</Text>
                </TouchableOpacity>

              </View>
            ))}

            {/* Add Exercise Button */}
            <TouchableOpacity style={styles.addExerciseBtn} onPress={() => setShowPicker(true)}>
              <Plus size={20} color="#4F46E5" />
              <Text style={styles.addExerciseBtnText}>Add Exercise</Text>
            </TouchableOpacity>

            {/* Workout Notes */}
            <View style={styles.notesContainer}>
              <Text style={styles.notesLabel}>Workout Notes</Text>
              <TextInput
                style={styles.notesInput}
                value={notes}
                onChangeText={setNotes}
                placeholder="How did it go? Any PRs? Notes for next time..."
                placeholderTextColor="#64748B"
                multiline
                textAlignVertical="top"
              />
            </View>
          </View>
          
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Exercise Picker Modal */}
      <Modal visible={showPicker} transparent animationType="slide" onRequestClose={() => setShowPicker(false)}>
        <View style={styles.modalOverlay}>
          <Pressable style={StyleSheet.absoluteFill} onPress={() => setShowPicker(false)} />
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Add Exercise</Text>
              <TouchableOpacity onPress={() => setShowPicker(false)}>
                <X size={24} color="#94A3B8" />
              </TouchableOpacity>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
              {availableExercises.map(ex => (
                <TouchableOpacity 
                  key={ex} 
                  style={styles.modalItem}
                  onPress={() => handleAddExercise(ex)}
                >
                  <Text style={styles.modalItemText}>{ex}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0F172A' },
  scrollContent: { paddingBottom: 100 },
  
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 16, paddingTop: 12, paddingBottom: 16
  },
  iconBtn: { padding: 8 },
  saveBtn: {
    backgroundColor: '#4F46E5', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 24,
  },
  saveBtnText: { color: '#FFF', fontSize: 15, fontWeight: '700' },
  
  topSection: { paddingHorizontal: 24, marginBottom: 24 },
  nameInput: {
    height: 52, paddingHorizontal: 16, borderRadius: 14,
    borderWidth: 2, borderColor: 'rgba(79,70,229,0.3)',
    backgroundColor: '#1E293B',
    color: '#F8FAFC', fontSize: 18, fontWeight: '700'
  },
  timerBadge: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
    marginTop: 12, paddingVertical: 10, borderRadius: 12,
    backgroundColor: 'rgba(79,70,229,0.08)', borderWidth: 1, borderColor: 'rgba(79,70,229,0.15)'
  },
  timerText: { fontSize: 22, fontWeight: '800', color: '#4F46E5', fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace' },
  timerSub: { fontSize: 13, color: '#94A3B8' },

  exercisesSection: { paddingHorizontal: 24, gap: 16 },
  exerciseCard: {
    padding: 16, borderRadius: 18, backgroundColor: '#1E293B',
    borderWidth: 1.5, borderColor: 'rgba(248,250,252,0.08)'
  },
  exerciseHeader: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16
  },
  exerciseHeaderLeft: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  iconBox: {
    width: 36, height: 36, borderRadius: 10, backgroundColor: 'rgba(79,70,229,0.12)',
    alignItems: 'center', justifyContent: 'center'
  },
  exerciseName: { fontSize: 16, fontWeight: '700', color: '#F8FAFC' },
  
  setsHeaderRow: { flexDirection: 'row', gap: 8, marginBottom: 8 },
  setsHeaderCol: { fontSize: 11, fontWeight: '600', color: '#94A3B8' },
  
  setRow: { flexDirection: 'row', gap: 8, marginBottom: 8, alignItems: 'center' },
  setIndexBox: {
    width: 30, height: 30, borderRadius: 8, backgroundColor: 'rgba(79,70,229,0.12)',
    alignItems: 'center', justifyContent: 'center'
  },
  setIndexText: { fontSize: 12, fontWeight: '700', color: '#4F46E5' },
  setInput: {
    flex: 1, height: 44, borderRadius: 10, backgroundColor: '#0F172A',
    borderWidth: 1.5, borderColor: 'rgba(248,250,252,0.08)',
    color: '#F8FAFC', fontSize: 16, fontWeight: '700', textAlign: 'center'
  },
  removeSetBtn: { width: 36, height: 44, alignItems: 'center', justifyContent: 'center' },
  
  addSetBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6,
    height: 40, borderRadius: 10, marginTop: 8,
    backgroundColor: 'rgba(79,70,229,0.08)', borderWidth: 1.5, borderColor: 'rgba(79,70,229,0.3)', borderStyle: 'dashed'
  },
  addSetBtnText: { color: '#4F46E5', fontSize: 13, fontWeight: '600' },

  addExerciseBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
    height: 56, borderRadius: 18,
    backgroundColor: 'rgba(79,70,229,0.08)', borderWidth: 2, borderColor: 'rgba(79,70,229,0.3)', borderStyle: 'dashed'
  },
  addExerciseBtnText: { color: '#4F46E5', fontSize: 15, fontWeight: '600' },

  notesContainer: { marginTop: 8 },
  notesLabel: { fontSize: 13, fontWeight: '500', color: '#94A3B8', marginBottom: 8 },
  notesInput: {
    height: 100, padding: 16, paddingTop: 16, borderRadius: 14,
    backgroundColor: '#1E293B', borderWidth: 1.5, borderColor: 'rgba(248,250,252,0.08)',
    color: '#F8FAFC', fontSize: 14
  },

  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'flex-end' },
  modalContent: {
    backgroundColor: '#1E293B', borderTopLeftRadius: 24, borderTopRightRadius: 24,
    padding: 24, paddingBottom: 50, maxHeight: '70%'
  },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  modalTitle: { fontSize: 18, fontWeight: '700', color: '#F8FAFC' },
  modalItem: {
    paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: 'rgba(248,250,252,0.08)'
  },
  modalItemText: { fontSize: 16, color: '#F8FAFC', fontWeight: '500' }
});
