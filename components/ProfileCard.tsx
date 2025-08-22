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
        <View className='bg-color_five p-5 w-[90vw] rounded-2xl h-auto shadow shadow-black drop-shadow-2xl flex gap-4'>
            <View>
                <View className='flex items-center'>
                    <Ionicons name="person-circle-outline" size={75} color={color_three} />
                </View>
                <Text className='text-3xl font-montserratBold text-center'>{userData.name}</Text>
            </View>

            <View className='flex gap-1'>
                <View className='flex flex-row gap-1 items-center'>
                    <Ionicons name="id-card-outline" size={20} color={color_three} />
                    <Text className='font-montserratSemiBold'>Department & Section:</Text>
                </View>
                <Text className='ml-7 font-montserrat'>{userData.branch} - {userData.section}</Text>
            </View>

            <View className='flex gap-1'>
                <View className='flex flex-row gap-1 items-center'>
                    <Ionicons name="mail-outline" size={20} color={color_three} />
                    <Text className='font-montserratSemiBold'>Email:</Text>
                </View>
                <Text className='ml-7 font-montserrat'>{userData.email}</Text>
            </View>

            <View className='flex gap-1'>
                <View className='flex flex-row gap-1 items-center'>
                    <Ionicons name="phone-portrait-outline" size={20} color={color_three} />
                    <Text className='font-montserratSemiBold'>Mobile:</Text>
                </View>
                <Text className='ml-7 font-montserrat'>{userData.mobile}</Text>
            </View>

            <View className='flex gap-1'>
                <View className='flex flex-row gap-1 items-center'>
                    <Ionicons name="document-text-outline" size={20} color={color_three} />
                    <Text className='font-montserratSemiBold'>Admission Number:</Text>
                </View>
                <Text className='ml-7 font-montserrat'>{userData.username}</Text>
            </View>

            <View className='flex gap-1'>
                <View className='flex flex-row gap-1 items-center'>
                    <Ionicons name="lock-closed-outline" size={20} color={color_three} />
                    <Text className='font-montserratSemiBold'>Roll Number:</Text>
                </View>
                <Text className='ml-7 font-montserrat'>{userData.rollno}</Text>
            </View>

            <View className='flex gap-1'>
                <View className='flex flex-row gap-1 items-center'>
                    <Ionicons name="calendar-outline" size={20} color={color_three} />
                    <Text className='font-montserratSemiBold'>Term:</Text>
                </View>
                <Text className='ml-7 font-montserrat'>Year: {userData.year} Semester: {userData.semester}</Text>
            </View>

            <View className='flex gap-1'>
                <View className='flex flex-row gap-1 items-center'>
                    <Ionicons name="calendar-number-outline" size={20} color={color_three} />
                    <Text className='font-montserratSemiBold'>Passing Year:</Text>
                </View>
                <Text className='ml-7 font-montserrat'>{userData.passingYear}</Text>
            </View>

            <View className='flex gap-1'>
                <View className='flex flex-row gap-1 items-center'>
                    <Ionicons name="map-outline" size={20} color={color_three} />
                    <Text className='font-montserratSemiBold'>Role:</Text>
                </View>
                <Text className='ml-7 font-montserrat'>{userData.role}</Text>
            </View>

            <View className='flex gap-1'>
                <View className='flex flex-row gap-1 items-center'>
                    <Ionicons name="document-lock-outline" size={20} color={color_three} />
                    <Text className='font-montserratSemiBold'>PIN:</Text>
                </View>
                <Text className='ml-7 font-montserrat'>{userData.quizPin}</Text>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({})