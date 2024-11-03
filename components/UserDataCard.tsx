import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { BookIcon, CalendarIcon, HomeIcon, ProfileIcon } from '@/constants/SvgIcons'
import { StudentData } from '@/utils/apicalls'

export default function UserDataCard({ userData }: { userData: StudentData }) {

    return (
        <View className='bg-color_five p-4 w-[90vw] rounded-md h-auto shadow shadow-black drop-shadow-2xl'>
            <View className='flex flex-row items-center justify-between gap-4 mb-4'>

                <View className='flex-1 flex-row items-center gap-2'>
                    <View className='p-2 bg-color_four rounded'>
                        <ProfileIcon />
                    </View>
                    <View>
                        <Text className='text-gray-500 text-sm'>Name</Text>
                        <Text className='font-semibold text-xl'>{userData?.name}</Text>
                    </View>
                </View>

                <View className='flex-1 flex-row items-center gap-2'>
                    <View className='p-2 bg-color_four rounded'>
                        <BookIcon />
                    </View>
                    <View>
                        <Text className='text-gray-500 text-sm'>Branch</Text>
                        <Text className='font-semibold text-xl'>{userData?.branch}</Text>
                    </View>
                </View>

            </View>

            <View className='flex flex-row justify-between items-center gap-4'>

                <View className='flex-1 flex-row items-center gap-2'>
                    <View className='p-2 bg-color_four rounded'>
                        <CalendarIcon />
                    </View>
                    <View>
                        <Text className='text-gray-500 text-sm'>Semester</Text>
                        <Text className='font-semibold text-xl'>{userData?.semester}</Text>
                    </View>
                </View>

                <View className='flex-1 flex-row items-center gap-2'>
                    <View className='p-2 bg-color_four rounded'>
                        <HomeIcon />
                    </View>
                    <View>
                        <Text className='text-gray-500 text-sm'>Adm No.</Text>
                        <Text className='font-semibold text-xl'>{userData?.username}</Text>
                    </View>
                </View>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({})