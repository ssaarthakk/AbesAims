import { Text, View } from 'react-native'
import React from 'react'
import { BookIcon, CalendarIcon, HomeIcon, ProfileIcon } from '@/constants/SvgIcons'
import { StudentData } from '@/utils/apicalls'

export default function UserDataCard({ userData }: { userData: StudentData }) {

    return (
        <View className='bg-surface/80 border border-white/10 p-5 w-[90vw] rounded-2xl h-auto shadow-xl shadow-black/40 backdrop-blur-md mb-6'>
            <View className='flex flex-row items-center justify-between gap-4 mb-4'>

                <View className='flex-1 flex-row items-center gap-3 bg-color_one p-3 rounded-xl border border-white/5'>
                    <View className='p-2 bg-primary/20 rounded-full'>
                        <ProfileIcon />
                    </View>
                    <View className="flex-1">
                        <Text className='text-text-muted text-[10px] uppercase font-montserratBold tracking-wide'>Name</Text>
                        <Text className='font-montserratSemiBold text-lg text-white leading-5'>{userData?.name?.split(' ')[0]}</Text>
                    </View>
                </View>

                <View className='flex-1 flex-row items-center gap-3 bg-color_one p-3 rounded-xl border border-white/5'>
                    <View className='p-2 bg-secondary/20 rounded-full'>
                        <BookIcon />
                    </View>
                    <View className="flex-1">
                        <Text className='text-text-muted text-[10px] uppercase font-montserratBold tracking-wide'>Branch</Text>
                        <Text className='font-montserratSemiBold text-lg text-white leading-5'>{userData?.branch}</Text>
                    </View>
                </View>

            </View>

            <View className='flex flex-row justify-between items-center gap-4'>

                <View className='flex-1 flex-row items-center gap-3 bg-color_one p-3 rounded-xl border border-white/5'>
                    <View className='p-2 bg-accent/20 rounded-full'>
                        <CalendarIcon />
                    </View>
                    <View className="flex-1">
                        <Text className='text-text-muted text-[10px] uppercase font-montserratBold tracking-wide'>Sem</Text>
                        <Text className='text-lg font-montserratSemiBold text-white leading-5'>{userData?.semester}</Text>
                    </View>
                </View>

                <View className='flex-1 flex-row items-center gap-3 bg-color_one p-3 rounded-xl border border-white/5'>
                    <View className='p-2 bg-sky-500/20 rounded-full'>
                        <HomeIcon />
                    </View>
                    <View className="flex-1">
                        <Text className='text-text-muted text-[10px] uppercase font-montserratBold tracking-wide'>Adm No.</Text>
                        <Text className='text-lg font-montserratSemiBold text-white leading-5'>{userData?.username}</Text>
                    </View>
                </View>

            </View>
        </View>
    )
}