import { View, FlatList, Text, Modal, TouchableOpacity } from 'react-native'
import React, { useEffect, useRef, useCallback, useState } from 'react'
import AttendanceCard from '@/components/Attendance/AttendanceCard'
import { useApiStore, useAttData } from '@/utils/store'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated'
import Skeleton from '@/components/Skeleton'
import { useFocusEffect } from 'expo-router'
import AttendanceDetailCard from '@/components/Attendance/AttendanceDetailCard'
import Ionicons from '@expo/vector-icons/Ionicons'

export default function Attendance() {
    const dataApi: [any] = useApiStore((state: any) => state.data);
    const [apiData, setApiData] = React.useState<Array<any>>([]);
    const insets = useSafeAreaInsets();
    const tabBarHeight = 70 + insets.bottom;
    const flatListRef = useRef<FlatList>(null);
    const attScrollOffset = useAttData((state: any) => state.attScrollOffset);
    const setAttScrollOffset = useAttData((state: any) => state.setAttScrollOffset);
    const attData = useAttData((state: any) => state.attData);
    const detailsVisible = useAttData((state: any) => state.detailsVisible);
    const setDetailsVisible = useAttData((state: any) => state.setDetailsVisible);
    const [detailData, setDetailData] = useState<Array<any>>([]);

    useEffect(() => {
        if (attData && detailsVisible) {
            const sorted = [...attData].sort((a: any, b: any) =>
                new Date(b.start_time).getTime() - new Date(a.start_time).getTime()
            );
            setDetailData(sorted);
        }
    }, [attData, detailsVisible]);

    useEffect(() => {
        if (dataApi.length > 0) {
            setApiData(dataApi.slice(0, -1))
        }
    }, [dataApi])

    useFocusEffect(
        useCallback(() => {
            if (attScrollOffset > 0 && flatListRef.current) {
                setTimeout(() => {
                    flatListRef.current?.scrollToOffset({ offset: attScrollOffset, animated: false });
                }, 50);
            }
        }, [attScrollOffset])
    );

    return (
        <SafeAreaView className='flex-1 bg-background' edges={['top', 'left', 'right']}>
            {/* Details Modal */}
            <Modal
                visible={detailsVisible}
                animationType="slide"
                onRequestClose={() => setDetailsVisible(false)}
                statusBarTranslucent
            >
                <View className='flex-1 bg-background' style={{ paddingTop: insets.top }}>
                    <View className="px-4">
                        {/* <TouchableOpacity
                            onPress={() => setDetailsVisible(false)}
                            activeOpacity={0.7}
                            className="flex-row items-center gap-1 mt-4 mb-1 self-start"
                        >
                            <Ionicons name="chevron-down" size={18} color="rgba(255,255,255,0.5)" />
                            <Text className="text-white/50 font-montserratMedium text-sm">Attendance</Text>
                        </TouchableOpacity> */}
                        <Animated.View entering={FadeInDown.delay(100).duration(500)}>
                            <Text className="text-4xl font-montserratExtraBold text-white my-4 text-left tracking-tighter">
                                Detailed View<Text className="text-primary">.</Text>
                            </Text>
                        </Animated.View>
                    </View>

                    <View className="flex-1 px-2">
                        {detailData.length === 0 ? (
                            <View className="flex-1 flex-row flex-wrap justify-between px-2 gap-y-4">
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
                                    <Skeleton key={i} width={'23%'} height={80} borderRadius={12} />
                                ))}
                            </View>
                        ) : (
                            <Animated.View className={'flex-1'} entering={FadeInUp.delay(100).springify()}>
                                <FlatList
                                    data={detailData}
                                    numColumns={4}
                                    showsVerticalScrollIndicator={false}
                                    contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}
                                    keyExtractor={(item, index) => index.toString()}
                                    renderItem={({ item }) => (
                                        <AttendanceDetailCard
                                            date={item.start_time}
                                            status={item.state}
                                        />
                                    )}
                                />
                            </Animated.View>
                        )}
                    </View>
                </View>
            </Modal>
            <View className='flex-1 px-4'>
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
                            ref={flatListRef}
                            keyExtractor={item => String(item.id)}
                            data={apiData}
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={{ paddingBottom: tabBarHeight + 20 }}
                            onScroll={(e) => setAttScrollOffset(e.nativeEvent.contentOffset.y)}
                            scrollEventThrottle={16}
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
