import { View, FlatList, Text } from 'react-native'
import React, { useEffect, useState, useCallback } from 'react'
import AttendanceCard from '@/components/Attendance/AttendanceCard'
import { useApiStore } from '@/utils/store'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated'
import { useFocusEffect } from 'expo-router'
import Skeleton from '@/components/Skeleton'

export default function Attendance() {
    const dataApi: [any] = useApiStore((state: any) => state.data);
    const [apiData, setApiData] = React.useState<Array<any>>([]);
    const tabBarHeight = useBottomTabBarHeight();
    const [animationKey, setAnimationKey] = useState(0);

    useFocusEffect(
        useCallback(() => {
            setAnimationKey(prev => prev + 1);
        }, [])
    );

    useEffect(() => {
        if (dataApi.length > 0) {
            setApiData(dataApi.slice(0, -1))
        }
    }, [dataApi])

    return (
        <SafeAreaView className='flex-1 bg-background' edges={['top', 'left', 'right']}>
            <View className='flex-1 px-4' key={animationKey}>
                <Animated.View entering={FadeInDown.delay(100).duration(500)}>
                    <Text className="text-4xl font-montserratExtraBold text-white my-6 text-left tracking-tighter">
                        Attendance
                        <Text className="text-primary">.</Text>
                    </Text>
                </Animated.View>
                <View className="flex-1 justify-center items-center">
                    {apiData.length === 0 ? (
                        <View className="w-full gap-4">
                            {[1, 2, 3, 4, 5, 6].map((i) => (
                                <Skeleton key={i} height={160} borderRadius={24} />
                            ))}
                        </View>
                    ) : (
                        <FlatList
                            keyExtractor={item => String(item.id)}
                            data={apiData}
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={{ paddingBottom: tabBarHeight + 20 }}
                            renderItem={({ item, index }) => (
                                <Animated.View entering={FadeInUp.delay(index * 100).springify()}>
                                    <AttendanceCard
                                        id={Number(item.id)}
                                        subjectName={String(item.cdata.course_name)}
                                        subjectCode={String(item.cdata.course_code)}
                                        total={Number(item.attendance_summary.Total)}
                                        percent={String(item.attendance_summary.Percent)}
                                        leave={Number(item.attendance_summary.Leave)}
                                        exempt={Number(item.attendance_summary.Exempt)}
                                        absent={Number(item.attendance_summary.Absent)}
                                        present={Number(item.attendance_summary.Present)}
                                    />
                                </Animated.View>
                            )} />
                    )}
                </View>
            </View>
        </SafeAreaView>
    )
}
