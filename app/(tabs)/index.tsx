import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { color_three, color_four } from '@/constants/Colors';
import HomePage from '@/components/Home/HomePage';

export default function DashboardTab() {
  return (
    <LinearGradient 
      className='flex-1' 
      colors={[color_three, color_four, color_three]}
    >
      <HomePage />
    </LinearGradient>
  );
}
