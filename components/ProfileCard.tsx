import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons'
import { color_three } from '@/constants/Colors'
import { StudentData } from '@/utils/apicalls';
import { getData } from '@/utils/storage';

export default function ProfileCard() {
    const [userData, setUserData] = useState<StudentData>({} as StudentData);

    useEffect(() => {
        const checkLogin = async () => {
            const data: StudentData = await getData('userData') as StudentData;
            if (data) {
                setUserData(data);
            }
        }
        checkLogin();
    }, []);

    return (
        <View className='felx-1 items-center justify-center'>
            <View className='bg-color_five p-4 w-[90vw] rounded-md h-auto shadow shadow-black drop-shadow-2xl flex gap-6 mb-3'>
                <View>
                    <View className='flex items-center'>
                        <Ionicons name="person-circle-outline" size={75} color={color_three} />
                    </View>
                    <Text className='text-3xl font-bold text-center'>{userData.name}</Text>
                </View>
                <View className='flex gap-2'>
                    <View className='flex flex-row gap-1 items-center'>
                        <Ionicons name="id-card-outline" size={20} color={color_three} />
                        <Text className='font-semibold'>Department & Section:</Text>
                    </View>
                    <Text className='ml-7'>{userData.branch} - {userData.section}</Text>
                </View>

                <View className='flex gap-2'>
                    <View className='flex flex-row gap-1 items-center'>
                        <Ionicons name="mail-outline" size={20} color={color_three} />
                        <Text className='font-semibold'>Email:</Text>
                    </View>
                    <Text className='ml-7'>{userData.email}</Text>
                </View>

                <View className='flex gap-2'>
                    <View className='flex flex-row gap-1 items-center'>
                        <Ionicons name="phone-portrait-outline" size={20} color={color_three} />
                        <Text className='font-semibold'>Mobile:</Text>
                    </View>
                    <Text className='ml-7'>{userData.mobile}</Text>
                </View>

                <View className='flex gap-2'>
                    <View className='flex flex-row gap-1 items-center'>
                        <Ionicons name="document-text-outline" size={20} color={color_three} />
                        <Text className='font-semibold'>Admission Number:</Text>
                    </View>
                    <Text className='ml-7'>{userData.username}</Text>
                </View>

                <View className='flex gap-2'>
                    <View className='flex flex-row gap-1 items-center'>
                        <Ionicons name="lock-closed-outline" size={20} color={color_three} />
                        <Text className='font-semibold'>Roll Number:</Text>
                    </View>
                    <Text className='ml-7'>{userData.rollno}</Text>
                </View>

                <View className='flex gap-2'>
                    <View className='flex flex-row gap-1 items-center'>
                        <Ionicons name="calendar-outline" size={20} color={color_three} />
                        <Text className='font-semibold'>Term:</Text>
                    </View>
                    <Text className='ml-7'>Year: {userData.year} Semester: {userData.semester}</Text>
                </View>

                <View className='flex gap-2'>
                    <View className='flex flex-row gap-1 items-center'>
                        <Ionicons name="calendar-number-outline" size={20} color={color_three} />
                        <Text className='font-semibold'>Passing Year:</Text>
                    </View>
                    <Text className='ml-7'>{userData.passingYear}</Text>
                </View>

                <View className='flex gap-2'>
                    <View className='flex flex-row gap-1 items-center'>
                        <Ionicons name="map-outline" size={20} color={color_three} />
                        <Text className='font-semibold'>Role:</Text>
                    </View>
                    <Text className='ml-7'>{userData.role}</Text>
                </View>

                <View className='flex gap-2'>
                    <View className='flex flex-row gap-1 items-center'>
                        <Ionicons name="document-lock-outline" size={20} color={color_three} />
                        <Text className='font-semibold'>PIN:</Text>
                    </View>
                    <Text className='ml-7'>{userData.quizPin}</Text>
                </View>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({})