import { StyleSheet, Text, ToastAndroid, View } from 'react-native'
import React, { useEffect } from 'react'
import { fetchQuiz, getQuestionsForQuiz } from '@/utils/apicalls';
import NoStartQuiz from './NoStartQuiz';

const QuizQuestion = ({ quizCode }: { quizCode: string }) => {

    const [quizData, setQuizData] = React.useState<any>(null);
    const [loginStart, setLoginStart] = React.useState<boolean>(false);
    const [quizStart, setQuizStart] = React.useState<boolean>(false);

    const fetchQuizQuestions = async () => {
        try {
            const response = await getQuestionsForQuiz(quizCode);
            ToastAndroid.show('Quiz started successfully', ToastAndroid.LONG);
            setQuizData(response.data);
            setQuizStart(true);
        } catch (error) {
            console.error('Error fetching quiz questions', error);
            ToastAndroid.show('Failed to fetch quiz questions. Please try again.', ToastAndroid.LONG);
        }
    }

    useEffect(() => {
        const fetchQuizData = async () => {
            if (!quizCode.trim()) {
                ToastAndroid.show('Please enter a quiz code', ToastAndroid.SHORT);
                return;
            }

            try {
                const response = await fetchQuiz(quizCode);
                if (response.message.startsWith('Login')) {
                    const now: string = response.data.now;
                    const login: string = response.data.login_time;

                    const date1: any = new Date(now.replace(" ", "T"));
                    const date2: any = new Date(login.replace(" ", "T"));

                    // setQuizData(response.data);

                    setTimeout(fetchQuizData, (date2 - date1 < 0? 0: date2 - date1) + 1000);

                } else {
                    const login: string = response.data.time_now;
                    const start: string = response.data.start_time;

                    const date1: any = new Date(login.replace(" ", "T"));
                    const date2: any = new Date(start.replace(" ", "T"));

                    // setQuizData(response.data);

                    setLoginStart(true);
                    setTimeout(fetchQuizQuestions, (date2 - date1 < 0? 0: date2 - date1) + 1000);
                }

            } catch (error) {
                console.error('Error submitting quiz code', error);
                ToastAndroid.show('Failed to submit quiz code. Please try again.', ToastAndroid.LONG);
            }
        }

        fetchQuizData();
    }, [])

    return (
        <View>
            {
                quizStart ? (
                    <View className='flex-1'>
                        <Text className='font-montserratBold text-4xl text-center text-black pt-4'>Quiz Questions</Text>
                        {/* {quizData.map((question: any, index: number) => (
                            <View key={index} className='p-2 border-b border-gray-300'>
                                <Text className='font-montserrat text-lg text-black'>{question.question}</Text>
                            </View>
                        ))} */}
                    </View>
                ) : (
                    <NoStartQuiz loginStart={loginStart} quizCode={quizCode} quizData={quizData} />
                )

            }
        </View>
    )
}

export default QuizQuestion