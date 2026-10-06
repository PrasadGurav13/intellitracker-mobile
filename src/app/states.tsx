import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ActivityIndicator } from 'react-native';
import { Dumbbell, AlertCircle, Wifi, RefreshCw, CheckCircle, ChevronLeft } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

export default function SystemStatesViewer() {
  const [activeState, setActiveState] = useState<'empty' | 'loading' | 'error' | 'success'>('empty');
  const router = useRouter();

  const renderState = () => {
    switch (activeState) {
      case 'empty':
        return (
          <View style={styles.centerLayout}>
            <View style={styles.iconContainer}>
              <Dumbbell size={40} color="#94A3B8" />
            </View>
            <Text style={styles.title}>No workouts yet</Text>
            <Text style={styles.description}>
              Your fitness journey starts here. Log your first workout to begin tracking your progress.
            </Text>
            <TouchableOpacity style={styles.primaryButton}>
              <LinearGradient colors={['#4F46E5', '#6366F1']} style={styles.gradientBg} start={{x: 0, y: 0}} end={{x: 1, y: 1}}>
                <Text style={styles.primaryButtonText}>Log First Workout 🏋️</Text>
              </LinearGradient>
            </TouchableOpacity>
            <Text style={styles.subtext}>or explore the exercise library to get ideas</Text>
          </View>
        );
      case 'loading':
        return (
          <View style={styles.centerLayout}>
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#4F46E5" style={{ transform: [{ scale: 1.5 }] }} />
            </View>
            <Text style={styles.title}>Loading your data</Text>
            <Text style={styles.description}>Syncing your workouts and progress...</Text>

            <View style={styles.skeletonContainer}>
              {[1, 2, 3].map(i => (
                <View key={i} style={styles.skeletonCard} />
              ))}
            </View>
          </View>
        );
      case 'error':
        return (
          <View style={styles.centerLayout}>
            <View style={styles.errorIconContainer}>
              <AlertCircle size={40} color="#EF4444" />
            </View>
            <Text style={styles.title}>Something went wrong</Text>
            <Text style={styles.description}>
              We couldn't load your workout data. Please check your connection and try again.
            </Text>
            <View style={styles.networkErrorBadge}>
              <Wifi size={14} color="#EF4444" />
              <Text style={styles.networkErrorText}>Network error — unable to connect</Text>
            </View>

            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.secondaryButton}>
                <Text style={styles.secondaryButtonText}>Go Back</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.errorButton}>
                <RefreshCw size={16} color="#FFF" style={{ marginRight: 8 }} />
                <Text style={styles.errorButtonText}>Try Again</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      case 'success':
        return (
          <View style={styles.centerLayout}>
            <View style={styles.successIconContainer}>
              <CheckCircle size={48} color="#22C55E" />
            </View>
            <Text style={styles.title}>Workout Complete! 🎉</Text>
            <Text style={styles.description}>
              Amazing session! You crushed it today. Here's your summary.
            </Text>

            <View style={styles.summaryCard}>
              <View style={styles.summaryGrid}>
                {[
                  { label: "Duration", value: "52 min", color: "#4F46E5" },
                  { label: "Total Sets", value: "18 sets", color: "#8B5CF6" },
                  { label: "Volume Lifted", value: "7,600 kg", color: "#22C55E" },
                  { label: "New PRs", value: "2 PRs 🔥", color: "#F97316" },
                ].map(s => (
                  <View key={s.label} style={styles.summaryBox}>
                    <Text style={[styles.summaryValue, { color: s.color }]}>{s.value}</Text>
                    <Text style={styles.summaryLabel}>{s.label}</Text>
                  </View>
                ))}
              </View>

              <View style={styles.streakBadge}>
                <Text style={styles.streakText}>🔥 12-day streak maintained! Keep it up!</Text>
              </View>
            </View>

            <TouchableOpacity style={styles.primaryButton}>
              <LinearGradient colors={['#22C55E', '#16A34A']} style={styles.gradientBg} start={{x: 0, y: 0}} end={{x: 1, y: 1}}>
                <Text style={styles.primaryButtonText}>View Full Summary</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.navHeader}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <ChevronLeft size={28} color="#94A3B8" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>System States</Text>
      </View>
      
      <View style={styles.tabs}>
        {(['empty', 'loading', 'error', 'success'] as const).map(state => (
          <TouchableOpacity 
            key={state} 
            style={[styles.tab, activeState === state && styles.activeTab]}
            onPress={() => setActiveState(state)}
          >
            <Text style={[styles.tabText, activeState === state && styles.activeTabText]}>
              {state.charAt(0).toUpperCase() + state.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      
      <View style={{flex: 1}}>
        {renderState()}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0F172A' },
  navHeader: { flexDirection: 'row', alignItems: 'center', padding: 16 },
  backBtn: { padding: 4, marginLeft: -4 },
  headerTitle: { fontSize: 20, fontWeight: '700', color: '#F8FAFC', marginLeft: 8 },
  tabs: { flexDirection: 'row', paddingHorizontal: 16, marginBottom: 16, gap: 8, justifyContent: 'space-between' },
  tab: { flex: 1, paddingVertical: 8, borderRadius: 20, backgroundColor: '#1E293B', borderWidth: 1, borderColor: '#334155', alignItems: 'center' },
  activeTab: { backgroundColor: 'rgba(79,70,229,0.15)', borderColor: '#4F46E5' },
  tabText: { color: '#94A3B8', fontWeight: '600', fontSize: 13 },
  activeTabText: { color: '#4F46E5' },

  centerLayout: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 32 },
  
  // Shared typography
  title: { fontSize: 24, fontWeight: '800', color: '#F8FAFC', marginBottom: 12, textAlign: 'center' },
  description: { fontSize: 15, color: '#94A3B8', textAlign: 'center', marginBottom: 32, lineHeight: 22 },
  subtext: { fontSize: 13, color: '#94A3B8', marginTop: 16, textAlign: 'center' },

  // Empty State
  iconContainer: { width: 100, height: 100, borderRadius: 32, backgroundColor: '#1E293B', borderWidth: 2, borderColor: '#334155', borderStyle: 'dashed', alignItems: 'center', justifyContent: 'center', marginBottom: 24 },
  primaryButton: { width: '100%', borderRadius: 16, overflow: 'hidden', shadowColor: '#4F46E5', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.35, shadowRadius: 24, elevation: 8 },
  gradientBg: { paddingVertical: 16, alignItems: 'center', justifyContent: 'center' },
  primaryButtonText: { color: 'white', fontWeight: '700', fontSize: 16 },

  // Loading State
  loadingContainer: { width: 80, height: 80, borderRadius: 40, borderWidth: 6, borderColor: '#1E293B', borderTopColor: '#4F46E5', alignItems: 'center', justifyContent: 'center', marginBottom: 24 },
  skeletonContainer: { width: '100%', marginTop: 32, gap: 12 },
  skeletonCard: { height: 72, borderRadius: 16, backgroundColor: '#1E293B', borderWidth: 1.5, borderColor: '#334155' },

  // Error State
  errorIconContainer: { width: 88, height: 88, borderRadius: 28, backgroundColor: 'rgba(239,68,68,0.1)', borderWidth: 1, borderColor: 'rgba(239,68,68,0.3)', alignItems: 'center', justifyContent: 'center', marginBottom: 24 },
  networkErrorBadge: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingVertical: 10, paddingHorizontal: 16, borderRadius: 10, backgroundColor: 'rgba(239,68,68,0.08)', marginBottom: 32 },
  networkErrorText: { fontSize: 13, color: '#EF4444' },
  buttonRow: { flexDirection: 'row', width: '100%', gap: 12 },
  secondaryButton: { flex: 1, height: 50, borderRadius: 14, backgroundColor: '#1E293B', borderWidth: 1.5, borderColor: '#334155', alignItems: 'center', justifyContent: 'center' },
  secondaryButtonText: { color: '#94A3B8', fontWeight: '600', fontSize: 14 },
  errorButton: { flex: 2, height: 50, borderRadius: 14, backgroundColor: '#EF4444', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  errorButtonText: { color: 'white', fontWeight: '700', fontSize: 14 },

  // Success State
  successIconContainer: { width: 100, height: 100, borderRadius: 32, backgroundColor: 'rgba(34,197,94,0.1)', borderWidth: 2, borderColor: 'rgba(34,197,94,0.3)', alignItems: 'center', justifyContent: 'center', marginBottom: 24 },
  summaryCard: { width: '100%', padding: 20, borderRadius: 20, backgroundColor: '#1E293B', borderWidth: 1.5, borderColor: '#334155', marginBottom: 24 },
  summaryGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 16 },
  summaryBox: { width: '45%', alignItems: 'center' },
  summaryValue: { fontSize: 22, fontWeight: '900' },
  summaryLabel: { fontSize: 12, color: '#94A3B8', marginTop: 2 },
  streakBadge: { marginTop: 16, padding: 12, borderRadius: 12, backgroundColor: 'rgba(34,197,94,0.08)', borderWidth: 1, borderColor: 'rgba(34,197,94,0.2)', alignItems: 'center' },
  streakText: { fontSize: 13, color: '#22C55E', fontWeight: '600' }
});
