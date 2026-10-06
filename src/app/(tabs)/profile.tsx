import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronRight, Edit3, User } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

const stats = [
  { label: "Workouts", value: "48" },
  { label: "Total Sets", value: "864" },
  { label: "Volume", value: "380k" },
  { label: "Streak", value: "12 days" },
];

export default function ProfileScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <LinearGradient
          colors={['rgba(79,70,229,0.2)', 'transparent']}
          style={styles.header}
        >
          <View style={styles.headerTop}>
            <Text style={styles.headerTitle}>Profile</Text>
            <TouchableOpacity onPress={() => router.push('/settings')} style={styles.iconBtn}>
              <Edit3 size={20} color="#94A3B8" />
            </TouchableOpacity>
          </View>

          {/* Avatar + info */}
          <View style={styles.profileInfo}>
            <View style={styles.avatarContainer}>
              <View style={styles.avatarBg}>
                <Text style={styles.avatarText}>AJ</Text>
              </View>
              <View style={styles.statusBadge}>
                <Text style={{color: 'white', fontSize: 10}}>✓</Text>
              </View>
            </View>
            <View style={styles.infoTextContainer}>
              <Text style={styles.nameText}>Alex Johnson</Text>
              <Text style={styles.emailText}>alex@example.com</Text>
              <View style={styles.levelBadge}>
                <Text style={styles.levelBadgeText}>🏋️ Intermediate Lifter</Text>
              </View>
            </View>
          </View>
        </LinearGradient>

        {/* Stats */}
        <View style={styles.section}>
          <View style={styles.statsGrid}>
            {stats.map(s => (
              <View key={s.label} style={styles.statBox}>
                <Text style={styles.statValue}>{s.value}</Text>
                <Text style={styles.statLabel}>{s.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Physical stats */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Physical Stats</Text>
          <View style={styles.card}>
            <View style={styles.statsRow}>
              {[
                { label: "Age", value: "27 yrs" },
                { label: "Height", value: "178 cm" },
                { label: "Weight", value: "82 kg" },
              ].map(s => (
                <View key={s.label} style={styles.statCol}>
                  <Text style={styles.physStatValue}>{s.value}</Text>
                  <Text style={styles.physStatLabel}>{s.label}</Text>
                </View>
              ))}
            </View>
            <View style={styles.divider} />
            <View style={styles.statsRow}>
              {[
                { label: "BMI", value: "25.9", status: "Normal" },
                { label: "Experience", value: "2.5 yrs", status: "Intermediate" },
              ].map(s => (
                <View key={s.label} style={styles.statCol}>
                  <Text style={styles.physStatValue2}>{s.value}</Text>
                  <Text style={styles.physStatLabel2}>
                    {s.label} • <Text style={styles.statusText}>{s.status}</Text>
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Goals summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Fitness Goals</Text>
          <View style={styles.goalsWrap}>
            {["💪 Build Strength", "🥩 Gain Muscle", "📈 Track PRs"].map(g => (
              <View key={g} style={styles.goalChip}>
                <Text style={styles.goalChipText}>{g}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Settings shortcut */}
        <View style={styles.section}>
          <TouchableOpacity onPress={() => router.push('/settings')} style={styles.settingsShortcut}>
            <View style={styles.settingsShortcutLeft}>
              <View style={styles.settingsIconWrap}>
                <User size={18} color="#4F46E5" />
              </View>
              <View>
                <Text style={styles.settingsTitle}>Account Settings</Text>
                <Text style={styles.settingsSubtitle}>Privacy, notifications & more</Text>
              </View>
            </View>
            <ChevronRight size={20} color="#94A3B8" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0F172A' },
  scrollContent: { paddingBottom: 40 },
  header: {
    paddingTop: 12, paddingHorizontal: 24, paddingBottom: 24,
  },
  headerTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 },
  headerTitle: { fontSize: 28, fontWeight: '800', color: '#F8FAFC' },
  iconBtn: { padding: 4 },
  
  profileInfo: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  avatarContainer: { position: 'relative' },
  avatarBg: { width: 80, height: 80, borderRadius: 24, backgroundColor: '#4F46E5', alignItems: 'center', justifyContent: 'center' },
  avatarText: { fontSize: 36, fontWeight: 'bold', color: 'white' },
  statusBadge: {
    position: 'absolute', bottom: -2, right: -2, width: 20, height: 20,
    borderRadius: 6, backgroundColor: '#22C55E', alignItems: 'center', justifyContent: 'center',
    borderWidth: 2, borderColor: '#0F172A'
  },
  infoTextContainer: { flex: 1 },
  nameText: { fontSize: 22, fontWeight: '800', color: '#F8FAFC', marginBottom: 4 },
  emailText: { fontSize: 14, color: '#94A3B8', marginBottom: 6 },
  levelBadge: {
    alignSelf: 'flex-start', paddingVertical: 4, paddingHorizontal: 10, borderRadius: 8,
    backgroundColor: 'rgba(79,70,229,0.15)',
  },
  levelBadgeText: { color: '#4F46E5', fontSize: 12, fontWeight: '600' },

  section: { paddingHorizontal: 24, marginBottom: 24 },
  statsGrid: { flexDirection: 'row', gap: 10, justifyContent: 'space-between' },
  statBox: {
    flex: 1, paddingVertical: 12, paddingHorizontal: 4, borderRadius: 14,
    backgroundColor: '#1E293B', borderWidth: 1.5, borderColor: '#334155', alignItems: 'center'
  },
  statValue: { fontSize: 16, fontWeight: '800', color: '#F8FAFC' },
  statLabel: { fontSize: 10, color: '#94A3B8', marginTop: 2 },

  sectionTitle: { fontSize: 16, fontWeight: '700', color: '#F8FAFC', marginBottom: 12 },
  card: { padding: 16, borderRadius: 18, backgroundColor: '#1E293B', borderWidth: 1.5, borderColor: '#334155' },
  statsRow: { flexDirection: 'row', justifyContent: 'space-between' },
  statCol: { alignItems: 'center', flex: 1 },
  physStatValue: { fontSize: 20, fontWeight: '800', color: '#4F46E5' },
  physStatLabel: { fontSize: 12, color: '#94A3B8', marginTop: 2 },
  divider: { height: 1, backgroundColor: '#334155', marginVertical: 16 },
  physStatValue2: { fontSize: 20, fontWeight: '800', color: '#F8FAFC' },
  physStatLabel2: { fontSize: 12, color: '#94A3B8', marginTop: 2 },
  statusText: { color: '#22C55E' },

  goalsWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  goalChip: {
    paddingVertical: 8, paddingHorizontal: 14, borderRadius: 24,
    backgroundColor: 'rgba(79,70,229,0.1)', borderWidth: 1, borderColor: 'rgba(79,70,229,0.2)'
  },
  goalChipText: { fontSize: 13, fontWeight: '500', color: '#F8FAFC' },

  settingsShortcut: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    padding: 16, borderRadius: 16, backgroundColor: '#1E293B',
    borderWidth: 1.5, borderColor: '#334155'
  },
  settingsShortcutLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  settingsIconWrap: { width: 36, height: 36, borderRadius: 10, backgroundColor: 'rgba(79,70,229,0.12)', alignItems: 'center', justifyContent: 'center' },
  settingsTitle: { fontSize: 15, fontWeight: '600', color: '#F8FAFC' },
  settingsSubtitle: { fontSize: 12, color: '#94A3B8' }
});
