import React from 'react';
import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function TabsLayout() {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        sceneStyle: { backgroundColor: '#020617' },
        tabBarStyle: {
          backgroundColor: '#020617', // New Background (Slate 950)
          borderTopColor: 'rgba(255,255,255,0.05)', // Subtle glass border
          height: 70 + insets.bottom, // Dynamic height based on insets
          paddingBottom: insets.bottom + 15, // Dynamic padding
          paddingTop: 8,
          position: 'absolute', // Floating effect if desired, or just standard
          elevation: 0,
        },
        tabBarActiveTintColor: '#a855f7', // New Primary (Purple 500)
        tabBarInactiveTintColor: '#64748b', // Slate 500
        tabBarLabelStyle: {
          fontFamily: 'Montserrat-Medium',
          fontSize: 12,
        },
        tabBarBackground: () => (
          // Optional: You could adding a blur view here if you want real glass
          undefined
        )
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Dashboard",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="attendance"
        options={{
          title: "Attendance",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar-outline" size={size} color={color} />
          ),
        }}
      />
      {/* <Tabs.Screen
        name="subjects"
        options={{
          title: "Subjects",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="book-outline" size={size} color={color} />
          ),
        }}
      /> */}
      <Tabs.Screen
        name="quizzes"
        options={{
          title: "Quizzes",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="document-text-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
