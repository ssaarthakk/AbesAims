import React, { useRef, useState, useEffect } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import PagerView from 'react-native-pager-view';
import HomePage from '@/components/Home/HomePage';
import Attendance from './attendance/index';
import Quizzes from './quizzes';
import Profile from './profile/index';
import Ionicons from '@expo/vector-icons/Ionicons';
import Animated, { FadeInDown, useAnimatedStyle, withTiming, withSpring, interpolateColor, useSharedValue } from 'react-native-reanimated';

// Separate TabButton Component for proper hook usage
const TabButton = ({ tab, isActive, onPress }: { tab: any, isActive: boolean, onPress: () => void }) => {
  const animatedValue = useSharedValue(isActive ? 1 : 0);

  useEffect(() => {
    animatedValue.value = withTiming(isActive ? 1 : 0, { duration: 300 });
  }, [isActive]);

  const animatedStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      animatedValue.value,
      [0, 1],
      ['transparent', 'rgba(168, 85, 247, 0.2)'] // Transparent to Purple/20
    );

    const scale = 0.9 + (0.1 * animatedValue.value); // Scale from 0.9 to 1.0

    return {
      backgroundColor,
      transform: [{ scale }],
    };
  });

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}
      activeOpacity={0.7}
    >
      <Animated.View
        className={`px-6 py-2 rounded-full items-center justify-center`}
        style={animatedStyle}
      >
        <Ionicons
          name={isActive ? (tab.icon as any).replace('-outline', '') : tab.icon as any}
          size={24}
          color={isActive ? '#a855f7' : '#64748b'}
        />
      </Animated.View>
    </TouchableOpacity>
  );
};

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
            isActive={activeTab === tab.index}
            onPress={() => handleTabPress(tab.index)}
          />
        ))}
      </View>
    </View>
  );
}
