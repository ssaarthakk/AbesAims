import { Text, TextInput, View, ToastAndroid, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import CustomButton from './CustomButton';
import { forgotPassoword, login, StudentData } from '@/utils/apicalls';
import Modal from './Modal';
import useStore from '@/utils/store';
import { CrossIcon } from '@/constants/SvgIcons';
import LoadinSvg from './LoadinSvg';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [loggingIn, setLoggingIn] = useState(false);
  const [reset, setReset] = useState(false);
  const addUserData = useStore((state: any) => state.addUserData);

  const handleLogin = async () => {
    setLoggingIn(true)
    if (username === '' || password === '') {
      ToastAndroid.show('Please enter your Addmission Number and password', ToastAndroid.LONG);
      setLoggingIn(false);
    } else {
      const result = await login(username, password) as StudentData | null;
      if (!result) {
        ToastAndroid.show('Invalid Addmission Number or password', ToastAndroid.LONG);
        setLoggingIn(false);
      } else {
        setUsername('');
        setPassword('');
        addUserData(result);
        setLoggingIn(false);
        ToastAndroid.show('Login successful', ToastAndroid.LONG);
      }
    }
  }

  const openModal = () => {
    setModalOpen(true);
  }

  const handleReset = async () => {
    setReset(true);
    if (username === '') {
      ToastAndroid.show('Please enter your username', ToastAndroid.LONG);
      setReset(false);
    } else {
      const result = await forgotPassoword(username) as { statusCode: number, message: string };
      if (result?.statusCode === 200) {
        ToastAndroid.show(result.message, ToastAndroid.LONG);
      } else if (result?.statusCode === 404) {
        ToastAndroid.show(result.message, ToastAndroid.LONG);
      } else {
        ToastAndroid.show("Please try again", ToastAndroid.LONG);
      }
      setReset(false);
      setUsername('');
      setModalOpen(false);
    }
  }

  return (
    <View className='w-[80vw] bg-color_five shadow-black shadow rounded-md px-6 py-10'>
      <Text className='font-montserratBold text-4xl text-center'>ABES AIMS</Text>
      <Text className='font-montserratSemiBold text-2xl text-center pb-6'>Log In</Text>
      <TextInput placeholder='Addmission Number' value={username} onChangeText={setUsername} className='p-3 mb-5 border border-gray-300 rounded-md font-montserrat' />
      <TextInput placeholder='Password' value={password} secureTextEntry onChangeText={setPassword} className='p-3 mb-5 border border-gray-300 rounded-md font-montserrat' />
      <CustomButton onPress={!loggingIn? handleLogin : () => {}} title='Login'>
        {
          loggingIn && (
            <LoadinSvg loading={loggingIn} />
          )
        }
      </CustomButton>
      <TouchableOpacity onPress={openModal}>
        <Text className='text-blue-500 font-montserratMedium'>
          Forgot Password?
        </Text>
      </TouchableOpacity>
      <Modal isOpen={modalOpen}>
        <View className='w-[80vw] bg-color_five shadow-black shadow rounded-md p-6'>
          <View className='flex-row justify-between'>
            <Text className='font-montserratBold text-2xl pb-2'>Forgot Password</Text>
            <TouchableOpacity onPress={() => { setModalOpen(false) }}>
              <CrossIcon />
            </TouchableOpacity>
          </View>
          <Text className='font-montserrat text-lg pb-6'>Enter your Addmission number to reset your Password</Text>
          <TextInput placeholder='Addmission Number' value={username} onChangeText={setUsername} className='p-3 mb-5 border border-gray-300 rounded-md font-montserrat' />
          <CustomButton onPress={!reset? handleReset : () => {}} title='Reset Password'>
            {
              reset && (
                <LoadinSvg loading={reset} />
              )
            }
          </CustomButton>
        </View>
      </Modal>
    </View>
  )
}