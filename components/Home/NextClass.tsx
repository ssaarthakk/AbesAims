import { Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient';

const NextClass = ({ scheduleData }: { scheduleData: Array<any> }) => {
    const [data, setData] = useState<Array<{ faculty: string; subjectName: string; time: string[]; }>>([]);

    useEffect(() => {
        if (!scheduleData || scheduleData.length <= 1) {
            setData([]);
            return;
        }

        // Get current time in IST (UTC+5:30)
        const now = new Date();
        const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
        const istTime = new Date(utc + (3600000 * 5.5)); // IST is UTC + 5:30

        const currentHour = istTime.getHours();
        const currentMinute = istTime.getMinutes();
        const currentDay = istTime.getDate();

        const newData = scheduleData.slice(1);

        // Format the schedule data
        const newDataFormatted: any = newData.map((item: any) => {
            const itemName = `c${currentDay}`;

            // Check if item and required properties exist
            if (!item || !item[itemName] || item[itemName].length === 0) {
                return null;
            }

            // Safely parse the name text
            if (!item.name_text) {
                return null;
            }

            const infoArr = item.name_text.split('/');
            if (infoArr.length < 4) {
                return null;
            }

            const timeRan: string = item[itemName];
            const timeRange = timeRan.match(/\d{2}:\d{2} - \d{2}:\d{2}/g);

            if (!timeRange || timeRange.length === 0) {
                return null;
            }

            return {
                faculty: infoArr[infoArr.length - 1].trim(),
                subjectName: infoArr[2].trim(),
                time: timeRange
            };
        }).filter((value: any) => value !== null);

        // Sort by time
        newDataFormatted.sort(function (a: { faculty: string, subjectName: string, time: Array<string> }, b: { faculty: string, subjectName: string, time: Array<string> }) {
            if (!a.time[0] || !b.time[0]) return 0;

            const timeA = a.time[0].split(' - ')[0].split(':');
            const timeB = b.time[0].split(' - ')[0].split(':');

            const hourA = parseInt(timeA[0]) || 0;
            const minuteA = parseInt(timeA[1]) || 0;
            const hourB = parseInt(timeB[0]) || 0;
            const minuteB = parseInt(timeB[1]) || 0;

            if (hourA !== hourB) {
                return hourA - hourB;
            }
            return minuteA - minuteB;
        });

        // Filter for next classes
        const nextClasses: { faculty: string, subjectName: string, time: Array<string> }[] = newDataFormatted.filter((item: { faculty: string, subjectName: string, time: Array<string> }) => {
            if (!item.time || item.time.length === 0) return false;

            // Check first time slot
            const timeParts = item.time[0].split(' - ')[0].split(':');
            const classHour = parseInt(timeParts[0]) || 0;
            const classMinute = parseInt(timeParts[1]) || 0;

            // Class is next if it's later today
            if (classHour > currentHour || (classHour === currentHour && classMinute > currentMinute)) {
                return true;
            }

            // Check additional time slots if they exist
            if (item.time.length > 1) {
                const secondTimeParts = item.time[1].split(' - ')[0].split(':');
                const secondClassHour = parseInt(secondTimeParts[0]) || 0;
                const secondClassMinute = parseInt(secondTimeParts[1]) || 0;

                if (secondClassHour > currentHour || (secondClassHour === currentHour && secondClassMinute > currentMinute)) {
                    return true;
                }
            }

            return false;
        });

        // If we found next classes, use the first one (earliest)
        if (nextClasses.length > 0) {
            setData([nextClasses[0]]);
        } else {
            setData([]);
        }
    }, [scheduleData]);

    return (
        <View className='bg-surface/80 border border-white/10 w-[90vw] rounded-2xl h-auto shadow-xl shadow-black/40 backdrop-blur-md mb-6 overflow-hidden'>
            <LinearGradient
                colors={['rgba(168, 85, 247, 0.2)', 'transparent']}
                className="absolute w-full h-full"
            />
            {
                data.length !== 0 ? (
                    <View className='rounded-xl p-5 flex gap-1. bg-green-200'>
                        <View className="flex-row justify-between items-center mb-2">
                            <Text className='font-montserratExtraBold text-2xl text-white tracking-tight'>Next Class</Text>
                            <View className="bg-primary/20 px-3 py-1 rounded-full border border-primary/30">
                                <Text className="text-primary font-montserratBold text-xs uppercase">Upcoming</Text>
                            </View>
                        </View>

                        <Text className='font-montserratSemiBold text-xl text-primary mb-1'>{data[0].subjectName}</Text>

                        <View className="flex-row items-center mt-2">
                            <View className="bg-color_one px-3 py-1.5 rounded-lg border border-white/10 mr-3">
                                <Text className='font-montserratSemiBold text-sm text-sky-400'>{data[0].faculty}</Text>
                            </View>
                            <View className="bg-color_one px-3 py-1.5 rounded-lg border border-white/10">
                                <Text className='text-sm font-montserratBold text-accent'>
                                    {data[0].time[0]}
                                </Text>
                            </View>
                        </View>
                    </View>
                ) : (
                    <View className='rounded-xl p-6 flex flex-row items-center justify-center gap-0 my-2'>
                        <Text className='font-montserratSemiBold text-xl text-text-muted text-center'>No next class for now. 🎉</Text>
                    </View>
                )
            }
        </View>
    )
}

export default NextClass;