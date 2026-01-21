import { View, Text, TextInput, ToastAndroid } from 'react-native';
import React, { useState } from 'react';
import CustomButton from '@/components/Common/CustomButton';
import { changePin, StudentData } from '@/utils/apicalls';
import { saveData, getData } from '@/utils/storage';
import { useRouter } from 'expo-router';
import Animated, { FadeInUp } from 'react-native-reanimated';

export default function ChangePin() {
    const [pin, setPin] = useState('');
    const [changingPin, setChangingPin] = useState(false);
    const router = useRouter();

    const handleChangePin = async () => {
        setChangingPin(true);
        const studentData: StudentData | null = await getData('userData');
        if (pin === '') {
            ToastAndroid.show('Please enter your PIN', ToastAndroid.LONG);
        } else {
            const result = await changePin(pin);
            if (!result || result.statusCode !== 200) {
                ToastAndroid.show('Failed to change PIN', ToastAndroid.SHORT);
            } else {
                await saveData('userData', { ...studentData, quizPin: pin });
                ToastAndroid.show("PIN changed successfully", ToastAndroid.LONG);
                router.back();
            }
        }
        setPin('');
        setChangingPin(false);
    }

    return (
        <View className='flex-1 bg-background p-4'>
            <Animated.View entering={FadeInUp.delay(100).springify()} className='bg-surface/80 border border-white/10 rounded-2xl p-6 shadow-xl shadow-black/40 backdrop-blur-md'>
                <Text className='font-montserratExtraBold text-2xl text-white mb-2 tracking-tight'>Quiz PIN</Text>
                <Text className='font-montserratMedium text-sm text-text-muted mb-6'>Update your PIN for secure quiz access.</Text>

                <Text className='font-montserratBold text-sm text-text-muted mb-2 ml-1'>New PIN</Text>
                <TextInput
                    placeholder='Enter new 4-digit PIN'
                    placeholderTextColor='#94a3b8'
                    value={pin}
                    keyboardType='numeric'
                    maxLength={4}
                    onChangeText={setPin}
                    className='p-4 mb-6 bg-color_one text-white border border-white/10 rounded-xl font-montserrat text-center text-xl tracking-[5px]'
                />

                <CustomButton
                    onPress={!changingPin ? handleChangePin : () => { }}
                    title='Update PIN'
                    isLoading={changingPin}
                    containerStyles='rounded-xl bg-gradient-to-r from-secondary to-teal-500 py-4 shadow-lg shadow-secondary/30'
                    textStyles="text-white font-montserratBold tracking-wide"
                />
            </Animated.View>
        </View>
    )
}
