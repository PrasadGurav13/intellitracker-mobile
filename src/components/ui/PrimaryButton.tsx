import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, TouchableOpacityProps } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface PrimaryButtonProps extends TouchableOpacityProps {
  label: string;
  loading?: boolean;
}

export function PrimaryButton({ label, loading, disabled, ...props }: PrimaryButtonProps) {
  return (
    <TouchableOpacity 
      activeOpacity={0.8} 
      disabled={disabled || loading}
      {...props}
      style={[styles.shadow, props.style]}
    >
      <LinearGradient
        colors={disabled ? ['rgba(79,70,229,0.3)', 'rgba(79,70,229,0.3)'] : ['#4F46E5', '#6366F1']}
        start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
        style={styles.container}
      >
        {loading ? (
          <ActivityIndicator color="#FFF" />
        ) : (
          <Text style={styles.text}>{label}</Text>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#4F46E5',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 24,
    elevation: 8,
  },
  container: {
    height: 54,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  text: {
    color: '#FFF',
    fontWeight: '700',
    fontSize: 16,
  }
});
