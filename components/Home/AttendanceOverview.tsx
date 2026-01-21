import { Text, View } from 'react-native'
import Slider from '@react-native-community/slider'
import React, { useState } from 'react';
import * as Progress from 'react-native-progress';
import AttendanceTable from './AttendanceTable';
import AttendanceCalculator from './AttendanceCalculator';

export default function AttendanceOverview({ attendance, classCount }: { attendance: { Present: number, Total: number, Percent: string }, classCount: number }) {
    const [attendanceThreshold, setAttendanceThreshold] = useState<number>(75);
    const attendancePercent: number = Number(((attendance!.Present / attendance!.Total) * 100).toFixed(2));

    const calculateClassesNeeded = (): { canLeave: boolean, classesNeeded: number, daysNeeded: number } => {
        const currentPresent = attendance.Present;
        const currentTotal = attendance.Total;
        const threshold = attendanceThreshold / 100;

        if (attendancePercent < attendanceThreshold) {
            const classesToAttend = Math.ceil((threshold * currentTotal - currentPresent) / (1 - threshold));
            return {
                canLeave: false,
                classesNeeded: Math.max(0, classesToAttend),
                daysNeeded: Math.ceil(Math.max(0, classesToAttend) / 8)
            };
        } else {
            const classesCanLeave = Math.floor((currentPresent / threshold) - currentTotal);
            return {
                canLeave: true,
                classesNeeded: Math.max(0, classesCanLeave),
                daysNeeded: Math.ceil(Math.max(0, classesCanLeave) / 8)
            };
        }
    };

    const { canLeave, classesNeeded, daysNeeded } = calculateClassesNeeded();

    return (
        <View className='bg-surface/80 border border-white/10 p-5 w-[90vw] rounded-2xl h-auto shadow-xl shadow-black/40 backdrop-blur-md mb-6'>
            <Text className='font-montserratExtraBold text-2xl text-center mb-6 text-white tracking-tight'>Attendance Overview</Text>
            <View className='items-center gap-2'>
                <View className="shadow-lg shadow-primary/20 bg-color_one rounded-full p-2 border border-white/5">
                    <Progress.Circle
                        size={250}
                        progress={attendance !== null ? attendance.Present / attendance.Total : 0}
                        color={'#a855f7'} // Primary Purple
                        thickness={12}
                        unfilledColor={'#1e293b'} // Dark Surface
                        borderColor='#334155'
                        showsText={true}
                        formatText={() => `${attendance !== null ? ((attendance.Present / attendance.Total) * 100).toFixed(2) : 0}%`}
                        endAngle={0.4}
                        textStyle={{ fontWeight: 'bold', color: '#f8fafc', fontFamily: 'Montserrat' }}
                        strokeCap="round"
                    />
                </View>

                <View className='w-full mt-6'>
                    <View className='flex-row justify-between mb-2 px-1'>
                        <Text className='font-montserratBold text-base text-text-muted'>Goal: {attendanceThreshold}%</Text>
                        <Text className='font-montserratSemiBold text-base text-primary'>{attendancePercent}% Current</Text>
                    </View>
                    <View className='w-full'>
                        <Slider
                            className='w-full h-10'
                            minimumValue={40}
                            maximumValue={100}
                            step={1}
                            value={attendanceThreshold}
                            onValueChange={setAttendanceThreshold}
                            minimumTrackTintColor="#a855f7" // Primary
                            maximumTrackTintColor="#334155" // Surface highlight
                            thumbTintColor="#f472b6" // Accent Pink
                        />
                    </View>
                </View>

                <View className={`mt-4 p-4 rounded-xl border border-white/5 w-full ${canLeave ? 'bg-success/10 border-success/20' : 'bg-error/10 border-error/20'}`}>
                    <Text className={`font-montserratSemiBold text-base text-center ${canLeave ? 'text-success' : 'text-error'}`}>
                        {
                            canLeave
                                ? `🎉 You can skip the next ${classesNeeded} lectures to stay above ${attendanceThreshold}%`
                                : `⚠️ Attend the next ${classesNeeded} lectures (${daysNeeded} days) to reach ${attendanceThreshold}%`
                        }
                    </Text>
                </View>

                <AttendanceCalculator attendance={attendance} />
            </View>
            <AttendanceTable attendance={attendance} />
        </View>
    )
}