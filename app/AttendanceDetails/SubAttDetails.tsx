import React from 'react'
import { FlatList } from 'react-native';
import AttendanceDetailCard from '@/components/Attendance/AttendanceDetailCard';
import { useAttData } from '@/utils/store';
import { LinearGradient } from 'expo-linear-gradient';
import { color_four, color_three } from '@/constants/Colors';

const SubAttDetails = () => {

    return (
        <LinearGradient className='flex-1 justify-center items-center' colors={[color_three, color_four, color_three]} >
            <FlatList data={useAttData((state: any) => state.attData)} renderItem={({ item }) => (
                <AttendanceDetailCard formattedDate={item.date_formatted} facultyName={item.faculty_name} status={item.state} />
            )}
                keyExtractor={(item: any) => item.id}
            />
        </LinearGradient>
    )
}

export default SubAttDetails