import { View, Text, TouchableOpacity, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { StudentData } from '@/utils/apicalls';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function DashboardHeader({ userData }: { userData: StudentData }) {
    const router = useRouter();
    const [greeting, setGreeting] = useState('');

    useEffect(() => {
        const hour = new Date().getHours();
        if (hour < 12) setGreeting('Good Morning');
        else if (hour < 18) setGreeting('Good Afternoon');
        else setGreeting('Good Evening');
    }, []);

    const firstName = userData?.name?.split(' ')[0] || 'Friend';

    return (
        <View className="flex-row justify-between items-center mb-6 pt-2">
            <View>
                <Text className="text-white font-montserratExtraBold text-3xl tracking-tight">
                    {greeting}
                    <Text className="text-primary">.</Text>
                </Text>
            </View>

            {/* <TouchableOpacity
                onPress={() => router.push('/(tabs)/profile')}
                className="w-12 h-12 rounded-full overflow-hidden border border-white/20 bg-white/5 items-center justify-center p-1"
            >
                <View className="w-full h-full rounded-full bg-color_one items-center justify-center">
                    <Ionicons name="person" size={20} color="#a855f7" />
                </View>
            </TouchableOpacity> */}
        </View>
    );
}
