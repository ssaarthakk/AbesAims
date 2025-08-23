import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import QuizWeb from '@/components/Quiz/QuizWeb'
import { useLocalSearchParams } from 'expo-router';

const QuizWebView = () => {
  // Get the quiz code from URL parameters
  const { quizCode } = useLocalSearchParams<{ quizCode: string }>();

  // Fallback to a default value if somehow the parameter is missing
  const validQuizCode = quizCode || "";

  return (
    <View style={styles.container}>
      <QuizWeb quizCode={validQuizCode} />
    </View>
  )
}

export default QuizWebView;

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});