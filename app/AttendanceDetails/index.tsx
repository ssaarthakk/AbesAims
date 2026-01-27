import { View, Text, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import AttendanceDetailCard from '@/components/Attendance/AttendanceDetailCard';
import { useAttData } from '@/utils/store';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { FadeInUp } from 'react-native-reanimated';
import Skeleton from '@/components/Skeleton';

export default function SubAttDetails() {
    const attData = useAttData((state: any) => state.attData);
    const [data, setData] = useState<Array<any>>([]);
    const insets = useSafeAreaInsets();

    useEffect(() => {
        if (attData) {
            // Sort by date descending
            const sortedData = [...attData].sort((a, b) => new Date(b.start_time).getTime() - new Date(a.start_time).getTime());
            setData(sortedData);
        }
    }, [attData]);

    return (
        <View className='flex-1 bg-background px-1 pt-6'>
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
    )
}
