import { Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getSchedule } from '@/utils/apicalls';
import ScheduleCard from '@/components/Common/ScheduleCard';

export default function TodaySchedule({ scheduleData }: {scheduleData: Array<any>}) {

    const [date, _] = useState(new Date());
    const [arrayTimeDetails, setArrayTimeDetails] = useState<Array<any>>([]);
    const [yesterdayArrayTimeDetails, setYesterdayArrayTimeDetails] = useState<Array<any>>([]);

    const setNewData = () => {
        const newData = scheduleData.slice(1);
        
        // Today's schedule
        const newDataFormatted: Array<{ faculty: string, subjectName: string, time: Array<string>, subjectId?: string }> = newData.map((item: any) => {
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
                    time: timeRange,
                    subjectId: item.cf_id?.toString() // Use cf_id as the subject ID
                };
            }
        }).filter(value => value !== null)
        
        // Yesterday's schedule
        const yesterday = new Date(date);
        yesterday.setDate(date.getDate() - 1);
        
        const yesterdayDataFormatted: Array<{ faculty: string, subjectName: string, time: Array<string>, subjectId?: string }> = newData.map((item: any) => {
            const itemName = `c${yesterday.getDate()}`;
            
            if (item[itemName] && item[itemName].length > 0) {
                const timeRan = item[itemName];
                const timeRange = timeRan.match(/\d{2}:\d{2} - \d{2}:\d{2}/g);
                const infoArr = item.name_text.split('/');
                
                return {
                    faculty: infoArr[infoArr.length - 1].trim(),
                    subjectName: infoArr[2].trim(),
                    time: timeRange,
                    subjectId: item.cf_id?.toString() // Use cf_id as the subject ID
                };
            }
            return null;
        }).filter(value => value !== null)
        
        // Sort today's schedule
        newDataFormatted.sort(function (a, b) {
            const timee = a.time[0].split(' - ');
            const timee1 = timee[0].split(':');
            const timee3 = b.time[0].split(' - ');
            const timee4 = timee3[0].split(':');
            return Number(timee1[0]) - Number(timee4[0]) + ((Number(timee1[0]) === Number(timee4[0])) ? Number(timee1[1]) - Number(timee4[1]) : 0);
        });
        
        // Sort yesterday's schedule
        yesterdayDataFormatted.sort(function (a, b) {
            const timee = a.time[0].split(' - ');
            const timee1 = timee[0].split(':');
            const timee3 = b.time[0].split(' - ');
            const timee4 = timee3[0].split(':');
            return Number(timee1[0]) - Number(timee4[0]) + ((Number(timee1[0]) === Number(timee4[0])) ? Number(timee1[1]) - Number(timee4[1]) : 0);
        });
        
        setArrayTimeDetails(newDataFormatted);
        setYesterdayArrayTimeDetails(yesterdayDataFormatted);
    }

    useEffect(setNewData, [scheduleData]);

    const yesterday = new Date(date);
    yesterday.setDate(date.getDate() - 1);

    return (
        <View>
            {/* Today's Schedule */}
            <View className='bg-color_five p-5 w-[90vw] rounded-xl h-auto shadow shadow-black drop-shadow-2xl mb-4'>
                <Text className='font-montserratSemiBold text-2xl text-center mb-1'>Time Table for {date.toDateString()}</Text>
                {
                    arrayTimeDetails.length === 0 ? (
                        <Text className='text-center font-montserratSemiBold text-xl'>No Schedule to display</Text>
                    ) : (
                        arrayTimeDetails.map((item, index) => (
                            <ScheduleCard 
                                faculty={item.faculty} 
                                subjectName={item.subjectName} 
                                time={item.time} 
                                subjectId={item.subjectId}
                                key={index} 
                            />
                        ))
                    )
                }
            </View>

            {/* Yesterday's Schedule for Testing */}
            <View className='bg-color_five p-5 w-[90vw] rounded-xl h-auto shadow shadow-black drop-shadow-2xl'>
                <Text className='font-montserratSemiBold text-2xl text-center mb-1'>Time Table for {yesterday.toDateString()} (Testing)</Text>
                {
                    yesterdayArrayTimeDetails.length === 0 ? (
                        <Text className='text-center font-montserratSemiBold text-xl'>No Schedule to display</Text>
                    ) : (
                        yesterdayArrayTimeDetails.map((item, index) => (
                            <ScheduleCard 
                                faculty={item.faculty} 
                                subjectName={item.subjectName} 
                                time={item.time} 
                                subjectId={item.subjectId}
                                key={`yesterday-${index}`} 
                            />
                        ))
                    )
                }
            </View>
        </View>
    )
}