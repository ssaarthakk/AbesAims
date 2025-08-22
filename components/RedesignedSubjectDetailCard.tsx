import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { color_three } from '@/constants/Colors'
import Ionicons from '@expo/vector-icons/Ionicons'
import { LinearGradient } from 'expo-linear-gradient'

export default function RedesignedSubjectDetailCard({ subjectName, facultyName, courseCode }: { subjectName: string, facultyName: string, courseCode: string }) {
    return (
        <LinearGradient 
            colors={['#ffffff', '#f0f0f0']} 
            start={{ x: 0, y: 0 }} 
            end={{ x: 1, y: 1 }}
            className='rounded-2xl p-5 w-[90vw] h-auto mb-4 shadow-lg'
        >
            <View className='mb-3'>
                <Text className='text-2xl font-montserratBold text-color_three'>{subjectName}</Text>
                <View style={{ borderBottomColor: '#e0e0e0', borderBottomWidth: 1, marginVertical: 10 }} />
            </View>
            
            <View className='space-y-3'>
                <View className='flex flex-row items-center gap-3'>
                    <View className='bg-gray-100 p-2 rounded-full'>
                        <Ionicons name="person-circle-outline" size={24} color={color_three} />
                    </View>
                    <View>
                        <Text className='text-sm font-montserrat text-gray-500'>Faculty Name</Text>
                        <Text className='text-base font-montserratMedium text-color_three'>{facultyName}</Text>
                    </View>
                </View>
                
                <View className='flex flex-row items-center gap-3'>
                    <View className='bg-gray-100 p-2 rounded-full'>
                        <Ionicons name="terminal-outline" size={24} color={color_three} />
                    </View>
                    <View>
                        <Text className='text-sm font-montserrat text-gray-500'>Course Code</Text>
                        <Text className='text-base font-montserratMedium text-color_three'>{courseCode}</Text>
                    </View>
                </View>
            </View>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({})