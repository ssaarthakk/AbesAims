import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getSubjectAttendance } from '@/utils/apicalls'
import Ionicons from '@expo/vector-icons/Ionicons'

export default function ScheduleCard({ subjectName, faculty, time = [], subjectId }: { subjectName: string, faculty: string, time: Array<string>, subjectId?: string }) {
    const [attendanceStatus, setAttendanceStatus] = useState<{ [key: string]: 'present' | 'absent' | 'not-marked' }>({});
    const [loading, setLoading] = useState(false);

    time.sort(function (a, b) {
        const timee = a.split(' - ');
        const timee1 = timee[0].split(':');
        const timee3 = b.split(' - ');
        const timee4 = timee3[0].split(':');
        return Number(timee1[0]) - Number(timee4[0]) + ((Number(timee1[0]) === Number(timee4[0])) ? Number(timee1[1]) - Number(timee4[1]) : 0);
    });

    useEffect(() => {
        const fetchAttendance = async () => {
            if (!subjectId || time.length === 0) return;

            setLoading(true);
            try {
                const attendanceData = await getSubjectAttendance(subjectId);
                const today = new Date();
                const todayDateString = today.toISOString().split('T')[0]; // YYYY-MM-DD format
                
                const statusMap: { [key: string]: 'present' | 'absent' | 'not-marked' } = {};
                
                time.forEach(timeSlot => {
                    // Look for attendance record for today
                    const attendanceRecord = attendanceData.find((record: any) => {
                        // Try different date field formats
                        let recordDate = null;
                        
                        if (record.datetime1) {
                            recordDate = new Date(record.datetime1).toISOString().split('T')[0];
                        } else if (record.date_formatted) {
                            // Convert date_formatted to YYYY-MM-DD format
                            const dateMatch = record.date_formatted.match(/(\d{1,2})\/(\d{1,2})\/(\d{4})/);
                            if (dateMatch) {
                                const [, day, month, year] = dateMatch;
                                recordDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
                            }
                        }
                        
                        return recordDate === todayDateString;
                    });
                    
                    if (attendanceRecord) {
                        // Check the attendance status using the 'state' field (as seen in AttendanceDetailCard)
                        const status = attendanceRecord.state;
                        if (status === 'Present') {
                            statusMap[timeSlot] = 'present';
                        } else if (status === 'Absent') {
                            statusMap[timeSlot] = 'absent';
                        } else {
                            statusMap[timeSlot] = 'not-marked';
                        }
                    } else {
                        statusMap[timeSlot] = 'not-marked';
                    }
                });
                
                setAttendanceStatus(statusMap);
            } catch (error) {
                console.log('Error fetching attendance:', error);
                // Set all to not-marked on error
                const errorStatus: { [key: string]: 'present' | 'absent' | 'not-marked' } = {};
                time.forEach(timeSlot => {
                    errorStatus[timeSlot] = 'not-marked';
                });
                setAttendanceStatus(errorStatus);
            } finally {
                setLoading(false);
            }
        };

        fetchAttendance();
    }, [subjectId, time]);

    const getAttendanceIcon = (status: 'present' | 'absent' | 'not-marked') => {
        switch (status) {
            case 'present':
                return <Ionicons name="checkmark-circle" size={20} color="#22C55E" />;
            case 'absent':
                return <Ionicons name="close-circle" size={20} color="#EF4444" />;
            case 'not-marked':
                return <Ionicons name="help-circle" size={20} color="#6B7280" />;
        }
    };

    const getAttendanceText = (status: 'present' | 'absent' | 'not-marked') => {
        switch (status) {
            case 'present':
                return 'Present';
            case 'absent':
                return 'Absent';
            case 'not-marked':
                return 'Not Marked';
        }
    };

    const getAttendanceTextColor = (status: 'present' | 'absent' | 'not-marked') => {
        switch (status) {
            case 'present':
                return 'text-green-600';
            case 'absent':
                return 'text-red-600';
            case 'not-marked':
                return 'text-gray-500';
        }
    };

    const returnTime = () => {
        return time.map((timeSlot, index) => (
            <View key={index} className="flex-row justify-between items-center py-1">
                <Text className='font-montserrat text-lg'>{timeSlot}</Text>
                {subjectId && (
                    <View className="flex-row items-center gap-1">
                        {loading ? (
                            <Text className="text-gray-400 text-sm">Loading...</Text>
                        ) : (
                            <>
                                {getAttendanceIcon(attendanceStatus[timeSlot] || 'not-marked')}
                                <Text className={`text-sm font-montserratMedium ${getAttendanceTextColor(attendanceStatus[timeSlot] || 'not-marked')}`}>
                                    {getAttendanceText(attendanceStatus[timeSlot] || 'not-marked')}
                                </Text>
                            </>
                        )}
                    </View>
                )}
            </View>
        ));
    };

    return (
        <View className='bg-gray-200 rounded-xl p-4 flex gap-1 my-2'>
            <Text className='font-montserratSemiBold text-xl'>{subjectName}</Text>
            <Text className='font-montserrat text-xl'>{faculty}</Text>
            <View className="mt-2">
                {time?.length === 1 ? (
                    <View className="flex-row justify-between items-center">
                        <Text className='font-montserrat text-lg'>{time[0]}</Text>
                        {subjectId && (
                            <View className="flex-row items-center gap-1">
                                {loading ? (
                                    <Text className="text-gray-400 text-sm">Loading...</Text>
                                ) : (
                                    <>
                                        {getAttendanceIcon(attendanceStatus[time[0]] || 'not-marked')}
                                        <Text className={`text-sm font-montserratMedium ${getAttendanceTextColor(attendanceStatus[time[0]] || 'not-marked')}`}>
                                            {getAttendanceText(attendanceStatus[time[0]] || 'not-marked')}
                                        </Text>
                                    </>
                                )}
                            </View>
                        )}
                    </View>
                ) : (
                    returnTime()
                )}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({})