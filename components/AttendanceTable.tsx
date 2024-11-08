import { Text, View } from 'react-native'
import React from 'react'
import CustomButton from './CustomButton'
import { router } from "expo-router";

export default function AttendanceTable({ attendance }: { attendance: { Present: number, Total: number, Percent: string } }) {
    return (
        <View className='py-2 px-4 flex mt-4'>
            <Text className='text-2xl text-center font-montserratBold mb-2'>Attendance Count</Text>
            <View className='p-1 bg-color_four rounded flex flex-row justify-between'>
                <Text className='font-montserratSemiBold text-2xl'>Present</Text>
                <Text className='font-montserratSemiBold text-2xl text-[#000]'>{attendance?.Present}</Text>
            </View>
            <View className='p-1 bg-color_four rounded flex flex-row justify-between'>
                <Text className='font-montserratSemiBold text-2xl'>Absent</Text>
                <Text className='font-montserratSemiBold text-2xl text-[#000]'>{attendance?.Total - attendance?.Present}</Text>
            </View>
            <View className='p-1 bg-color_four rounded flex flex-row justify-between'>
                <Text className='font-montserratSemiBold text-2xl'>Total</Text>
                <Text className='font-montserratSemiBold text-2xl'>{attendance?.Total}</Text>
            </View>
            <CustomButton onPress={() => { router.push('/AttendanceDetails') }} title={'View Full Attendance Details'} containerStyles={'py-2 self-center mt-2'}/>
        </View>
    )
}