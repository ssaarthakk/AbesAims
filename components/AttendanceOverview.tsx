import { Text, View } from 'react-native'
import React from 'react';
import * as Progress from 'react-native-progress';
import AttendanceTable from './AttendanceTable';

export default function AttendanceOverview({ attendance, classCount }: { attendance: { Present: number, Total: number, Percent: string }, classCount: number }) {
    const attendancePercent: number = Number(((attendance!.Present / attendance!.Total) * 100).toFixed(2));
    return (
        <View className='bg-color_five p-4 w-[90vw] rounded-md h-auto shadow shadow-black drop-shadow-2xl'>
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
                <Text className='font-montserratSemiBold text-md text-gray-400 mt-2 text-center'>
                    {
                        attendancePercent > 75
                            ? `You can leave next ${classCount} Lectures to get your attendance to 75%`
                            : `You must attend next ${classCount} Lectures or ${Math.ceil(classCount / 8)} days to get your attendance to 75%`
                    }
                </Text>
            </View>
            <AttendanceTable attendance={attendance}/>
        </View>
    )
}