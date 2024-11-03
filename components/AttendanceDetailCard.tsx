import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons'
import { color_three } from '@/constants/Colors'

export default function AttendanceDetailCard({ formattedDate, facultyName, status }: { formattedDate: string, facultyName: string, status: string }) {
    return (
        <View className='bg-color_five p-4 w-[90vw] rounded-md h-auto shadow shadow-black drop-shadow-2xl flex gap-2 mb-3'>
            <View className='flex flex-row items-center gap-2'>
                <Ionicons name="calendar-clear-outline" size={24} color={color_three} />
                <Text className='text-xl font-semibold'>{formattedDate}</Text>
            </View>
            <View className='flex flex-row items-center gap-2'>
                <Ionicons name="person-circle-outline" size={24} color={color_three} />
                <Text className='text-xl font-semibold'>Faculty Name:</Text>
                <Text className='text-xl'>{facultyName}</Text>
            </View>
            <View className='flex flex-row items-center gap-2'>
                {
                    status === "Present" ? (
                        <Ionicons name="checkmark-circle-outline" size={24} color="#1fa10e" />
                    ) : (
                        <Ionicons name="close-circle-outline" size={24} color="#fa2323" />
                    )
                }
                <Text className='text-xl font-semibold'>Status:</Text>
                <Text className='text-xl'>{status}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({})