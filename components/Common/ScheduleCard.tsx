import { Text, View } from 'react-native'
import { useEffect, useState } from 'react'
import { getSubjectAttendance } from '@/utils/apicalls'
import Ionicons from '@expo/vector-icons/Ionicons'

export default function ScheduleCard({ subjectName, faculty, time = [], subjectId, date }: { subjectName: string, faculty: string, time: Array<string>, subjectId?: string, date?: Date }) {
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

                const today = date ?? new Date();
                const todayDateString = today.toDateString();

                const statusMap: { [key: string]: 'present' | 'absent' | 'not-marked' } = {};

                const parseTimeSlot = (timeSlot: string) => {
                    const [startTime, endTime] = timeSlot.split(' - ');
                    const [startHour, startMinute] = startTime.split(':').map(Number);
                    const [endHour, endMinute] = endTime.split(':').map(Number);
                    return {
                        startHour,
                        startMinute,
                        endHour,
                        endMinute
                    };
                };

                time.forEach(timeSlot => {
                    const { startHour, startMinute, endHour, endMinute } = parseTimeSlot(timeSlot);

                    const attendanceRecord = attendanceData.find((record: any) => {
                        const recordDate = new Date(record.start_time).toDateString();

                        if (recordDate !== todayDateString) {
                            return false;
                        }

                        const recordStartTime = new Date(record.start_time);
                        const recordHour = recordStartTime.getHours();
                        const recordMinute = recordStartTime.getMinutes();

                        const slotStartMinutes = startHour * 60 + startMinute;
                        const slotEndMinutes = endHour * 60 + endMinute;
                        const recordMinutes = recordHour * 60 + recordMinute;

                        return recordMinutes >= slotStartMinutes && recordMinutes <= slotEndMinutes;
                    });

                    if (attendanceRecord) {
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
    }, [subjectId, time, date]);

    const getAttendanceIcon = (status: 'present' | 'absent' | 'not-marked') => {
        switch (status) {
            case 'present':
                return <Ionicons name="checkmark-circle" size={20} color="#34d399" />; // Success Green
            case 'absent':
                return <Ionicons name="close-circle" size={20} color="#f87171" />; // Error Red
            case 'not-marked':
                return <Ionicons name="help-circle" size={20} color="#94a3b8" />; // Muted Slate
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

    const renderTimeSlot = (timeSlot: string, index: number) => (
        <View key={index} className="flex-row justify-between items-center py-1">
            <View className="bg-surface-highlight px-2 py-1 rounded border border-white/10">
                <Text className='font-montserratSemiBold text-sm text-sky-400'>{timeSlot}</Text>
            </View>
            {subjectId && (
                <View className="flex-row items-center gap-1">
                    {loading ? (
                        <Text className="text-white/50 text-sm font-montserratMedium">Loading...</Text>
                    ) : (
                        <>
                            {getAttendanceIcon(attendanceStatus[timeSlot] || 'not-marked')}
                            <Text className={`text-sm font-montserratMedium ${
                                attendanceStatus[timeSlot] === 'present' ? 'text-success' :
                                attendanceStatus[timeSlot] === 'absent' ? 'text-error' : 'text-text-muted'
                            }`}>
                                {getAttendanceText(attendanceStatus[timeSlot] || 'not-marked')}
                            </Text>
                        </>
                    )}
                </View>
            )}
        </View>
    );

    return (
        <View className='bg-surface border border-white/10 rounded-xl p-4 flex gap-2 my-2'>
            <View className="flex-row justify-between items-start">
                <View className="flex-1 mr-2">
                    <Text className='font-montserratBold text-lg text-white leading-6'>{subjectName}</Text>
                    <Text className='font-montserrat text-sm text-text-muted mt-0.5'>{faculty}</Text>
                </View>
                <View className="bg-primary/20 px-2 py-1 rounded-md border border-primary/20">
                    <Text className="text-[10px] font-montserratBold text-primary uppercase">Class</Text>
                </View>
            </View>

            <View className="mt-2 bg-color_one p-3 rounded-lg border border-white/5">
                {time.map((timeSlot, index) => renderTimeSlot(timeSlot, index))}
            </View>
        </View>
    )
}