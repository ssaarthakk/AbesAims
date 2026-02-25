import { Text, View, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import ScheduleCard from '@/components/Common/ScheduleCard';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function TodaySchedule({ scheduleData }: { scheduleData: Array<any> }) {

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Monday of the current week (midnight)
    const monday = new Date(today);
    monday.setDate(today.getDate() - ((today.getDay() + 6) % 7));

    // Friday of the current week (midnight)
    const friday = new Date(monday);
    friday.setDate(monday.getDate() + 4);

    // Clamp to Mon–Fri (if today is weekend, default to Friday)
    const clampedToday = today.getDay() === 0
        ? friday
        : today.getDay() === 6
        ? friday
        : today;

    const [selectedDate, setSelectedDate] = useState<Date>(clampedToday);
    const [arrayTimeDetails, setArrayTimeDetails] = useState<Array<any>>([]);

    const canGoPrev = selectedDate > monday;
    const canGoNext = selectedDate < friday;

    const goToPrev = () => {
        const prev = new Date(selectedDate);
        prev.setDate(selectedDate.getDate() - 1);
        prev.setHours(0, 0, 0, 0);
        setSelectedDate(prev);
    };

    const goToNext = () => {
        const next = new Date(selectedDate);
        next.setDate(selectedDate.getDate() + 1);
        next.setHours(0, 0, 0, 0);
        setSelectedDate(next);
    };

    const groupContinuousSlots = (slots: string[]): string[][] => {
        if (!slots || slots.length === 0) return [];
        const sorted = [...slots].sort((a, b) => {
            const [ah, am] = a.split(' - ')[0].split(':').map(Number);
            const [bh, bm] = b.split(' - ')[0].split(':').map(Number);
            return (ah * 60 + am) - (bh * 60 + bm);
        });
        const groups: string[][] = [[sorted[0]]];
        for (let i = 1; i < sorted.length; i++) {
            const prevEnd = sorted[i - 1].split(' - ')[1];
            const currStart = sorted[i].split(' - ')[0];
            if (prevEnd === currStart) {
                groups[groups.length - 1].push(sorted[i]);
            } else {
                groups.push([sorted[i]]);
            }
        }
        return groups;
    };

    const setNewData = () => {
        if (!scheduleData || scheduleData.length <= 1) return;
        const newData = scheduleData.slice(1);

        const newDataFormatted: Array<{ faculty: string, subjectName: string, time: Array<string>, subjectId?: string }> = newData.flatMap((item: any) => {
            const itemName = `c${selectedDate.getDate()}`;
            if (!item || !item[itemName] || item[itemName].length === 0) return [];

            const timeRan = item[itemName];
            const timeRange: string[] | null = timeRan.match(/\d{2}:\d{2} - \d{2}:\d{2}/g);
            if (!item.name_text || !timeRange) return [];

            const infoArr = item.name_text.split('/');
            const faculty = infoArr[infoArr.length - 1].trim();
            const subjectName = infoArr[2].trim();
            const subjectId = item.cf_id?.toString();

            return groupContinuousSlots(timeRange).map(group => ({
                faculty,
                subjectName,
                time: group,
                subjectId
            }));
        });

        newDataFormatted.sort(function (a, b) {
            const [ah, am] = a.time[0].split(' - ')[0].split(':').map(Number);
            const [bh, bm] = b.time[0].split(' - ')[0].split(':').map(Number);
            return (ah * 60 + am) - (bh * 60 + bm);
        });

        setArrayTimeDetails(newDataFormatted);
    }

    useEffect(setNewData, [scheduleData, selectedDate]);

    return (
        <View>
            <View className="flex-row items-center justify-between mb-6 ml-1">
                <Text className="text-white/60 font-montserratSemiBold text-sm uppercase tracking-widest">
                    Timeline &bull; {selectedDate.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric' })}
                    {selectedDate.toDateString() === today.toDateString() ? ' · Today' : ''}
                </Text>
                <View className="flex-row items-center gap-2">
                    <TouchableOpacity
                        onPress={goToPrev}
                        disabled={!canGoPrev}
                        className={`p-1.5 rounded-lg border ${
                            canGoPrev ? 'border-white/20 bg-white/5' : 'border-white/5 bg-transparent'
                        }`}
                    >
                        <Ionicons name="chevron-back" size={16} color={canGoPrev ? '#ffffff' : '#ffffff33'} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={goToNext}
                        disabled={!canGoNext}
                        className={`p-1.5 rounded-lg border ${
                            canGoNext ? 'border-white/20 bg-white/5' : 'border-white/5 bg-transparent'
                        }`}
                    >
                        <Ionicons name="chevron-forward" size={16} color={canGoNext ? '#ffffff' : '#ffffff33'} />
                    </TouchableOpacity>
                </View>
            </View>

            {arrayTimeDetails.length === 0 ? (
                <View className="bg-white/5 border border-white/10 rounded-2xl p-8 items-center justify-center border-dashed">
                    <Text className='font-montserratSemiBold text-white/40'>No classes scheduled for today.</Text>
                </View>
            ) : (
                <View className="pl-2">
                    {/* Vertical Line */}
                    <View className="absolute left-[29px] top-4 bottom-4 w-[2px] bg-white/10 rounded-full" />

                    {arrayTimeDetails.map((item, index) => {
                        const timeParts = item.time[0] ? item.time[0].split(' - ')[0] : '00:00';

                        return (
                            <View key={index} className="flex-row mb-2 relative">
                                {/* Time Column */}
                                <View className="w-16 mr-3 items-end justify-center py-4">
                                    <Text className="text-white font-montserratBold text-sm">{timeParts}</Text>
                                    <Text className="text-white/30 font-montserratMedium text-[10px] uppercase">Start</Text>
                                </View>

                                {/* Connector Dot */}
                                <View className="absolute left-[22px] top-[26px] z-10 bg-background p-1">
                                    <View className="w-3 h-3 rounded-full bg-primary border-2 border-primary shadow-lg shadow-primary/50" />
                                </View>

                                {/* Card */}
                                <View className="flex-1">
                                    <ScheduleCard
                                        subjectName={item.subjectName}
                                        faculty={item.faculty}
                                        time={item.time}
                                        subjectId={item.subjectId}
                                        date={selectedDate}
                                    />
                                </View>
                            </View>
                        )
                    })}
                </View>
            )}
        </View>
    )
}