import { View, Text, TextInput, ToastAndroid } from 'react-native';
import React, { useState } from 'react';
import CustomButton from '@/components/Common/CustomButton';
import { changePassword, StudentData } from '@/utils/apicalls';
import { saveData, getData } from '@/utils/storage';
import { useRouter } from 'expo-router';
import Animated, { FadeInUp } from 'react-native-reanimated';

export default function ChangePassword() {
    const [password, setPassword] = useState('');
    const [newPass, setNewPass] = useState('');
    const [newCPass, setNewCPass] = useState('');
    const [changingPass, setChangingPass] = useState(false);
    const router = useRouter();

    const handleChangePassword = async () => {
        setChangingPass(true);
        const studentData: StudentData | null = await getData('userData')
        if (newPass === '' || password === '' || newCPass === '') {
            ToastAndroid.show('Please enter your password', ToastAndroid.SHORT);
        } else if (studentData?.password !== password) {
            ToastAndroid.show('Wrong Old Password Entered', ToastAndroid.SHORT);
        } else if (newPass !== newCPass) {
            ToastAndroid.show('Passwords do not match', ToastAndroid.SHORT);
        } else {
            const result = await changePassword(newPass);
            if (!result || result.statusCode !== 200) {
                ToastAndroid.show('Failed to change password', ToastAndroid.SHORT);
            } else {
                await saveData('userData', { ...studentData, password: newPass });
                ToastAndroid.show("Password changed successfully", ToastAndroid.SHORT);
                router.back();
            }
        }
        setNewPass('');
        setPassword('');
        setNewCPass('');
        setChangingPass(false);
    }

    return (
        <View className='flex-1 bg-background p-4'>
            <Animated.View entering={FadeInUp.delay(100).springify()} className='bg-surface/80 border border-white/10 rounded-2xl p-6 shadow-xl shadow-black/40 backdrop-blur-md'>
                <Text className='font-montserratExtraBold text-2xl text-white mb-6 tracking-tight'>Update Security</Text>

                <Text className='font-montserratBold text-sm text-text-muted mb-2 ml-1'>Current Password</Text>
                <TextInput
                    placeholder='Enter current password'
                    placeholderTextColor='#94a3b8'
                    value={password}
                    secureTextEntry
                    onChangeText={setPassword}
                    className='p-4 mb-4 bg-color_one text-white border border-white/10 rounded-xl font-montserrat'
                />

                <Text className='font-montserratBold text-sm text-text-muted mb-2 ml-1'>New Password</Text>
                <TextInput
                    placeholder='Enter new password'
                    placeholderTextColor='#94a3b8'
                    value={newPass}
                    secureTextEntry
                    onChangeText={setNewPass}
                    className='p-4 mb-4 bg-color_one text-white border border-white/10 rounded-xl font-montserrat'
                />

                <Text className='font-montserratBold text-sm text-text-muted mb-2 ml-1'>Confirm Password</Text>
                <TextInput
                    placeholder='Confirm new password'
                    placeholderTextColor='#94a3b8'
                    value={newCPass}
                    secureTextEntry
                    onChangeText={setNewCPass}
                    className='p-4 mb-6 bg-color_one text-white border border-white/10 rounded-xl font-montserrat'
                />

                <CustomButton
                    onPress={!changingPass ? handleChangePassword : () => { }}
                    title='Update Password'
                    isLoading={changingPass}
                    containerStyles='rounded-xl bg-gradient-to-r from-primary to-purple-600 py-4 shadow-lg shadow-primary/30'
                    textStyles="text-white font-montserratBold tracking-wide"
                />
            </Animated.View>
        </View>
    )
}
