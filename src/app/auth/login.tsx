import React, { useState } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Mail, Lock, Eye, EyeOff, ChevronLeft, Zap } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Input } from '../../components/ui/Input';
import { PrimaryButton } from '../../components/ui/PrimaryButton';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = () => {
    setError('');
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    
    setLoading(true);
    // Mock API call
    setTimeout(() => {
      setLoading(false);
      if (email === 'error@test.com') {
        setError('Invalid email or password');
      } else {
        router.push('/(tabs)/dashboard');
      }
    }, 1500);
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <ChevronLeft size={20} color="#94A3B8" />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>

        <View style={styles.header}>
          <LinearGradient colors={['#4F46E5', '#6366F1']} style={styles.iconBox}>
            <Zap size={24} color="#FFF" fill="#FFF" />
          </LinearGradient>
          <Text style={styles.title}>Welcome back</Text>
          <Text style={styles.subtitle}>Sign in to continue your journey</Text>
        </View>

        <View style={styles.form}>
          <Input 
            label="Email address" 
            placeholder="you@example.com" 
            icon={<Mail size={18} color="#94A3B8" />} 
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          
          <Input 
            label="Password" 
            placeholder="••••••••" 
            secureTextEntry={!showPw}
            icon={<Lock size={18} color="#94A3B8" />} 
            value={password}
            onChangeText={setPassword}
            trailing={
              <TouchableOpacity onPress={() => setShowPw(!showPw)} style={{ padding: 4 }}>
                {showPw ? <EyeOff size={18} color="#94A3B8" /> : <Eye size={18} color="#94A3B8" />}
              </TouchableOpacity>
            }
          />

          <TouchableOpacity style={styles.forgotBtn} onPress={() => router.push('/auth/forgot-password')}>
            <Text style={styles.forgotText}>Forgot password?</Text>
          </TouchableOpacity>
        </View>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <View style={styles.footer}>
          <PrimaryButton label="Sign In" onPress={handleLogin} loading={loading} />
          
          <View style={styles.dividerContainer}>
            <View style={styles.divider} />
            <Text style={styles.dividerText}>or continue with</Text>
            <View style={styles.divider} />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0F172A' },
  scrollContent: { flexGrow: 1, padding: 24, paddingTop: Platform.OS === 'ios' ? 60 : 24 },
  backButton: { flexDirection: 'row', alignItems: 'center', marginBottom: 32 },
  backText: { color: '#94A3B8', fontSize: 16, marginLeft: 4 },
  header: { marginBottom: 32 },
  iconBox: { width: 48, height: 48, borderRadius: 16, alignItems: 'center', justifyContent: 'center', marginBottom: 16 },
  title: { fontSize: 28, fontWeight: '800', color: '#F8FAFC', marginBottom: 6, letterSpacing: -0.5 },
  subtitle: { fontSize: 15, color: '#94A3B8' },
  form: { gap: 16 },
  forgotBtn: { alignSelf: 'flex-end', paddingVertical: 8 },
  forgotText: { color: '#4F46E5', fontSize: 14, fontWeight: '500' },
  errorText: { color: '#EF4444', textAlign: 'center', marginTop: 16 },
  footer: { marginTop: 32 },
  dividerContainer: { flexDirection: 'row', alignItems: 'center', marginVertical: 24 },
  divider: { flex: 1, height: 1, backgroundColor: 'rgba(248,250,252,0.08)' },
  dividerText: { color: '#94A3B8', fontSize: 13, paddingHorizontal: 16 },
});
