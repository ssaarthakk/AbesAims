import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { color_primary } from '@/constants/Colors'
import Ionicons from '@expo/vector-icons/Ionicons'

export default function SubjectDetailCard({ subjectName, facultyName, courseCode }: { subjectName: string, facultyName: string, courseCode: string }) {
    return (
        <View className='mx-4 mb-4'>
            <View className='bg-color_surface rounded-2xl shadow-lg shadow-gray-200 border border-color_border overflow-hidden'>
                {/* Header */}
                <View className='bg-gradient-to-r from-primary-500 to-secondary-500 px-6 py-4'>
                    <Text className='text-color_text_inverse text-lg font-montserratBold' numberOfLines={2}>
                        {subjectName}
                    </Text>
                    <Text className='text-primary-100 text-sm font-montserratMedium mt-1'>
                        {courseCode}
                    </Text>
                </View>

                {/* Content */}
                <View className='p-6'>
                    <View className='flex-row items-center gap-3'>
                        <View className='p-3 bg-primary-50 rounded-xl'>
                            <Ionicons name="person" size={24} color={color_primary} />
                        </View>
                        <View className='flex-1'>
                            <Text className='text-color_text_secondary text-xs font-montserratMedium uppercase tracking-wide mb-1'>
                                Faculty Name
                            </Text>
                            <Text className='text-color_text_primary text-base font-montserratSemiBold' numberOfLines={2}>
                                {facultyName}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({})