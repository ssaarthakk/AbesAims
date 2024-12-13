import { Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'

const NextClass = ({ scheduleData }: { scheduleData: Array<any> }) => {
    const [data, setData] = useState<Array<any>>([]);
    const [date, _] = useState(new Date());

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

                if (timeRange!.length === 1) {
                    const timee = timeRange![0].split(' - ');
                    const timee3 = timee[0].split(':');
                    if (Number(timee3[0]) === date.getHours()) {
                        if (Number(timee3[1]) > date.getMinutes()) {
                            return {
                                faculty: infoArr[infoArr.length - 1].trim(),
                                subjectName: infoArr[2].trim(),
                                time: timeRange
                            }
                        }
                    } else if (Number(timee3[0]) + 1 === date.getHours()) {
                        return {
                            faculty: infoArr[infoArr.length - 1].trim(),
                            subjectName: infoArr[2].trim(),
                            time: timeRange
                        }
                    }
                } else {
                    const timee = timeRange![0].split(' - ');
                    const timee2 = timeRange![1].split(' - ');
                    const timee3 = timee[0].split(':');
                    const timee4 = timee2[0].split(':');

                    if (Number(timee3[0]) === Number(timee4[0]) && (date.getHours() + 1 === Number(timee3[0]))) {
                        if (date.getMinutes() < Number(timee3[1])) {
                            return {
                                faculty: infoArr[infoArr.length - 1].trim(),
                                subjectName: infoArr[2].trim(),
                                time: timeRange!.slice(0, 1)
                            }
                        } else {
                            return {
                                faculty: infoArr[infoArr.length - 1].trim(),
                                subjectName: infoArr[2].trim(),
                                time: timeRange!.slice(1)
                            }
                        }
                    } else {
                        if (Number(timee3[0]) === date.getHours()) {
                            if (Number(timee3[1]) > date.getMinutes()) {
                                return {
                                    faculty: infoArr[infoArr.length - 1].trim(),
                                    subjectName: infoArr[2].trim(),
                                    time: timeRange!.slice(0, 1)
                                }
                            }
                        } else if (Number(timee3[0]) + 1 === date.getHours()) {
                            return {
                                faculty: infoArr[infoArr.length - 1].trim(),
                                subjectName: infoArr[2].trim(),
                                time: timeRange!.slice(0, 1)
                            }
                        }

                        if (Number(timee4[0]) === date.getHours()) {
                            if (Number(timee4[1]) > date.getMinutes()) {
                                return {
                                    faculty: infoArr[infoArr.length - 1].trim(),
                                    subjectName: infoArr[2].trim(),
                                    time: timeRange!.slice(1)
                                }
                            }
                        } else if (Number(timee4[0]) + 1 === date.getHours()) {
                            return {
                                faculty: infoArr[infoArr.length - 1].trim(),
                                subjectName: infoArr[2].trim(),
                                time: timeRange!.slice(1)
                            }
                        }
                    }
                }
                return null;
            }
        }).filter(value => value !== null)

        setData(newDataFormatted)
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

export default NextClass