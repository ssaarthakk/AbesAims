import { Pressable, Text, View } from 'react-native'
import React from 'react'
import Modal from './Modal'
import { FlatList } from 'react-native-gesture-handler'
import AttendanceDetailCard from './AttendanceDetailCard'
import { SafeAreaView } from 'react-native-safe-area-context'
import { CrossIcon } from '@/constants/SvgIcons'
import { useModalOpen } from '@/utils/store'

export default function AttendanceDetailModal({ data, setDataApi }: { data: any, setDataApi: any }) {
  const isOpen = useModalOpen((state: any) => state.isOpen);
  const setIsOpen = useModalOpen((state: any) => state.setIsOpen);
  return (
    <Modal isOpen={isOpen}>
      <SafeAreaView className='flex-1 p-4 bg-color_four'>
        <View className='flex-row justify-between'>
          <Text className='font-montserratBold text-2xl pb-2'>Subject Attendance Details</Text>
          <Pressable onPress={() => {
            setIsOpen(false);
            setDataApi([]);
          }}>
            <CrossIcon />
          </Pressable>
        </View>
        <FlatList data={data} renderItem={({ item }) => (
          <AttendanceDetailCard formattedDate={item.date_formatted} facultyName={item.faculty_name} status={item.state} />
        )}
          keyExtractor={(item: any) => item.id}
        />
      </SafeAreaView>
    </Modal>
  )
}