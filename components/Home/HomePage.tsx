import { ToastAndroid, View, RefreshControl, ScrollView } from 'react-native'
import { useEffect, useState, useCallback, useRef } from 'react'
import { getData } from '@/utils/storage';
import { getSchedule, getSubjectDetailsAndAttendance, StudentData } from '@/utils/apicalls';
import { useApiStore } from '@/utils/store';
import AttendanceOverview from './AttendanceOverview';
import UserDataCard from './UserDataCard';
import TodaySchedule from './TodaySchedule';
import NextClass from './NextClass';
import DashboardHeader from './DashboardHeader';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import Skeleton from '../Skeleton';
import tabBarControls from '@/utils/tabBarControls';

export default function HomePage() {
  const [userData, setUserData] = useState<StudentData>({} as StudentData);
  const dataApi = useApiStore((state: any) => state.data);
  const setDataApi = useApiStore((state: any) => state.addData);
  const [attendance, setAttendance] = useState<{ Present: number, Total: number, Percent: string } | null>(null);
  const [classCount, setClassCount] = useState<number>(0);
  const [scheduleData, setScheduleData] = useState<Array<any>>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  const insets = useSafeAreaInsets();
  const tabBarHeight = 70 + insets.bottom;
  const lastScrollY = useRef(0);

  const handleScroll = (e: any) => {
    const y = e.nativeEvent.contentOffset.y;
    if (y > lastScrollY.current + 5) tabBarControls.hide();
    else if (y < lastScrollY.current - 5) tabBarControls.show();
    lastScrollY.current = y;
  };

  const extraAttendance = () => {
    if (!attendance) return;

    let p = Number(attendance.Present);
    let total = Number(attendance.Total);
    let percent = (p / total) * 100;
    let count = 0;

    if (((attendance.Present / attendance.Total) * 100) > 75) {
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
    } else if (((attendance.Present / attendance.Total) * 100) <= 75) {
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
      if (refreshing) return;

      // Only set loading true if we don't have data yet
      if (dataApi.length === 0) setLoading(true);

      try {
        const data: StudentData = await getData('userData') as StudentData;
        if (dataApi.length === 0 && data) {
          const apiData = await getSubjectDetailsAndAttendance();
          if (apiData.length > 0 && attendance === null) {
            setAttendance(apiData[apiData.length - 1].attendance_summary);
          } else if (apiData.length === 0 && count < 3) {
            // If data is empty, we might want to retry, but for now let's just proceed
            // Recursive retry logic in useEffect is tricky, might cause infinite loops if not careful
            // Original logic had it, preserving it but being careful
            count = count + 1;
            // If we want to retry, maybe we should await?
            // checkLogin(); // Warning: this could lead to race conditions/stack issues if not handled
          }
          setDataApi(apiData);
        }

        if (data) {
          setUserData(data);
        }
      } catch (error) {
        console.error("Login check error:", error);
      } finally {
        setLoading(false);
      }
    }

    checkLogin();
  }, [dataApi, refreshing]);

  useEffect(() => {
    if (dataApi.length > 0 && attendance === null) {
      setAttendance(dataApi[dataApi.length - 1].attendance_summary);
    }
    if (attendance) {
      extraAttendance();
    }
  }, [attendance, dataApi]);

  useEffect(() => {
    const getData = async () => {
      if (refreshing) return;

      if (scheduleData.length === 0) {
        const apiData: Array<any> = await getSchedule();
        if (apiData.length > 0) {
          setScheduleData(apiData);
        }
      }
    }
    getData();

  }, [scheduleData, refreshing]);

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={['#a855f7']}
          tintColor={'#a855f7'}
        />
      }
      contentContainerStyle={{ paddingBottom: tabBarHeight + 20 }}
      className="px-4"
      showsVerticalScrollIndicator={false}
      onScroll={handleScroll}
      scrollEventThrottle={16}
    >
      <Animated.View entering={FadeInDown.delay(100).duration(500)}>
        <DashboardHeader userData={userData} />
      </Animated.View>

      <View className='flex-1 gap-6'>
        {/* <Animated.View entering={FadeInUp.delay(200).duration(500)}>
          {loading && scheduleData.length === 0 ? (
            <Skeleton height={140} borderRadius={24} />
          ) : (
            <NextClass scheduleData={scheduleData} />
          )}
        </Animated.View> */}

        <Animated.View entering={FadeInUp.delay(300).duration(500)}>
          {loading && !userData.username ? (
            <Skeleton height={180} borderRadius={24} />
          ) : (
            <UserDataCard userData={userData} />
          )}
        </Animated.View>

        <Animated.View entering={FadeInUp.delay(400).duration(500)}>
          {loading && !attendance ? (
            <Skeleton height={300} borderRadius={24} />
          ) : (
            <AttendanceOverview attendance={attendance} classCount={classCount} />
          )}
        </Animated.View>

        <Animated.View entering={FadeInUp.delay(500).duration(500)}>
          {loading && scheduleData.length === 0 ? (
            <Skeleton height={200} borderRadius={24} />
          ) : (
            <TodaySchedule scheduleData={scheduleData} />
          )}
        </Animated.View>
      </View>
    </ScrollView>
  )
}
