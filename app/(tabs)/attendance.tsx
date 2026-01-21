import { View, FlatList, Text } from 'react-native'
import React, { useEffect } from 'react'
import AttendanceCard from '@/components/Attendance/AttendanceCard'
import { useApiStore } from '@/utils/store'
import LoadinSvg from '@/components/Home/LoadinSvg'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'

export default function Attendance() {
    const dataApi: [any] = useApiStore((state: any) => state.data);
    const [apiData, setApiData] = React.useState<Array<any>>([]);
    const tabBarHeight = useBottomTabBarHeight();

    useEffect(() => {
        setApiData(dataApi.slice(0, -1))
    }, [])

    return (
        <SafeAreaView className='flex-1 bg-background' edges={['top', 'left', 'right']}>
            <View className='flex-1 px-4'>
                <Text className="text-4xl font-montserratExtraBold text-white my-6 text-left tracking-tighter">
                    Attendance
                    <Text className="text-primary">.</Text>
                </Text>
                {apiData.length === 0 ? (
                    <View className="flex-1 justify-center items-center">
                        <LoadinSvg loading={true} color='#8b5cf6' size={96} />
                    </View>
                ) : (
                    <FlatList
                        keyExtractor={item => String(item.id)}
                        data={apiData}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: tabBarHeight + 20 }}
                        renderItem={({ item }) => (
                            <AttendanceCard
                                id={Number(item.id)}
                                subjectName={String(item.cdata.course_name)}
                                subjectCode={String(item.cdata.course_code)}
                                total={Number(item.attendance_summary.Total)}
                                percent={String(item.attendance_summary.Percent)}
                                leave={Number(item.attendance_summary.Leave)}
                                exempt={Number(item.attendance_summary.Exempt)}
                                absent={Number(item.attendance_summary.Absent)}
                                present={Number(item.attendance_summary.Present)}
                            />
                        )} />
                )}
            </View>
        </SafeAreaView>
    )
}
