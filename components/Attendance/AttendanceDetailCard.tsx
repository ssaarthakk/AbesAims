import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export default function AttendanceDetailCard({ date, status }: { date: string, status: string }) {
    const dateObj = new Date(date);
    const day = dateObj.getDate();
    const month = dateObj.toLocaleString('default', { month: 'short' }).toUpperCase();
    const year = dateObj.getFullYear();

    // Fallback/Validation if date is invalid
    const isDateValid = !isNaN(day);
    const dayStr = isDateValid ? day : '--';
    const monthStr = isDateValid ? month : '---';
    const yearStr = isDateValid ? year : '----';

    const isPresent = status === 'Present';
    const statusColor = isPresent ? 'bg-[#4ade80]' : 'bg-[#f87171]';
    const statusText = isPresent ? 'PRESENT' : 'ABSENT';

    return (
        <View className={`rounded-xl overflow-hidden shadow-lg shadow-black/30 mb-2 flex-1 m-1 aspect-[3/4] bg-color_one border border-white/10 h-auto`}>
            {/* Calendar Header (Month) */}
            <View className={`${statusColor} py-1 items-center justify-center`}>
                <Text className='font-montserratBold text-white text-xs tracking-widest'>{monthStr}</Text>
            </View>

            {/* Calendar Body (Day) */}
            <View className='flex-1 items-center justify-center bg-surface/50 backdrop-blur-sm'>
                <Text className='font-montserratExtraBold text-4xl text-white'>{dayStr}</Text>
                <Text className='font-montserrat text-xs text-text-muted mt-1'>{yearStr}</Text>
            </View>

            {/* Footer (Status) */}
            <View className='bg-white/5 py-1 items-center'>
                <Text className={`font-montserratBold text-[10px] ${isPresent ? 'text-[#4ade80]' : 'text-[#f87171]'}`}>{statusText}</Text>
            </View>
        </View>
    )
}