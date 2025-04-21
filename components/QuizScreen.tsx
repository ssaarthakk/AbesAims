import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { color_four, color_three } from '@/constants/Colors';

export default function QuizScreen() {
  return (
    <ScrollView className="flex-1">
      <View className="p-4">
        <Text className="text-2xl font-bold mb-4 text-white text-center">Quizzes</Text>
        <Text className="text-white text-center mb-6">Access your quizzes here</Text>
        
        {/* Quiz content will go here */}
        <View className="bg-white/20 p-4 rounded-lg mb-4">
          <Text className="text-white text-lg font-semibold">No active quizzes</Text>
          <Text className="text-white/80 mt-2">New quizzes will appear here when assigned</Text>
        </View>
      </View>
    </ScrollView>
  );
}