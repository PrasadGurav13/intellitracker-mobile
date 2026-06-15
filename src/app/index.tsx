import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Zap } from 'lucide-react-native';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Svg, { Defs, RadialGradient, Rect, Stop } from 'react-native-svg';

// Let's define the colors you used in your web design
const COLORS = {
  background: '#0F172A',
  text: '#FFFFFF',     // Assuming C.text was white for a dark theme
  muted: '#94A3B8',    // Assuming C.muted was slate-400
  indigo: '#4F46E5',   // Primary indigo
};

export default function SplashScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={[styles.glow, { top: -100, left: -100, width: 400, height: 400 }]}>
        <Svg height="100%" width="100%">
          <Defs>
            <RadialGradient id="grad1" cx="50%" cy="50%" rx="50%" ry="50%">
              <Stop offset="0%" stopColor="rgba(79,70,229,0.25)" />
              <Stop offset="70%" stopColor="transparent" />
            </RadialGradient>
          </Defs>
          <Rect width="100%" height="100%" fill="url(#grad1)" />
        </Svg>
      </View>
      {/* Bottom Right Glow */}
      <View style={[styles.glow, { bottom: -80, right: -80, width: 300, height: 300 }]}>
        <Svg height="100%" width="100%">
          <Defs>
            <RadialGradient id="grad2" cx="50%" cy="50%" rx="50%" ry="50%">
              <Stop offset="0%" stopColor="rgba(34,197,94,0.15)" />
              <Stop offset="70%" stopColor="transparent" />
            </RadialGradient>
          </Defs>
          <Rect width="100%" height="100%" fill="url(#grad2)" />
        </Svg>
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.logoShadow}>
          <LinearGradient
            colors={['#4F46E5', '#7C3AED']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.logoContainer}>
            <Zap size={44} color="#FFF" strokeWidth={2.5} fill="#FFF" />
          </LinearGradient>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>IntelliTracker</Text>
          <Text style={styles.subtitle}>Your intelligent fitness companion</Text>
        </View>
        <View style={styles.dotsContainer}>
          {[0, 1, 2].map(i => (
            <View
              key={i}
              style={[
                styles.dot,
                { backgroundColor: i === 1 ? COLORS.indigo : 'rgba(79,70,229,0.3)' }
              ]}
            />
          ))}
        </View>
      </View>
      <TouchableOpacity
        style={styles.buttonShadow}
        activeOpacity={0.8}
        onPress={() => router.push('/')}
      >
        <LinearGradient
          colors={['#4F46E5', '#6366F1']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.buttonContainer}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // This is like height: "100%"
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    alignItems: 'center',
    gap: 24, // Replaces Tailwind's gap-6
  },
  logoShadow: {
    // iOS Shadows
    shadowColor: '#4F46E5',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    // Android Shadow
    elevation: 15,
  },
  logoContainer: {
    width: 88,
    height: 88,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 34,
    fontWeight: '800',
    color: COLORS.text,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 15,
    color: COLORS.muted,
    marginTop: 8,
  },
  dotsContainer: {
    flexDirection: 'row', // Replaces flex-row
    gap: 8, // Replaces gap-2
    marginTop: 32, // Replaces mt-8
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  glow: {
    position: 'absolute',
    pointerEvents: 'none', // Ensures glows don't block touches
  },
  buttonShadow: {
    position: 'absolute',
    bottom: 80,
    // iOS Shadow
    shadowColor: '#4F46E5',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 24,
    // Android Shadow
    elevation: 8,
  },
  buttonContainer: {
    paddingVertical: 14,
    paddingHorizontal: 48,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: 16,
  },
});
