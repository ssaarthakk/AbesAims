import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import SubjectDetailCard from '@/components/SubjectDetailCard'
import { LinearGradient } from 'expo-linear-gradient'
import { color_four, color_three } from '@/constants/Colors'
import { useApiStore } from '@/utils/store'
import { FlatList } from 'react-native-gesture-handler'

export default function SubjectDetails() {

  const [apiData, setApiData] = React.useState<Array<any>>([]);
  const dataApi: [any] = useApiStore((state: any) => state.data);
  useEffect(() => {
    setApiData(dataApi.slice(0, -1))
  }, [])

  return (
    <LinearGradient className='flex-1 justify-center items-center' colors={[color_four, color_three]} start={{ x: 0.4, y: 0.4 }} end={{ x: 1, y: 1 }} >
      <View className='p-6'>
        <FlatList
          data={apiData}
          renderItem={({ item }) => <SubjectDetailCard facultyName={item.faculty_name} subjectName={item.cdata.course_name} courseCode={item.cdata.course_code} />}
          keyExtractor={item => item.id}
        />
      </View>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({})