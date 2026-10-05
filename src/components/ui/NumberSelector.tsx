import React, { useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, PanResponder } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface NumberSelectorProps {
  value: number;
  onChange: (val: number) => void;
  min: number;
  max: number;
  step?: number;
  unit: string;
}

export function NumberSelector({ value, onChange, min, max, step = 1, unit }: NumberSelectorProps) {
  const percentage = Math.max(0, Math.min(100, ((value - min) / (max - min)) * 100));
  
  const propsRef = useRef({ value, onChange, min, max, step });
  propsRef.current = { value, onChange, min, max, step };
  const trackWidth = useRef(0);
  const startValue = useRef(0);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (e) => {
        const { min, max, step, onChange } = propsRef.current;
        if (trackWidth.current > 0) {
          const locX = e.nativeEvent.locationX;
          const ratio = Math.max(0, Math.min(1, locX / trackWidth.current));
          let newVal = min + ratio * (max - min);
          newVal = Math.round(newVal / step) * step;
          newVal = Math.max(min, Math.min(max, newVal));
          onChange(newVal);
          startValue.current = newVal;
        }
      },
      onPanResponderMove: (e, gestureState) => {
        const { min, max, step, onChange } = propsRef.current;
        if (trackWidth.current > 0) {
          const ratioDelta = gestureState.dx / trackWidth.current;
          const valDelta = ratioDelta * (max - min);
          let newVal = startValue.current + valDelta;
          newVal = Math.round(newVal / step) * step;
          newVal = Math.max(min, Math.min(max, newVal));
          onChange(newVal);
        }
      },
    })
  ).current;

  return (
    <View style={styles.container}>
      <View style={styles.controlsRow}>
        <TouchableOpacity 
          style={styles.adjustBtn} 
          onPress={() => onChange(Math.max(min, value - step))}
        >
          <Text style={styles.adjustBtnText}>-</Text>
        </TouchableOpacity>

        <View style={styles.valueContainer}>
          <Text style={styles.valueText}>{value}</Text>
          <Text style={styles.unitText}>{unit}</Text>
        </View>

        <TouchableOpacity 
          style={styles.addBtn} 
          onPress={() => onChange(Math.min(max, value + step))}
        >
          <Text style={styles.addBtnText}>+</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.sliderContainer}>
        <View 
          style={styles.trackContainer} 
          onLayout={(e) => { trackWidth.current = e.nativeEvent.layout.width; }}
          {...panResponder.panHandlers}
        >
          <View style={styles.trackBackground} />
          <LinearGradient
            colors={['#4F46E5', '#6366F1']}
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
            style={[styles.trackFill, { width: `${percentage}%` }]}
          />
          <View style={[styles.thumb, { left: `${percentage}%` }]} pointerEvents="none" />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: 32,
    paddingVertical: 32,
  },
  controlsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 24,
  },
  adjustBtn: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: '#263348',
    borderWidth: 1.5,
    borderColor: 'rgba(248,250,252,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  adjustBtnText: {
    color: '#F8FAFC',
    fontSize: 24,
    fontWeight: '300',
  },
  addBtn: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: '#4F46E5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addBtnText: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: '300',
  },
  valueContainer: {
    alignItems: 'center',
    minWidth: 120,
  },
  valueText: {
    fontSize: 64,
    fontWeight: '800',
    color: '#F8FAFC',
    lineHeight: 72,
  },
  unitText: {
    fontSize: 18,
    color: '#4F46E5',
    fontWeight: '600',
  },
  sliderContainer: {
    width: '100%',
    paddingHorizontal: 24,
  },
  trackContainer: {
    width: '100%',
    height: 40, // Larger hit area
    justifyContent: 'center',
  },
  trackBackground: {
    position: 'absolute',
    left: 0, right: 0,
    height: 6,
    backgroundColor: '#263348',
    borderRadius: 3,
  },
  trackFill: {
    height: 6,
    borderRadius: 3,
  },
  thumb: {
    position: 'absolute',
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#4F46E5',
    marginLeft: -12, // Center thumb
    shadowColor: '#4F46E5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 6,
  }
});
