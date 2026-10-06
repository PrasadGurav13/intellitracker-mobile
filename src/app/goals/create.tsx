import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, ChevronRight, Calendar, Target, Check } from 'lucide-react-native';
import { useRouter } from 'expo-router';

const goalTypes = [
  { id: "strength-pr", label: "Strength PR", desc: "Hit a new max weight", emoji: "🦍", color: "#4F46E5", unit: "kg", needsExercise: true, actionVerb: "Increase max weight" },
  { id: "frequency", label: "Frequency", desc: "Workout consistency", emoji: "📅", color: "#22C55E", unit: "sessions", needsExercise: false, actionVerb: "Increase frequency" },
  { id: "bodyweight", label: "Body Weight", desc: "Weight management", emoji: "⚖️", color: "#F97316", unit: "kg", needsExercise: false, actionVerb: "Change body weight" },
  { id: "volume", label: "Volume", desc: "Total weight lifted", emoji: "📈", color: "#8B5CF6", unit: "kg", needsExercise: true, actionVerb: "Increase total volume" },
  { id: "endurance", label: "Endurance", desc: "Reps or duration", emoji: "🫀", color: "#06B6D4", unit: "mins", needsExercise: true, actionVerb: "Increase endurance" },
];

export default function CreateGoalScreen() {
  const router = useRouter();
  const [selectedType, setSelectedType] = useState("strength-pr");
  const [targetValue, setTargetValue] = useState("120");
  const [currentValue, setCurrentValue] = useState("110");
  const [deadline, setDeadline] = useState("2027-01-31");

  const activeTypeInfo = goalTypes.find(t => t.id === selectedType) || goalTypes[0];

  const progressPercent = Math.min(100, (Number(currentValue) / Number(targetValue)) * 100) || 0;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
          
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()} style={styles.iconBtn}>
              <ChevronLeft size={28} color="#94A3B8" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Create Goal</Text>
            <TouchableOpacity style={styles.saveBtn} onPress={() => router.back()}>
              <Text style={styles.saveBtnText}>Save</Text>
            </TouchableOpacity>
          </View>

          {/* Goal Type */}
          <Text style={styles.sectionTitle}>Goal Type</Text>
          <View style={styles.typesContainer}>
            {goalTypes.map(type => {
              const isSelected = selectedType === type.id;
              return (
                <TouchableOpacity
                  key={type.id}
                  onPress={() => setSelectedType(type.id)}
                  style={[
                    styles.typeCard,
                    isSelected && { borderColor: type.color, backgroundColor: `${type.color}15` }
                  ]}
                >
                  <View style={[styles.typeEmojiBox, { backgroundColor: `${type.color}20` }]}>
                    <Text style={styles.emojiText}>{type.emoji}</Text>
                  </View>
                  <View style={styles.typeInfo}>
                    <Text style={styles.typeLabel}>{type.label}</Text>
                    <Text style={styles.typeDesc}>{type.desc}</Text>
                  </View>
                  <View style={[
                    styles.radioCircle,
                    isSelected && { backgroundColor: type.color, borderColor: type.color }
                  ]}>
                    {isSelected && <Check size={12} color="#FFF" strokeWidth={3} />}
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Exercise Selection (Conditional) */}
          {activeTypeInfo.needsExercise && (
            <View style={styles.fieldSection}>
              <Text style={styles.fieldLabel}>Exercise</Text>
              <TouchableOpacity style={styles.selectorBox}>
                <Text style={styles.selectorText}>Bench Press</Text>
                <ChevronRight size={20} color="#94A3B8" />
              </TouchableOpacity>
            </View>
          )}

          {/* Values Grid */}
          <View style={styles.valuesGrid}>
            <View style={styles.valueCol}>
              <Text style={styles.fieldLabel}>Current Value</Text>
              <View style={styles.inputBox}>
                <TextInput
                  style={styles.numberInput}
                  value={currentValue}
                  onChangeText={setCurrentValue}
                  keyboardType="numeric"
                  selectTextOnFocus
                />
                <Text style={styles.unitText}>{activeTypeInfo.unit}</Text>
              </View>
            </View>
            <View style={styles.valueCol}>
              <Text style={styles.fieldLabel}>Target Value</Text>
              <View style={[styles.inputBox, { borderColor: activeTypeInfo.color, borderWidth: 2 }]}>
                <TextInput
                  style={[styles.numberInput, { color: activeTypeInfo.color }]}
                  value={targetValue}
                  onChangeText={setTargetValue}
                  keyboardType="numeric"
                  selectTextOnFocus
                />
                <Text style={styles.unitText}>{activeTypeInfo.unit}</Text>
              </View>
            </View>
          </View>

          {/* Deadline */}
          <View style={styles.fieldSection}>
            <Text style={styles.fieldLabel}>Target Deadline</Text>
            <View style={styles.selectorBox}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                <Calendar size={20} color="#94A3B8" />
                <TextInput
                  style={[styles.selectorText, { padding: 0, margin: 0, height: '100%' }]}
                  value={deadline}
                  onChangeText={setDeadline}
                  placeholder="YYYY-MM-DD"
                  placeholderTextColor="#64748B"
                />
              </View>
            </View>
          </View>

          {/* Preview */}
          <View style={[styles.previewBox, { backgroundColor: `${activeTypeInfo.color}15`, borderColor: `${activeTypeInfo.color}30` }]}>
            <View style={styles.previewHeader}>
              <Target size={18} color={activeTypeInfo.color} />
              <Text style={styles.previewTitle}>Goal Preview</Text>
            </View>
            <Text style={styles.previewText}>
              {activeTypeInfo.actionVerb} from <Text style={{ color: '#F8FAFC', fontWeight: '700' }}>{currentValue}{activeTypeInfo.unit}</Text> to <Text style={{ color: activeTypeInfo.color, fontWeight: '800' }}>{targetValue}{activeTypeInfo.unit}</Text>
              {activeTypeInfo.needsExercise && ' on Bench Press'}
            </Text>
            <View style={styles.progressBarTrack}>
              <View style={[styles.progressBarFill, { width: `${progressPercent}%`, backgroundColor: activeTypeInfo.color }]} />
            </View>
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0F172A' },
  scrollContent: { paddingBottom: 60 },
  
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 16, paddingTop: 12, paddingBottom: 20
  },
  iconBtn: { padding: 8, marginLeft: -8 },
  headerTitle: { fontSize: 22, fontWeight: '800', color: '#F8FAFC', letterSpacing: -0.5, flex: 1, textAlign: 'center' },
  saveBtn: {
    backgroundColor: '#4F46E5', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20
  },
  saveBtnText: { color: '#FFF', fontSize: 14, fontWeight: '700' },

  sectionTitle: { fontSize: 16, fontWeight: '700', color: '#F8FAFC', marginHorizontal: 24, marginBottom: 12 },
  
  typesContainer: { paddingHorizontal: 24, gap: 10, marginBottom: 24 },
  typeCard: {
    flexDirection: 'row', alignItems: 'center', gap: 14, padding: 14,
    borderRadius: 16, backgroundColor: '#1E293B',
    borderWidth: 1.5, borderColor: 'rgba(248,250,252,0.08)'
  },
  typeEmojiBox: { width: 44, height: 44, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  emojiText: { fontSize: 22 },
  typeInfo: { flex: 1 },
  typeLabel: { fontSize: 15, fontWeight: '700', color: '#F8FAFC', marginBottom: 2 },
  typeDesc: { fontSize: 13, color: '#94A3B8' },
  radioCircle: {
    width: 24, height: 24, borderRadius: 12,
    borderWidth: 2, borderColor: 'rgba(248,250,252,0.2)',
    alignItems: 'center', justifyContent: 'center'
  },

  fieldSection: { paddingHorizontal: 24, marginBottom: 20 },
  fieldLabel: { fontSize: 14, fontWeight: '600', color: '#94A3B8', marginBottom: 8 },
  selectorBox: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 16, height: 56, borderRadius: 14,
    backgroundColor: '#1E293B', borderWidth: 1.5, borderColor: 'rgba(248,250,252,0.08)'
  },
  selectorText: { fontSize: 16, fontWeight: '600', color: '#F8FAFC' },

  valuesGrid: { flexDirection: 'row', paddingHorizontal: 24, gap: 12, marginBottom: 20 },
  valueCol: { flex: 1 },
  inputBox: {
    flexDirection: 'row', alignItems: 'center', gap: 8, paddingHorizontal: 14,
    height: 56, borderRadius: 14, backgroundColor: '#1E293B',
    borderWidth: 1.5, borderColor: 'rgba(248,250,252,0.08)'
  },
  numberInput: { flex: 1, fontSize: 24, fontWeight: '800', color: '#F8FAFC' },
  unitText: { fontSize: 14, color: '#94A3B8', fontWeight: '500' },

  previewBox: {
    marginHorizontal: 24, padding: 16, borderRadius: 16,
    backgroundColor: 'rgba(79,70,229,0.08)', borderWidth: 1.5, borderColor: 'rgba(79,70,229,0.2)',
    marginTop: 8
  },
  previewHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12 },
  previewTitle: { fontSize: 14, fontWeight: '700', color: '#F8FAFC' },
  previewText: { fontSize: 14, color: '#94A3B8', lineHeight: 22, marginBottom: 16 },
  progressBarTrack: { height: 8, borderRadius: 4, backgroundColor: 'rgba(248,250,252,0.1)', overflow: 'hidden' },
  progressBarFill: { height: '100%', borderRadius: 4, backgroundColor: '#4F46E5' }
});
