import { Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import ScheduleCard from '@/components/Common/ScheduleCard';

export default function TodaySchedule({ scheduleData }: { scheduleData: Array<any> }) {

    const [date, _] = useState(new Date());
    const [arrayTimeDetails, setArrayTimeDetails] = useState<Array<any>>([]);

    const setNewData = () => {
        if (!scheduleData || scheduleData.length <= 1) return;
        const newData = scheduleData.slice(1);

        const newDataFormatted: Array<{ faculty: string, subjectName: string, time: Array<string>, subjectId?: string }> = newData.map((item: any) => {
            const itemName = `c${date.getDate()}`;
            if (!item || !item[itemName] || item[itemName].length === 0) return null;

            const timeRan = item[itemName];
            const timeRange = timeRan.match(/\d{2}:\d{2} - \d{2}:\d{2}/g);
            if (!item.name_text) return null;
            const infoArr = item.name_text.split('/');

            return {
                faculty: infoArr[infoArr.length - 1].trim(),
                subjectName: infoArr[2].trim(),
                time: timeRange || [],
                subjectId: item.cf_id?.toString()
            };
        }).filter(value => value !== null)

        newDataFormatted.sort(function (a, b) {
            const timee = a.time[0].split(' - ');
            const timee1 = timee[0].split(':');
            const timee3 = b.time[0].split(' - ');
            const timee4 = timee3[0].split(':');
            return Number(timee1[0]) - Number(timee4[0]) + ((Number(timee1[0]) === Number(timee4[0])) ? Number(timee1[1]) - Number(timee4[1]) : 0);
        });

        setArrayTimeDetails(newDataFormatted);
    }

    useEffect(setNewData, [scheduleData]);

    return (
        <View>
            <Text className="text-white/60 font-montserratSemiBold text-sm uppercase tracking-widest mb-6 ml-1">
                Timeline &bull; {date.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric' })}
            </Text>

            {arrayTimeDetails.length === 0 ? (
                <View className="bg-white/5 border border-white/10 rounded-2xl p-8 items-center justify-center border-dashed">
                    <Text className='font-montserratSemiBold text-white/40'>No classes scheduled for today.</Text>
                </View>
            ) : (
                <View className="pl-4">
                    {/* Vertical Line */}
                    <View className="absolute left-[29px] top-4 bottom-4 w-[2px] bg-white/10 rounded-full" />

                    {arrayTimeDetails.map((item, index) => {
                        const timeParts = item.time[0] ? item.time[0].split(' - ')[0] : '00:00';

                        return (
                            <View key={index} className="flex-row mb-6 relative">
                                {/* Time Column */}
                                <View className="w-16 pt-3 mr-4 items-end">
                                    <Text className="text-white font-montserratBold text-sm">{timeParts}</Text>
                                    <Text className="text-white/30 font-montserratMedium text-[10px] uppercase">Start</Text>
                                </View>

                                {/* Connector Dot */}
                                <View className="absolute left-[23px] top-[14px] z-10 bg-background p-1">
                                    <View className="w-3 h-3 rounded-full bg-primary border-2 border-primary shadow-lg shadow-primary/50" />
                                </View>

                                {/* Card */}
                                <View className="flex-1 bg-white/5 border border-white/10 rounded-2xl p-4 active:bg-white/10">
                                    <Text className="text-white font-montserratBold text-base mb-1" numberOfLines={1}>{item.subjectName}</Text>
                                    <View className="flex-row justify-between items-center">
                                        <Text className="text-white/50 font-montserratMedium text-xs">{item.faculty}</Text>
                                        <Text className="text-primary/80 font-montserratBold text-[10px] bg-primary/10 px-2 py-1 rounded-md">
                                            {item.time[0] || 'Unknown Time'}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        )
                    })}
                </View>
            )}
        </View>
    )
}