import { Text, View } from 'react-native'
import React from 'react'
import CustomButton from './CustomButton'
import { router } from "expo-router";

export default function AttendanceTable({ attendance }: { attendance: { Present: number, Total: number, Percent: string } }) {
    return (
        <View className='bg-color_five py-2 px-4 w-[90vw] rounded-md h-auto shadow shadow-black drop-shadow-2xl flex gap-2'>
            <Text className='text-3xl text-center font-montserratBold'>Attendance Count</Text>
            <View className='p-2 bg-color_four rounded flex flex-row justify-between'>
                <Text className='font-montserratSemiBold text-2xl'>Present</Text>
                <Text className='font-montserratSemiBold text-2xl text-[#000]'>{attendance?.Present}</Text>
            </View>
            <View className='p-2 bg-color_four rounded flex flex-row justify-between'>
                <Text className='font-montserratSemiBold text-2xl'>Absent</Text>
                <Text className='font-montserratSemiBold text-2xl text-[#000]'>{attendance?.Total - attendance?.Present}</Text>
            </View>
            <View className='p-2 bg-color_four rounded flex flex-row justify-between'>
                <Text className='font-montserratSemiBold text-2xl'>Total</Text>
                <Text className='font-montserratSemiBold text-2xl'>{attendance?.Total}</Text>
            </View>
            <CustomButton onPress={() => { router.push('/AttendanceDetails') }} title={'View Full Attendance Details'} containerStyles={'py-2 self-center'}/>
        </View>
    )
}