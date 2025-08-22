import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import SubjectDetailCard from '@/components/SubjectDetailCard'
import { LinearGradient } from 'expo-linear-gradient'
import { color_background } from '@/constants/Colors'
import { useApiStore } from '@/utils/store'
import { FlatList } from 'react-native-gesture-handler'

export default function SubjectDetails() {

  const [apiData, setApiData] = React.useState<Array<any>>([]);
  const dataApi: [any] = useApiStore((state: any) => state.data);
  useEffect(() => {
    setApiData(dataApi.slice(0, -1))
  }, [])

  return (
    <View style={{ flex: 1, backgroundColor: color_background }}>
      <View className='p-6'>
        <FlatList
          data={apiData}
          renderItem={({ item }) => <SubjectDetailCard facultyName={item.faculty_name} subjectName={item.cdata.course_name} courseCode={item.cdata.course_code} />}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({})