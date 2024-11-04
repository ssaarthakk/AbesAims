import { View } from 'react-native'
import React, { useEffect } from 'react'
import AttendanceCard from '@/components/AttendaceCard'
import { LinearGradient } from 'expo-linear-gradient'
import { color_four, color_three } from '@/constants/Colors'
import { FlatList } from 'react-native-gesture-handler'
import { useApiStore } from '@/utils/store'
import LoadinSvg from '@/components/LoadinSvg'
import Animated, { FadeInDown } from 'react-native-reanimated'

export default function AttendanceDetails() {

  const dataApi: [any] = useApiStore((state: any) => state.data);
  const [apiData, setApiData] = React.useState<Array<any>>([]);
  useEffect(() => {
    setApiData(dataApi.slice(0, -1))
  }, [])

  return (
    <LinearGradient className='flex-1 justify-center items-center' colors={[color_four, color_three]} start={{ x: 0.4, y: 0.4 }} end={{ x: 1, y: 1 }} >
      <View className='flex-1 p-4'>
        {
          (apiData.length === 0) ? (
            <LoadinSvg loading={apiData.length === 0} color='black' size={96} />
          ) : (
            <FlatList keyExtractor={item => String(item.id)} data={apiData} renderItem={({ item }) => (
              <Animated.View
                entering={FadeInDown.delay(300)
                  .mass(0.5)
                  .stiffness(80)
                  .springify(20)}
              >
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

              </Animated.View>
            )} />
          )
        }
      </View>
    </LinearGradient>
  )
}