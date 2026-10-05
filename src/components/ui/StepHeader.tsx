import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ChevronLeft } from 'lucide-react-native';

interface StepHeaderProps {
  step: number;
  total: number;
  title: string;
  subtitle: string;
  onBack: () => void;
}

export function StepHeader({ step, total, title, subtitle, onBack }: StepHeaderProps) {
  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <ChevronLeft size={24} color="#94A3B8" />
        </TouchableOpacity>
        
        <View style={styles.progressContainer}>
          {Array.from({ length: total }).map((_, i) => (
            <View 
              key={i} 
              style={[
                styles.progressBar, 
                { backgroundColor: i < step ? '#4F46E5' : '#263348' }
              ]} 
            />
          ))}
        </View>
        
        <Text style={styles.stepText}>{step}/{total}</Text>
      </View>
      
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 24,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  backButton: {
    padding: 4,
    marginLeft: -4,
  },
  progressContainer: {
    flex: 1,
    flexDirection: 'row',
    gap: 6,
    paddingHorizontal: 16,
  },
  progressBar: {
    flex: 1,
    height: 4,
    borderRadius: 2,
  },
  stepText: {
    fontSize: 13,
    color: '#94A3B8',
    fontWeight: '500',
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#F8FAFC',
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 15,
    color: '#94A3B8',
    lineHeight: 24,
  }
});
