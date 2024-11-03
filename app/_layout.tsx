import "./global.css";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import React, { useState } from "react";
import useStore from "@/utils/store";
import { StudentData } from "@/utils/apicalls";
import { getData } from "@/utils/storage";
import Login from "@/components/Login";
import { LinearGradient } from "expo-linear-gradient";
import { color_four, color_three, color_two } from "@/constants/Colors";
import Ionicons from '@expo/vector-icons/Ionicons';
import CustomDrawerContent from "@/components/CustomDrawerContent";

export default function Layout() {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const data = useStore((state: any) => state.userData);
    const [dataUser, setDataUser] = useState<StudentData | null>(null);
    React.useEffect(() => {

        const checkLoginStatus = async () => {
            const userData: StudentData | null = await getData('userData');
            if (!userData) {
                setIsLoggedIn(false);
            } else {
                setDataUser(userData);
                setIsLoggedIn(true);
            }
        }

        checkLoginStatus();
    }, [data]);

    return (
        isLoggedIn ? (
            <GestureHandlerRootView style={{ flex: 1 }}>
                <Drawer screenOptions={{
                    headerStyle: { backgroundColor: color_three },
                    headerTintColor: color_four,
                    headerTitleStyle: { color: color_four },
                    drawerActiveBackgroundColor: color_four,
                    drawerActiveTintColor: color_two,
                    drawerInactiveTintColor: color_four,
                    drawerInactiveBackgroundColor: color_three,
                    drawerStyle: { backgroundColor: color_three },
                    drawerLabelStyle: { marginLeft: -20 },
                }}
                drawerContent={CustomDrawerContent}
                >
                    <Drawer.Screen
                        name="index"
                        options={{
                            drawerLabel: 'Dashboard',
                            title: 'ABES AIMS',
                            headerTitleStyle: { fontSize: 24, fontWeight: 'bold' },
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
                            title: 'Profile',
                            headerTitleStyle: { fontSize: 24, fontWeight: 'bold' },
                            headerTitleAlign: 'center',
                            drawerIcon: ({ size, color }) => (
                                <Ionicons name="person-outline" size={size} color={color} />
                            )
                        }}
                    />
                    <Drawer.Screen
                        name="AttendanceDetails/index"
                        options={{
                            drawerLabel: 'Attendance Details',
                            title: 'Attendance Details',
                            headerTitleStyle: { fontSize: 24, fontWeight: 'bold' },
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
                            title: 'Completed Quizzes',
                            headerTitleStyle: { fontSize: 24, fontWeight: 'bold' },
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
                            title: 'Subject Details',
                            headerTitleStyle: { fontSize: 24, fontWeight: 'bold' },
                            headerTitleAlign: 'center',
                            drawerIcon: ({ size, color }) => (
                                <Ionicons name="book-outline" size={size} color={color} />
                            )
                        }}
                    />
                </Drawer>
            </GestureHandlerRootView>
        ) : (
            <LinearGradient className='flex-1 justify-center items-center' colors={[color_three, color_four]} start={{ x: 0, y: 0 }} end={{ x: 0.6, y: 0.6 }} >
                <Login />
            </LinearGradient>
        )
    )
}