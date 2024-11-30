import { Text, TextInput, View, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import CustomButton from '@/components/CustomButton';
import LoadinSvg from '@/components/LoadinSvg';
import { changePassword, changePin, StudentData } from '@/utils/apicalls';
import { saveData, getData } from '@/utils/storage';
import { LinearGradient } from 'expo-linear-gradient';
import { color_four, color_three } from '@/constants/Colors';

export default function Login() {
    const [password, setPassword] = useState('');
    const [newPass, setNewPass] = useState('');
    const [newCPass, setNewCPass] = useState('');
    const [pin, setPin] = useState('');
    const [changingPass, setChangingPass] = useState(false);
    const [changingPin, setChangingPin] = useState(false);

    const handleChangePassword = async () => {
        setChangingPass(true)
        const studentData: StudentData | null = await getData('userData')
        if (newPass === '' || password === '' || newCPass === '') {
            ToastAndroid.show('Please enter your password', ToastAndroid.LONG);
        } else if (studentData?.password !== password) {
            ToastAndroid.show('Wrong Old Password Entered', ToastAndroid.LONG);
        } else if (newPass !== newCPass) {
            ToastAndroid.show('Passwords do not match', ToastAndroid.LONG);
        } else {
            const result = await changePassword(newPass);
            if (!result || result.statusCode !== 200) {
                handleChangePassword();
            } else {
                await saveData('userData', { ...studentData, password: newPass });
                ToastAndroid.show(result.statusCode === 200 ? "Password changed successfully" : result.message, ToastAndroid.LONG);
            }
        }
        setNewPass('');
        setPassword('');
        setNewCPass('');
        setChangingPass(false);
    }

    const handleChangePin = async () => {
        setChangingPin(true)
        if (pin === '') {
            ToastAndroid.show('Please enter your PIN', ToastAndroid.LONG);
        } else {
            const result = await changePin(pin);
            if (!result || result.statusCode !== 200) {
                handleChangePin();
            } else {
                ToastAndroid.show(result.statusCode === 200 ? "PIN changed successfully" : result.message, ToastAndroid.LONG);
            }
        }
        setPin('');
        setChangingPin(false);
    }

    return (
        <LinearGradient className='flex-1' colors={[color_four, color_three]} start={{ x: 0.4, y: 0.4 }} end={{ x: 1, y: 1 }} >
            <View className='flex-1 justify-center items-center gap-4 h-screen'>
                <View className='w-[80vw] bg-color_five shadow-black shadow rounded-md px-6 py-3'>
                    <Text className='font-montserratBold text-3xl text-center pb-6'>Change Password</Text>
                    <TextInput placeholder='Current Password' value={password} secureTextEntry onChangeText={setPassword} className='p-3 mb-3 border border-gray-300 rounded-md font-montserrat' />
                    <TextInput placeholder='New Password' value={newPass} onChangeText={setNewPass} className='p-3 mb-3 border border-gray-300 rounded-md font-montserrat' />
                    <TextInput placeholder='Confirm Password' value={newCPass} secureTextEntry onChangeText={setNewCPass} className='p-3 mb-5 border border-gray-300 rounded-md font-montserrat' />
                    <CustomButton onPress={!changingPass ? handleChangePassword : () => { }} title='Change Password'>
                        {
                            changingPass && (
                                <LoadinSvg loading={changingPass} />
                            )
                        }
                    </CustomButton>
                </View>
                <View className='w-[80vw] bg-color_five shadow-black shadow rounded-md px-6 py-3'>
                    <Text className='font-montserratBold text-3xl text-center pb-6'>Change PIN</Text>
                    <TextInput placeholder='New PIN' value={pin} onChangeText={setPin} className='p-3 mb-5 border border-gray-300 rounded-md font-montserrat' />
                    <CustomButton onPress={!changingPin ? handleChangePin : () => { }} title='Change PIN'>
                        {
                            changingPin && (
                                <LoadinSvg loading={changingPin} />
                            )
                        }
                    </CustomButton>
                </View>
            </View>
        </LinearGradient>
    )
}