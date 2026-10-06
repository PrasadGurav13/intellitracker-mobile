import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, ChevronRight, User, Bell, Shield, Moon, LogOut, Trash2 } from 'lucide-react-native';
import { useRouter } from 'expo-router';

function SettingRow({ icon, label, subtitle, value, onPress, color, danger }: any) {
  return (
    <TouchableOpacity onPress={onPress} disabled={!onPress} style={styles.settingRow}>
      <View style={[styles.settingIcon, danger ? { backgroundColor: 'rgba(239,68,68,0.12)' } : color ? { backgroundColor: `${color}20` } : { backgroundColor: '#263348' }]}>
        {icon}
      </View>
      <View style={styles.settingTextContent}>
        <Text style={[styles.settingLabel, danger && { color: '#EF4444' }]}>{label}</Text>
        {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
      </View>
      {value !== undefined ? value : <ChevronRight size={20} color="#94A3B8" />}
    </TouchableOpacity>
  );
}

export default function SettingsScreen() {
  const router = useRouter();
  const [pushNotifs, setPushNotifs] = useState(true);
  const [workoutReminders, setWorkoutReminders] = useState(true);
  const [prAlerts, setPrAlerts] = useState(true);
  const [publicProfile, setPublicProfile] = useState(false);
  const [isDark, setIsDark] = useState(true);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <ChevronLeft size={28} color="#94A3B8" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Settings</Text>
        </View>

        <View style={styles.sectionWrap}>
          {/* Account section */}
          <Text style={styles.sectionLabel}>ACCOUNT</Text>
          <View style={styles.card}>
            <SettingRow
              icon={<User size={18} color="#4F46E5" />}
              label="Edit Profile"
              subtitle="Name, photo, bio"
              color="#4F46E5"
            />
            <SettingRow
              icon={<Shield size={18} color="#8B5CF6" />}
              label="Privacy"
              subtitle="Control your data"
              color="#8B5CF6"
              value={<Switch value={publicProfile} onValueChange={setPublicProfile} trackColor={{ false: '#334155', true: '#4F46E5' }} />}
            />
          </View>

          {/* Notifications */}
          <Text style={styles.sectionLabel}>NOTIFICATIONS</Text>
          <View style={styles.card}>
            <SettingRow
              icon={<Bell size={18} color="#F97316" />}
              label="Push Notifications"
              subtitle="All app notifications"
              color="#F97316"
              value={<Switch value={pushNotifs} onValueChange={setPushNotifs} trackColor={{ false: '#334155', true: '#4F46E5' }} />}
            />
            <SettingRow
              icon={<Bell size={18} color="#94A3B8" />}
              label="Workout Reminders"
              subtitle="Daily workout nudges"
              value={<Switch value={workoutReminders} onValueChange={setWorkoutReminders} trackColor={{ false: '#334155', true: '#4F46E5' }} />}
            />
            <SettingRow
              icon={<Bell size={18} color="#94A3B8" />}
              label="PR Alerts"
              subtitle="Celebrate new records"
              value={<Switch value={prAlerts} onValueChange={setPrAlerts} trackColor={{ false: '#334155', true: '#4F46E5' }} />}
            />
          </View>

          {/* Appearance */}
          <Text style={styles.sectionLabel}>APPEARANCE</Text>
          <View style={styles.card}>
            <SettingRow
              icon={<Moon size={18} color="#94A3B8" />}
              label="Dark Mode"
              subtitle="Currently active"
              value={<Switch value={isDark} onValueChange={setIsDark} trackColor={{ false: '#334155', true: '#4F46E5' }} />}
            />
          </View>

          {/* Danger zone */}
          <Text style={[styles.sectionLabel, { color: '#EF4444' }]}>DANGER ZONE</Text>
          <View style={styles.card}>
            <SettingRow
              icon={<LogOut size={18} color="#EF4444" />}
              label="Sign Out"
              danger
              onPress={() => router.push('/')}
            />
            <SettingRow
              icon={<Trash2 size={18} color="#EF4444" />}
              label="Delete Account"
              subtitle="Permanently delete all data"
              danger
            />
          </View>

          {/* App info */}
          <View style={styles.appInfo}>
            <View style={styles.appIcon}>
              <Text style={styles.appIconText}>IT</Text>
            </View>
            <Text style={styles.appVersion}>IntelliTracker v1.0.0</Text>
            <Text style={styles.appCredit}>Built with ❤️ & ☕ for fitness enthusiasts</Text>

            <TouchableOpacity 
              onPress={() => router.push('/states')}
              style={{ marginTop: 24, padding: 12, backgroundColor: '#1E293B', borderRadius: 8, borderWidth: 1, borderColor: '#334155' }}
            >
              <Text style={{ color: '#94A3B8', fontWeight: '600' }}>🛠️ View System States</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0F172A' },
  scrollContent: { paddingBottom: 40 },
  header: { flexDirection: 'row', alignItems: 'center', padding: 16, paddingTop: 12, marginBottom: 8 },
  backBtn: { padding: 4, marginLeft: -4 },
  headerTitle: { fontSize: 22, fontWeight: '800', color: '#F8FAFC', marginLeft: 8 },

  sectionWrap: { paddingHorizontal: 24 },
  sectionLabel: { fontSize: 12, fontWeight: '700', color: '#94A3B8', marginBottom: 6, marginTop: 24, letterSpacing: 1 },
  card: { backgroundColor: '#1E293B', borderRadius: 18, paddingHorizontal: 16 },

  settingRow: { flexDirection: 'row', alignItems: 'center', gap: 14, paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: 'rgba(248,250,252,0.08)' },
  settingIcon: { width: 36, height: 36, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  settingTextContent: { flex: 1 },
  settingLabel: { fontSize: 15, fontWeight: '600', color: '#F8FAFC' },
  settingSubtitle: { fontSize: 12, color: '#94A3B8', marginTop: 2 },

  appInfo: { alignItems: 'center', paddingVertical: 32 },
  appIcon: { width: 40, height: 40, borderRadius: 12, backgroundColor: '#4F46E5', alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
  appIconText: { fontSize: 20, color: 'white', fontWeight: 'bold' },
  appVersion: { fontSize: 13, color: '#94A3B8', marginBottom: 4 },
  appCredit: { fontSize: 11, color: '#334155' }
});
