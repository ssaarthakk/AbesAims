import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { color_background } from '@/constants/Colors'
import ProfileCard from '@/components/ProfileCard'
import { ScrollView } from 'react-native-gesture-handler'

export default function Profile() {
  return (
    <View style={{ flex: 1, backgroundColor: color_background }}>
      <ScrollView className='flex-1 p-4'>
        <ProfileCard />
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({})