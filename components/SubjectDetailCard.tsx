import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { color_three } from '@/constants/Colors'
import Ionicons from '@expo/vector-icons/Ionicons'

export default function SubjectDetailCard({ subjectName, facultyName, courseCode }: { subjectName: string, facultyName: string, courseCode: string }) {
    return (
        <View className='bg-color_five p-4 w-[90vw] rounded-md h-auto shadow shadow-black drop-shadow-2xl flex gap-2 mb-3'>
            <View>
                <Text className='text-2xl font-montserratSemiBold'>{subjectName}</Text>
                <View style={{ borderBottomColor: 'gray', borderBottomWidth: 1, marginVertical: 5 }} />
            </View>
            <View className='flex gap-2'>
                <View className='flex flex-row items-center gap-2'>
                    <Ionicons name="person-circle-outline" size={20} color={color_three} />
                    <Text className='text-lg font-montserratSemiBold'>Faculty Name:</Text>
                    <Text className='text-lg font-montserrat'>{facultyName}</Text>
                </View>
                <View className='flex flex-row items-center gap-2'>
                    <Ionicons name="terminal-outline" size={20} color={color_three} />
                    <Text className='text-lg font-montserratSemiBold'>Course Code:</Text>
                    <Text className='text-lg font-montserrat'>{courseCode}</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({})