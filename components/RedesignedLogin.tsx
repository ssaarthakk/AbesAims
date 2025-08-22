import { Text, TextInput, View, ToastAndroid, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import RedesignedCustomButton from './RedesignedCustomButton';
import { forgotPassoword, StudentData } from '@/utils/apicalls';
import Modal from './Modal';
import useStore from '@/utils/store';
import { CrossIcon } from '@/constants/SvgIcons';
import LoadinSvg from './LoadinSvg';
import Webview from './Webview';
import { LinearGradient } from 'expo-linear-gradient';

export default function RedesignedLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [loggingIn, setLoggingIn] = useState(false);
  const [reset, setReset] = useState(false);
  const addUserData = useStore((state: any) => state.addUserData);

  const handleLogin = async () => {
    setLoggingIn(true)
    if (username === '' || password === '') {
      ToastAndroid.show('Please enter your Admission Number and password', ToastAndroid.LONG);
      setLoggingIn(false);
    }
  }

  const openModal = () => {
    setModalOpen(true);
  }

  const handleReset = async () => {
    setReset(true);
    if (username === '') {
      ToastAndroid.show('Please enter your Admission Number', ToastAndroid.LONG);
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
    <LinearGradient 
      colors={['#ffffff', '#f0f0f0']} 
      start={{ x: 0, y: 0 }} 
      end={{ x: 1, y: 1 }}
      className='w-[85vw] rounded-2xl shadow-2xl p-8'
    >
      <View>
        {
          loggingIn && (
            <Webview username={username} password={password} setLoggingIn={setLoggingIn} addUserData={addUserData} />
          )
        }
      </View>
      
      <Text className='font-montserratExtraBold text-4xl text-center text-color_three mb-2'>ABES AIMS</Text>
      <Text className='font-montserratMedium text-lg text-center text-gray-500 pb-8'>Student Portal</Text>
      
      <View className='mb-5'>
        <Text className='font-montserratMedium text-gray-700 mb-2'>Admission Number</Text>
        <TextInput 
          placeholder='Enter your admission number' 
          value={username} 
          placeholderTextColor={'#9ca3af'} 
          onChangeText={setUsername} 
          className='p-4 border border-gray-300 rounded-xl font-montserrat text-black bg-white'
        />
      </View>
      
      <View className='mb-6'>
        <Text className='font-montserratMedium text-gray-700 mb-2'>Password</Text>
        <TextInput 
          placeholder='Enter your password' 
          value={password} 
          placeholderTextColor={'#9ca3af'} 
          secureTextEntry 
          onChangeText={setPassword} 
          className='p-4 border border-gray-300 rounded-xl font-montserrat text-black bg-white'
        />
      </View>
      
      <RedesignedCustomButton 
        onPress={!loggingIn? handleLogin : () => {}} 
        title='Login'
        isLoading={loggingIn}
      />
      
      <TouchableOpacity onPress={openModal} className='mt-4'>
        <Text className='text-blue-600 font-montserratMedium text-base text-center'>
          Forgot Password?
        </Text>
      </TouchableOpacity>
      
      <Modal isOpen={modalOpen}>
        <LinearGradient 
          colors={['#ffffff', '#f0f0f0']} 
          start={{ x: 0, y: 0 }} 
          end={{ x: 1, y: 1 }}
          className='rounded-2xl p-6 w-[85vw]'
        >
          <View className='flex-row justify-between items-center mb-4'>
            <Text className='font-montserratBold text-2xl text-color_three'>Forgot Password</Text>
            <TouchableOpacity onPress={() => { setModalOpen(false) }}>
              <CrossIcon />
            </TouchableOpacity>
          </View>
          
          <Text className='font-montserrat text-base text-gray-600 mb-6'>
            Enter your Admission number to reset your Password
          </Text>
          
          <View className='mb-5'>
            <Text className='font-montserratMedium text-gray-700 mb-2'>Admission Number</Text>
            <TextInput 
              placeholder='Enter your admission number' 
              placeholderTextColor={'#9ca3af'} 
              value={username} 
              onChangeText={setUsername} 
              className='p-4 border border-gray-300 rounded-xl font-montserrat bg-white'
            />
          </View>
          
          <RedesignedCustomButton 
            onPress={!reset? handleReset : () => {}} 
            title='Reset Password'
            isLoading={reset}
          />
        </LinearGradient>
      </Modal>
    </LinearGradient>
  )
}