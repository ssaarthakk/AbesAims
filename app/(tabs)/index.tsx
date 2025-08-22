import React from 'react';
import { View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { color_background, color_primary, color_secondary } from '@/constants/Colors';
import HomePage from '@/components/HomePage';

export default function HomeScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: color_background }}>
      <HomePage />
    </View>
  );
}