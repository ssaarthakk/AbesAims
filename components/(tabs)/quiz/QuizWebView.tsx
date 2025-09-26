import { View } from 'react-native'
import QuizWeb from '@/components/Quiz/QuizWeb'
import { useLocalSearchParams } from 'expo-router';

const QuizWebView = () => {
  const { quizCode } = useLocalSearchParams<{ quizCode: string }>();

  const validQuizCode = quizCode || "";

  return (
    <View className='flex-1'>
      <QuizWeb quizCode={validQuizCode} />
    </View>
  )
}

export default QuizWebView;