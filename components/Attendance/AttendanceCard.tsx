import { Text, ToastAndroid, View } from 'react-native'
import React, { useState } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons'
import CustomButton from '@/components/Common/CustomButton';
import { getSubjectAttendance } from '@/utils/apicalls';
import { useAttData } from '@/utils/store';
import { useRouter } from 'expo-router';

export default function AttendanceCard({ id, subjectName, subjectCode, present, absent, leave, exempt, total, percent }: { subjectName: string, present: number, absent: number, leave: number, exempt: number, total: number, percent: string, id: number, subjectCode: string }) {

    const [isLoading, setIsLoading] = useState(false);
    const setAttData = useAttData((state: any) => state.setAttData)
    const router = useRouter();

    const handlePress = async () => {
        setIsLoading(true);
        const data: Array<any> = await getSubjectAttendance(id.toString());
        if (data.length === 0) {
            ToastAndroid.show('No Data to show', ToastAndroid.SHORT);
        } else {
            setAttData(data);
            setAttData(data);
            setAttData(data);
            // @ts-ignore
            router.push('/(tabs)/attendance/details')
            setIsLoading(false);
        }
    }

    return (
        <View>
            <View className='bg-surface/80 border border-white/10 p-5 w-[90vw] rounded-2xl shadow-xl shadow-black/40 flex gap-4 mb-4 backdrop-blur-md'>
                {/* Header Section */}
                <View className="flex-row justify-between items-start">
                    <View className="flex-1 mr-2">
                        <Text className='text-3xl font-montserratExtraBold text-white tracking-tight shadow-md'>{subjectName}</Text>
                        <Text className='text-sm font-montserratMedium text-text-muted mt-1 uppercase tracking-wider'>{subjectCode}</Text>
                    </View>
                    <View className="items-end">
                        <View className="bg-primary/20 px-3 py-1 rounded-full border border-primary/30">
                            <Text className='font-montserratBold text-primary text-xs'>CLASS</Text>
                        </View>
                    </View>
                </View>

                {/* Divider with percentage */}
                <View className="flex-row items-center justify-between my-2">
                    <View className="h-[2px] flex-1 bg-surface-highlight rounded-full" />
                    <View className="mx-4 items-center justify-center">
                        <Text className="text-4xl font-montserratExtraBold text-accent drop-shadow-lg">{percent}</Text>
                        <Text className="text-xs font-montserrat text-text-muted">ATTENDANCE</Text>
                    </View>
                    <View className="h-[2px] flex-1 bg-surface-highlight rounded-full" />
                </View>

                {/* Grid Stats System */}
                <View className='flex-row flex-wrap justify-between gap-y-3'>
                    {/* Present */}
                    <View className='w-[48%] bg-color_one p-3 rounded-xl border border-white/5 flex-row items-center gap-2'>
                        <View className="bg-success/20 p-2 rounded-full">
                            <Ionicons name="checkmark-circle" size={18} color="#34d399" />
                        </View>
                        <View>
                            <Text className='text-success font-montserratBold text-lg'>{present}</Text>
                            <Text className='text-text-muted text-[10px] uppercase font-bold tracking-wide'>Present</Text>
                        </View>
                    </View>

                    {/* Absent */}
                    <View className='w-[48%] bg-color_one p-3 rounded-xl border border-white/5 flex-row items-center gap-2'>
                        <View className="bg-error/20 p-2 rounded-full">
                            <Ionicons name="close-circle" size={18} color="#f87171" />
                        </View>
                        <View>
                            <Text className='text-error font-montserratBold text-lg'>{absent}</Text>
                            <Text className='text-text-muted text-[10px] uppercase font-bold tracking-wide'>Absent</Text>
                        </View>
                    </View>

                    {/* Leave */}
                    <View className='w-[48%] bg-color_one p-3 rounded-xl border border-white/5 flex-row items-center gap-2'>
                        <View className="bg-warning/20 p-2 rounded-full">
                            <Ionicons name="alert-circle" size={18} color="#fbbf24" />
                        </View>
                        <View>
                            <Text className='text-warning font-montserratBold text-lg'>{leave}</Text>
                            <Text className='text-text-muted text-[10px] uppercase font-bold tracking-wide'>Leave</Text>
                        </View>
                    </View>

                    {/* Exempt */}
                    <View className='w-[48%] bg-color_one p-3 rounded-xl border border-white/5 flex-row items-center gap-2'>
                        <View className="bg-sky-500/20 p-2 rounded-full">
                            <Ionicons name="sync-circle" size={18} color="#38bdf8" />
                        </View>
                        <View>
                            <Text className='text-sky-400 font-montserratBold text-lg'>{exempt}</Text>
                            <Text className='text-text-muted text-[10px] uppercase font-bold tracking-wide'>Exempt</Text>
                        </View>
                    </View>
                </View>

                {/* Total Badge */}
                <View className="self-center bg-surface-highlight px-4 py-1 rounded-full mt-1">
                    <Text className="text-xs text-text-muted font-montserratMedium">Total Classes: <Text className="text-white font-bold">{total}</Text></Text>
                </View>

                <CustomButton
                    title='Detailed View'
                    onPress={isLoading ? () => { } : handlePress}
                    containerStyles='mt-3 py-4 rounded-xl bg-gradient-to-r from-primary to-purple-600 shadow-lg shadow-primary/30 active:scale-95'
                    textStyles="text-white font-montserratBold tracking-wide"
                    isLoading={isLoading}
                />
            </View>
        </View>
    )
}