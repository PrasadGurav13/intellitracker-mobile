import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Award, Bell, Calendar, ChevronRight, Dumbbell, Flame, Plus, Target, TrendingUp } from 'lucide-react-native';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native';
import { VictoryArea, VictoryAxis, VictoryChart, VictoryScatter } from 'victory-native';

const weeklyData = [
  { day: "Mon", volume: 8200 }, { day: "Tue", volume: 0 },
  { day: "Wed", volume: 11400 }, { day: "Thu", volume: 9800 },
  { day: "Fri", volume: 13200 }, { day: "Sat", volume: 0 },
  { day: "Sun", volume: 7600 },
];

const recentWorkouts = [
  { name: "Upper Body Push", date: "Today", sets: 18, volume: "7,600 kg", duration: "52 min", emoji: "🏋️‍♂️" },
  { name: "Leg Day", date: "Yesterday", sets: 22, volume: "13,200 kg", duration: "68 min", emoji: "🦵" },
  { name: "Back & Biceps", date: "Dec 8", sets: 16, volume: "9,800 kg", duration: "45 min", emoji: "💪" },
];

const prs = [
  { exercise: "Bench Press", weight: "110 kg", date: "Last week", color: "#4F46E5" },
  { exercise: "Squat", weight: "145 kg", date: "2 weeks ago", color: "#8B5CF6" },
  { exercise: "Deadlift", weight: "180 kg", date: "1 month ago", color: "#F97316" },
];

