import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import AttendanceDetailCard from '@/components/Attendance/AttendanceDetailCard';
import { useAttData } from '@/utils/store';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import Skeleton from '@/components/Skeleton';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';

export default function SubAttDetails() {
    const attData = useAttData((state: any) => state.attData);
    const [data, setData] = useState<Array<any>>([]);
    const insets = useSafeAreaInsets();
    const router = useRouter();

    useEffect(() => {
        if (attData) {
            const sortedData = [...attData].sort((a, b) => new Date(b.start_time).getTime() - new Date(a.start_time).getTime());
            setData(sortedData);
        }
    }, [attData]);

    return (
        <View className='flex-1 bg-background' style={{ paddingTop: insets.top }}>
            {/* Header */}
            <View className="px-4 mb-2 mt-2">
                {/* <TouchableOpacity
                    onPress={() => router.back()}
                    activeOpacity={0.7}
                    className="flex-row items-center gap-1 mt-2 mb-1 self-start"
                >
                    <Ionicons name="chevron-back" size={18} color="rgba(255,255,255,0.5)" />
                    <Text className="text-white/50 font-montserratMedium text-sm">Attendance</Text>
                </TouchableOpacity> */}
                <Animated.View entering={FadeInDown.delay(100).duration(500)}>
                    <Text className="text-4xl font-montserratExtraBold text-white my-4 text-left tracking-tighter">
                        Detailed View<Text className="text-primary">.</Text>
                    </Text>
                </Animated.View>
            </View>

            <View className="flex-1 px-2">
                {data.length === 0 ? (
                    <View className="flex-1 flex-row flex-wrap justify-between px-2 gap-y-4">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
                            <Skeleton key={i} width={'23%'} height={80} borderRadius={12} />
                        ))}
                    </View>
                ) : (
                    <Animated.View className={'flex-1'} entering={FadeInUp.delay(100).springify()}>
                        <FlatList
                            data={data}
                            numColumns={4}
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item, index }) => (
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
    )
}
