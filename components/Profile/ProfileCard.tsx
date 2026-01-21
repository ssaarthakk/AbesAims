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
        <View className='bg-surface/80 border border-white/10 p-6 w-[90vw] rounded-2xl h-auto shadow-xl shadow-black/40 backdrop-blur-md mb-6'>
            {/* Header / Avatar */}
            <View className='items-center mb-6'>
                <View className="mb-4 p-1 rounded-full border-2 border-primary shadow-lg shadow-primary/30">
                    <View className="bg-surface rounded-full overflow-hidden">
                        <Ionicons name="person" size={80} color="#e2e8f0" style={{ margin: 10 }} />
                    </View>
                </View>
                <Text className='text-3xl font-montserratExtraBold text-center text-white tracking-tight leading-8'>{userData.name}</Text>
                <View className="bg-primary/20 px-3 py-1 rounded-full border border-primary/30 mt-2">
                    <Text className="text-primary font-montserratBold text-xs uppercase tracking-widest">{userData.role || 'Student'}</Text>
                </View>
            </View>

            {/* Info Items */}
            <View className='gap-4'>
                <View className='flex-row items-center bg-color_one p-3 rounded-xl border border-white/5'>
                    <View className="bg-purple-500/20 p-2.5 rounded-full mr-3">
                        <Ionicons name="school" size={20} color="#a855f7" />
                    </View>
                    <View className="flex-1">
                        <Text className='text-[10px] font-montserratBold text-text-muted uppercase tracking-wide'>Department & Section</Text>
                        <Text className='text-base font-montserratSemiBold text-slate-200'>{userData.branch} - {userData.section}</Text>
                    </View>
                </View>

                <View className='flex-row items-center bg-color_one p-3 rounded-xl border border-white/5'>
                    <View className="bg-sky-500/20 p-2.5 rounded-full mr-3">
                        <Ionicons name="mail" size={20} color="#38bdf8" />
                    </View>
                    <View className="flex-1">
                        <Text className='text-[10px] font-montserratBold text-text-muted uppercase tracking-wide'>Email</Text>
                        <Text className='text-base font-montserratSemiBold text-slate-200'>{userData.email}</Text>
                    </View>
                </View>

                <View className='flex-row items-center bg-color_one p-3 rounded-xl border border-white/5'>
                    <View className="bg-emerald-500/20 p-2.5 rounded-full mr-3">
                        <Ionicons name="call" size={20} color="#34d399" />
                    </View>
                    <View className="flex-1">
                        <Text className='text-[10px] font-montserratBold text-text-muted uppercase tracking-wide'>Mobile</Text>
                        <Text className='text-base font-montserratSemiBold text-slate-200'>{userData.mobile}</Text>
                    </View>
                </View>

                <View className='flex-row gap-2'>
                    <View className='flex-1 items-center bg-color_one p-3 rounded-xl border border-white/5'>
                        <Text className='text-[10px] font-montserratBold text-text-muted uppercase tracking-wide mb-1'>Admission No.</Text>
                        <Text className='text-sm font-montserratBold text-white'>{userData.username}</Text>
                    </View>
                    <View className='flex-1 items-center bg-color_one p-3 rounded-xl border border-white/5'>
                        <Text className='text-[10px] font-montserratBold text-text-muted uppercase tracking-wide mb-1'>Roll No.</Text>
                        <Text className='text-sm font-montserratBold text-white'>{userData.rollno}</Text>
                    </View>
                </View>

                <View className='flex-row gap-2'>
                    <View className='flex-1 items-center bg-color_one p-3 rounded-xl border border-white/5'>
                        <Text className='text-[10px] font-montserratBold text-text-muted uppercase tracking-wide mb-1'>Year / Sem</Text>
                        <Text className='text-sm font-montserratBold text-white'>{userData.year} / {userData.semester}</Text>
                    </View>
                    <View className='flex-1 items-center bg-color_one p-3 rounded-xl border border-white/5'>
                        <Text className='text-[10px] font-montserratBold text-text-muted uppercase tracking-wide mb-1'>Quiz PIN</Text>
                        <Text className='text-sm font-montserratBold text-accent'>{userData.quizPin}</Text>
                    </View>
                </View>

                <View className='flex-1 items-center bg-color_one p-3 rounded-xl border border-white/5'>
                    <Text className='text-[10px] font-montserratBold text-text-muted uppercase tracking-wide mb-1'>Passing Year</Text>
                    <Text className='text-sm font-montserratBold text-white'>{userData.passingYear}</Text>
                </View>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({})