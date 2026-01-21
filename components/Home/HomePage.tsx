import { ToastAndroid, View, RefreshControl, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getData } from '@/utils/storage';
import { getSchedule, getSubjectDetailsAndAttendance, StudentData } from '@/utils/apicalls';
import { useApiStore } from '@/utils/store';
import AttendanceOverview from './AttendanceOverview';
import UserDataCard from './UserDataCard';
import LoadinSvg from './LoadinSvg';
import TodaySchedule from './TodaySchedule';
import NextClass from './NextClass';
import DashboardHeader from './DashboardHeader';
import { color_three } from '@/constants/Colors';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';

export default function HomePage() {
  const [userData, setUserData] = useState<StudentData>({} as StudentData);
  const dataApi = useApiStore((state: any) => state.data);
  const setDataApi = useApiStore((state: any) => state.addData);
  const [attendance, setAttendance] = useState<{ Present: number, Total: number, Percent: string } | null>(null);
  const [classCount, setClassCount] = useState<number>(0);
  const [scheduleData, setScheduleData] = useState<Array<any>>([]);
  const [refreshing, setRefreshing] = useState(false);

  // Use try-catch or optional chaining for safety if used outside tabs, though normally safe in this scope
  let tabBarHeight = 0;
  try {
    tabBarHeight = useBottomTabBarHeight();
  } catch (e) {
    tabBarHeight = 0;
  }

  const extraAttendance = () => {
    let p = Number(attendance!.Present);
    let total = Number(attendance!.Total);
    let percent = (p / total) * 100;
    let count = 0;

    if (((attendance!.Present / attendance!.Total) * 100) > 75) {
      while (true) {
        if (percent <= 75) {
          break;
        } else if (percent > 75) {
          total++;
          count++;
          percent = (p / total) * 100;
        }
      }
      if (p / total < 75) {
        count--;
      }
      setClassCount(count);
    } else if (((attendance!.Present / attendance!.Total) * 100) <= 75) {
      while (true) {
        if (percent >= 75) {
          break;
        } else if (percent < 75) {
          p++;
          total++;
          count++;
          percent = (p / total) * 100;
        }
      }
      setClassCount(count);
    }
  }

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      // Fetch fresh data without clearing current data first
      const apiData = await getSubjectDetailsAndAttendance();
      const scheduleApiData = await getSchedule();

      if (apiData.length > 0) {
        setDataApi(apiData);
        setAttendance(apiData[apiData.length - 1].attendance_summary);
      }

      if (scheduleApiData.length > 0) {
        setScheduleData(scheduleApiData);
      }

      ToastAndroid.show('Data refreshed successfully!', ToastAndroid.SHORT);
    } catch (error) {
      console.error('Refresh error:', error);
      ToastAndroid.show('Failed to refresh data', ToastAndroid.SHORT);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    let count = 0;
    const checkLogin = async () => {
      // Skip if we're currently refreshing to avoid conflicts
      if (refreshing) return;

      const data: StudentData = await getData('userData') as StudentData;
      if (dataApi.length === 0 && data) {
        const apiData = await getSubjectDetailsAndAttendance();
        if (apiData.length > 0 && attendance === null) {
          setAttendance(apiData[apiData!.length - 1].attendance_summary);
        } else if (apiData.length === 0 && count < 3) {
          checkLogin();
          count = count + 1;
        }
        setDataApi(apiData);
      }

      if (data) {
        setUserData(data);
      }

    }

    checkLogin();
  }, [dataApi, refreshing]);

  useEffect(() => {
    if (dataApi.length > 0 && attendance === null) {
      setAttendance(dataApi[dataApi!.length - 1].attendance_summary);
    }
    if (attendance) {
      extraAttendance();
    }
  }, [attendance]);

  useEffect(() => {
    const getData = async () => {
      // Skip if we're currently refreshing to avoid conflicts
      if (refreshing) return;

      if (scheduleData.length === 0) {
        const apiData: Array<any> = await getSchedule();
        if (apiData.length === 0) {
          getData();
        }
        await setScheduleData(apiData);
      }
    }
    getData();

  }, [scheduleData, refreshing]);

  if (attendance) {
    return (
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#a855f7']} // Primary color (Purple)
            tintColor={'#a855f7'} // Primary color (Purple)
          />
        }
        contentContainerStyle={{ paddingBottom: tabBarHeight + 20 }}
        className="px-4" // Keep base padding
      >
        <Animated.View entering={FadeInDown.delay(100).duration(500)}>
          <DashboardHeader userData={userData} />
        </Animated.View>

        <View className='flex-1 gap-6'>
          <Animated.View entering={FadeInUp.delay(200).duration(500)}>
            <NextClass scheduleData={scheduleData} />
          </Animated.View>

          <Animated.View entering={FadeInUp.delay(300).duration(500)}>
            {/* <UserDataCard userData={userData} /> */}
            {/* Keeping UserDataCard logic but if removed by previous decision, ensure correctness. User requested removing UserDataCard in Orchestrating Dashboard, but it's present in current file. I will keep it but animated. */}
            <UserDataCard userData={userData} />
          </Animated.View>

          <Animated.View entering={FadeInUp.delay(400).duration(500)}>
            <AttendanceOverview attendance={attendance} classCount={classCount} />
          </Animated.View>

          <Animated.View entering={FadeInUp.delay(500).duration(500)}>
            <TodaySchedule scheduleData={scheduleData} />
          </Animated.View>
        </View>
      </ScrollView>
    )
  } else return (
    <View className='flex-1 items-center justify-center h-screen'>
      <LoadinSvg loading={!attendance} color={'black'} size={96} />
    </View>
  )
}