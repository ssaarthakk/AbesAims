import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';

export default function ScheduleCard({ subjectName, faculty, time = [] }: { subjectName: string, faculty: string, time: Array<string> }) {
    time.sort(function (a, b) {
        const timee = a.split(' - ');
        const timee1 = timee[0].split(':');
        const timee3 = b.split(' - ');
        const timee4 = timee3[0].split(':');
        return Number(timee1[0]) - Number(timee4[0]) + ((Number(timee1[0]) === Number(timee4[0])) ? Number(timee1[1]) - Number(timee4[1]) : 0);
    });

    const returnTime = () => {
        const timeStr = time.join('\n');
        return timeStr
    }

    const getCurrentTimeStatus = () => {
        const now = new Date();
        const currentTime = now.getHours() * 60 + now.getMinutes();
        
        for (const timeSlot of time) {
            const [startTime, endTime] = timeSlot.split(' - ');
            const [startHour, startMin] = startTime.split(':').map(Number);
            const [endHour, endMin] = endTime.split(':').map(Number);
            const startInMinutes = startHour * 60 + startMin;
            const endInMinutes = endHour * 60 + endMin;
            
            if (currentTime >= startInMinutes && currentTime <= endInMinutes) {
                return 'current';
            } else if (currentTime < startInMinutes) {
                return 'upcoming';
            }
        }
        return 'completed';
    }

    const status = getCurrentTimeStatus();
    
    const getStatusStyles = () => {
        switch (status) {
            case 'current':
                return {
                    container: 'bg-success-50 border-success-200 border-l-success-500',
                    icon: 'play-circle',
                    iconColor: '#10b981',
                    badge: 'bg-success-500',
                    badgeText: 'LIVE'
                };
            case 'upcoming':
                return {
                    container: 'bg-warning-50 border-warning-200 border-l-warning-500',
                    icon: 'time',
                    iconColor: '#f59e0b',
                    badge: 'bg-warning-500',
                    badgeText: 'UPCOMING'
                };
            default:
                return {
                    container: 'bg-gray-50 border-gray-200 border-l-gray-400',
                    icon: 'checkmark-circle',
                    iconColor: '#94a3b8',
                    badge: 'bg-gray-400',
                    badgeText: 'COMPLETED'
                };
        }
    };

    const styles = getStatusStyles();

    return (
        <View className={`${styles.container} border-l-4 border rounded-xl p-4`}>
            <View className='flex-row items-start justify-between mb-3'>
                <View className='flex-1'>
                    <Text className='font-montserratBold text-lg text-color_text_primary mb-1' numberOfLines={2}>
                        {subjectName}
                    </Text>
                    <View className='flex-row items-center gap-2 mb-2'>
                        <Ionicons name="person-outline" size={16} color="#64748b" />
                        <Text className='font-montserratMedium text-color_text_secondary text-sm'>
                            {faculty}
                        </Text>
                    </View>
                </View>
                
                {/* Status Badge */}
                <View className={`${styles.badge} px-2 py-1 rounded-full`}>
                    <Text className='text-white text-xs font-montserratBold'>
                        {styles.badgeText}
                    </Text>
                </View>
            </View>

            {/* Time Slots */}
            <View className='flex-row items-center gap-2'>
                <Ionicons name={styles.icon as any} size={16} color={styles.iconColor} />
                <Text className='font-montserratMedium text-color_text_primary text-sm'>
                    {time?.length === 1 ? time[0] : returnTime()}
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({})