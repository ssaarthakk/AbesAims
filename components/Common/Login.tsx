import { Text, TextInput, View, ToastAndroid, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import CustomButton from '@/components/Common/CustomButton';
import { forgotPassoword, StudentData } from '@/utils/apicalls';
import Modal from '@/components/Common/Modal';
import useStore from '@/utils/store';
import { CrossIcon } from '@/constants/SvgIcons';
import LoadinSvg from '@/components/Home/LoadinSvg';
import Webview from '@/components/Common/Webview';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import Ionicons from '@expo/vector-icons/Ionicons';

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
      ToastAndroid.show('Please enter your Admission Number and password', ToastAndroid.SHORT);
      setLoggingIn(false);
    }
  }

  const openModal = () => {
    setModalOpen(true);
  }

  const handleReset = async () => {
    setReset(true);
    if (username === '') {
      ToastAndroid.show('Please enter your Admission Number', ToastAndroid.SHORT);
      setReset(false);
    } else {
      const result = await forgotPassoword(username) as { statusCode: number, message: string };
      if (result?.statusCode === 200) {
        ToastAndroid.show(result.message, ToastAndroid.SHORT);
      } else if (result?.statusCode === 404) {
        ToastAndroid.show(result.message, ToastAndroid.SHORT);
      } else {
        ToastAndroid.show("Please try again", ToastAndroid.SHORT);
      }
      setReset(false);
      setUsername('');
      setModalOpen(false);
    }
  }

  return (
    <View className="flex-1 justify-center items-center w-full">
      {/* Background Elements */}
      <View className="absolute top-0 left-0 right-0 bottom-0 overflow-hidden">
        <LinearGradient
          colors={['#020617', '#0f172a']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          className="absolute w-full h-full"
        />
        {/* Abstract Blobs */}
        <View className="absolute -top-[20%] -left-[20%] w-[300px] h-[300px] bg-primary/20 rounded-full blur-[100px]" />
        <View className="absolute top-[40%] -right-[20%] w-[250px] h-[250px] bg-secondary/20 rounded-full blur-[90px]" />
      </View>

      <View className='w-[90vw] max-w-sm'>
        <View>
          {
            loggingIn && (
              <Webview username={username} password={password} setLoggingIn={setLoggingIn} addUserData={addUserData} />
            )
          }
        </View>

        <View className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl">
          <Animated.View entering={FadeInDown.delay(100).duration(600)}>
            <View className="items-center mb-8">
              <View className="bg-primary/20 p-4 rounded-2xl mb-4 border border-primary/20 shadow-lg shadow-primary/20">
                <Ionicons name="school-outline" size={32} color="#a855f7" />
              </View>
              <Text className='font-montserratExtraBold text-4xl text-center text-white tracking-tighter'>
                ABES AIMS
                <Text className="text-primary">.</Text>
              </Text>
              <Text className='font-montserratMedium text-sm text-center text-slate-400 tracking-[0.2em] mt-1 uppercase'>Student Portal</Text>
            </View>
          </Animated.View>

          <Animated.View entering={FadeInUp.delay(200).duration(600)} className='mb-4'>
            <Text className='font-montserratBold text-xs text-slate-400 mb-2 ml-1 uppercase tracking-wider'>Admission Number</Text>
            <View className="flex-row items-center bg-black/20 border border-white/10 rounded-2xl px-4 py-3 focus:border-primary/50 transition-colors">
              <Ionicons name="person-outline" size={20} color="#94a3b8" />
              <TextInput
                placeholder='Enter admission number'
                value={username}
                placeholderTextColor={'#64748b'}
                onChangeText={setUsername}
                className='flex-1 ml-3 font-montserratSemiBold text-white text-base'
                selectionColor="#a855f7"
              />
            </View>
          </Animated.View>

          <Animated.View entering={FadeInUp.delay(300).duration(600)} className='mb-8'>
            <Text className='font-montserratBold text-xs text-slate-400 mb-2 ml-1 uppercase tracking-wider'>Password</Text>
            <View className="flex-row items-center bg-black/20 border border-white/10 rounded-2xl px-4 py-3 focus:border-primary/50 transition-colors">
              <Ionicons name="lock-closed-outline" size={20} color="#94a3b8" />
              <TextInput
                placeholder='Enter password'
                value={password}
                placeholderTextColor={'#64748b'}
                secureTextEntry
                onChangeText={setPassword}
                className='flex-1 ml-3 font-montserratSemiBold text-white text-base'
                selectionColor="#a855f7"
              />
            </View>
          </Animated.View>

          <Animated.View entering={FadeInUp.delay(400).duration(600)}>
            <CustomButton
              onPress={!loggingIn ? handleLogin : () => { }}
              title='Login'
              isLoading={loggingIn}
              containerStyles='rounded-2xl bg-primary shadow-lg shadow-primary/30 py-4'
              textStyles="font-montserratBold text-lg"
            />
          </Animated.View>

          <Animated.View entering={FadeInUp.delay(500).duration(600)}>
            <TouchableOpacity onPress={openModal} className='mt-6 items-center'>
              <Text className='text-zinc-400 font-montserratMedium text-sm'>
                Forgot Password? <Text className="text-secondary font-montserratBold">Reset here</Text>
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </View>

      <Modal isOpen={modalOpen}>
        <View className="bg-[#0f172a] border border-white/10 rounded-3xl p-6 w-[85vw]">
          {/* <LinearGradient
          colors={['#1e293b', '#0f172a']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          className='rounded-xl p-6 w-[85vw] border border-slate-700'
        > */}
          <View className='flex-row justify-between items-center mb-6'>
            <Text className='font-montserratBold text-2xl text-white'>Reset Password</Text>
            <TouchableOpacity
              onPress={() => { setModalOpen(false) }}
              className="bg-white/10 p-2 rounded-full"
            >
              <Ionicons name="close" size={20} color="white" />
            </TouchableOpacity>
          </View>

          <View className='mb-6'>
            <Text className='font-montserratBold text-xs text-slate-400 mb-2 ml-1 uppercase tracking-wider'>Admission Number</Text>
            <View className="flex-row items-center bg-black/20 border border-white/10 rounded-2xl px-4 py-3">
              <Ionicons name="person-outline" size={20} color="#94a3b8" />
              <TextInput
                placeholder='Enter your admission number'
                placeholderTextColor={'#64748b'}
                value={username}
                onChangeText={setUsername}
                className='flex-1 ml-3 font-montserratSemiBold text-white text-base'
                selectionColor="#a855f7"
              />
            </View>
          </View>

          <CustomButton
            onPress={!reset ? handleReset : () => { }}
            title='Reset Password'
            isLoading={reset}
            containerStyles='rounded-2xl bg-primary shadow-lg shadow-primary/30 py-3'
            textStyles="font-montserratBold"
          />
          {/* </LinearGradient> */}
        </View>
      </Modal>
    </View>
  )
}