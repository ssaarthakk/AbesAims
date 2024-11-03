import { StyleSheet, Text, View } from 'react-native'
import React from 'react';
import * as Progress from 'react-native-progress';

export default function AttendanceOverview({ attendance, classCount }: { attendance: { Present: number, Total: number, Percent: string }, classCount: number }) {
    const attendancePercent: number = Number(((attendance!.Present / attendance!.Total) * 100).toFixed(2));
    return (
        <View className='bg-color_five p-4 w-[90vw] rounded-md h-auto shadow shadow-black drop-shadow-2xl'>
            <Text className='font-semibold text-3xl text-center mb-4'>Attendance Overview</Text>
            <View className='items-center gap-2'>
                <Progress.Circle
                    size={250}
                    progress={attendance !== null ? attendance.Present / attendance.Total : 0}
                    color={'#1fa10e'}
                    thickness={15}
                    borderColor='white'
                    unfilledColor={'#fa2323'}
                    showsText={true}
                    formatText={() => `${attendance !== null ? ((attendance.Present / attendance.Total) * 100).toFixed(2) : 0}%`}
                    endAngle={0.4}
                    textStyle={{ fontWeight: 'bold', color: attendancePercent > 75 ? '#1fa10e' : '#fa2323' }}
                />
                <Text className='font-semibold text-md text-gray-400 mt-2 text-center'>
                    {
                        attendancePercent > 75
                            ? `You can leave next ${classCount} Lectures to get your attendance to 75%`
                            : `You must attend next ${classCount} Lectures or ${Math.ceil(classCount / 8)} days to get your attendance to 75%`
                    }
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({})