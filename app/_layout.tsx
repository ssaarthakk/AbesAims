import "./global.css";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import React, { useEffect, useState } from "react";
import useStore from "@/utils/store";
import { StudentData } from "@/utils/apicalls";
import { getData } from "@/utils/storage";
import Login from "@/components/Common/Login";
import { LinearGradient } from "expo-linear-gradient";
import { color_four, color_three } from "@/constants/Colors";
import Ionicons from '@expo/vector-icons/Ionicons';
import CustomDrawerContent from "@/components/Common/CustomDrawerContent";
import { useFonts } from "expo-font";
import { SplashScreen } from "expo-router";
import { StatusBar } from "expo-status-bar";
import UpdateNotification from "@/components/Common/UpdateNotification";
import Constants from 'expo-constants';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { SafeAreaView } from "react-native-safe-area-context";

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
            {isLoggedIn ? (
                <GestureHandlerRootView style={{ flex: 1 }}>
                    <StatusBar style="light" backgroundColor={color_three} />
                    <Drawer screenOptions={{
                        headerStyle: { backgroundColor: color_three },
                        headerTintColor: color_four,
                        headerTitleStyle: { color: color_four, fontFamily: "Montserrat" },
                        drawerActiveBackgroundColor: color_four,
                        drawerActiveTintColor: color_three,
                        drawerInactiveTintColor: color_four,
                        drawerInactiveBackgroundColor: color_three,
                        drawerStyle: { backgroundColor: color_three },
                        drawerLabelStyle: { fontFamily: "Montserrat" },
                    }}
                        drawerContent={CustomDrawerContent}
                    >
                    <Drawer.Screen
                        name="index"
                        options={{
                            drawerLabel: 'Dashboard',
                            headerTitle: 'ABES AIMS',
                            headerTitleStyle: { fontSize: 24, fontWeight: 'bold', fontFamily: "Montserrat" },
                            headerTitleAlign: 'center',
                            drawerIcon: ({ size, color }) => (
                                <Ionicons name="home-outline" size={size} color={color} />
                            )
                        }}
                    />
                    <Drawer.Screen
                        name="Profile/index"
                        options={{
                            drawerLabel: 'Profile',
                            headerTitle: 'Profile',
                            headerTitleStyle: { fontSize: 24, fontWeight: 'bold', fontFamily: "Montserrat" },
                            headerTitleAlign: 'center',
                            drawerIcon: ({ size, color }) => (
                                <Ionicons name="person-outline" size={size} color={color} />
                            )
                        }}
                    />
                    <Drawer.Screen
                        name="AttendanceDetails"
                        options={{
                            drawerLabel: 'Attendance Details',
                            headerTitle: 'Attendance Details',
                            headerTitleStyle: { fontSize: 24, fontWeight: 'bold', fontFamily: "Montserrat" },
                            headerTitleAlign: 'center',
                            drawerIcon: ({ size, color }) => (
                                <Ionicons name="calendar-outline" size={size} color={color} />
                            )
                        }}
                    />
                    <Drawer.Screen
                        name="CompletedQuizzes/index"
                        options={{
                            drawerLabel: 'Completed Quizzes',
                            headerTitle: 'Completed Quizzes',
                            headerTitleStyle: { fontSize: 24, fontWeight: 'bold', fontFamily: "Montserrat" },
                            headerTitleAlign: 'center',
                            drawerIcon: ({ size, color }) => (
                                <Ionicons name="paper-plane-outline" size={size} color={color} />
                            )
                        }}
                    />
                    <Drawer.Screen
                        name="SubjectDetails/index"
                        options={{
                            drawerLabel: 'Subject Details',
                            headerTitle: 'Subject Details',
                            headerTitleStyle: { fontSize: 24, fontWeight: 'bold', fontFamily: "Montserrat" },
                            headerTitleAlign: 'center',
                            drawerIcon: ({ size, color }) => (
                                <Ionicons name="book-outline" size={size} color={color} />
                            )
                        }}
                    />
                    <Drawer.Screen
                        name="ChangePinPassword/index"
                        options={{
                            drawerLabel: 'Change Pin/Password',
                            headerTitle: 'Change Pin/Password',
                            headerTitleStyle: { fontSize: 24, fontWeight: 'bold', fontFamily: "Montserrat" },
                            headerTitleAlign: 'center',
                            drawerIcon: ({ size, color }) => (
                                <Ionicons name="key-outline" size={size} color={color} />
                            )
                        }}
                    />
                </Drawer>
            </GestureHandlerRootView>
            ) : (
                <>
                    <StatusBar style="light" backgroundColor={color_three} />
                    <LinearGradient className='flex-1 justify-center items-center' colors={[color_three, color_four]} start={{ x: 0, y: 0 }} end={{ x: 0.6, y: 0.6 }} >
                        <Login />
                    </LinearGradient>
                </>
            )}
        </SafeAreaProvider>
    )
}