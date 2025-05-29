import { StyleSheet, Text, ToastAndroid, View, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { fetchQuiz, getQuestionsForQuiz, submitAndExitQuiz } from '@/utils/apicalls';
import NoStartQuiz from './NoStartQuiz';
import { processQuizWithAI } from '@/utils/quizAIProcessor';
import { useRouter } from 'expo-router';

const QuizQuestion = ({ quizCode }: { quizCode: string }) => {
    const [quizData, setQuizData] = useState<any>(null);
    const [loginStart, setLoginStart] = useState<boolean>(false);
    const [quizStart, setQuizStart] = useState<boolean>(false);
    const [processing, setProcessing] = useState<boolean>(false);
    const [processingComplete, setProcessingComplete] = useState<boolean>(false);
    const [retryCount, setRetryCount] = useState<number>(0);
    
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
    };

    const processQuizAutomatically = async () => {
        if (!quizData || quizData.length === 0) {
            ToastAndroid.show('No questions available to process', ToastAndroid.LONG);
            return;
        }

        setProcessing(true);
        try {
            const result = await processQuizWithAI(quizData, quizCode);
            
            if (result.startsWith('success')) {
                // Quiz processed successfully
                ToastAndroid.show('Quiz completed successfully! Redirecting to quiz page...', ToastAndroid.LONG);
                setProcessingComplete(true);
                setProcessing(false);
                
                // Submit and exit the quiz
                await submitAndExitQuiz(quizCode);
            } else {
                // Quiz processing failed
                if (retryCount < 1) {
                    // Retry once
                    ToastAndroid.show('Processing failed. Retrying...', ToastAndroid.LONG);
                    setRetryCount(retryCount + 1);
                    setTimeout(() => {
                        processQuizAutomatically();
                    }, 2000);
                } else {
                    // Give up after retry
                    ToastAndroid.show('Could not process the quiz. Please try manually.', ToastAndroid.LONG);
                    setProcessing(false);
                    setProcessingComplete(false);
                }
            }
        } catch (error) {
            console.error('Error processing quiz:', error);
            ToastAndroid.show('Error processing quiz', ToastAndroid.LONG);
            setProcessing(false);
        }
    };

    // Effect to fetch quiz questions when quiz code is provided
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

                    setTimeout(fetchQuizData, (date2 - date1 < 0 ? 0 : date2 - date1) + 1000);
                } else {
                    const login: string = response.data.time_now;
                    const start: string = response.data.start_time;

                    const date1: any = new Date(login.replace(" ", "T"));
                    const date2: any = new Date(start.replace(" ", "T"));

                    setLoginStart(true);
                    setTimeout(fetchQuizQuestions, (date2 - date1 < 0 ? 0 : date2 - date1) + 1000);
                }
            } catch (error) {
                console.error('Error submitting quiz code', error);
                ToastAndroid.show('Failed to submit quiz code. Please try again.', ToastAndroid.LONG);
            }
        };

        fetchQuizData();
    }, [quizCode]);

    // Effect to automatically start processing when quiz questions are loaded
    useEffect(() => {
        if (quizStart && quizData && quizData.length > 0 && !processing && !processingComplete) {
            ToastAndroid.show('Starting automatic quiz processing...', ToastAndroid.LONG);
            processQuizAutomatically();
        }
    }, [quizStart, quizData]);    
    
    useEffect(() => {
        const router = useRouter();
        if (processingComplete) {
            // Pass quizCode as a URL parameter
            router.push({
                pathname: '/(tabs)/quiz/QuizWebView',
                params: { quizCode }
            });
        }
    }, [processingComplete, quizCode]);

    return (
        <View style={{ flex: 1 }}>
            {quizStart ? (
                <View className='flex-1 p-4'>
                    <Text className='font-montserratBold text-4xl text-center text-black pt-4 pb-6'>Auto Quizzes</Text>
                    
                    {processing ? (
                        <View className='flex-1 justify-center items-center'>
                            <ActivityIndicator size="large" color="#3498db" />
                            <Text className='font-montserratMedium text-lg text-center mt-4'>
                                Processing quiz answers with AI...
                            </Text>
                            <Text className='font-montserrat text-sm text-center mt-2 text-gray-600'>
                                This may take a minute. Please wait.
                            </Text>
                        </View>
                    ) : processingComplete ? (
                        <View className='flex-1 justify-center items-center'>
                            <Text className='font-montserratBold text-xl text-center text-green-600 mb-4'>
                                Quiz Completed Successfully!
                            </Text>
                            <Text className='font-montserrat text-center'>
                                Your answers have been submitted.
                            </Text>
                        </View>
                    ) : (
                        <View className='flex-1 justify-center items-center'>
                            <ActivityIndicator size="large" color="#3498db" />
                            <Text className='font-montserratMedium text-lg text-center mt-4'>
                                Preparing to process quiz...
                            </Text>
                        </View>
                    )}
                </View>
            ) : (
                <NoStartQuiz loginStart={loginStart} quizCode={quizCode} quizData={quizData} />
            )}
        </View>
    );
};

export default QuizQuestion;