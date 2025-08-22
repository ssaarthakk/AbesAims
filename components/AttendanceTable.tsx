import { Text, View } from 'react-native'
import React from 'react'
import CustomButton from './CustomButton'
import { router } from "expo-router";
import Ionicons from '@expo/vector-icons/Ionicons';

export default function AttendanceTable({ attendance }: { attendance: { Present: number, Total: number, Percent: string } }) {
    
    const StatRow = ({ icon, label, value, color }: { icon: string, label: string, value: number, color: string }) => (
        <View className='flex-row items-center justify-between py-3 px-4 bg-gray-50 rounded-xl mb-2'>
            <View className='flex-row items-center gap-3'>
                <View className='p-2 bg-white rounded-lg shadow-sm'>
                    <Ionicons name={icon as any} size={20} color={color} />
                </View>
                <Text className='font-montserratMedium text-color_text_primary text-base'>
                    {label}
                </Text>
            </View>
            <Text className='font-montserratBold text-xl text-color_text_primary'>
                {value}
            </Text>
        </View>
    );

    return (
        <View className='mt-4'>
            <Text className='text-lg font-montserratBold text-color_text_primary mb-4 text-center'>
                Detailed Breakdown
            </Text>
            
            <View className='space-y-2 mb-6'>
                <StatRow 
                    icon="checkmark-circle" 
                    label="Present" 
                    value={attendance?.Present || 0} 
                    color="#10b981" 
                />
                <StatRow 
                    icon="close-circle" 
                    label="Absent" 
                    value={(attendance?.Total || 0) - (attendance?.Present || 0)} 
                    color="#ef4444" 
                />
                <StatRow 
                    icon="list" 
                    label="Total Classes" 
                    value={attendance?.Total || 0} 
                    color="#6366f1" 
                />
            </View>

            <CustomButton 
                onPress={() => { router.push('/AttendanceDetails') }} 
                title='View Full Attendance Details' 
                variant="outline"
                size="md"
            />
        </View>
    )
}