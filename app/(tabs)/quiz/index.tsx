import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { color_three, color_four } from '@/constants/Colors';
import QuizScreen from '@/components/QuizScreen';
import QuizWeb from '@/components/QuizWeb';

export default function QuizTab() {
  return (
    <LinearGradient 
      className='flex-1' 
      colors={[color_three, color_four, color_three]}
    >
      <QuizScreen />
    </LinearGradient>
  );
}