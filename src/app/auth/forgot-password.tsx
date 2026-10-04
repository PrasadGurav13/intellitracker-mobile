import React, { useState } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Mail, ChevronLeft, AlertCircle, CheckCircle } from 'lucide-react-native';
import { Input } from '../../components/ui/Input';
import { PrimaryButton } from '../../components/ui/PrimaryButton';

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleReset = () => {
    setError('');
    if (!email) {
      setError('Please enter your email address');
      return;
    }
    
    setLoading(true);
    // Mock API call
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 1500);
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <ChevronLeft size={20} color="#94A3B8" />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>

        <View style={styles.content}>
          {!sent ? (
            <>
              <View style={styles.iconCircle}>
                <Mail size={32} color="#4F46E5" />
              </View>
              
              <Text style={styles.title}>Forgot password?</Text>
              <Text style={styles.subtitle}>
                No worries! Enter your email and we'll send you reset instructions.
              </Text>

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
              </View>

              {error ? <Text style={styles.errorText}>{error}</Text> : null}

              <PrimaryButton 
                label="Send Reset Link" 
                onPress={handleReset} 
                loading={loading} 
                style={{ marginTop: 24, width: '100%' }}
              />

              <View style={styles.alertBox}>
                <AlertCircle size={16} color="#4F46E5" style={{ marginTop: 2 }} />
                <Text style={styles.alertText}>
                  Check your spam folder if you don't see the email within a few minutes.
                </Text>
              </View>
            </>
          ) : (
            <>
              <View style={styles.successIconCircle}>
                <CheckCircle size={32} color="#22C55E" />
              </View>
              
              <Text style={styles.title}>Check your email</Text>
              <Text style={styles.subtitle}>
                We've sent password reset instructions to {email}
              </Text>

              <PrimaryButton 
                label="Back to Login" 
                onPress={() => router.push('/auth/login')} 
                style={{ marginTop: 32, width: '100%' }}
              />
            </>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0F172A' },
  scrollContent: { flexGrow: 1, padding: 24, paddingTop: Platform.OS === 'ios' ? 60 : 24 },
  backButton: { flexDirection: 'row', alignItems: 'center', marginBottom: 24 },
  backText: { color: '#94A3B8', fontSize: 16, marginLeft: 4 },
  
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 50,
  },
  
  iconCircle: {
    width: 72, height: 72, borderRadius: 24,
    backgroundColor: 'rgba(79,70,229,0.12)',
    borderWidth: 1, borderColor: 'rgba(79,70,229,0.3)',
    alignItems: 'center', justifyContent: 'center',
    marginBottom: 24,
  },
  successIconCircle: {
    width: 72, height: 72, borderRadius: 24,
    backgroundColor: 'rgba(34,197,94,0.12)',
    borderWidth: 1, borderColor: 'rgba(34,197,94,0.3)',
    alignItems: 'center', justifyContent: 'center',
    marginBottom: 24,
  },
  
  title: { fontSize: 26, fontWeight: '800', color: '#F8FAFC', marginBottom: 10, letterSpacing: -0.5, textAlign: 'center' },
  subtitle: { fontSize: 15, color: '#94A3B8', textAlign: 'center', lineHeight: 24, marginBottom: 32 },
  
  form: { width: '100%' },
  errorText: { color: '#EF4444', textAlign: 'center', marginTop: 16 },
  
  alertBox: {
    marginTop: 24,
    padding: 16,
    borderRadius: 12,
    backgroundColor: 'rgba(79,70,229,0.08)',
    borderWidth: 1, borderColor: 'rgba(79,70,229,0.2)',
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    width: '100%',
  },
  alertText: {
    flex: 1,
    fontSize: 13,
    color: '#94A3B8',
    lineHeight: 20,
  }
});
