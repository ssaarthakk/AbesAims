import { Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'

const NextClass = ({ scheduleData }: { scheduleData: Array<any> }) => {
    const [data, setData] = useState<Array<{ faculty: string; subjectName: string; time: string[]; }>>([]);
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        setDate(new Date());
    }, [data]);

    useEffect(() => {
        const newData = scheduleData.slice(1);

        const newDataFormatted: any = newData.map((item: any) => {
            const itemName = `c${date.getDate()}`;
            if (item[itemName].length === 0) {
                return null;
            } else {
                const infoArr = item.name_text.split('/');
                const timeRan: string = item[itemName];
                const timeRange = timeRan.match(/\d{2}:\d{2} - \d{2}:\d{2}/g);
                return {
                    faculty: infoArr[infoArr.length - 1].trim(),
                    subjectName: infoArr[2].trim(),
                    time: timeRange
                };
            }
        }).filter(value => value !== null);

        newDataFormatted.sort(function (a: { faculty: string, subjectName: string, time: Array<string> }, b: { faculty: string, subjectName: string, time: Array<string> }) {
            const timee = a.time[0].split(' - ');
            const timee1 = timee[0].split(':');
            const timee3 = b.time[0].split(' - ');
            const timee4 = timee3[0].split(':');
            return Number(timee1[0]) - Number(timee4[0]) + ((Number(timee1[0]) === Number(timee4[0])) ? Number(timee1[1]) - Number(timee4[1]) : 0);
        });

        const newDataAgain: { faculty: string, subjectName: string, time: Array<string> }[] = newDataFormatted.map((item: { faculty: string, subjectName: string, time: Array<string> }) => {
            const timee = item.time[0].split(' - ');
            const timee3 = timee[0].split(':');
            console.log(timee3[0], timee3[1]);
            
            if (date.getHours() === +(timee3[0])) {
                if (date.getMinutes() < +(timee3[1])) {
                    return item;
                }
            } else if (date.getHours() === (+(timee3[0]) + 1)) {
                return item;
            }

            if (item.time.length > 1) {
                const timee2 = item.time[1]!.split(' - ');
                const timee4 = timee2[0].split(':');
                console.log(timee4[0], timee4[1]);
                if (+(timee4[0]) === date.getHours()) {
                    if (date.getMinutes() < +(timee4[1])) {
                        return { ...item, time: item.time.slice(1) };
                    }
                } else if (date.getHours() === +(timee4[0]) + 1) {
                    return { ...item, time: item.time.slice(1) };
                }
            }

            return null;
        }).filter((value: any) => value !== null);

        setData(newDataAgain)
    }, [scheduleData]);
    return (
        <View className='bg-gray-200 w-[90vw] rounded-md h-auto shadow shadow-black drop-shadow-2xl'>
            {
                data.length !== 0 ? (
                    <View className='rounded-md p-4 flex gap-0'>
                        <Text className='pb-2 font-montserratBold text-2xl'>Next Class</Text>
                        <Text className='font-montserratSemiBold text-xl'>{data[0].faculty}</Text>
                        <Text className='font-montserrat text-xl'>{data[0].subjectName}</Text>
                        <Text className='text-xl font-montserratSemiBold'>
                            {
                                data[0].time[0]
                            }
                        </Text>
                    </View>
                ) : (
                    <View className='rounded-md p-4 flex gap-0 my-2'>
                        <Text className='font-montserratSemiBold text-xl'>No next class for now.</Text>
                    </View>
                )
            }
        </View>
    )
}

export default NextClass;