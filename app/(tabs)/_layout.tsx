import React from 'react';
import { Tabs } from 'expo-router';
import { color_three, color_four } from '@/constants/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import DashboardTab from '.';

export default function TabsLayout() {
  return (
    <DashboardTab />
    // <Tabs
    //   screenOptions={{
    //     headerShown: false,
    //     tabBarStyle: {
    //       backgroundColor: color_three,
    //       borderTopWidth: 0,
    //       elevation: 0,
    //       paddingVertical: 10,
    //     },
    //     tabBarActiveTintColor: color_four,
    //     tabBarInactiveTintColor: 'rgba(255, 255, 255, 0.7)',
    //   }}
    // >
    //   <Tabs.Screen
    //     name="index"
    //     options={{
    //       title: "Dashboard",
    //       tabBarIcon: ({ color, size }) => (
    //         <Ionicons name="home" size={size} color={color} />
    //       ),
    //     }}
    //   />
    //   <Tabs.Screen
    //     name="quiz"
    //     options={{
    //       title: "Quiz",
    //       tabBarIcon: ({ color, size }) => (
    //         <Ionicons name="help-circle-outline" size={size} color={color} />
    //       ),
    //     }}
    //   />
    // </Tabs>
  );
}
