import { Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

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

        // Format the schedule data (Previous logic retained)
        const newDataFormatted: any = newData.map((item: any) => {
            const itemName = `c${currentDay}`;
            if (!item || !item[itemName] || item[itemName].length === 0) return null;
            if (!item.name_text) return null;

            const infoArr = item.name_text.split('/');
            if (infoArr.length < 4) return null;

            const timeRan: string = item[itemName];
            const timeRange = timeRan.match(/\d{2}:\d{2} - \d{2}:\d{2}/g);

            if (!timeRange || timeRange.length === 0) return null;

            return {
                faculty: infoArr[infoArr.length - 1].trim(),
                subjectName: infoArr[2].trim(),
                time: timeRange
            };
        }).filter((value: any) => value !== null);

        // Sort by time
        newDataFormatted.sort((a: any, b: any) => {
            if (!a.time[0] || !b.time[0]) return 0;
            const timeA = a.time[0].split(' - ')[0].split(':');
            const timeB = b.time[0].split(' - ')[0].split(':');
            return (parseInt(timeA[0]) - parseInt(timeB[0])) || (parseInt(timeA[1]) - parseInt(timeB[1]));
        });

        // Filter for next classes
        const nextClasses = newDataFormatted.filter((item: any) => {
            if (!item.time || item.time.length === 0) return false;
            const timeParts = item.time[0].split(' - ')[0].split(':');
            const classHour = parseInt(timeParts[0]) || 0;
            const classMinute = parseInt(timeParts[1]) || 0;

            if (classHour > currentHour || (classHour === currentHour && classMinute > currentMinute)) return true;

            if (item.time.length > 1) {
                const secondTimeParts = item.time[1].split(' - ')[0].split(':');
                const secondClassHour = parseInt(secondTimeParts[0]) || 0;
                const secondClassMinute = parseInt(secondTimeParts[1]) || 0;
                if (secondClassHour > currentHour || (secondClassHour === currentHour && secondClassMinute > currentMinute)) return true;
            }
            return false;
        });

        if (nextClasses.length > 0) setData([nextClasses[0]]);
        else setData([]);

    }, [scheduleData]);

    return (
        <View className="">
            {data.length !== 0 ? (
                <View className="w-full h-48 rounded-3xl overflow-hidden shadow-2xl shadow-purple-500/30">
                    <LinearGradient
                        colors={['#7e22ce', '#a855f7', '#d8b4fe']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        className="absolute w-full h-full"
                    />

                    {/* Glass Overlay Pattern */}
                    <View className="absolute w-full h-full bg-white/5" />
                    <View className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
                    <View className="absolute -bottom-10 -left-10 w-32 h-32 bg-purple-900/20 rounded-full blur-2xl" />

                    <View className="flex-1 p-6 justify-between">
                        <View className="flex-row justify-between items-start">
                            <View>
                                <View className="flex-row items-center gap-2 mb-1">
                                    <View className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                                    <Text className="text-white/80 font-montserratSemiBold text-xs uppercase tracking-widest">
                                        Up Next
                                    </Text>
                                </View>
                                <Text className="text-white font-montserratBold text-2xl w-[80%] leading-8" numberOfLines={2}>
                                    {data[0].subjectName}
                                </Text>
                            </View>
                            <View className="bg-white/20 p-2 rounded-xl backdrop-blur-md">
                                <Ionicons name="school-outline" size={24} color="white" />
                            </View>
                        </View>

                        <View className="flex-row justify-between items-end">
                            <View>
                                <Text className="text-white/60 font-montserratMedium text-xs mb-1">Faculty</Text>
                                <View className="flex-row items-center gap-2">
                                    <View className="w-6 h-6 rounded-full bg-white/20 items-center justify-center">
                                        <Text className="text-white text-[10px] font-bold">{data[0].faculty.charAt(0)}</Text>
                                    </View>
                                    <Text className="text-white font-montserratSemiBold">{data[0].faculty}</Text>
                                </View>
                            </View>
                            <View>
                                <Text className="text-white/60 font-montserratMedium text-xs mb-1 text-right">Time</Text>
                                <View className="bg-black/20 px-3 py-1.5 rounded-lg backdrop-blur-sm border border-white/10">
                                    <Text className="text-white font-montserratBold text-base">
                                        {data[0].time[0]}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            ) : (
                <View className="w-full h-32 rounded-3xl overflow-hidden border border-white/10 relative">
                    <LinearGradient
                        colors={['rgba(255,255,255,0.05)', 'rgba(255,255,255,0.02)']}
                        className="absolute w-full h-full"
                    />
                    <View className="flex-1 items-center justify-center flex-row gap-3">
                        <View className="bg-green-500/20 p-3 rounded-full">
                            <Ionicons name="cafe-outline" size={24} color="#4ade80" />
                        </View>
                        <View>
                            <Text className="text-white font-montserratBold text-lg">Free Time!</Text>
                            <Text className="text-white/50 font-montserratMedium text-xs">No upcoming classes for the day.</Text>
                        </View>
                    </View>
                </View>
            )}
        </View>
    )
}

export default NextClass;