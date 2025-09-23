import { Text, View } from 'react-native'
import Slider from '@react-native-community/slider'
import React, { useState } from 'react';
import * as Progress from 'react-native-progress';
import AttendanceTable from './AttendanceTable';

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
        <View className='bg-color_five p-5 w-[90vw] rounded-xl h-auto shadow shadow-black drop-shadow-2xl'>
            <Text className='font-montserratSemiBold text-3xl text-center mb-4'>Attendance Overview</Text>
            <View className='items-center gap-2'>
                <Progress.Circle
                    size={250}
                    progress={attendance !== null ? attendance.Present / attendance.Total : 0}
                    color={'#000'}
                    thickness={15}
                    unfilledColor={'#8f8f8f'}
                    borderColor='#fff'
                    showsText={true}
                    formatText={() => `${attendance !== null ? ((attendance.Present / attendance.Total) * 100).toFixed(2) : 0}%`}
                    endAngle={0.4}
                    textStyle={{ fontWeight: 'bold', color: '#000', fontFamily: 'Montserrat' }}
                />

                <View className='w-full mt-4'>
                    <View className='flex-row justify-between mb-2'>
                        <Text className='font-montserratRegular text-sm text-gray-600'>Attendance Threshold</Text>
                        <Text className='font-montserratSemiBold text-lg'>{attendanceThreshold}%</Text>
                    </View>
                    <Slider
                        style={{ width: '100%', height: 40 }}
                        minimumValue={40}
                        maximumValue={100}
                        step={1}
                        value={attendanceThreshold}
                        onValueChange={setAttendanceThreshold}
                        minimumTrackTintColor="#000"
                        maximumTrackTintColor="#8f8f8f"
                        thumbTintColor="#000"
                    />
                </View>

                <Text className='font-montserratSemiBold text-md text-gray-400 mt-2 text-center'>
                    {
                        canLeave
                            ? `You can leave next ${classesNeeded} Lectures to get your attendance to ${attendanceThreshold}%`
                            : `You must attend next ${classesNeeded} Lectures or ${daysNeeded} days to get your attendance to ${attendanceThreshold}%`
                    }
                </Text>
            </View>
            <AttendanceTable attendance={attendance} />
        </View>
    )
}