import { Text, TextInput, View, ToastAndroid, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import CustomButton from '@/components/Common/CustomButton';
import { forgotPassoword, StudentData } from '@/utils/apicalls';
import Modal from '@/components/Common/Modal';
import useStore from '@/utils/store';
import { CrossIcon } from '@/constants/SvgIcons';
import LoadinSvg from '@/components/Home/LoadinSvg';
import Webview from '@/components/Common/Webview';
import { LinearGradient } from 'expo-linear-gradient';

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
      colors={['#1e293b', '#0f172a']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      className='w-[85vw] rounded-xl shadow-2xl shadow-purple-500/20 p-8 border border-slate-700'
    >
      <View>
        {
          loggingIn && (
            <Webview username={username} password={password} setLoggingIn={setLoggingIn} addUserData={addUserData} />
          )
        }
      </View>

      <Text className='font-montserratExtraBold text-4xl text-center text-primary mb-2'>ABES AIMS</Text>
      <Text className='font-montserratMedium text-lg text-center text-slate-400 pb-8'>Student Portal</Text>

      <View className='mb-5'>
        <Text className='font-montserratMedium text-slate-300 mb-2'>Admission Number</Text>
        <TextInput
          placeholder='Enter your admission number'
          value={username}
          placeholderTextColor={'#64748b'}
          onChangeText={setUsername}
          className='p-4 border border-slate-600 rounded-lg font-montserrat text-white bg-slate-900'
        />
      </View>

      <View className='mb-6'>
        <Text className='font-montserratMedium text-slate-300 mb-2'>Password</Text>
        <TextInput
          placeholder='Enter your password'
          value={password}
          placeholderTextColor={'#64748b'}
          secureTextEntry
          onChangeText={setPassword}
          className='p-4 border border-slate-600 rounded-lg font-montserrat text-white bg-slate-900'
        />
      </View>

      <CustomButton
        onPress={!loggingIn ? handleLogin : () => { }}
        title='Login'
        isLoading={loggingIn}
        containerStyles='rounded-lg bg-primary shadow-lg shadow-purple-500/40'
      />

      <TouchableOpacity onPress={openModal} className='mt-4'>
        <Text className='text-sky-400 font-montserratMedium text-base text-center'>
          Forgot Password?
        </Text>
      </TouchableOpacity>

      <Modal isOpen={modalOpen}>
        <LinearGradient
          colors={['#1e293b', '#0f172a']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          className='rounded-xl p-6 w-[85vw] border border-slate-700'
        >
          <View className='flex-row justify-between items-center mb-4'>
            <Text className='font-montserratBold text-2xl text-white'>Forgot Password</Text>
            <TouchableOpacity onPress={() => { setModalOpen(false) }}>
              <CrossIcon />
            </TouchableOpacity>
          </View>

          <Text className='font-montserrat text-base text-slate-400 mb-6'>
            Enter your Admission number to reset your Password
          </Text>

          <View className='mb-5'>
            <Text className='font-montserratMedium text-slate-300 mb-2'>Admission Number</Text>
            <TextInput
              placeholder='Enter your admission number'
              placeholderTextColor={'#64748b'}
              value={username}
              onChangeText={setUsername}
              className='p-4 border border-slate-600 rounded-lg font-montserrat bg-slate-900 text-white'
            />
          </View>

          <CustomButton
            onPress={!reset ? handleReset : () => { }}
            title='Reset Password'
            isLoading={reset}
            containerStyles='rounded-lg bg-primary'
          />
        </LinearGradient>
      </Modal>
    </LinearGradient>
  )
}