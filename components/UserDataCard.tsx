import { Text, View } from 'react-native'
import React from 'react'
import { BookIcon, CalendarIcon, HomeIcon, ProfileIcon } from '@/constants/SvgIcons'
import { StudentData } from '@/utils/apicalls'

export default function UserDataCard({ userData }: { userData: StudentData }) {

    return (
        <View className='bg-color_five p-5 w-[90vw] rounded-xl h-auto shadow shadow-black drop-shadow-2xl'>
            <View className='flex flex-row items-center justify-between gap-4 mb-4'>

                <View className='flex-1 flex-row items-center gap-2'>
                    <View className='p-2 bg-gray-200 rounded'>
                        <ProfileIcon />
                    </View>
                    <View>
                        <Text className='text-gray-500 text-sm font-montserrat'>Name</Text>
                        <Text className='font-montserratSemiBold text-xl break-words'>{userData?.name?.split(' ').join('\n')}</Text>
                    </View>
                </View>

                <View className='flex-1 flex-row items-center gap-2'>
                    <View className='p-2 bg-gray-200 rounded'>
                        <BookIcon />
                    </View>
                    <View>
                        <Text className='text-gray-500 text-sm font-montserrat'>Branch</Text>
                        <Text className='font-montserratSemiBold text-xl'>{userData?.branch}</Text>
                    </View>
                </View>

            </View>

            <View className='flex flex-row justify-between items-center gap-4'>

                <View className='flex-1 flex-row items-center gap-2'>
                    <View className='p-2 bg-gray-200 rounded'>
                        <CalendarIcon />
                    </View>
                    <View>
                        <Text className='text-gray-500 text-sm font-montserrat'>Semester</Text>
                        <Text className='text-xl font-montserratSemiBold'>{userData?.semester}</Text>
                    </View>
                </View>

                <View className='flex-1 flex-row items-center gap-2'>
                    <View className='p-2 bg-gray-200 rounded'>
                        <HomeIcon />
                    </View>
                    <View>
                        <Text className='text-gray-500 text-sm font-montserrat'>Adm No.</Text>
                        <Text className='text-xl font-montserratSemiBold'>{userData?.username}</Text>
                    </View>
                </View>

            </View>
        </View>
    )
}