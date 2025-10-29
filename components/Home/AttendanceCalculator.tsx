import { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

interface AttendanceCalculatorProps {
    attendance: { Present: number; Total: number; Percent: string };
}

export default function AttendanceCalculator({ attendance }: AttendanceCalculatorProps) {
    const [classesToAttend, setClassesToAttend] = useState<number>(1);
    const [futureAttendance, setFutureAttendance] = useState<number>(0);
    const [hypotheticalPercentage, setHypotheticalPercentage] = useState<number>(Math.round(parseFloat(attendance.Percent)));
    const [targetPercentage, setTargetPercentage] = useState<number>(75);
    const [classesToSkip, setClassesToSkip] = useState<number>(0);

    const calculateFutureAttendance = (classes: number): number => {
        const currentPresent = attendance.Present;
        const currentTotal = attendance.Total;
        
        const newPresent = currentPresent + classes;
        const newTotal = currentTotal + classes;
        
        return parseFloat(((newPresent / newTotal) * 100).toFixed(2));
    };

    // const calculateClassesToSkip = (hypotheticalPercent: number, targetPercent: number): number => {
    //     const currentTotal = attendance.Total;
    //     
    //     // If hypothetical attendance is below target, can't skip any classes
    //     if (hypotheticalPercent < targetPercent) {
    //         return 0;
    //     }
    //     
    //     // Calculate present classes based on hypothetical percentage
    //     const hypotheticalPresent = Math.round((hypotheticalPercent / 100) * currentTotal);
    //     
    //     // Calculate maximum classes that can be skipped
    //     // Formula: (Present / (Total + Skip)) >= (Target / 100)
    //     // Solving for Skip: Skip <= (Present * 100 / Target) - Total
    //     const maxSkip = Math.floor((hypotheticalPresent * 100 / targetPercent) - currentTotal);
    //     
    //     return Math.max(0, maxSkip);
    // };

    useEffect(() => {
        const result = calculateFutureAttendance(classesToAttend);
        setFutureAttendance(result);
    }, [classesToAttend, attendance]);

    // useEffect(() => {
    //     const result = calculateClassesToSkip(hypotheticalPercentage, targetPercentage);
    //     setClassesToSkip(result);
    // }, [hypotheticalPercentage, targetPercentage, attendance]);

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

    // const incrementPercentage = () => {
    //     if (targetPercentage < 100) {
    //         setTargetPercentage(targetPercentage + 1);
    //     }
    // };

    // const decrementPercentage = () => {
    //     if (targetPercentage > 0) {
    //         setTargetPercentage(targetPercentage - 1);
    //     }
    // };

    // const incrementHypotheticalPercentage = () => {
    //     if (hypotheticalPercentage < 100) {
    //         setHypotheticalPercentage(hypotheticalPercentage + 1);
    //     }
    // };

    // const decrementHypotheticalPercentage = () => {
    //     if (hypotheticalPercentage > 0) {
    //         setHypotheticalPercentage(hypotheticalPercentage - 1);
    //     }
    // };

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

            {/* Skip Calculator Section - Commented Out */}
            {/* <View className='mt-6 pt-4 border-t border-gray-200'>
                <Text className='font-montserratSemiBold text-lg text-center mb-3 text-black'>
                    Skip Calculator
                </Text>
                
                <View className='flex-row items-center justify-between mb-3'>
                    <Text className='font-montserratMedium text-md text-black flex-1'>
                        If my attendance is:
                    </Text>
                    
                    <View className='flex-row items-center bg-gray-50 rounded-lg border border-gray-300'>
                        <TouchableOpacity
                            onPress={decrementHypotheticalPercentage}
                            className='p-3 rounded-l-lg bg-gray-200'
                            disabled={hypotheticalPercentage <= 0}
                            activeOpacity={0.8}
                        >
                            <Text className={`font-montserratBold text-xl ${hypotheticalPercentage <= 0 ? 'text-gray-400' : 'text-black'}`}>
                                −
                            </Text>
                        </TouchableOpacity>
                        
                        <View className='px-4 py-3 min-w-[60px]'>
                            <Text className='font-montserratSemiBold text-lg text-center text-black'>
                                {hypotheticalPercentage}%
                            </Text>
                        </View>
                        
                        <TouchableOpacity
                            onPress={incrementHypotheticalPercentage}
                            className='p-3 rounded-r-lg bg-gray-200'
                            disabled={hypotheticalPercentage >= 100}
                            activeOpacity={0.8}
                        >
                            <Text className={`font-montserratBold text-xl ${hypotheticalPercentage >= 100 ? 'text-gray-400' : 'text-black'}`}>
                                +
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View className='flex-row items-center justify-between mb-3'>
                    <Text className='font-montserratMedium text-md text-black flex-1'>
                        Maintain at least:
                    </Text>
                    
                    <View className='flex-row items-center bg-gray-50 rounded-lg border border-gray-300'>
                        <TouchableOpacity
                            onPress={decrementPercentage}
                            className='p-3 rounded-l-lg bg-gray-200'
                            disabled={targetPercentage <= 0}
                            activeOpacity={0.8}
                        >
                            <Text className={`font-montserratBold text-xl ${targetPercentage <= 0 ? 'text-gray-400' : 'text-black'}`}>
                                −
                            </Text>
                        </TouchableOpacity>
                        
                        <View className='px-4 py-3 min-w-[60px]'>
                            <Text className='font-montserratSemiBold text-lg text-center text-black'>
                                {targetPercentage}%
                            </Text>
                        </View>
                        
                        <TouchableOpacity
                            onPress={incrementPercentage}
                            className='p-3 rounded-r-lg bg-gray-200'
                            disabled={targetPercentage >= 100}
                            activeOpacity={0.8}
                        >
                            <Text className={`font-montserratBold text-xl ${targetPercentage >= 100 ? 'text-gray-400' : 'text-black'}`}>
                                +
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                
                <View className='bg-gray-100 p-3 rounded-lg'>
                    {hypotheticalPercentage < targetPercentage ? (
                        <Text className='font-montserratSemiBold text-center text-lg text-red-600'>
                            At {hypotheticalPercentage}% attendance, you cannot skip any classes to maintain {targetPercentage}%!
                        </Text>
                    ) : (
                        <Text className='font-montserratSemiBold text-center text-lg text-black'>
                            At{' '}
                            <Text className='font-montserratBold text-purple-600'>
                                {hypotheticalPercentage}%
                            </Text>
                            {' '}attendance, you can skip{' '}
                            <Text className='font-montserratBold text-xl text-green-600'>
                                {classesToSkip}
                            </Text>
                            {' '}classe{classesToSkip === 1 ? '' : 's'} and maintain{' '}
                            <Text className='font-montserratBold text-green-600'>
                                {targetPercentage}%
                            </Text>
                        </Text>
                    )}
                </View>
            </View> */}
        </View>
    );
}