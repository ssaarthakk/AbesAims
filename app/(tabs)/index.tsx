import React, { useRef, useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import PagerView from 'react-native-pager-view';
import HomePage from '@/components/Home/HomePage';
import Attendance from './attendance/index';
import Quizzes from './quizzes';
import Profile from './profile/index';
import Ionicons from '@expo/vector-icons/Ionicons';
import Animated, { useAnimatedStyle, interpolateColor, useSharedValue, SharedValue } from 'react-native-reanimated';

// Driven entirely by scrollPosition SharedValue — runs on UI thread, no JS lag
const TabButton = ({ tab, index, scrollPosition, onPress }: {
  tab: any,
  index: number,
  scrollPosition: SharedValue<number>,
  onPress: () => void
}) => {
  const animatedStyle = useAnimatedStyle(() => {
    const distance = Math.abs(scrollPosition.value - index);
    const progress = Math.max(0, 1 - distance);
    return {
      backgroundColor: interpolateColor(progress, [0, 1], ['transparent', 'rgba(168, 85, 247, 0.2)']),
      transform: [{ scale: 0.9 + 0.1 * progress }],
    };
  });

  // Cross-fade between inactive and active icon entirely on UI thread
  const activeIconStyle = useAnimatedStyle(() => {
    const distance = Math.abs(scrollPosition.value - index);
    return { opacity: Math.max(0, 1 - distance), position: 'absolute' as const };
  });

  const inactiveIconStyle = useAnimatedStyle(() => {
    const distance = Math.abs(scrollPosition.value - index);
    return { opacity: Math.min(1, distance) };
  });

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}
      activeOpacity={1}
    >
      <Animated.View
        style={[animatedStyle, { paddingHorizontal: 24, paddingVertical: 8, borderRadius: 999, alignItems: 'center', justifyContent: 'center' }]}
      >
        <View style={{ width: 24, height: 24 }}>
          <Animated.View style={inactiveIconStyle}>
            <Ionicons name={tab.icon} size={24} color="#64748b" />
          </Animated.View>
          <Animated.View style={activeIconStyle}>
            <Ionicons name={tab.icon.replace('-outline', '')} size={24} color="#a855f7" />
          </Animated.View>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
};

export default function DashboardTab() {
  const pagerRef = useRef<PagerView>(null);
  const insets = useSafeAreaInsets();
  const scrollPosition = useSharedValue(0);
  const [activeTab, setActiveTab] = useState(0);

  const handleTabPress = (index: number) => {
    scrollPosition.value = index; // instant UI update before page animates
    pagerRef.current?.setPage(index);
  };

  const onPageScroll = (e: any) => {
    scrollPosition.value = e.nativeEvent.position + e.nativeEvent.offset;
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
        onPageScroll={onPageScroll}
        onPageSelected={onPageSelected}
        overdrag
      >
        <View key="0" style={{ flex: 1, backgroundColor: '#020617' }} collapsable={false}>
          <SafeAreaView className='flex-1 bg-background' edges={['top', 'left', 'right']}>
            <HomePage />
          </SafeAreaView>
        </View>
        <View key="1" style={{ flex: 1, backgroundColor: '#020617' }} collapsable={false}>
          <Attendance />
        </View>
        <View key="2" style={{ flex: 1, backgroundColor: '#020617' }} collapsable={false}>
          <Quizzes />
        </View>
        <View key="3" style={{ flex: 1, backgroundColor: '#020617' }} collapsable={false}>
          <Profile />
        </View>
      </PagerView>

      {/* Custom Floating Tab Bar Island */}
      <View style={{
        position: 'absolute',
        bottom: insets.bottom + 10,
        left: 20,
        right: 20,
        height: 60,
        backgroundColor: '#0f172a',
        borderRadius: 30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.25,
        shadowRadius: 10,
        elevation: 5,
      }}>
        {tabs.map((tab) => (
          <TabButton
            key={tab.index}
            tab={tab}
            index={tab.index}
            scrollPosition={scrollPosition}
            onPress={() => handleTabPress(tab.index)}
          />
        ))}
      </View>
    </View>
  );
}
