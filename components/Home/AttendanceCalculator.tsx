import { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

interface AttendanceCalculatorProps {
    attendance: { Present: number; Total: number; Percent: string };
}

export default function AttendanceCalculator({ attendance }: AttendanceCalculatorProps) {
    const [classesToAttend, setClassesToAttend] = useState<number>(1);
    const [futureAttendance, setFutureAttendance] = useState<number>(0);

    const calculateFutureAttendance = (classes: number): number => {
        const currentPresent = attendance.Present;
        const currentTotal = attendance.Total;
        
        const newPresent = currentPresent + classes;
        const newTotal = currentTotal + classes;
        
        return parseFloat(((newPresent / newTotal) * 100).toFixed(2));
    };

    useEffect(() => {
        const result = calculateFutureAttendance(classesToAttend);
        setFutureAttendance(result);
    }, [classesToAttend, attendance]);

    const incrementClasses = () => {
        if (classesToAttend < 999) {
            setClassesToAttend(classesToAttend + 1);
        }
    };

    const decrementClasses = () => {
        if (classesToAttend > 0) {
            setClassesToAttend(classesToAttend - 1);
        }
    };

    return (
        <View className='bg-white p-4 mx-2 rounded-lg mt-4 shadow shadow-gray-300'>
            <Text className='font-montserratSemiBold text-lg text-center mb-3 text-black'>
                Attendance Calculator
            </Text>
            
            <View className='flex-row items-center justify-between mb-3'>
                <Text className='font-montserratMedium text-md text-black flex-1'>
                    Number of classes to attend:
                </Text>
                
                <View className='flex-row items-center bg-gray-50 rounded-lg border border-gray-300'>
                    <TouchableOpacity
                        onPress={decrementClasses}
                        className='p-3 rounded-l-lg bg-gray-200'
                        disabled={classesToAttend <= 0}
                        activeOpacity={0.8}
                    >
                        <Text className={`font-montserratBold text-xl ${classesToAttend <= 0 ? 'text-gray-400' : 'text-black'}`}>
                            −
                        </Text>
                    </TouchableOpacity>
                    
                    <View className='px-4 py-3 min-w-[60px]'>
                        <Text className='font-montserratSemiBold text-lg text-center text-black'>
                            {classesToAttend}
                        </Text>
                    </View>
                    
                    <TouchableOpacity
                        onPress={incrementClasses}
                        className='p-3 rounded-r-lg bg-gray-200'
                        disabled={classesToAttend >= 999}
                        activeOpacity={0.8}
                    >
                        <Text className={`font-montserratBold text-xl ${classesToAttend >= 999 ? 'text-gray-400' : 'text-black'}`}>
                            +
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            
            <View className='bg-gray-100 p-3 rounded-lg'>
                <Text className='font-montserratSemiBold text-center text-lg text-black'>
                    Your attendance will be{' '}
                    <Text className='font-montserratBold text-xl text-blue-600'>
                        {futureAttendance}%
                    </Text>
                    {' '}if you attend next{' '}
                    <Text className='font-montserratBold text-blue-600'>
                        {classesToAttend || 0}
                    </Text>
                    {' '}classe{classesToAttend === 1 ? '' : 's'}
                </Text>
            </View>
        </View>
    );
}