import React, { useState } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Mail, Lock, User, Eye, EyeOff, ChevronLeft } from 'lucide-react-native';
import { Input } from '../../components/ui/Input';
import { PrimaryButton } from '../../components/ui/PrimaryButton';

export default function RegisterScreen() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRegister = () => {
    setError('');
    if (!name || !email || !password) {
      setError('Please fill in all fields');
      return;
    }
    
    setLoading(true);
    // Mock API call
    setTimeout(() => {
      setLoading(false);
      // Registration complete, navigate to onboarding flow
      router.push('/onboarding');
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
          <Text style={styles.title}>Create account</Text>
          <Text style={styles.subtitle}>Start your fitness journey today</Text>
        </View>

        <View style={styles.form}>
          <Input 
            label="Full name" 
            placeholder="Alex Johnson" 
            icon={<User size={18} color="#94A3B8" />} 
            value={name}
            onChangeText={setName}
          />

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
            placeholder="At least 8 characters" 
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
          
          {/* Password strength indicator mock */}
          <View style={styles.strengthContainer}>
            <View style={styles.strengthBars}>
              {[1, 2, 3, 4].map(i => (
                <View key={i} style={[styles.strengthBar, { backgroundColor: i <= 2 ? '#F97316' : '#263348' }]} />
              ))}
            </View>
            <Text style={styles.strengthText}>Medium strength</Text>
          </View>
        </View>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <View style={styles.footer}>
          <PrimaryButton label="Sign Up" onPress={handleRegister} loading={loading} />
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
  header: { marginBottom: 28 },
  title: { fontSize: 28, fontWeight: '800', color: '#F8FAFC', marginBottom: 6, letterSpacing: -0.5 },
  subtitle: { fontSize: 15, color: '#94A3B8' },
  form: { gap: 14 },
  strengthContainer: { marginTop: 4 },
  strengthBars: { flexDirection: 'row', gap: 4, marginBottom: 6 },
  strengthBar: { flex: 1, height: 4, borderRadius: 2 },
  strengthText: { fontSize: 12, color: '#F97316' },
  errorText: { color: '#EF4444', textAlign: 'center', marginTop: 16 },
  footer: { marginTop: 32 },
});
