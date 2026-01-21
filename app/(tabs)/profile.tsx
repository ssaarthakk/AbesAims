import { View, Text, ToastAndroid, ScrollView, TouchableOpacity } from 'react-native';
import React, { useCallback } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import ProfileCard from '@/components/Profile/ProfileCard';
import { removeData } from '@/utils/storage';
import { useApiStore } from '@/utils/store';
import useStore from '@/utils/store';
import * as Updates from 'expo-updates';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

export default function Profile() {
    const router = useRouter();
    const tabBarHeight = useBottomTabBarHeight();

    // Logout
    const setUserData = useStore((state: any) => state.addUserData);
    const setApiData = useApiStore((state: any) => state.addData);

    const handleLogout = async () => {
        removeData('userData');
        setUserData(null);
        setApiData([]);
        try {
            await Updates.reloadAsync();
        } catch (error) {
            console.log("Error while reloading app in Logout");
            ToastAndroid.show("Please try again", ToastAndroid.LONG);
        }
    }

    return (
        <SafeAreaView className='flex-1 bg-background' edges={['top', 'left', 'right']}>
            <ScrollView
                className='flex-1 px-4'
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: tabBarHeight + 20 }}
            >
                <Text className="text-4xl font-montserratExtraBold text-white my-6 text-left tracking-tighter">
                    Profile
                    <Text className="text-primary">.</Text>
                </Text>

                {/* User Info Card */}
                <View className="mb-2">
                    <ProfileCard />
                </View>

                <View className="mb-4">
                    <Text className='font-montserratBold text-xl text-white mb-4 pl-1'>Security Settings</Text>

                    <TouchableOpacity
                        onPress={() => router.push('/settings/password')}
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
                        onPress={() => router.push('/settings/pin')}
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
                </View>

                {/* Logout Button */}
                <TouchableOpacity
                    onPress={handleLogout}
                    activeOpacity={0.7}
                    className="flex-row items-center justify-center bg-red-500/10 border border-red-500/50 p-4 rounded-xl mb-8 active:scale-95"
                >
                    <Ionicons name="log-out-outline" size={24} color="#ef4444" />
                    <Text className="text-red-500 font-montserratBold text-lg ml-2">Logout</Text>
                </TouchableOpacity>

            </ScrollView>
        </SafeAreaView>
    )
}
