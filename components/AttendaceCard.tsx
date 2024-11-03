import { StyleSheet, Text, ToastAndroid, View } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons'
import * as Progress from 'react-native-progress';
import { color_five, color_four, color_three } from '@/constants/Colors';
import CustomButton from './CustomButton';
import { getSubjectAttendance } from '@/utils/apicalls';
import AttendanceDetailModal from './AttendanceDetailModal';
import { useModalOpen } from '@/utils/store';

export default function AttendanceCard({ id, subjectName, subjectCode, present, absent, leave, exempt, total, percent }: { subjectName: string, present: number, absent: number, leave: number, exempt: number, total: number, percent: string, id: number, subjectCode: string }) {

    const isOpen = useModalOpen((state: any) => state.isOpen);
    const setIsOpen = useModalOpen((state: any) => state.setIsOpen);
    const [dataApi, setDataApi] = React.useState<Array<any>>([]);
    const handlePress = async () => {
        const data: Array<any> = await getSubjectAttendance(id.toString());
        if (data.length == 0) {
            ToastAndroid.show('No Data to show', ToastAndroid.LONG);
        } else {
            setDataApi(data);
            setIsOpen(true);
        }
    }

    return (
        <View className='bg-color_five p-4 w-[90vw] rounded-md h-auto shadow shadow-black drop-shadow-2xl flex gap-2 mb-3'>
            <Text className='text-2xl font-bold'>{subjectName}: {subjectCode}</Text>
            <View className='flex flex-row items-center gap-2'>
                <Ionicons name="checkmark-circle-outline" size={24} color="#1fa10e" />
                <Text className='text-xl'>Present: {present}</Text>
            </View>
            <View className='flex flex-row items-center gap-2'>
                <Ionicons name="close-circle-outline" size={24} color="#fa2323" />
                <Text className='text-xl'>Absent: {absent}</Text>
            </View>
            <View className='flex flex-row items-center gap-2'>
                <Ionicons name="alert-circle-outline" size={24} color="#3452eb" />
                <Text className='text-xl'>Leave: {leave}</Text>
            </View>
            <View className='flex flex-row items-center gap-2'>
                <Ionicons name="sync-circle-outline" size={24} color="#3c3d3d" />
                <Text className='text-xl'>Exempt: {exempt}</Text>
            </View>
            <View className='flex flex-row items-center gap-2'>
                <Text className='text-xl'>Total: {total}</Text>
            </View>
            <View className='flex-1 flex-row items-center justify-between w-[80vw] self-center'>
                <Progress.Bar color={color_three} progress={((present !== 0 && total !== 0) ? present / total : 0)} width={270} height={8} borderWidth={0} unfilledColor={color_four} borderColor={color_five} />
                <Text>{percent}</Text>
            </View>
            <CustomButton title='View Details' onPress={handlePress} containerStyles='py-2 self-center w-full mt-2' />
            {
                dataApi.length !== 0 && isOpen && (
                    <AttendanceDetailModal data={dataApi} setDataApi={setDataApi} />
                )
            }
        </View>
    )
}

const styles = StyleSheet.create({})