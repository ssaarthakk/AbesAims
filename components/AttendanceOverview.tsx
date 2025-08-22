import { Text, View } from 'react-native'
import React from 'react';
import * as Progress from 'react-native-progress';
import AttendanceTable from './AttendanceTable';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function AttendanceOverview({ attendance, classCount }: { attendance: { Present: number, Total: number, Percent: string }, classCount: number }) {
    const attendancePercent: number = Number(((attendance!.Present / attendance!.Total) * 100).toFixed(2));
    
    const getAttendanceStatus = () => {
        if (attendancePercent >= 85) return { color: 'success', icon: 'checkmark-circle', message: 'Excellent' };
        if (attendancePercent >= 75) return { color: 'warning', icon: 'warning', message: 'Good' };
        return { color: 'error', icon: 'alert-circle', message: 'Critical' };
    };

    const status = getAttendanceStatus();

    const getProgressColor = () => {
        if (attendancePercent >= 85) return '#10b981';
        if (attendancePercent >= 75) return '#f59e0b';
        return '#ef4444';
    };

    return (
        <View className='mx-4 mb-4'>
            <View className='bg-color_surface rounded-2xl shadow-lg shadow-gray-200 border border-color_border overflow-hidden'>
                {/* Header */}
                <View className='bg-gradient-to-r from-primary-500 to-secondary-500 px-6 py-4'>
                    <Text className='text-color_text_inverse text-xl font-montserratBold text-center'>
                        Attendance Overview
                    </Text>
                </View>

                {/* Content */}
                <View className='p-6'>
                    {/* Status Badge */}
                    <View className={`flex-row items-center justify-center mb-6 px-4 py-2 rounded-full bg-${status.color}-50 border border-${status.color}-200 self-center`}>
                        <Ionicons name={status.icon as any} size={16} color={getProgressColor()} />
                        <Text className={`ml-2 text-${status.color}-600 font-montserratSemiBold text-sm`}>
                            {status.message} Attendance
                        </Text>
                    </View>

                    {/* Progress Circle */}
                    <View className='items-center mb-6'>
                        <Progress.Circle
                            size={200}
                            progress={attendance !== null ? attendance.Present / attendance.Total : 0}
                            color={getProgressColor()}
                            thickness={12}
                            unfilledColor={'#e2e8f0'}
                            borderColor='transparent'
                            showsText={true}
                            formatText={() => `${attendance !== null ? ((attendance.Present / attendance.Total) * 100).toFixed(1) : 0}%`}
                            textStyle={{ 
                                fontWeight: 'bold', 
                                color: '#0f172a', 
                                fontFamily: 'Montserrat-Bold',
                                fontSize: 24
                            }}
                        />
                        
                        {/* Stats Row */}
                        <View className='flex-row justify-center gap-8 mt-4'>
                            <View className='items-center'>
                                <Text className='text-2xl font-montserratBold text-success-600'>
                                    {attendance?.Present || 0}
                                </Text>
                                <Text className='text-xs font-montserratMedium text-color_text_secondary uppercase tracking-wide'>
                                    Present
                                </Text>
                            </View>
                            <View className='w-px h-8 bg-color_divider' />
                            <View className='items-center'>
                                <Text className='text-2xl font-montserratBold text-color_text_primary'>
                                    {attendance?.Total || 0}
                                </Text>
                                <Text className='text-xs font-montserratMedium text-color_text_secondary uppercase tracking-wide'>
                                    Total
                                </Text>
                            </View>
                        </View>
                    </View>

                    {/* Recommendation */}
                    <View className={`p-4 rounded-xl border ${attendancePercent > 75 ? 'bg-success-50 border-success-200' : 'bg-warning-50 border-warning-200'}`}>
                        <View className='flex-row items-start gap-3'>
                            <Ionicons 
                                name={attendancePercent > 75 ? "shield-checkmark" : "school"} 
                                size={20} 
                                color={attendancePercent > 75 ? "#10b981" : "#f59e0b"} 
                                style={{ marginTop: 2 }}
                            />
                            <View className='flex-1'>
                                <Text className={`font-montserratSemiBold text-sm mb-1 ${attendancePercent > 75 ? 'text-success-700' : 'text-warning-700'}`}>
                                    {attendancePercent > 75 ? 'Safe Zone' : 'Action Required'}
                                </Text>
                                <Text className={`font-montserrat text-sm leading-5 ${attendancePercent > 75 ? 'text-success-600' : 'text-warning-600'}`}>
                                    {attendancePercent > 75
                                        ? `You can miss up to ${classCount} more classes while maintaining 75% attendance.`
                                        : `Attend the next ${classCount} classes (≈${Math.ceil(classCount / 8)} days) to reach 75% attendance.`
                                    }
                                </Text>
                            </View>
                        </View>
                    </View>

                    {/* Attendance Table */}
                    <View className='mt-6'>
                        <AttendanceTable attendance={attendance}/>
                    </View>
                </View>
            </View>
        </View>
    )
}