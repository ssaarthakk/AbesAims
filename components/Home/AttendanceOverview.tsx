import { Text, View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react';
import * as Progress from 'react-native-progress';
import { Ionicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import AttendanceTable from './AttendanceTable';
import { LinearGradient } from 'expo-linear-gradient';

export default function AttendanceOverview({ attendance, classCount }: { attendance: { Present: number, Total: number, Percent: string }, classCount: number }) {
    const [attendanceThreshold, setAttendanceThreshold] = useState<number>(75);
    const [classesToAttend, setClassesToAttend] = useState<number>(1);
    const attendancePercent: number = Number(((attendance!.Present / attendance!.Total) * 100).toFixed(2));

    const calculateFutureAttendance = (classes: number): number => {
        const currentPresent = attendance.Present;
        const currentTotal = attendance.Total;
        const newPresent = currentPresent + classes;
        const newTotal = currentTotal + classes;
        return parseFloat(((newPresent / newTotal) * 100).toFixed(2));
    };

    const calculateClassesNeeded = (): { canLeave: boolean, classesNeeded: number } => {
        const currentPresent = attendance.Present;
        const currentTotal = attendance.Total;
        const threshold = attendanceThreshold / 100;

        if (attendancePercent < attendanceThreshold) {
            const classesToAttend = Math.ceil((threshold * currentTotal - currentPresent) / (1 - threshold));
            return { canLeave: false, classesNeeded: Math.max(0, classesToAttend) };
        } else {
            const classesCanLeave = Math.floor((currentPresent / threshold) - currentTotal);
            return { canLeave: true, classesNeeded: Math.max(0, classesCanLeave) };
        }
    };

    const { canLeave, classesNeeded } = calculateClassesNeeded();

    return (
        <View>
            <Text className="text-white/60 font-montserratSemiBold text-sm uppercase tracking-widest mb-3 ml-1">
                Attendance Status
            </Text>

            <View className="w-full rounded-3xl overflow-hidden border border-white/10 relative">
                <LinearGradient
                    colors={['rgba(255,255,255,0.08)', 'rgba(255,255,255,0.02)']}
                    className="absolute w-full h-full"
                />

                <View className="p-6 items-center">
                    {/* Gauge Section */}
                    <View className="relative items-center justify-center mb-6">
                        {/* Glow Effect */}
                        <View className={`absolute w-32 h-32 rounded-full blur-3xl opacity-20 ${canLeave ? 'bg-green-500' : 'bg-red-500'}`} />

                        <Progress.Circle
                            size={160}
                            progress={attendance !== null ? attendance.Present / attendance.Total : 0}
                            color={attendancePercent >= attendanceThreshold ? '#4ade80' : '#f87171'}
                            thickness={12}
                            unfilledColor={'rgba(255,255,255,0.05)'}
                            borderWidth={0}
                            showsText={false}
                            strokeCap="round"
                        />
                        <View className="absolute items-center">
                            <Text className="text-white/50 font-montserratSemiBold text-xs uppercase tracking-widest mb-1">Current</Text>
                            <Text className="text-white font-montserratExtraBold text-4xl">{attendancePercent}%</Text>
                        </View>
                    </View>

                    {/* Stats Row */}
                    <View className="flex-row w-full justify-between items-center mb-6 px-4">
                        <View className="items-center">
                            <Text className="text-white/40 text-[10px] font-montserratBold uppercase">Attended</Text>
                            <Text className="text-white font-montserratBold text-xl">{attendance.Present}</Text>
                        </View>

                        <View className="h-8 w-[1px] bg-white/10" />

                        <View className="items-center">
                            <Text className={`text-[10px] font-montserratBold uppercase ${canLeave ? 'text-green-400' : 'text-red-400'}`}>
                                {canLeave ? "Bunks Available" : "Must Attend"}
                            </Text>
                            <Text className={`font-montserratExtraBold text-2xl ${canLeave ? 'text-green-400' : 'text-red-400'}`}>
                                {classesNeeded}
                            </Text>
                        </View>

                        <View className="h-8 w-[1px] bg-white/10" />

                        <View className="items-center">
                            <Text className="text-white/40 text-[10px] font-montserratBold uppercase">Total</Text>
                            <Text className="text-white font-montserratBold text-xl">{attendance.Total}</Text>
                        </View>
                    </View>

                    {/* Integrated Slider Control */}
                    <View className="w-full bg-black/20 rounded-2xl p-4 border border-white/5">
                        <View className="flex-row justify-between items-center mb-3">
                            <View className="flex-row items-center gap-2">
                                <View className="bg-primary/20 p-1.5 rounded-lg">
                                    <Ionicons name="options-outline" size={14} color="#a855f7" />
                                </View>
                                <Text className="text-white/70 font-montserratSemiBold text-xs">Target Goal</Text>
                            </View>
                            <Text className="text-primary font-montserratBold text-base">{attendanceThreshold}%</Text>
                        </View>

                        <Slider
                            style={{ width: '100%', height: 20 }}
                            minimumValue={40}
                            maximumValue={100}
                            step={1}
                            value={attendanceThreshold}
                            onValueChange={setAttendanceThreshold}
                            minimumTrackTintColor="#a855f7"
                            maximumTrackTintColor="rgba(255,255,255,0.1)"
                            thumbTintColor="#d8b4fe"
                        />
                        <Text className="text-white/30 text-[10px] text-center mt-2 font-montserratMedium">
                            Adjust to calculate classes needed
                        </Text>
                    </View>

                    {/* What if Calculator */}
                    <View className="w-full bg-black/20 rounded-2xl p-4 border border-white/5 mt-4">
                        <View className="flex-row justify-between items-center bg-white/5 rounded-xl p-1 mb-2">
                            <TouchableOpacity
                                onPress={() => setClassesToAttend(Math.max(1, classesToAttend - 1))}
                                className="w-10 h-10 items-center justify-center bg-white/10 rounded-lg active:bg-white/20 active:scale-105"
                            >
                                <Ionicons name="remove" size={20} color="white" />
                            </TouchableOpacity>

                            <View className="items-center">
                                <Text className="text-white/50 text-[10px] uppercase font-bold tracking-widest">Attend Next</Text>
                                <Text className="text-white font-montserratBold text-xl">{classesToAttend} Classes</Text>
                            </View>

                            <TouchableOpacity
                                onPress={() => setClassesToAttend(classesToAttend + 1)}
                                className="w-10 h-10 items-center justify-center bg-white/10 rounded-lg active:bg-white/20 active:scale-105"
                            >
                                <Ionicons name="add" size={20} color="white" />
                            </TouchableOpacity>
                        </View>

                        <Text className="text-center text-white/70 font-montserratMedium text-xs">
                            Your attendance will be <Text className="text-green-400 font-bold text-sm">{calculateFutureAttendance(classesToAttend)}%</Text>
                        </Text>
                    </View>
                </View>
            </View>

            {/* Expander/Table */}
            <View className="mt-4">
                <AttendanceTable attendance={attendance} />
            </View>
        </View>
    )
}