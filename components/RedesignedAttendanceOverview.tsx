import { Text, View } from 'react-native'
import React from 'react';
import * as Progress from 'react-native-progress';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function RedesignedAttendanceOverview({ attendance, classCount }: { attendance: { Present: number, Total: number, Percent: string }, classCount: number }) {
    const attendancePercent: number = Number(((attendance!.Present / attendance!.Total) * 100).toFixed(2));
    
    return (
        <LinearGradient 
            colors={['#ffffff', '#f8f8f8']} 
            start={{ x: 0, y: 0 }} 
            end={{ x: 1, y: 1 }}
            className='rounded-2xl p-6 w-[90vw] h-auto mb-4 shadow-lg'
        >
            <View className='items-center mb-6'>
                <Text className='font-montserratBold text-2xl text-color_three mb-2'>Attendance Overview</Text>
                <View style={{ borderBottomColor: '#e0e0e0', borderBottomWidth: 1, width: '100%', marginVertical: 10 }} />
            </View>
            
            <View className='items-center gap-4 mb-6'>
                <Progress.Circle
                    size={200}
                    progress={attendance !== null ? attendance.Present / attendance.Total : 0}
                    color={attendancePercent >= 75 ? '#10B981' : attendancePercent >= 60 ? '#F59E0B' : '#EF4444'}
                    thickness={12}
                    unfilledColor={'#e5e7eb'}
                    borderColor='#ffffff'
                    showsText={true}
                    formatText={() => `${attendance !== null ? ((attendance.Present / attendance.Total) * 100).toFixed(1) : 0}%`}
                    textStyle={{ fontWeight: 'bold', color: '#000', fontFamily: 'Montserrat-Bold', fontSize: 24 }}
                />
                
                <View className={`p-4 rounded-xl ${attendancePercent >= 75 ? 'bg-green-100' : attendancePercent >= 60 ? 'bg-yellow-100' : 'bg-red-100'} w-full`}>
                    <View className='flex-row items-center justify-center'>
                        <Ionicons 
                            name={attendancePercent >= 75 ? "checkmark-circle" : attendancePercent >= 60 ? "alert-circle" : "close-circle"} 
                            size={24} 
                            color={attendancePercent >= 75 ? '#10B981' : attendancePercent >= 60 ? '#F59E0B' : '#EF4444'} 
                        />
                        <Text className={`font-montserratMedium text-center ml-2 ${attendancePercent >= 75 ? 'text-green-800' : attendancePercent >= 60 ? 'text-yellow-800' : 'text-red-800'}`}>
                            {
                                attendancePercent >= 75
                                    ? `Great! You can leave next ${classCount} lectures`
                                    : `You must attend next ${classCount} lectures`
                            }
                        </Text>
                    </View>
                </View>
            </View>
            
            <View className='bg-gray-50 rounded-xl p-4'>
                <View className='flex-row justify-between mb-2'>
                    <Text className='font-montserratMedium text-gray-600'>Total Classes</Text>
                    <Text className='font-montserrat text-color_three'>{attendance?.Total || 0}</Text>
                </View>
                <View className='flex-row justify-between mb-2'>
                    <Text className='font-montserratMedium text-gray-600'>Classes Attended</Text>
                    <Text className='font-montserrat text-green-600'>{attendance?.Present || 0}</Text>
                </View>
                <View className='flex-row justify-between'>
                    <Text className='font-montserratMedium text-gray-600'>Attendance Percentage</Text>
                    <Text className={`font-montserratBold ${attendancePercent >= 75 ? 'text-green-600' : attendancePercent >= 60 ? 'text-yellow-600' : 'text-red-600'}`}>
                        {attendancePercent}%
                    </Text>
                </View>
            </View>
        </LinearGradient>
    )
}