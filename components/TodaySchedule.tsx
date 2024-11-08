import { Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getSchedule } from '@/utils/apicalls';
import ScheduleCard from './ScheduleCard';

export default function TodaySchedule() {

    const [data, setData] = useState<Array<any>>([]);
    const [date, _] = useState(new Date());
    const [arrayTimeDetails, setArrayTimeDetails] = useState<Array<any>>([]);

    const setNewData = () => {
        const newData = data.slice(1);
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

    useEffect(() => {
        const getData = async () => {
            if (data.length === 0) {
                const apiData: Array<any> = await getSchedule();
                await setData(apiData);
                setNewData();
            } else {
                setNewData();
            }
        }

        getData();

    }, [data]);

    return (
        <View className='bg-color_five p-4 w-[90vw] rounded-md h-auto shadow shadow-black drop-shadow-2xl'>
            <Text className='font-montserratSemiBold text-2xl text-center mb-1'>Time Table for {date.toDateString()}</Text>
            {
                arrayTimeDetails.length === 0 ? (
                    <Text className='text-center font-montserratSemiBold text-xl'>No Schedule to display</Text>
                ) : (
                    arrayTimeDetails.map((item, index) => <ScheduleCard faculty={item.faculty} subjectName={item.subjectName} time={item.time} key={index} />)
                )
            }
        </View>
    )
}