import { useLocalSearchParams, useRouter } from 'expo-router';
import { Award, Calendar, Check, ChevronLeft, Target, TrendingUp } from 'lucide-react-native';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Circle } from 'react-native-svg';
import { VictoryArea, VictoryAxis, VictoryChart, VictoryLine, VictoryScatter, VictoryTooltip, VictoryVoronoiContainer } from 'victory-native';

const goals = [
  { id: "1", name: "Bench Press 100kg", type: "Strength PR", progress: 85, current: 105, target: 100, unit: "kg", color: "#4F46E5", daysLeft: 45, status: "on-track", emoji: "🦍", exercise: "Bench Press" },
  { id: "2", name: "20 Workouts / Month", type: "Frequency", progress: 65, current: 13, target: 20, unit: "sessions", color: "#22C55E", daysLeft: 20, status: "on-track", emoji: "📅", exercise: null },
  { id: "3", name: "Squat 160kg", type: "Strength PR", progress: 88, current: 145, target: 160, unit: "kg", color: "#8B5CF6", daysLeft: 7, status: "at-risk", emoji: "🦵", exercise: "Squat" },
  { id: "4", name: "Lose 5kg Bodyweight", type: "Body Weight", progress: 60, current: 82, target: 80, unit: "kg", color: "#F97316", daysLeft: 45, status: "on-track", emoji: "⚖️", exercise: null },
  { id: "5", name: "Deadlift 200kg", type: "Strength PR", progress: 100, current: 200, target: 200, unit: "kg", color: "#22C55E", daysLeft: 0, status: "completed", emoji: "🏆", exercise: "Deadlift" },
];

const getProgressData = (goal: any) => {
  const isLossGoal = goal.type === "Body Weight";
  const start = isLossGoal ? goal.target * 1.15 : goal.target * 0.7;
  const data = [];
  const points = 6;

  for (let i = 0; i < points; i++) {
    const fraction = i / (points - 1);
    let val = start + (goal.current - start) * fraction;
    if (i > 0 && i < points - 1) {
      val += (i % 2 === 0 ? 1 : -1) * (goal.target * 0.015);
    }
    data.push({
      date: `Wk ${i + 1}`,
      value: Math.round(val * 10) / 10
    });
  }
  return data;
};

