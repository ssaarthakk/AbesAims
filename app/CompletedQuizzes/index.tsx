import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { color_four, color_three } from '@/constants/Colors'
import QuizCard from '@/components/QuizCard'
import { getQuizDetails } from '@/utils/apicalls'
import { FlatList } from 'react-native-gesture-handler'

export default function CompletedQuizzes() {
  const [quizData, setQuizData] = useState<Array<any>>([]);

  useEffect(() => {
    const getQuizData = async () => {
      if (quizData.length === 0) {
        const data = await getQuizDetails();
        setQuizData(data);
      }
    }

    getQuizData();
  }, [])

  return (
    <LinearGradient className='flex-1 justify-center items-center' colors={[color_four, color_three]} start={{ x: 0.4, y: 0.4 }} end={{ x: 1, y: 1 }} >
      <View className='p-4'>
        <FlatList 
          data={quizData}
          renderItem={({ item }) => (
            <QuizCard
            quizUc={item.quiz_uc}
            courseCode={item.master_course_code}
            markOb={item.marks_obtained}
            CorrectA={item.correct}
            IncorrectA={item.incorrect}
            NotAttempted={item.not_attempted}
            quizLink={item.quiz_link}
            />
          )}
          keyExtractor={item => item.sl_num}
        />
      </View>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({})