export default function DashboardScreen() {
  const router = useRouter();

  // Find max volume for simple chart scaling
  const maxVol = Math.max(...weeklyData.map(d => d.volume));

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Header section with gradient background */}
        <LinearGradient
          colors={['rgba(79,70,229,0.2)', 'transparent']}
          style={styles.headerGradient}
        >
          <View style={styles.headerTop}>
            <View>
              <Text style={styles.greeting}>Good morning 👋</Text>
              <Text style={styles.name}>Alex Johnson</Text>
            </View>
            <TouchableOpacity style={styles.bellBtn}>
              <Bell size={18} color="#94A3B8" />
              <View style={styles.badge} />
            </TouchableOpacity>
          </View>

          {/* Today's workout card */}
          <LinearGradient
            colors={['#4F46E5', '#7C3AED']}
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
            style={styles.heroCard}
          >
            <View style={styles.heroCardTop}>
              <View>
                <Text style={styles.heroCardLabel}>Today's Workout</Text>
                <Text style={styles.heroCardTitle}>Upper Body Push</Text>
              </View>
              <View style={styles.iconCircle}>
                <Dumbbell size={20} color="#FFF" />
              </View>
            </View>

            <View style={styles.heroStatsRow}>
              {[["18", "Sets"], ["52", "min"], ["7.6k", "kg"]].map(([val, label]) => (
                <View key={label}>
                  <Text style={styles.heroStatValue}>{val}</Text>
                  <Text style={styles.heroStatLabel}>{label}</Text>
                </View>
              ))}
            </View>

            <TouchableOpacity style={styles.heroBtn} onPress={() => router.push('/workout/1')}>
              <Text style={styles.heroBtnText}>View Workout →</Text>
            </TouchableOpacity>
          </LinearGradient>
        </LinearGradient>

        {/* Stats row */}
        <View style={styles.statsRow}>
          {[
            { label: "This Week", value: "4", unit: "workouts", Icon: Calendar, color: "#4F46E5" },
            { label: "Calories", value: "2,840", unit: "kcal", Icon: Flame, color: "#F97316" },
            { label: "Volume", value: "38.6k", unit: "kg total", Icon: TrendingUp, color: "#22C55E" },
          ].map(stat => (
            <View key={stat.label} style={styles.statBox}>
              <View style={styles.statBoxHeader}>
                <stat.Icon size={14} color={stat.color} />
                <Text style={styles.statBoxLabel}>{stat.label}</Text>
              </View>
              <Text style={styles.statBoxValue}>{stat.value}</Text>
              <Text style={styles.statBoxUnit}>{stat.unit}</Text>
            </View>
          ))}
        </View>

        {/* Weekly Chart (Simple Bar implementation) */}
        <View style={styles.section}>
          <View style={styles.card}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Weekly Volume</Text>
              <Text style={styles.chartSubtitle}>↗ 12% vs last week</Text>
            </View>

            <View style={styles.chartWrapper}>
              <VictoryChart
                width={Dimensions.get('window').width - 64}
                height={160}
                padding={{ top: 30, bottom: 30, left: 24, right: 24 }}
              >
                <VictoryArea
                  data={weeklyData}
                  x="day"
                  y="volume"
                  style={{
                    data: {
                      fill: "rgba(79,70,229,0.15)",
                      stroke: "#4F46E5",
                      strokeWidth: 3
                    }
                  }}
                  interpolation="monotoneX"
                />
                <VictoryScatter
                  data={weeklyData}
                  x="day"
                  y="volume"
                  size={5}
                  style={{
                    data: {
                      fill: "#1E293B",
                      stroke: "#4F46E5",
                      strokeWidth: 3
                    }
                  }}
                />
                <VictoryAxis
                  style={{
                    axis: { stroke: "transparent" },
                    ticks: { stroke: "transparent" },
                    tickLabels: { fontSize: 11, fill: '#94A3B8' }
                  }}
                />
              </VictoryChart>
            </View>
          </View>
        </View>

        {/* Active Goals */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Active Goals</Text>
            <TouchableOpacity style={styles.seeAllBtn}>
              <Text style={styles.seeAllText}>See all</Text>
              <ChevronRight size={14} color="#4F46E5" />
            </TouchableOpacity>
          </View>

          <View style={styles.goalsContainer}>
            {[
              { label: "Bench Press 120kg", progress: 92, current: "110kg", target: "120kg", color: "#4F46E5" },
              { label: "20 workouts/month", progress: 65, current: "13", target: "20", color: "#22C55E" },
            ].map(goal => (
              <View key={goal.label} style={styles.goalCard}>
                <View style={styles.goalTop}>
                  <View style={styles.goalTitleRow}>
                    <Target size={14} color={goal.color} />
                    <Text style={styles.goalLabel}>{goal.label}</Text>
                  </View>
                  <Text style={[styles.goalProgressText, { color: goal.color }]}>{goal.progress}%</Text>
                </View>

                <View style={styles.goalTrack}>
                  <View style={[styles.goalFill, { width: `${goal.progress}%`, backgroundColor: goal.color }]} />
                </View>

                <View style={styles.goalBottom}>
                  <Text style={styles.goalDetail}>Current: {goal.current}</Text>
                  <Text style={styles.goalDetail}>Target: {goal.target}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Recent Workouts */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Workouts</Text>
            <TouchableOpacity style={styles.seeAllBtn}>
              <Text style={styles.seeAllText}>See all</Text>
              <ChevronRight size={14} color="#4F46E5" />
            </TouchableOpacity>
          </View>

          <View style={styles.listContainer}>
            {recentWorkouts.map((w, index) => (
              <TouchableOpacity 
                key={w.name} 
                style={styles.listItem}
                onPress={() => router.push(`/workout/${index + 1}`)}
              >
                <View style={styles.emojiBox}>
                  <Text style={styles.emojiText}>{w.emoji}</Text>
                </View>
                <View style={styles.listBody}>
                  <Text style={styles.listTitle}>{w.name}</Text>
                  <Text style={styles.listSubtitle}>{w.date} • {w.sets} sets • {w.duration}</Text>
                </View>
                <View style={styles.listRight}>
                  <Text style={styles.listValue}>{w.volume}</Text>
                  <ChevronRight size={14} color="#94A3B8" />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* PRs */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Award size={18} color="#F97316" />
            <Text style={[styles.sectionTitle, { marginLeft: 8 }]}>Personal Records</Text>
          </View>

          <View style={styles.listContainer}>
            {prs.map(pr => (
              <View key={pr.exercise} style={styles.prItem}>
                <View style={styles.prLeft}>
                  <View style={[styles.prDot, { backgroundColor: pr.color }]} />
                  <Text style={styles.prTitle}>{pr.exercise}</Text>
                </View>
                <View style={styles.prRight}>
                  <Text style={[styles.prWeight, { color: pr.color }]}>{pr.weight}</Text>
                  <Text style={styles.prDate}>{pr.date}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.gridContainer}>
            {[
              { label: "New Workout", icon: "🏋️‍♂️", screen: "workout-create" },
              { label: "Browse Exercises", icon: "📚", screen: "exercise-library" },
              { label: "Set a Goal", icon: "🎯", screen: "goals-create" },
              { label: "View Progress", icon: "📈", screen: "goals-list" },
            ].map(action => (
              <TouchableOpacity key={action.label} style={styles.gridItem}>
                <Text style={styles.gridIcon}>{action.icon}</Text>
                <Text style={styles.gridLabel}>{action.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

      </ScrollView>

      {/* FAB */}
      <TouchableOpacity style={styles.fab}>
        <LinearGradient
          colors={['#4F46E5', '#6366F1']}
          style={styles.fabGradient}
        >
          <Plus size={24} color="#FFF" strokeWidth={2.5} />
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0F172A' },
  scrollContent: { paddingBottom: 100 },

  headerGradient: {
    padding: 24,
    paddingTop: 60, // approximate safe area
    paddingBottom: 24,
  },
  headerTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  greeting: { fontSize: 13, color: '#94A3B8', fontWeight: '500', marginBottom: 2 },
  name: { fontSize: 24, fontWeight: '800', color: '#F8FAFC', letterSpacing: -0.5 },
  bellBtn: {
    width: 40, height: 40, borderRadius: 12, backgroundColor: '#263348',
    borderWidth: 1.5, borderColor: 'rgba(248,250,252,0.08)',
    alignItems: 'center', justifyContent: 'center',
  },
  badge: {
    position: 'absolute', top: 8, right: 8, width: 8, height: 8, borderRadius: 4,
    backgroundColor: '#F97316', borderWidth: 2, borderColor: '#0F172A',
  },

  heroCard: {
    padding: 16, borderRadius: 20,
    shadowColor: '#4F46E5', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.35, shadowRadius: 24, elevation: 8,
  },
  heroCardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  heroCardLabel: { fontSize: 12, color: 'rgba(255,255,255,0.7)', marginBottom: 2 },
  heroCardTitle: { fontSize: 18, fontWeight: '700', color: '#FFF' },
  iconCircle: { width: 40, height: 40, borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.15)', alignItems: 'center', justifyContent: 'center' },
  heroStatsRow: { flexDirection: 'row', gap: 24, marginBottom: 16 },
  heroStatValue: { fontSize: 20, fontWeight: '800', color: '#FFF' },
  heroStatLabel: { fontSize: 11, color: 'rgba(255,255,255,0.65)' },
  heroBtn: {
    width: '100%', height: 38, borderRadius: 10, backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center', justifyContent: 'center',
  },
  heroBtnText: { color: '#FFF', fontSize: 14, fontWeight: '600' },

  statsRow: { flexDirection: 'row', paddingHorizontal: 24, gap: 12, marginBottom: 24 },
  statBox: {
    flex: 1, padding: 12, borderRadius: 16, backgroundColor: '#1E293B',
    borderWidth: 1.5, borderColor: 'rgba(248,250,252,0.08)',
  },
  statBoxHeader: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 8 },
  statBoxLabel: { fontSize: 10, fontWeight: '600', color: '#94A3B8' },
  statBoxValue: { fontSize: 20, fontWeight: '800', color: '#F8FAFC', marginBottom: 2 },
  statBoxUnit: { fontSize: 10, color: '#94A3B8' },

  section: { paddingHorizontal: 24, marginBottom: 24 },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: '#F8FAFC', flex: 1 },
  seeAllBtn: { flexDirection: 'row', alignItems: 'center', gap: 2 },
  seeAllText: { fontSize: 13, fontWeight: '600', color: '#4F46E5' },

  card: { padding: 16, borderRadius: 20, backgroundColor: '#1E293B', borderWidth: 1.5, borderColor: 'rgba(248,250,252,0.08)' },
  chartSubtitle: { fontSize: 12, color: '#94A3B8' },
  chartWrapper: { marginTop: -10, marginBottom: -20, marginHorizontal: -10 },

  goalsContainer: { gap: 10 },
  goalCard: { padding: 14, borderRadius: 16, backgroundColor: '#1E293B', borderWidth: 1.5, borderColor: 'rgba(248,250,252,0.08)' },
  goalTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  goalTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  goalLabel: { fontSize: 14, fontWeight: '600', color: '#F8FAFC' },
  goalProgressText: { fontSize: 13, fontWeight: '700' },
  goalTrack: { height: 6, borderRadius: 3, backgroundColor: '#263348', overflow: 'hidden' },
  goalFill: { height: '100%', borderRadius: 3 },
  goalBottom: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 },
  goalDetail: { fontSize: 11, color: '#94A3B8' },

  listContainer: { gap: 10 },
  listItem: {
    flexDirection: 'row', alignItems: 'center', padding: 14, borderRadius: 16,
    backgroundColor: '#1E293B', borderWidth: 1.5, borderColor: 'rgba(248,250,252,0.08)'
  },
  emojiBox: { width: 46, height: 46, borderRadius: 14, backgroundColor: 'rgba(79,70,229,0.12)', alignItems: 'center', justifyContent: 'center', marginRight: 14 },
  emojiText: { fontSize: 22 },
  listBody: { flex: 1 },
  listTitle: { fontSize: 15, fontWeight: '700', color: '#F8FAFC', marginBottom: 4 },
  listSubtitle: { fontSize: 12, color: '#94A3B8' },
  listRight: { alignItems: 'flex-end', flexDirection: 'row' },
  listValue: { fontSize: 13, fontWeight: '700', color: '#4F46E5', marginRight: 4 },

  prItem: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 14,
    borderRadius: 14, backgroundColor: '#1E293B', borderWidth: 1.5, borderColor: 'rgba(248,250,252,0.08)'
  },
  prLeft: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  prDot: { width: 8, height: 8, borderRadius: 4 },
  prTitle: { fontSize: 14, fontWeight: '600', color: '#F8FAFC' },
  prRight: { alignItems: 'flex-end' },
  prWeight: { fontSize: 15, fontWeight: '800', marginBottom: 2 },
  prDate: { fontSize: 11, color: '#94A3B8' },

  gridContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginTop: 12 },
  gridItem: {
    width: '48%', padding: 16, borderRadius: 16, backgroundColor: '#1E293B',
    borderWidth: 1.5, borderColor: 'rgba(248,250,252,0.08)', flexDirection: 'row', alignItems: 'center', gap: 10
  },
  gridIcon: { fontSize: 24 },
  gridLabel: { fontSize: 13, fontWeight: '700', color: '#F8FAFC' },

  fab: {
    position: 'absolute', right: 20, bottom: 20,
    shadowColor: '#4F46E5', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.45, shadowRadius: 20, elevation: 8,
  },
  fabGradient: {
    width: 56, height: 56, borderRadius: 20,
    alignItems: 'center', justifyContent: 'center',
  }
});
