import { ToastAndroid, View, RefreshControl } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getData } from '@/utils/storage';
import { getSchedule, getSubjectDetailsAndAttendance, StudentData } from '@/utils/apicalls';
import { useApiStore } from '@/utils/store';
import AttendanceOverview from './AttendanceOverview';
import UserDataCard from './UserDataCard';
import { ScrollView } from 'react-native-gesture-handler';
import LoadinSvg from './LoadinSvg';
import TodaySchedule from './TodaySchedule';
import NextClass from './NextClass';
import { color_three } from '@/constants/Colors';

export default function HomePage() {
  const [userData, setUserData] = useState<StudentData>({} as StudentData);
  const dataApi = useApiStore((state: any) => state.data);
  const setDataApi = useApiStore((state: any) => state.addData);
  const [attendance, setAttendance] = useState<{ Present: number, Total: number, Percent: string } | null>(null);
  const [classCount, setClassCount] = useState<number>(0);
  const [scheduleData, setScheduleData] = useState<Array<any>>([]);
  const [refreshing, setRefreshing] = useState(false);

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
      // Clear current data
      setDataApi([]);
      setAttendance(null);
      setScheduleData([]);
      
      // Fetch fresh data
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
      ToastAndroid.show('Failed to refresh data', ToastAndroid.SHORT);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    let count = 0;
    const checkLogin = async () => {
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
  }, [dataApi]);

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
      if (scheduleData.length === 0) {
        const apiData: Array<any> = await getSchedule();
        if (apiData.length === 0) {
          getData();
        }
        await setScheduleData(apiData);

      }
    }
    getData();

  }, [scheduleData]);

  if (attendance) {
    return (
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[color_three]}
            tintColor={color_three}
          />
        }
      >
        <View className='flex-1 items-center gap-2 p-4 justify-between'>
          <NextClass scheduleData={scheduleData} />
          <UserDataCard userData={userData} />
          <AttendanceOverview attendance={attendance} classCount={classCount} />
          <TodaySchedule scheduleData={scheduleData} />
        </View>
      </ScrollView>
    )
  } else return (
    <View className='flex-1 items-center justify-center h-screen'>
      <LoadinSvg loading={!attendance} color={'black'} size={96} />
    </View>
  )
}