import { LinearGradient } from 'expo-linear-gradient';
import { Zap } from 'lucide-react-native';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Svg, { Defs, RadialGradient, Rect, Stop } from 'react-native-svg';

const { width, height } = Dimensions.get('window');

export default function OnboardingScreen() {
  return (
    <View style={styles.container}>
      {/* Ambient background glows */}
      <Svg height={height} width={width} style={StyleSheet.absoluteFill}>
        <Defs>
          <RadialGradient id="purpleGlow" cx="15%" cy="8%" r="55%">
            <Stop offset="0%" stopColor="#5b4fd6" stopOpacity="0.35" />
            <Stop offset="100%" stopColor="#5b4fd6" stopOpacity="0" />
          </RadialGradient>
          <RadialGradient id="greenGlow" cx="92%" cy="97%" r="45%">
            <Stop offset="0%" stopColor="#2fae6b" stopOpacity="0.28" />
            <Stop offset="100%" stopColor="#2fae6b" stopOpacity="0" />
          </RadialGradient>
        </Defs>
        <Rect x="0" y="0" width={width} height={height} fill="url(#purpleGlow)" />
        <Rect x="0" y="0" width={width} height={height} fill="url(#greenGlow)" />
      </Svg>

      {/* Center content */}
      <View style={styles.content}>
        <View style={styles.iconWrapper}>
          <LinearGradient colors={['#8b7cf6', '#6c4fe0']} style={styles.iconBox}>
            <Zap size={44} color="#fff" />
          </LinearGradient>
        </View>

        <Text style={styles.title}>IntelliTracker</Text>
        <Text style={styles.subtitle}>Your intelligent fitness companion</Text>

        <View style={styles.dotsRow}>
          <View style={[styles.dot, styles.dotInactive]} />
          <View style={[styles.dot, styles.dotActive]} />
          <View style={[styles.dot, styles.dotInactive]} />
        </View>
      </View>

      {/* Bottom CTA */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity activeOpacity={0.85} onPress={() => { }}>
          <LinearGradient
            colors={['#8b7cf6', '#6c4fe0']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Get Started</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0d1a',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  iconWrapper: {
    marginBottom: 32,
    shadowColor: '#7c5cf0',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 24,
    elevation: 12,
  },
  iconBox: {
    width: 88,
    height: 88,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
    color: '#ffffff',
    marginBottom: 10,
    letterSpacing: 0.2,
  },
  subtitle: {
    fontSize: 15,
    color: '#8a8fa3',
    textAlign: 'center',
    marginBottom: 28,
  },
  dotsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginHorizontal: 4,
  },
  dotInactive: {
    backgroundColor: '#3a3d52',
  },
  dotActive: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#8b7cf6',
  },
  buttonContainer: {
    paddingHorizontal: 24,
    paddingBottom: 48,
  },
  button: {
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#6c4fe0',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.45,
    shadowRadius: 16,
    elevation: 8,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 17,
    fontWeight: '700',
  },
});