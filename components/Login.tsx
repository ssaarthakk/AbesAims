import { StyleSheet, Text, TextInput, View, ToastAndroid, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import CustomButton from './CustomButton';
import { forgotPassoword, login, StudentData } from '@/utils/apicalls';
import Modal from './Modal';
import useStore from '@/utils/store';
import { CrossIcon } from '@/constants/SvgIcons';


export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const addUserData = useStore((state: any) => state.addUserData);

  const handleLogin = async () => {
    if (username === '' || password === '') {
      ToastAndroid.show('Please enter your username and password', ToastAndroid.LONG);
    } else {
      const result = await login(username, password) as StudentData | null;
      if (!result) {
        ToastAndroid.show('Invalid username or password', ToastAndroid.LONG);
      } else {
        ToastAndroid.show('Login successful', ToastAndroid.LONG);
        setUsername('');
        setPassword('');
        addUserData(result);
      }
    }
  }

  const openModal = () => {
    setModalOpen(true);
  }

  const handleReset = async () => {
    if (username === '') {
      ToastAndroid.show('Please enter your username', ToastAndroid.LONG);
    } else {
      const result = await forgotPassoword(username) as { statusCode: number, message: string };
      console.log(result);
      if (result?.statusCode === 200) {
        ToastAndroid.show(result.message, ToastAndroid.LONG);
      } else if (result?.statusCode === 404) {
        ToastAndroid.show(result.message, ToastAndroid.LONG);
      } else {
        ToastAndroid.show("Please try again", ToastAndroid.LONG);
      }
      setUsername('');
      setModalOpen(false);
    }
  }

  return (
    <View className='w-[80vw] bg-color_five shadow-black shadow rounded-md px-6 py-10'>
      <Text className='font-bold text-4xl text-center'>ABES AIMS</Text>
      <Text className='font-semibold text-2xl text-center pb-6'>Log In</Text>
      <TextInput placeholder='Addmission Number' value={username} onChangeText={setUsername} className='p-3 mb-5 border border-gray-300 rounded-md' />
      <TextInput placeholder='Password' value={password} secureTextEntry onChangeText={setPassword} className='p-3 mb-5 border border-gray-300 rounded-md' />
      <CustomButton title='Login' onPress={handleLogin} />
      <TouchableOpacity onPress={openModal}>
        <Text className='text-blue-500'>
          Forgot Password?
        </Text>
      </TouchableOpacity>
      <Modal isOpen={modalOpen}>
        <View className='w-[80vw] bg-color_five shadow-black shadow rounded-md p-6'>
          <View className='flex-row justify-between'>
            <Text className='font-bold text-2xl pb-2'>Forgot Password</Text>
            <TouchableOpacity onPress={() => { setModalOpen(false) }}>
              <CrossIcon />
            </TouchableOpacity>
          </View>
          <Text className='font-normal text-lg pb-6'>Enter your Addmission number to reset your Password</Text>
          <TextInput placeholder='Addmission Number' value={username} onChangeText={setUsername} className='p-3 mb-5 border border-gray-300 rounded-md' />
          <CustomButton title='Reset Password' onPress={handleReset} />
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({})