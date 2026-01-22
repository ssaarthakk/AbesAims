import { Text, View, Image } from 'react-native'
import React from 'react'
import { StudentData } from '@/utils/apicalls'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons'

export default function UserDataCard({ userData }: { userData: StudentData }) {

    // First name for the large display
    const firstName = userData?.name?.split(' ')[0] || 'Student';

    return (
        <View>
            <Text className="text-white/60 font-montserratSemiBold text-sm uppercase tracking-widest mb-3 ml-1">
                Student ID
            </Text>

            <View className="w-full h-auto rounded-3xl overflow-hidden border border-white/10 relative">
                <LinearGradient
                    colors={['rgba(255,255,255,0.08)', 'rgba(255,255,255,0.03)']}
                    className="absolute w-full h-full"
                />

                {/* Decorative Elements */}
                <View className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-bl-full blur-2xl" />
                <View className="absolute bottom-0 left-0 w-32 h-32 bg-secondary/10 rounded-tr-full blur-2xl" />

                <View className="p-5">
                    {/* Header: Name & Status */}
                    <View className="flex-row justify-between items-start">
                        <View>
                            <Text className="text-white font-montserratExtraBold text-2xl tracking-tight">
                                {firstName}
                                <Text className="text-primary">.</Text>
                            </Text>
                            <Text className="text-white/50 font-montserratMedium text-xs uppercase tracking-widest mt-1">
                                {userData?.branch || 'Department'}
                            </Text>
                        </View>
                        <View className="bg-white/10 p-2 rounded-xl border border-white/5">
                            <Ionicons name="finger-print" size={24} color="rgba(255,255,255,0.6)" />
                        </View>
                    </View>

                    {/* <View className="flex-row gap-3">
                        <View className="flex-1 bg-black/20 p-3 rounded-xl border border-white/5 flex-row items-center gap-3">
                            <View className="w-8 h-8 rounded-full bg-blue-500/20 items-center justify-center">
                                <Text className="text-blue-400 font-bold text-xs">S</Text>
                            </View>
                            <View>
                                <Text className="text-white/40 text-[10px] uppercase font-bold">Sem</Text>
                                <Text className="text-white font-montserratBold text-base">{userData?.semester}</Text>
                            </View>
                        </View>

                        <View className="flex-1 bg-black/20 p-3 rounded-xl border border-white/5 flex-row items-center gap-3">
                            <View className="w-8 h-8 rounded-full bg-pink-500/20 items-center justify-center">
                                <Text className="text-pink-400 font-bold text-xs">#</Text>
                            </View>
                            <View>
                                <Text className="text-white/40 text-[10px] uppercase font-bold">Admission No</Text>
                                <Text className="text-white font-montserratBold text-base" numberOfLines={1}>
                                    {userData?.username}
                                </Text>
                            </View>
                        </View>
                    </View> */}
                </View>
            </View>
        </View>
    )
}