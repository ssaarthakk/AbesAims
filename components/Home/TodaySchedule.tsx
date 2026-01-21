import { Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getSchedule } from '@/utils/apicalls';
import ScheduleCard from '@/components/Common/ScheduleCard';

export default function TodaySchedule({ scheduleData }: { scheduleData: Array<any> }) {

    const [date, _] = useState(new Date());
    const [arrayTimeDetails, setArrayTimeDetails] = useState<Array<any>>([]);

    const setNewData = () => {
        const newData = scheduleData.slice(1);

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
                    subjectId: item.cf_id?.toString()
                };
            }
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
        <View className='bg-surface/80 border border-white/10 p-5 w-[90vw] rounded-2xl h-auto shadow-xl shadow-black/40 backdrop-blur-md mb-20'>
            <Text className='font-montserratExtraBold text-2xl text-white mb-4 pl-1'>Time Table <Text className="text-base font-montserratMedium text-text-muted">for {date.toDateString()}</Text></Text>
            {
                arrayTimeDetails.length === 0 ? (
                    <Text className='text-center font-montserratSemiBold text-xl text-text-muted py-8'>No Schedule to display</Text>
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
    )
}