import React from 'react';
import { View, Text, TextInput, StyleSheet, TextInputProps } from 'react-native';

interface InputProps extends TextInputProps {
  label: string;
  icon?: React.ReactNode;
  trailing?: React.ReactNode;
  error?: string;
}

export function Input({ label, icon, trailing, error, ...props }: InputProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={[styles.inputContainer, error && styles.inputError]}>
        {icon && <View style={styles.icon}>{icon}</View>}
        <TextInput 
          style={styles.input} 
          placeholderTextColor="#64748B"
          {...props} 
        />
        {trailing && <View style={styles.trailing}>{trailing}</View>}
      </View>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: 6 },
  label: { fontSize: 13, fontWeight: '500', color: '#94A3B8' },
  inputContainer: {
    height: 52,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: 'rgba(248,250,252,0.08)',
    backgroundColor: '#263348',
  },
  inputError: {
    borderColor: '#EF4444',
  },
  input: {
    flex: 1,
    color: '#F8FAFC',
    fontSize: 15,
  },
  icon: {
    marginRight: 12,
  },
  trailing: {
    marginLeft: 12,
  },
  errorText: {
    color: '#EF4444',
    fontSize: 12,
    marginTop: 4,
  }
});
