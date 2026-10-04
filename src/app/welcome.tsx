import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Zap } from 'lucide-react-native';
import { useRouter } from 'expo-router';

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Background ambient gradient */}
      <LinearGradient
        colors={['rgba(79,70,229,0.2)', 'transparent']}
        style={styles.ambientBackground}
        pointerEvents="none"
      />

      <View style={styles.heroArea}>
        {/* Logo mark */}
        <View style={styles.logoShadow}>
          <LinearGradient
            colors={['#4F46E5', '#7C3AED']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.logoBox}
          >
            <Zap size={40} color="#FFF" fill="#FFF" />
          </LinearGradient>
        </View>

        <Text style={styles.title}>
          Track smarter.{'\n'}Train harder.
        </Text>
        
        <Text style={styles.subtitle}>
          Log workouts, track progress, and crush your fitness goals with AI-powered insights.
        </Text>

        {/* Feature pills */}
        <View style={styles.pillsContainer}>
          {["📊 Analytics", "🏋️ 500+ exercises", "🎯 Goal tracking"].map((f, i) => (
            <View key={i} style={styles.pill}>
              <Text style={styles.pillText}>{f}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* CTA area */}
      <View style={styles.ctaArea}>
        <TouchableOpacity 
          style={styles.primaryButtonShadow}
          activeOpacity={0.8}
          onPress={() => router.push('/auth/register')}
        >
          <LinearGradient
            colors={['#4F46E5', '#6366F1']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.primaryButton}
          >
            <Text style={styles.primaryButtonText}>Create Free Account</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.secondaryButton}
          activeOpacity={0.8}
          onPress={() => router.push('/auth/login')}
        >
          <Text style={styles.secondaryButtonText}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  ambientBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '60%',
  },
  heroArea: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  logoShadow: {
    shadowColor: '#4F46E5',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.4,
    shadowRadius: 32,
    elevation: 16,
    marginBottom: 24,
  },
  logoBox: {
    width: 80,
    height: 80,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#F8FAFC',
    textAlign: 'center',
    lineHeight: 38,
    letterSpacing: -0.5,
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: '#94A3B8',
    textAlign: 'center',
    lineHeight: 24,
  },
  pillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
    marginTop: 32,
  },
  pill: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 24,
    backgroundColor: 'rgba(79,70,229,0.12)',
    borderColor: 'rgba(79,70,229,0.3)',
    borderWidth: 1,
  },
  pillText: {
    color: '#F8FAFC',
    fontSize: 13,
    fontWeight: '500',
  },
  ctaArea: {
    paddingHorizontal: 24,
    paddingBottom: 50,
    gap: 12,
  },
  primaryButtonShadow: {
    shadowColor: '#4F46E5',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 24,
    elevation: 8,
  },
  primaryButton: {
    height: 54,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonText: {
    color: '#FFF',
    fontWeight: '700',
    fontSize: 16,
  },
  secondaryButton: {
    height: 54,
    borderRadius: 16,
    backgroundColor: 'rgba(248,250,252,0.06)',
    borderColor: 'rgba(248,250,252,0.1)',
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryButtonText: {
    color: '#F8FAFC',
    fontWeight: '600',
    fontSize: 16,
  },
});
