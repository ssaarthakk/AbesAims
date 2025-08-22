import React from 'react';
import { Tabs } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { color_primary, color_secondary, color_background, color_text_inverse } from '@/constants/Colors';
import { View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: color_primary,
          borderTopColor: color_primary,
          borderTopWidth: 0,
          elevation: 8,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarActiveTintColor: color_text_inverse,
        tabBarInactiveTintColor: 'rgba(255, 255, 255, 0.6)',
        tabBarLabelStyle: {
          fontFamily: 'Montserrat-Medium',
          fontSize: 12,
          marginTop: 4,
        },
        tabBarIconStyle: {
          marginBottom: 4,
        },
        tabBarBackground: () => (
          <LinearGradient
            colors={[color_primary, color_secondary]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{ flex: 1 }}
          />
        ),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Dashboard",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons 
              name={focused ? "home" : "home-outline"} 
              size={size} 
              color={color} 
            />
          ),
        }}
      />
      <Tabs.Screen
        name="quiz"
        options={{
          title: "Quiz",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons 
              name={focused ? "document-text" : "document-text-outline"} 
              size={size} 
              color={color} 
            />
          ),
        }}
      />
    </Tabs>
  );
}