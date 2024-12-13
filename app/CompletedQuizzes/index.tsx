import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { color_four, color_three } from '@/constants/Colors'
import QuizCard from '@/components/QuizCard'
import { getQuizDetails } from '@/utils/apicalls'
import { FlatList } from 'react-native-gesture-handler'
import LoadinSvg from '@/components/LoadinSvg'

export default function CompletedQuizzes() {
  const [quizData, setQuizData] = useState<Array<any>>([]);

  useEffect(() => {
    const getQuizData = async () => {
      if (quizData.length === 0) {
        const data = await getQuizDetails();
        if (data.length === 0) {
          getQuizData();
        }
        setQuizData(data);
      }
    }

    getQuizData();
  }, [])

  return (
    <LinearGradient className='flex-1 justify-center items-center' colors={[color_three, color_four, color_three]} >
      <View className='p-4'>
        {
          quizData.length == 0 ? (
            <LoadinSvg loading={quizData.length == 0} color='black' size={96} />
          ) : (
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
          )
        }
      </View>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({})