import { View, FlatList, Text, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState, useMemo, useCallback } from 'react'
import QuizCard from '@/components/Quiz/QuizCard'
import { getQuizDetails } from '@/utils/apicalls'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import { useApiStore } from '@/utils/store'
import Animated, { FadeInDown, FadeInRight, FadeInUp } from 'react-native-reanimated'
import { useFocusEffect } from 'expo-router'
import Skeleton from '@/components/Skeleton'

export default function Quizzes() {
    const [quizData, setQuizData] = useState<Array<any>>([]);
    const [selectedFilter, setSelectedFilter] = useState<string>('All');
    const tabBarHeight = useBottomTabBarHeight();
    const dataApi: any[] = useApiStore((state: any) => state.data);
    const [animationKey, setAnimationKey] = useState(0);
    const [loading, setLoading] = useState(true);

    useFocusEffect(
        useCallback(() => {
            setAnimationKey(prev => prev + 1);
        }, [])
    );

    useEffect(() => {
        const getQuizData = async () => {
            if (quizData.length === 0) {
                setLoading(true);
                try {
                    const data = await getQuizDetails();
                    if (data && data.length > 0) {
                        setQuizData(data);
                    } else {
                        setQuizData(data || []);
                    }
                } catch (e) {
                    console.log(e);
                } finally {
                    setLoading(false);
                }
            } else {
                setLoading(false);
            }
        }

        getQuizData();
    }, [])

    const getSubjectName = (courseCode: string) => {
        if (!dataApi || dataApi.length === 0) return undefined;
        const subject = dataApi.find((item: any) => item?.cdata?.course_code === courseCode);
        return subject?.cdata?.course_name;
    }

    // Extract unique subjects for filters with counts
    const filters = useMemo(() => {
        if (quizData.length === 0) return [{ label: 'All', count: 0 }];

        const counts: { [key: string]: number } = {};
        let othersCount = 0;

        quizData.forEach(item => {
            const name = getSubjectName(item.master_course_code);
            if (name) {
                counts[name] = (counts[name] || 0) + 1;
            } else {
                othersCount++;
            }
        });

        const sortedSubjects = Object.keys(counts).sort().map(name => ({
            label: name,
            count: counts[name]
        }));

        const result = [{ label: 'All', count: quizData.length }, ...sortedSubjects];
        if (othersCount > 0) {
            result.push({ label: 'Others', count: othersCount });
        }
        return result;
    }, [quizData, dataApi]);

    // Filtered data based on selection
    const filteredData = useMemo(() => {
        if (selectedFilter === 'All') return quizData;
        if (selectedFilter === 'Others') {
            return quizData.filter(item => !getSubjectName(item.master_course_code));
        }
        return quizData.filter(item => getSubjectName(item.master_course_code) === selectedFilter);
    }, [selectedFilter, quizData, dataApi]);

    return (
        <SafeAreaView className='flex-1 bg-background' edges={['top', 'left', 'right']}>
            <View className='flex-1' key={animationKey}>
                <View className="px-4">
                    <Animated.View entering={FadeInDown.delay(100).duration(500)}>
                        <Text className="text-4xl font-montserratExtraBold text-white my-6 text-left tracking-tighter">
                            Quizzes
                            <Text className="text-primary">.</Text>
                        </Text>
                    </Animated.View>
                </View>

                {/* Horizontal Filter Pills */}
                <View className="mb-4">
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ paddingHorizontal: 16, gap: 8 }}
                    >
                        {filters.map((filter, index) => (
                            <Animated.View
                                key={filter.label}
                                entering={FadeInRight.delay(index * 50 + 200).springify()}
                            >
                                <TouchableOpacity
                                    activeOpacity={1}
                                    onPress={() => setSelectedFilter(filter.label)}
                                    className={`flex-row px-4 py-2 rounded-full border justify-center items-center gap-2 ${selectedFilter === filter.label
                                        ? 'bg-primary border-primary'
                                        : 'bg-white/5 border-white/10'
                                        }`}
                                >
                                    <Text className={`font-montserratBold text-sm text-center ${selectedFilter === filter.label ? 'text-white' : 'text-white/60'
                                        }`}>
                                        {filter.label}
                                    </Text>
                                    <View className={`px-2 py-0.5 rounded-full ${selectedFilter === filter.label ? 'bg-white/20' : 'bg-white/10'
                                        }`}>
                                        <Text className={`text-[10px] font-montserratBold ${selectedFilter === filter.label ? 'text-white' : 'text-white/50'
                                            }`}>
                                            {filter.count}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            </Animated.View>
                        ))}
                    </ScrollView>
                </View>

                {loading ? (
                    <View className="px-4 gap-4">
                        {[1, 2, 3, 4].map((i) => (
                            <Skeleton key={i} height={140} borderRadius={24} />
                        ))}
                    </View>
                ) : quizData.length == 0 ? (
                    <View className="flex-1 justify-center items-center">
                        <Text className="text-white/50 font-montserratMedium">No quizzes found.</Text>
                    </View>
                ) : (
                    <FlatList
                        data={filteredData}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: tabBarHeight + 20, paddingHorizontal: 16 }}
                        renderItem={({ item, index }) => (
                            <Animated.View entering={FadeInUp.delay(index * 100 + 300).springify()}>
                                <QuizCard
                                    quizUc={item.quiz_uc}
                                    courseCode={item.master_course_code}
                                    markOb={item.marks_obtained}
                                    CorrectA={item.correct}
                                    IncorrectA={item.incorrect}
                                    NotAttempted={item.not_attempted}
                                    quizLink={item.quiz_link}
                                    subjectName={getSubjectName(item.master_course_code)}
                                />
                            </Animated.View>
                        )}
                        keyExtractor={(item, index) => item.sl_num + index}
                        ListEmptyComponent={
                            <View className="mt-10 items-center">
                                <Text className="text-white/50 font-montserratMedium">No quizzes found for this subject.</Text>
                            </View>
                        }
                    />
                )}
            </View>
        </SafeAreaView>
    )
}
