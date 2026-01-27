import React, { useRef, useState, useMemo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import PagerView from 'react-native-pager-view';
import HomePage from '@/components/Home/HomePage';
import Attendance from './attendance'; // Importing from sibling route file
import Quizzes from './quizzes';       // Importing from sibling route file
import Profile from './profile';       // Importing from sibling route file
import Ionicons from '@expo/vector-icons/Ionicons';

export default function DashboardTab() {
  const [activeTab, setActiveTab] = useState(0);
  const pagerRef = useRef<PagerView>(null);
  const insets = useSafeAreaInsets();

  const handleTabPress = (index: number) => {
    setActiveTab(index);
    pagerRef.current?.setPage(index);
  };

  const onPageSelected = (e: any) => {
    setActiveTab(e.nativeEvent.position);
  };

  const tabs = [
    { name: 'Dashboard', icon: 'home-outline', index: 0 },
    { name: 'Attendance', icon: 'calendar-outline', index: 1 },
    { name: 'Quizzes', icon: 'document-text-outline', index: 2 },
    { name: 'Profile', icon: 'person-outline', index: 3 },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: '#020617' }}>
      <PagerView
        ref={pagerRef}
        style={{ flex: 1 }}
        initialPage={0}
        onPageSelected={onPageSelected}
      >
        <View key="0" style={{ flex: 1 }}>
          <SafeAreaView className='flex-1 bg-background' edges={['top', 'left', 'right']}>
            <HomePage />
          </SafeAreaView>
        </View>
        <View key="1" style={{ flex: 1 }}>
          <Attendance />
        </View>
        <View key="2" style={{ flex: 1 }}>
          <Quizzes />
        </View>
        <View key="3" style={{ flex: 1 }}>
          <Profile />
        </View>
      </PagerView>

      {/* Custom Tab Bar */}
      <View style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#020617',
        borderTopWidth: 1,
        borderTopColor: 'rgba(255,255,255,0.05)',
        paddingBottom: insets.bottom + 10,
        paddingTop: 12,
        height: 70 + insets.bottom,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        elevation: 0,
      }}>
        {tabs.map((tab) => {
          const isActive = activeTab === tab.index;
          return (
            <TouchableOpacity
              key={tab.index}
              onPress={() => handleTabPress(tab.index)}
              style={{ alignItems: 'center', justifyContent: 'center' }}
              activeOpacity={0.7}
            >
              <Ionicons
                name={tab.icon as any}
                size={24}
                color={isActive ? '#a855f7' : '#64748b'}
              />
              <Text style={{
                fontFamily: 'Montserrat-Medium',
                fontSize: 10,
                color: isActive ? '#a855f7' : '#64748b',
                marginTop: 4
              }}>
                {tab.name}
              </Text>
            </TouchableOpacity>
          )
        })}
      </View>
    </View>
  );
}
