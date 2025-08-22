import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { color_background } from '@/constants/Colors';
import QuizScreen from '@/components/QuizScreen';
import QuizWeb from '@/components/QuizWeb';
import { View } from 'react-native';

export default function QuizTab() {
  return (
    <View style={{ flex: 1, backgroundColor: color_background }}>
      <QuizScreen />
    </View>
  );
}