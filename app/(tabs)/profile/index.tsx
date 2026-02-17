import { View, Text, ToastAndroid, ScrollView, TouchableOpacity } from 'react-native';
import React, { useCallback, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import ProfileCard from '@/components/Profile/ProfileCard';
import { removeData } from '@/utils/storage';
import { useApiStore } from '@/utils/store';
import useStore from '@/utils/store';
import * as Updates from 'expo-updates';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';

export default function Profile() {
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const tabBarHeight = 70 + insets.bottom;

    // Logout
    const setUserData = useStore((state: any) => state.addUserData);
    const setApiData = useApiStore((state: any) => state.addData);

    const handleLogout = async () => {
        try {
            await removeData('userData');
            setUserData(null);
            setApiData([]);
            // router.replace('/');
            await Updates.reloadAsync();
        } catch (error) {
            console.log("Error in Logout", error);
            // ToastAndroid.show("Error logging out", ToastAndroid.SHORT);
        }
    }

    return (
        <SafeAreaView className='flex-1 bg-background' edges={['top', 'left', 'right']}>

            <ScrollView
                className='flex-1 px-4'
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: tabBarHeight + 20 }}
            >
                <Animated.View entering={FadeInDown.delay(100).duration(500)}>
                    <Text className="text-4xl font-montserratExtraBold text-white my-6 text-left tracking-tighter">
                        Profile
                        <Text className="text-primary">.</Text>
                    </Text>
                </Animated.View>
                {/* User Info Card */}
                <Animated.View entering={FadeInUp.delay(200).duration(500)} className="mb-2 justify-center items-center">
                    <ProfileCard />
                </Animated.View>

                <Animated.View entering={FadeInUp.delay(300).duration(500)} className="mb-4">
                    <Text className='font-montserratBold text-xl text-white mb-4 pl-1'>Security Settings</Text>

                    <TouchableOpacity
                        onPress={() => router.push('./password')}
                        activeOpacity={0.7}
                        className="flex-row items-center justify-between bg-surface/80 border border-white/10 p-4 rounded-xl mb-3 backdrop-blur-md active:scale-95"
                    >
                        <View className="flex-row items-center gap-3">
                            <View className="bg-primary/20 p-2 rounded-full">
                                <Ionicons name="key" size={20} color="#a855f7" />
                            </View>
                            <Text className="font-montserratSemiBold text-lg text-white">Change Password</Text>
                        </View>
                        <Ionicons name="chevron-forward" size={20} color="#94a3b8" />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => router.push('./pin')}
                        activeOpacity={0.7}
                        className="flex-row items-center justify-between bg-surface/80 border border-white/10 p-4 rounded-xl mb-3 backdrop-blur-md active:scale-95"
                    >
                        <View className="flex-row items-center gap-3">
                            <View className="bg-secondary/20 p-2 rounded-full">
                                <Ionicons name="keypad" size={20} color="#2dd4bf" />
                            </View>
                            <Text className="font-montserratSemiBold text-lg text-white">Change PIN</Text>
                        </View>
                        <Ionicons name="chevron-forward" size={20} color="#94a3b8" />
                    </TouchableOpacity>
                </Animated.View>

                {/* Logout Button */}
                <Animated.View entering={FadeInUp.delay(400).duration(500)}>
                    <TouchableOpacity
                        onPress={handleLogout}
                        activeOpacity={0.7}
                        className="flex-row items-center justify-center bg-red-500/10 border border-red-500/50 p-4 rounded-xl mb-8 active:scale-95"
                    >
                        <Ionicons name="log-out-outline" size={24} color="#ef4444" />
                        <Text className="text-red-500 font-montserratBold text-lg ml-2">Logout</Text>
                    </TouchableOpacity>
                </Animated.View>

            </ScrollView>
        </SafeAreaView>
    )
}
