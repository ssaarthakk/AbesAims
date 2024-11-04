import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { color_four, color_three } from '@/constants/Colors'
import ProfileCard from '@/components/ProfileCard'
import { ScrollView } from 'react-native-gesture-handler'

export default function Profile() {
  return (
    <LinearGradient className='flex-1 justify-center items-center' colors={[color_four, color_three]} start={{ x: 0.4, y: 0.4 }} end={{ x: 1, y: 1 }} >
      <ProfileCard />
    </LinearGradient>
  )
}

const styles = StyleSheet.create({})