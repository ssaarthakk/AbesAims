import { View, Text, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import AttendanceDetailCard from '@/components/Attendance/AttendanceDetailCard';
import { useAttData } from '@/utils/store';
import LoadinSvg from '@/components/Home/LoadinSvg';
import { SafeAreaView } from 'react-native-safe-area-context';

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

    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    return (
        <View className='flex-1 bg-background px-4'>
            {data.length === 0 ? (
                <View className="flex-1 justify-center items-center">
                    <LoadinSvg loading={true} color='#a855f7' size={96} />
                </View>
            ) : (
                <FlatList
                    data={data}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 20, paddingTop: 10 }}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => (
                        <AttendanceDetailCard
                            formattedDate={formatDate(item.start_time)}
                            facultyName={item.faculty_name || 'Unknown Faculty'}
                            status={item.state}
                            isLast={index === data.length - 1}
                        />
                    )}
                />
            )}
        </View>
    )
}
