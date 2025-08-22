import { Text, ToastAndroid, View } from 'react-native'
import React, { useState } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons'
import CustomButton from './CustomButton';
import { getSubjectAttendance } from '@/utils/apicalls';
import { useAttData } from '@/utils/store';
import LoadinSvg from './LoadinSvg';
import { useRouter } from 'expo-router';

export default function AttendanceCard({ id, subjectName, subjectCode, present, absent, leave, exempt, total, percent }: { subjectName: string, present: number, absent: number, leave: number, exempt: number, total: number, percent: string, id: number, subjectCode: string }) {

    const [isLoading, setIsLoading] = useState(false);
    const setAttData = useAttData((state: any) => state.setAttData)
    const router = useRouter();

    const handlePress = async () => {
        setIsLoading(true);
        const data: Array<any> = await getSubjectAttendance(id.toString());
        if (data.length === 0) {
            ToastAndroid.show('No Data to show', ToastAndroid.LONG);
        } else {
            setAttData(data);
            router.navigate('/AttendanceDetails/SubAttDetails')
            setIsLoading(false);
        }
    }

    const getPercentageColor = (percentage: string) => {
        const numPercent = parseFloat(percentage);
        if (numPercent >= 85) return 'text-success-600';
        if (numPercent >= 75) return 'text-warning-600';
        return 'text-error-600';
    };

    const getPercentageBg = (percentage: string) => {
        const numPercent = parseFloat(percentage);
        if (numPercent >= 85) return 'bg-success-50 border-success-200';
        if (numPercent >= 75) return 'bg-warning-50 border-warning-200';
        return 'bg-error-50 border-error-200';
    };

    const StatItem = ({ icon, label, value, color }: { icon: string, label: string, value: number, color: string }) => (
        <View className='flex-row items-center gap-3 py-2'>
            <View className='p-2 bg-gray-50 rounded-lg'>
                <Ionicons name={icon as any} size={20} color={color} />
            </View>
            <View className='flex-1'>
                <Text className='text-color_text_secondary text-xs font-montserratMedium uppercase tracking-wide'>
                    {label}
                </Text>
                <Text className='text-color_text_primary text-lg font-montserratSemiBold'>
                    {value}
                </Text>
            </View>
        </View>
    );

    return (
        <View className='mx-4 mb-4'>
            <View className='bg-color_surface rounded-2xl shadow-lg shadow-gray-200 border border-color_border overflow-hidden'>
                {/* Header */}
                <View className='bg-gradient-to-r from-primary-500 to-secondary-500 px-6 py-4'>
                    <Text className='text-color_text_inverse text-lg font-montserratBold' numberOfLines={1}>
                        {subjectName}
                    </Text>
                    <Text className='text-primary-100 text-sm font-montserratMedium'>
                        {subjectCode}
                    </Text>
                </View>

                {/* Content */}
                <View className='p-6'>
                    {/* Percentage Display */}
                    <View className={`mb-6 p-4 rounded-xl border-2 ${getPercentageBg(percent)}`}>
                        <View className='flex-row items-center justify-between'>
                            <View>
                                <Text className='text-color_text_secondary text-sm font-montserratMedium'>
                                    Attendance Percentage
                                </Text>
                                <Text className={`text-3xl font-montserratBold ${getPercentageColor(percent)}`}>
                                    {percent}%
                                </Text>
                            </View>
                            <View className='items-end'>
                                <Text className='text-color_text_secondary text-sm font-montserratMedium'>
                                    Total Classes
                                </Text>
                                <Text className='text-2xl font-montserratBold text-color_text_primary'>
                                    {total}
                                </Text>
                            </View>
                        </View>
                    </View>

                    {/* Stats Grid */}
                    <View className='space-y-1 mb-6'>
                        <StatItem icon="checkmark-circle" label="Present" value={present} color="#10b981" />
                        <View className='h-px bg-color_divider mx-4' />
                        <StatItem icon="close-circle" label="Absent" value={absent} color="#ef4444" />
                        <View className='h-px bg-color_divider mx-4' />
                        <StatItem icon="time" label="Leave" value={leave} color="#3b82f6" />
                        <View className='h-px bg-color_divider mx-4' />
                        <StatItem icon="shield-checkmark" label="Exempt" value={exempt} color="#64748b" />
                    </View>

                    {/* Action Button */}
                    <CustomButton 
                        title={isLoading ? undefined : 'View Detailed Attendance'}
                        onPress={handlePress}
                        disabled={isLoading}
                        variant="primary"
                        size="md"
                    >
                        {isLoading && (
                            <View className='flex-row items-center gap-2'>
                                <LoadinSvg loading={isLoading} />
                                <Text className='text-white font-montserratMedium'>Loading...</Text>
                            </View>
                        )}
                    </CustomButton>
                </View>
            </View>
        </View>
    )
}