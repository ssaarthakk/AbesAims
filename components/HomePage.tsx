import { View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getData } from '@/utils/storage';
import { getSubjectDetailsAndAttendance, StudentData } from '@/utils/apicalls';
import { useApiStore } from '@/utils/store';
import AttendanceOverview from './AttendanceOverview';
import UserDataCard from './UserDataCard';
import AttendanceTable from './AttendanceTable';
import { ScrollView } from 'react-native-gesture-handler';
import LoadinSvg from './LoadinSvg';
import TodaySchedule from './TodaySchedule';
import ScheduleCard from './ScheduleCard';

export default function HomePage() {
  const [userData, setUserData] = useState<StudentData>({} as StudentData);
  const dataApi = useApiStore((state: any) => state.data);
  const setDataApi = useApiStore((state: any) => state.addData);
  const [attendance, setAttendance] = useState<{ Present: number, Total: number, Percent: string }>(null as any);
  const [classCount, setClassCount] = useState<number>(0);

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

  useEffect(() => {
    const checkLogin = async () => {

      const data: StudentData = await getData('userData') as StudentData;
      if (dataApi.length === 0 && data) {
        const apiData = await getSubjectDetailsAndAttendance();
        if (apiData.length > 0 && attendance === null) {
          setAttendance(apiData[apiData!.length - 1].attendance_summary);
        } else if (apiData.length === 0) {
          checkLogin();
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

  if (attendance) {
    return (
      <ScrollView>
        <View className='flex-1 items-center gap-2 p-4 justify-between'>
          <UserDataCard userData={userData} />
          <AttendanceOverview attendance={attendance} classCount={classCount} />
          <TodaySchedule />
        </View>
      </ScrollView>
    )
  } else return (
    <View className='flex-1 items-center justify-center h-screen'>
      <LoadinSvg loading={!attendance} color={'black'} size={96} />
    </View>
  )
}