import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import RedesignedQuizCard from './RedesignedQuizCard'
import RedesignedSubjectDetailCard from './RedesignedSubjectDetailCard'
import RedesignedAttendanceOverview from './RedesignedAttendanceOverview'
import { LinearGradient } from 'expo-linear-gradient'

export default function RedesignedDashboard() {
  // Sample data - in a real app this would come from your API
  const quizData = {
    courseCode: "CS-101",
    quizUc: "Quiz-01",
    markOb: 18,
    CorrectA: 9,
    IncorrectA: 1,
    NotAttempted: 0,
    quizLink: 'href="https://example.com"'
  }
  
  const subjectData = {
    subjectName: "Computer Science Fundamentals",
    facultyName: "Dr. Smith Johnson",
    courseCode: "CS-101"
  }
  
  const attendanceData = {
    Present: 25,
    Total: 30,
    Percent: "83.33"
  }

  return (
    <LinearGradient 
      colors={['#f8f9fa', '#e9ecef']} 
      start={{ x: 0, y: 0 }} 
      end={{ x: 1, y: 1 }}
      className='flex-1'
    >
      <ScrollView className='p-4'>
        <Text className='font-montserratExtraBold text-3xl text-color_three mt-6 mb-2'>
          Welcome Back!
        </Text>
        <Text className='font-montserrat text-gray-600 mb-6'>
          Here's your academic overview
        </Text>
        
        <RedesignedAttendanceOverview 
          attendance={attendanceData} 
          classCount={2} 
        />
        
        <Text className='font-montserratBold text-2xl text-color_three mt-6 mb-4'>
          Recent Quiz Performance
        </Text>
        <RedesignedQuizCard {...quizData} />
        
        <Text className='font-montserratBold text-2xl text-color_three mt-6 mb-4'>
          Current Subjects
        </Text>
        <RedesignedSubjectDetailCard {...subjectData} />
      </ScrollView>
    </LinearGradient>
  )
}