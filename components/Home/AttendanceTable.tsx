import { Text, View } from 'react-native'
import React from 'react'
import CustomButton from '@/components/Common/CustomButton'
import { router } from "expo-router";
import Ionicons from '@expo/vector-icons/Ionicons';

export default function AttendanceTable({ attendance }: { attendance: { Present: number, Total: number, Percent: string } }) {
    return (
        <View className='mt-6 w-full'>
            <Text className='text-xl text-white font-montserratBold mb-4 pl-1'>Attendance Breakdown</Text>

            <View className='bg-surface/50 border border-white/10 rounded-2xl overflow-hidden'>
                {/* Present Row */}
                <View className='flex-row justify-between items-center p-4 border-b border-white/5'>
                    <View className='flex-row items-center gap-3'>
                        <View className='w-8 h-8 rounded-full bg-success/20 items-center justify-center'>
                            <Ionicons name="checkmark" size={16} color="#4ade80" />
                        </View>
                        <Text className='font-montserratSemiBold text-base text-gray-300'>Present</Text>
                    </View>
                    <Text className='font-montserratBold text-xl text-white'>{attendance?.Present}</Text>
                </View>

                {/* Absent Row */}
                <View className='flex-row justify-between items-center p-4 border-b border-white/5'>
                    <View className='flex-row items-center gap-3'>
                        <View className='w-8 h-8 rounded-full bg-error/20 items-center justify-center'>
                            <Ionicons name="close" size={16} color="#f87171" />
                        </View>
                        <Text className='font-montserratSemiBold text-base text-gray-300'>Absent</Text>
                    </View>
                    <Text className='font-montserratBold text-xl text-white'>{attendance?.Total - attendance?.Present}</Text>
                </View>

                {/* Total Row */}
                <View className='flex-row justify-between items-center p-4 bg-white/5'>
                    <View className='flex-row items-center gap-3'>
                        <View className='w-8 h-8 rounded-full bg-primary/20 items-center justify-center'>
                            <Ionicons name="stats-chart" size={16} color="#a855f7" />
                        </View>
                        <Text className='font-montserratSemiBold text-base text-gray-300'>Total Classes</Text>
                    </View>
                    <Text className='font-montserratBold text-xl text-white'>{attendance?.Total}</Text>
                </View>
            </View>

            <CustomButton
                onPress={() => {
                    // @ts-ignore
                    router.push('/AttendanceDetails')
                }}
                title={'View Detailed History'}
                containerStyles={'mt-6 w-full bg-color_five/20 border border-color_five/50 active:bg-color_five/30'}
                textStyles={'text-color_five text-sm'}
            />
        </View>
    )
}