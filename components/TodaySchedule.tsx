import { Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getSchedule } from '@/utils/apicalls';
import ScheduleCard from './ScheduleCard';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function TodaySchedule({ scheduleData }: {scheduleData: Array<any>}) {

    const [date, _] = useState(new Date());
    const [arrayTimeDetails, setArrayTimeDetails] = useState<Array<any>>([]);

    const setNewData = () => {
        const newData = scheduleData.slice(1);
        const newDataFormatted: Array<{ faculty: string, subjectName: string, time: Array<string> }> = newData.map((item: any) => {
            const itemName = `c${date.getDate()}`;
            if (item[itemName].length === 0) {
                return null;
            } else {
                const timeRan = item[itemName];
                const timeRange = timeRan.match(/\d{2}:\d{2} - \d{2}:\d{2}/g);
                const infoArr = item.name_text.split('/');
                return {
                    faculty: infoArr[infoArr.length - 1].trim(),
                    subjectName: infoArr[2].trim(),
                    time: timeRange
                }
            }
        }).filter(value => value !== null)
        newDataFormatted.sort(function (a, b) {
            const timee = a.time[0].split(' - ');
            const timee1 = timee[0].split(':');
            const timee3 = b.time[0].split(' - ');
            const timee4 = timee3[0].split(':');
            return Number(timee1[0]) - Number(timee4[0]) + ((Number(timee1[0]) === Number(timee4[0])) ? Number(timee1[1]) - Number(timee4[1]) : 0);
        });
        setArrayTimeDetails(newDataFormatted)
    }

    useEffect(setNewData, [scheduleData]);

    return (
        <View className='mx-4 mb-4'>
            <View className='bg-color_surface rounded-2xl shadow-lg shadow-gray-200 border border-color_border overflow-hidden'>
                {/* Header */}
                <View className='bg-gradient-to-r from-primary-500 to-secondary-500 px-6 py-4'>
                    <View className='flex-row items-center justify-center gap-3'>
                        <Ionicons name="calendar-outline" size={24} color="white" />
                        <Text className='text-color_text_inverse text-lg font-montserratBold text-center'>
                            Today's Schedule
                        </Text>
                    </View>
                    <Text className='text-primary-100 text-sm font-montserratMedium text-center mt-1'>
                        {date.toLocaleDateString('en-US', { 
                            weekday: 'long', 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                        })}
                    </Text>
                </View>

                {/* Content */}
                <View className='p-6'>
                    {arrayTimeDetails.length === 0 ? (
                        <View className='items-center py-8'>
                            <View className='w-16 h-16 bg-gray-100 rounded-full items-center justify-center mb-4'>
                                <Ionicons name="calendar-clear-outline" size={32} color="#94a3b8" />
                            </View>
                            <Text className='text-color_text_secondary font-montserratMedium text-base text-center'>
                                No classes scheduled for today
                            </Text>
                            <Text className='text-color_text_muted font-montserrat text-sm text-center mt-1'>
                                Enjoy your free day!
                            </Text>
                        </View>
                    ) : (
                        <View className='space-y-3'>
                            {arrayTimeDetails.map((item, index) => (
                                <ScheduleCard 
                                    faculty={item.faculty} 
                                    subjectName={item.subjectName} 
                                    time={item.time} 
                                    key={index} 
                                />
                            ))}
                        </View>
                    )}
                </View>
            </View>
        </View>
    )
}