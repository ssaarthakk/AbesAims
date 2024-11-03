import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import AttendanceCard from '@/components/AttendaceCard'
import { LinearGradient } from 'expo-linear-gradient'
import { color_four, color_three } from '@/constants/Colors'
import { FlatList } from 'react-native-gesture-handler'
import { useApiStore } from '@/utils/store'

export default function AttendanceDetails() {

  const [apiData, setApiData] = React.useState<Array<any>>([]);
  const dataApi: [any] = useApiStore((state: any) => state.data);
  useEffect(() => {
    setApiData(dataApi.slice(0, -1))
  }, [])

  return (
    <LinearGradient className='flex-1 justify-center items-center' colors={[color_four, color_three]} start={{ x: 0.4, y: 0.4 }} end={{ x: 1, y: 1 }} >
      <View className='flex-1 p-4'>
        {
          (apiData.length === 0) ? (
            <Text>No Data</Text>
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

const styles = StyleSheet.create({})