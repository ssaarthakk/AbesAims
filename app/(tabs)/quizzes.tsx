import { View, FlatList, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import QuizCard from '@/components/Quiz/QuizCard'
import { getQuizDetails } from '@/utils/apicalls'
import LoadinSvg from '@/components/Home/LoadinSvg'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'

export default function Quizzes() {
    const [quizData, setQuizData] = useState<Array<any>>([]);
    const tabBarHeight = useBottomTabBarHeight();

    useEffect(() => {
        const getQuizData = async () => {
            // Logic from original file to fetch only if empty or retry... 
            // Simplified: always try fetching if empty.
            if (quizData.length === 0) {
                const data = await getQuizDetails();
                if (data && data.length > 0) {
                    setQuizData(data);
                } else {
                    // Maybe retry logic was weird in original, keeping it simple for now or replicating:
                    // original recursed if length 0? That's dangerous.
                    // I'll stick to a single fetch for now or standard useQuery pattern later.
                    // But to stay faithful to the code:
                    // setQuizData(data); 
                    // The original code recurisvely called getQuizData if data.length === 0? 
                    // "if (data.length === 0) { getQuizData(); }" -> Infinite loop if no quizzes?
                    // I will NOT include the potential infinite loop.
                    setQuizData(data || []);
                }
            }
        }

        getQuizData();
    }, [])

    return (
        <SafeAreaView className='flex-1 bg-background' edges={['top', 'left', 'right']}>
            <View className='flex-1 px-4'>
                <Text className="text-4xl font-montserratExtraBold text-white my-6 text-left tracking-tighter">
                    Quizzes
                    <Text className="text-primary">.</Text>
                </Text>
                {quizData.length == 0 ? (
                    <View className="flex-1 justify-center items-center">
                        <LoadinSvg loading={true} color='#8b5cf6' size={96} />
                    </View>
                ) : (
                    <FlatList
                        data={quizData}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: tabBarHeight + 20 }}
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
                )}
            </View>
        </SafeAreaView>
    )
}