export default function GoalDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  // Find goal or fallback to first
  const goal = goals.find(g => g.id === id) || goals[0];

  const ringRadius = 40;
  const strokeWidth = 8;
  const circumference = 2 * Math.PI * ringRadius;
  const progressClamped = Math.max(0, Math.min(100, goal.progress));
  const strokeDashoffset = circumference - (circumference * progressClamped) / 100;

  const isLossGoal = goal.type === "Body Weight";
  const remainingValue = Math.max(0, isLossGoal ? goal.current - goal.target : goal.target - goal.current);
  const startValue = Math.round(isLossGoal ? goal.target * 1.15 : goal.target * 0.7);
  const improvement = Math.round(goal.current - startValue);

  const progressData = getProgressData(goal);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {/* Header Section */}
        <View style={[styles.headerSection, { backgroundColor: `${goal.color}15` }]}>
          <View style={styles.headerTop}>
            <TouchableOpacity onPress={() => router.back()} style={styles.iconBtn}>
              <ChevronLeft size={28} color="#94A3B8" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>{goal.name}</Text>
          </View>

          <View style={styles.overviewContainer}>
            {/* Progress Ring */}
            <View style={styles.ringContainer}>
              <Svg width={100} height={100} viewBox="0 0 100 100">
                <Circle cx="50" cy="50" r={ringRadius} fill="none" stroke="#1E293B" strokeWidth={strokeWidth} />
                <Circle
                  cx="50"
                  cy="50"
                  r={ringRadius}
                  fill="none"
                  stroke={goal.color}
                  strokeWidth={strokeWidth}
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  origin="50, 50"
                  rotation="-90"
                />
              </Svg>
              <View style={styles.ringTextContainer}>
                <Text style={[styles.ringPercent, { color: goal.color }]}>{goal.progress}%</Text>
              </View>
            </View>

            {/* Metrics Grid */}
            <View style={styles.metricsGrid}>
              {[
                { label: "Current", value: `${goal.current}${goal.unit}`, color: "#F8FAFC" },
                { label: "Target", value: `${goal.target}${goal.unit}`, color: goal.color },
                { label: "Remaining", value: `${remainingValue}${goal.unit}`, color: "#94A3B8" },
                { label: "Days Left", value: `${goal.daysLeft}d`, color: "#F97316" },
              ].map((s, i) => (
                <View key={i} style={styles.metricBox}>
                  <Text style={styles.metricLabel}>{s.label}</Text>
                  <Text style={[styles.metricValue, { color: s.color }]}>{s.value}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Progress Chart */}
        <View style={styles.chartSection}>
          <View style={styles.chartCard}>
            <View style={styles.chartHeader}>
              <Text style={styles.chartTitle}>Progress History</Text>
              <View style={styles.gainBadge}>
                <Text style={styles.gainText}>📈 {goal.progress}% {isLossGoal ? 'progress' : 'gain'}</Text>
              </View>
            </View>

            <View style={styles.chartContainer}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 10 }}>
                <VictoryChart
                  height={180}
                  width={Math.max(400, progressData.length * 80)}
                  padding={{ top: 10, bottom: 25, left: 0, right: 0 }}
                  domainPadding={{ x: 20, y: 30 }}
                  containerComponent={
                    <VictoryVoronoiContainer 
                      voronoiDimension="x"
                      voronoiBlacklist={["targetLine", "progressArea"]}
                      labels={({ datum }) => `${datum.date}\n${datum.value} ${goal.unit}`}
                      labelComponent={
                        <VictoryTooltip
                          renderInPortal={false}
                          style={{ fill: "#F8FAFC", fontSize: 11, fontWeight: "600", textAnchor: "middle" }}
                          flyoutStyle={{ fill: "#0F172A", stroke: goal.color, strokeWidth: 1.5, rx: 8, ry: 8 }}
                          pointerLength={8}
                          dy={-5}
                        />
                      }
                    />
                  }
                >
                  <VictoryAxis
                    style={{
                      axis: { stroke: "transparent" },
                      ticks: { stroke: "transparent" },
                      tickLabels: { fill: "#94A3B8", fontSize: 11, fontWeight: "600" }
                    }}
                  />
                  <VictoryLine
                    name="targetLine"
                    y={() => goal.target}
                    style={{
                      data: { stroke: goal.color, strokeWidth: 1.5, strokeDasharray: "4,4", opacity: 0.5 }
                    }}
                  />
                  <VictoryArea
                    name="progressArea"
                    data={progressData}
                    x="date"
                    y="value"
                    style={{
                      data: { fill: `${goal.color}30`, stroke: goal.color, strokeWidth: 2.5 }
                    }}
                  />
                  <VictoryScatter
                    name="progressScatter"
                    data={progressData}
                    x="date"
                    y="value"
                    size={5}
                    style={{ data: { fill: goal.color, stroke: "#1E293B", strokeWidth: 2 } }}
                  />
                </VictoryChart>
              </ScrollView>
            </View>
          </View>
        </View>

        {/* Statistics */}
        <View style={styles.statsSection}>
          <Text style={styles.sectionTitle}>Statistics</Text>
          <View style={styles.statsList}>
            {[
              { label: "Started with", value: `${startValue} ${goal.unit}`, icon: <TrendingUp size={18} color="#94A3B8" /> },
              { label: "Total improvement", value: `${improvement > 0 && !isLossGoal ? '+' : ''}${improvement} ${goal.unit}`, icon: <Award size={18} color="#22C55E" /> },
              { label: "Average change", value: `~2.1 ${goal.unit}/mo`, icon: <Calendar size={18} color="#4F46E5" /> },
              { label: "Projected comp.", value: "Dec 25", icon: <Target size={18} color="#F97316" /> },
            ].map((s, i) => (
              <View key={i} style={styles.statRow}>
                <View style={styles.statLabelRow}>
                  {s.icon}
                  <Text style={styles.statLabel}>{s.label}</Text>
                </View>
                <Text style={styles.statValue}>{s.value}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Milestones */}
        <View style={styles.milestoneSection}>
          <Text style={styles.sectionTitle}>Milestones</Text>
          {[
            { label: `Start (${startValue}${goal.unit})`, achieved: true, date: "Wk 1" },
            { label: `Quarter way`, achieved: goal.progress >= 25, date: "Wk 3" },
            { label: `Halfway`, achieved: goal.progress >= 50, date: "Wk 6" },
            { label: `Almost there`, achieved: goal.progress >= 90, date: "Wk 10" },
            { label: `Goal! 🏆 (${goal.target}${goal.unit})`, achieved: goal.progress >= 100, date: "Target" },
          ].map((m, i) => (
            <View key={i} style={styles.milestoneRow}>
              <View style={[styles.milestoneCheck, m.achieved ? styles.milestoneCheckAchieved : {}]}>
                {m.achieved ? <Check size={14} color="#22C55E" strokeWidth={3} /> : <View style={styles.milestoneCheckDot} />}
              </View>
              <Text style={[styles.milestoneLabel, m.achieved ? styles.milestoneLabelAchieved : {}]}>{m.label}</Text>
              <Text style={styles.milestoneDate}>{m.date}</Text>
            </View>
          ))}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0F172A' },
  scrollContent: { paddingBottom: 60 },

  headerSection: {
    paddingTop: 12, paddingBottom: 24, paddingHorizontal: 16,
    borderBottomLeftRadius: 30, borderBottomRightRadius: 30,
    marginBottom: 20
  },
  headerTop: { flexDirection: 'row', alignItems: 'center', marginBottom: 24 },
  iconBtn: { padding: 8, marginLeft: -8 },
  headerTitle: { fontSize: 20, fontWeight: '800', color: '#F8FAFC', flex: 1, marginLeft: 8 },

  overviewContainer: { flexDirection: 'row', alignItems: 'center', gap: 20, paddingHorizontal: 8 },
  ringContainer: { position: 'relative', width: 100, height: 100 },
  ringTextContainer: { ...StyleSheet.absoluteFillObject, alignItems: 'center', justifyContent: 'center' },
  ringPercent: { fontSize: 20, fontWeight: '900' },

  metricsGrid: { flex: 1, flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  metricBox: {
    width: '48%', padding: 10, borderRadius: 12,
    backgroundColor: '#1E293B', borderWidth: 1, borderColor: 'rgba(248,250,252,0.08)'
  },
  metricLabel: { fontSize: 11, color: '#94A3B8', marginBottom: 2 },
  metricValue: { fontSize: 15, fontWeight: '800' },

  chartSection: { paddingHorizontal: 24, marginBottom: 24 },
  chartCard: {
    padding: 16, borderRadius: 20, backgroundColor: '#1E293B',
    borderWidth: 1.5, borderColor: 'rgba(248,250,252,0.08)'
  },
  chartHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  chartTitle: { fontSize: 15, fontWeight: '700', color: '#F8FAFC' },
  gainBadge: { backgroundColor: 'rgba(34,197,94,0.15)', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  gainText: { color: '#22C55E', fontSize: 12, fontWeight: '700' },
  chartContainer: { height: 180, marginLeft: -10, marginRight: -10 },

  statsSection: { paddingHorizontal: 24, marginBottom: 24 },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: '#F8FAFC', marginBottom: 12 },
  statsList: { gap: 10 },
  statRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingVertical: 14, paddingHorizontal: 16, borderRadius: 14,
    backgroundColor: '#1E293B', borderWidth: 1.5, borderColor: 'rgba(248,250,252,0.08)'
  },
  statLabelRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  statLabel: { fontSize: 14, color: '#94A3B8', fontWeight: '500' },
  statValue: { fontSize: 15, fontWeight: '700', color: '#F8FAFC' },

  milestoneSection: { paddingHorizontal: 24, marginBottom: 24 },
  milestoneRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 12 },
  milestoneCheck: {
    width: 28, height: 28, borderRadius: 8, backgroundColor: '#1E293B',
    borderWidth: 2, borderColor: 'rgba(248,250,252,0.08)',
    alignItems: 'center', justifyContent: 'center'
  },
  milestoneCheckAchieved: { backgroundColor: 'rgba(34,197,94,0.15)', borderColor: '#22C55E' },
  milestoneCheckDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: 'rgba(248,250,252,0.08)' },
  milestoneLabel: { flex: 1, fontSize: 14, color: '#94A3B8', fontWeight: '500' },
  milestoneLabelAchieved: { color: '#F8FAFC', fontWeight: '600' },
  milestoneDate: { fontSize: 12, color: '#94A3B8' }
});
