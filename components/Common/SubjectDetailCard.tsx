import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { color_three } from '@/constants/Colors'
import Ionicons from '@expo/vector-icons/Ionicons'

export default function SubjectDetailCard({ subjectName, facultyName, courseCode }: { subjectName: string, facultyName: string, courseCode: string }) {
    return (
        <View className='bg-surface/80 border border-white/10 p-5 w-[90vw] rounded-2xl shadow-xl shadow-black/40 flex gap-4 mb-4 backdrop-blur-md'>
            <View>
                <Text className='text-2xl font-montserratExtraBold text-white tracking-tight leading-8'>{subjectName}</Text>
                <View className="h-[2px] w-12 bg-primary my-3 rounded-full" />
            </View>

            <View className='gap-4'>
                <View className='flex-row items-center bg-color_one p-3 rounded-xl border border-white/5'>
                    <View className="bg-sky-500/20 p-2 rounded-full mr-3">
                        <Ionicons name="person" size={20} color="#38bdf8" />
                    </View>
                    <View className="flex-1">
                        <Text className='text-xs font-montserratBold text-text-muted uppercase tracking-wider mb-0.5'>Faculty</Text>
                        <Text className='text-base font-montserratSemiBold text-slate-200'>{facultyName}</Text>
                    </View>
                </View>

                <View className='flex-row items-center bg-color_one p-3 rounded-xl border border-white/5'>
                    <View className="bg-pink-500/20 p-2 rounded-full mr-3">
                        <Ionicons name="code-slash" size={20} color="#f472b6" />
                    </View>
                    <View className="flex-1">
                        <Text className='text-xs font-montserratBold text-text-muted uppercase tracking-wider mb-0.5'>Course PayCode</Text>
                        <Text className='text-base font-montserratSemiBold text-slate-200'>{courseCode}</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({})