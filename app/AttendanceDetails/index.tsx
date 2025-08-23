import { View } from 'react-native'
import React, { useEffect } from 'react'
import AttendanceCard from '@/components/Attendance/AttendanceCard'
import { LinearGradient } from 'expo-linear-gradient'
import { color_four, color_three } from '@/constants/Colors'
import { FlatList } from 'react-native-gesture-handler'
import { useApiStore } from '@/utils/store'
import LoadinSvg from '@/components/Home/LoadinSvg'

export default function AttendanceDetails() {

  const dataApi: [any] = useApiStore((state: any) => state.data);
  const [apiData, setApiData] = React.useState<Array<any>>([]);
  useEffect(() => {
    setApiData(dataApi.slice(0, -1))
  }, [])

  return (
    <LinearGradient className='flex-1 justify-center items-center' colors={[color_three, color_four, color_three]} >
      <View className='flex-1 p-4 justify-center items-center'>
        {
          (apiData.length === 0) ? (
            <LoadinSvg loading={apiData.length === 0} color='black' size={96} />
          ) : (
            <FlatList keyExtractor={item => String(item.id)} data={apiData} renderItem={({ item }) => (
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
          )
        }
      </View>
    </LinearGradient>
  )
}