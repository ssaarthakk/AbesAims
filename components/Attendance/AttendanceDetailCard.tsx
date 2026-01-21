import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons'
import { color_three } from '@/constants/Colors'

export default function AttendanceDetailCard({ formattedDate, facultyName, status, isLast }: { formattedDate: string, facultyName: string, status: string, isLast: boolean }) {
    const isPresent = status === 'Present';

    return (
        <View className="flex-row w-full">
            {/* Timeline Column */}
            <View className="items-center mr-4 w-6 pt-1">
                {/* Status Dot */}
                <View className={`w-4 h-4 rounded-full border-2 z-10 ${isPresent ? 'bg-success border-success/30' : 'bg-error border-error/30'}`} />
                {/* Connector Line */}
                {!isLast && (
                    <View className="w-[2px] flex-1 bg-white/10 absolute top-4 bottom-[-20]" />
                )}
            </View>

            {/* Content Card */}
            <View className='flex-1 bg-surface/80 border border-white/10 p-5 rounded-2xl shadow-xl shadow-black/40 backdrop-blur-md mb-6'>
                <View className='flex-row justify-between items-start mb-3'>
                    <View className='flex-row items-center gap-2 bg-color_one px-3 py-1.5 rounded-lg border border-white/5'>
                        <Ionicons name="calendar" size={16} color="#94a3b8" />
                        <Text className='text-sm font-montserratSemiBold text-text-muted'>{formattedDate}</Text>
                    </View>
                </View>

                <View className='flex-row items-center gap-3'>
                    <View className="bg-sky-500/20 p-2 rounded-full">
                        <Ionicons name="person" size={20} color="#38bdf8" />
                    </View>
                    <View>
                        <Text className='text-[10px] font-montserratBold text-text-muted uppercase tracking-wide'>Faculty</Text>
                        <Text className='text-lg font-montserratSemiBold text-white'>{facultyName}</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({})