import "./global.css";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Stack, Slot } from 'expo-router';
import React, { useEffect, useState } from "react";
import useStore from "@/utils/store";
import { StudentData } from "@/utils/apicalls";
import { getData } from "@/utils/storage";
import Login from "@/components/Common/Login";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts } from "expo-font";
import { SplashScreen } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from 'react-native-safe-area-context';

SplashScreen.preventAutoHideAsync();

export default function Layout() {

    const [fontsLoaded] = useFonts({
        "Montserrat": require("../assets/fonts/Montserrat-Regular.ttf"),
        'Montserrat-ExtraBold': require('../assets/fonts/Montserrat-ExtraBold.ttf'),
        'Montserrat-Bold': require('../assets/fonts/Montserrat-Bold.ttf'),
        'Montserrat-Medium': require('../assets/fonts/Montserrat-Medium.ttf'),
        'Montserrat-SemiBold': require('../assets/fonts/Montserrat-SemiBold.ttf'),
    });

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const data = useStore((state: any) => state.userData);
    React.useEffect(() => {
        const checkLoginStatus = async () => {
            const userData: StudentData | null = await getData('userData');
            if (!userData) {
                setIsLoggedIn(false);
            } else {
                setIsLoggedIn(true);
            }
        }

        const initializeApp = async () => {
            await checkLoginStatus();
            if (isLoggedIn) {
                import('@/utils/updateManager').then(({ UpdateManager }) => {
                    UpdateManager.checkAndPromptForUpdate();
                });
            }
        };

        initializeApp();
    }, [data, isLoggedIn]);

    useEffect(() => {
        if (fontsLoaded) SplashScreen.hideAsync();
    }, [fontsLoaded]);

    if (!fontsLoaded) {
        return null;
    }

    return (
        <SafeAreaProvider>
            <GestureHandlerRootView style={{ flex: 1 }}>
                <StatusBar style="light" backgroundColor='#0f172a' />
                {isLoggedIn ? (
                    <Stack screenOptions={{ headerShown: false }}>
                        <Stack.Screen name="(tabs)" />
                    </Stack>
                ) : (
                    <LinearGradient className='flex-1 justify-center items-center' colors={['#0f172a', '#1e293b']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} >
                        <Login />
                    </LinearGradient>
                )}
            </GestureHandlerRootView>
        </SafeAreaProvider>
    )
}