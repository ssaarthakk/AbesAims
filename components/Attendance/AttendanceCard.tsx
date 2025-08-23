import { Text, ToastAndroid, View } from 'react-native'
import React, { useState } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons'
import CustomButton from '@/components/Common/CustomButton';
import { getSubjectAttendance } from '@/utils/apicalls';
import { useAttData } from '@/utils/store';
import LoadinSvg from '@/components/Home/LoadinSvg';
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

    return (
        <View>
            <View className='bg-color_five p-5 w-[90vw] rounded-xl shadow shadow-black drop-shadow-2xl flex gap-3 mb-4'>
                <Text className='text-2xl font-montserratBold'>{subjectName}: {subjectCode}</Text>
                <View className='flex flex-row items-center gap-2'>
                    <Ionicons name="checkmark-circle-outline" size={24} color="#1fa10e" />
                    <Text className='text-xl font-montserrat'>Present: {present}</Text>
                </View>
                <View className='flex flex-row items-center gap-2'>
                    <Ionicons name="close-circle-outline" size={24} color="#fa2323" />
                    <Text className='text-xl font-montserrat'>Absent: {absent}</Text>
                </View>
                <View className='flex flex-row items-center gap-2'>
                    <Ionicons name="alert-circle-outline" size={24} color="#3452eb" />
                    <Text className='text-xl font-montserrat'>Leave: {leave}</Text>
                </View>
                <View className='flex flex-row items-center gap-2'>
                    <Ionicons name="sync-circle-outline" size={24} color="#3c3d3d" />
                    <Text className='text-xl font-montserrat'>Exempt: {exempt}</Text>
                </View>
                <View className='flex flex-row items-center gap-2'>
                    <Ionicons name="filter-circle-outline" size={24} color="#3c3d3d" />
                    <Text className='text-xl font-montserrat'>Total: {total}</Text>
                </View>
                <View className='flex flex-row items-center gap-2'>
                    <Ionicons name="refresh-circle-outline" size={24} color="#3c3d3d" />
                    <Text className='text-xl font-montserrat'>Percentage: <Text className='font-montserratSemiBold'>{percent}</Text></Text>
                </View>

                <CustomButton title='View Details' onPress={isLoading ? () => { } : handlePress} containerStyles='py-3 my-2 rounded-lg' isLoading={isLoading} />
            </View>
        </View>
    )
}