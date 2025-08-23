import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function ScheduleCard({ subjectName, faculty, time = [] }: { subjectName: string, faculty: string, time: Array<string> }) {
    time.sort(function (a, b) {
        const timee = a.split(' - ');
        const timee1 = timee[0].split(':');
        const timee3 = b.split(' - ');
        const timee4 = timee3[0].split(':');
        return Number(timee1[0]) - Number(timee4[0]) + ((Number(timee1[0]) === Number(timee4[0])) ? Number(timee1[1]) - Number(timee4[1]) : 0);
    });

    const returnTime = () => {
        const timeStr = time.join('\n');
        return timeStr
    }
    return (
        <View className='bg-gray-200 rounded-xl p-4 flex gap-1 my-2'>
            <Text className='font-montserratSemiBold text-xl'>{subjectName}</Text>
            <Text className='font-montserrat text-xl'>{faculty}</Text>
            <Text className='font-montserrat text-xl'>
                {
                    time?.length === 1 ? time[0] : (returnTime())
                }
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({})