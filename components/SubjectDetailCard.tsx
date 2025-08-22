import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { color_three } from '@/constants/Colors'
import Ionicons from '@expo/vector-icons/Ionicons'

export default function SubjectDetailCard({ subjectName, facultyName, courseCode }: { subjectName: string, facultyName: string, courseCode: string }) {
    return (
        <View className='bg-color_five p-5 w-[90vw] rounded-xl h-auto shadow shadow-black drop-shadow-2xl flex gap-3 mb-4'>
            <View>
                <Text className='text-2xl font-montserratBold'>{subjectName}</Text>
                <View style={{ borderBottomColor: 'gray', borderBottomWidth: 1, marginVertical: 10 }} />
            </View>
            <View className='flex gap-3'>
                <View className='flex flex-row items-center gap-3'>
                    <Ionicons name="person-circle-outline" size={24} color={color_three} />
                    <Text className='text-lg font-montserratBold'>Faculty Name:</Text>
                    <Text className='text-lg font-montserrat'>{facultyName}</Text>
                </View>
                <View className='flex flex-row items-center gap-3'>
                    <Ionicons name="terminal-outline" size={24} color={color_three} />
                    <Text className='text-lg font-montserratBold'>Course Code:</Text>
                    <Text className='text-lg font-montserrat'>{courseCode}</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({})