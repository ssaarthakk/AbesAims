import { View, Text, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import AttendanceDetailCard from '@/components/Attendance/AttendanceDetailCard';
import { useAttData } from '@/utils/store';
import LoadinSvg from '@/components/Home/LoadinSvg';

export default function SubAttDetails() {
    const attData = useAttData((state: any) => state.attData);
    const [data, setData] = useState<Array<any>>([]);

    useEffect(() => {
        if (attData) {
            // Sort by date descending
            const sortedData = [...attData].sort((a, b) => new Date(b.start_time).getTime() - new Date(a.start_time).getTime());
            setData(sortedData);
        }
    }, [attData]);

    return (
        <View className='flex-1 bg-background px-2 pt-6'>
            {data.length === 0 ? (
                <View className="flex-1 justify-center items-center">
                    <LoadinSvg loading={true} color='#a855f7' size={96} />
                </View>
            ) : (
                <FlatList
                    data={data}
                    numColumns={3}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 20 }}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <AttendanceDetailCard
                            date={item.start_time}
                            status={item.state}
                        />
                    )}
                />
            )}
        </View>
    )
}
