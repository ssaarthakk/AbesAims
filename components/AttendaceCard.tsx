import { StyleSheet, Text, ToastAndroid, View } from 'react-native'
import React, { useState } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons'
import * as Progress from 'react-native-progress';
import { color_five, color_four, color_three } from '@/constants/Colors';
import CustomButton from './CustomButton';
import { getSubjectAttendance } from '@/utils/apicalls';
import AttendanceDetailModal from './AttendanceDetailModal';
import { useModalOpen } from '@/utils/store';
import LoadinSvg from './LoadinSvg';

export default function AttendanceCard({ id, subjectName, subjectCode, present, absent, leave, exempt, total, percent }: { subjectName: string, present: number, absent: number, leave: number, exempt: number, total: number, percent: string, id: number, subjectCode: string }) {

    const isOpen = useModalOpen((state: any) => state.isOpen);
    const [isLoading, setIsLoading] = useState(false);
    const setIsOpen = useModalOpen((state: any) => state.setIsOpen);
    const [dataApi, setDataApi] = React.useState<Array<any>>([]);
    const handlePress = async () => {
        setIsLoading(true);
        const data: Array<any> = await getSubjectAttendance(id.toString());
        if (data.length === 0) {
            ToastAndroid.show('No Data to show', ToastAndroid.LONG);
        } else {
            setDataApi(data);
            setIsOpen(true);
            setIsLoading(false);
        }
    }

    return (
        <View>
            {
                dataApi.length !== 0 && isOpen && (
                    <AttendanceDetailModal data={dataApi} setDataApi={setDataApi} />
                )
            }
            <View className='bg-color_five p-4 w-[90vw] rounded-md shadow shadow-black drop-shadow-2xl flex gap-2 mb-3'>
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
                    {/* <Progress.Bar color={color_three} progress={((present !== 0 && total !== 0) ? present / total : 0)} height={8} borderWidth={1} unfilledColor={color_four} borderColor={'black'} />
                    <Text className='font-montserrat'>{percent}</Text> */}
                </View>

                <CustomButton title='View Details' onPress={isLoading ? () => { } : handlePress} containerStyles='py-2 my-1'>
                    {
                        isLoading && (
                            <LoadinSvg loading={isLoading} />
                        )
                    }
                </CustomButton>
            </View>
        </View>
    )
}