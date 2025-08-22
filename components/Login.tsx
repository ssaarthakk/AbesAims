import { Text, TextInput, View, ToastAndroid, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import CustomButton from './CustomButton';
import { forgotPassoword, StudentData } from '@/utils/apicalls';
import Modal from './Modal';
import useStore from '@/utils/store';
import { CrossIcon } from '@/constants/SvgIcons';
import LoadinSvg from './LoadinSvg';
import Webview from './Webview';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [loggingIn, setLoggingIn] = useState(false);
  const [reset, setReset] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
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
    <View className='mx-4 max-w-md w-full'>
      <View className='bg-color_surface rounded-3xl shadow-2xl shadow-gray-300 border border-color_border overflow-hidden'>
        {loggingIn && (
          <Webview username={username} password={password} setLoggingIn={setLoggingIn} addUserData={addUserData} />
        )}
        
        {/* Header */}
        <View className='bg-gradient-to-r from-primary-500 to-secondary-500 px-8 py-8'>
          <View className='items-center'>
            <View className='w-16 h-16 bg-white rounded-full items-center justify-center mb-4'>
              <Ionicons name="school" size={32} color="#6366f1" />
            </View>
            <Text className='font-montserratBold text-3xl text-white text-center mb-2'>
              ABES AIMS
            </Text>
            <Text className='font-montserratMedium text-lg text-primary-100 text-center'>
              Student Portal
            </Text>
          </View>
        </View>

        {/* Content */}
        <View className='px-8 py-8'>
          <Text className='font-montserratSemiBold text-xl text-color_text_primary text-center mb-8'>
            Sign in to your account
          </Text>

          {/* Username Input */}
          <View className='mb-6'>
            <Text className='text-color_text_secondary text-sm font-montserratMedium mb-2 ml-1'>
              Admission Number
            </Text>
            <View className='relative'>
              <TextInput 
                placeholder='Enter your admission number' 
                value={username} 
                placeholderTextColor='#94a3b8'
                onChangeText={setUsername} 
                className='bg-gray-50 border border-color_border rounded-xl px-4 py-4 font-montserrat text-color_text_primary text-base'
                autoCapitalize='none'
                autoCorrect={false}
              />
              <View className='absolute right-4 top-4'>
                <Ionicons name="person-outline" size={20} color="#94a3b8" />
              </View>
            </View>
          </View>

          {/* Password Input */}
          <View className='mb-6'>
            <Text className='text-color_text_secondary text-sm font-montserratMedium mb-2 ml-1'>
              Password
            </Text>
            <View className='relative'>
              <TextInput 
                placeholder='Enter your password' 
                value={password} 
                placeholderTextColor='#94a3b8'
                secureTextEntry={!showPassword}
                onChangeText={setPassword} 
                className='bg-gray-50 border border-color_border rounded-xl px-4 py-4 pr-12 font-montserrat text-color_text_primary text-base'
                autoCapitalize='none'
                autoCorrect={false}
              />
              <TouchableOpacity 
                className='absolute right-4 top-4'
                onPress={() => setShowPassword(!showPassword)}
              >
                <Ionicons 
                  name={showPassword ? "eye-off-outline" : "eye-outline"} 
                  size={20} 
                  color="#94a3b8" 
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Login Button */}
          <CustomButton 
            title={loggingIn ? undefined : 'Sign In'}
            onPress={handleLogin}
            disabled={loggingIn}
            variant="primary"
            size="lg"
            containerStyles='mb-4'
          >
            {loggingIn && (
              <View className='flex-row items-center gap-3'>
                <LoadinSvg loading={loggingIn} />
                <Text className='text-white font-montserratMedium text-base'>
                  Signing in...
                </Text>
              </View>
            )}
          </CustomButton>

          {/* Forgot Password Link */}
          <TouchableOpacity onPress={openModal} className='items-center py-2'>
            <Text className='text-primary-500 font-montserratMedium text-base'>
              Forgot Password?
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Forgot Password Modal */}
      <Modal isOpen={modalOpen}>
        <View className='mx-4 max-w-md w-full'>
          <View className='bg-color_surface rounded-2xl shadow-xl border border-color_border overflow-hidden'>
            {/* Modal Header */}
            <View className='bg-gradient-to-r from-warning-500 to-warning-600 px-6 py-4'>
              <View className='flex-row justify-between items-center'>
                <Text className='font-montserratBold text-xl text-white'>
                  Reset Password
                </Text>
                <TouchableOpacity 
                  onPress={() => setModalOpen(false)}
                  className='p-1'
                >
                  <Ionicons name="close" size={24} color="white" />
                </TouchableOpacity>
              </View>
            </View>

            {/* Modal Content */}
            <View className='p-6'>
              <Text className='font-montserrat text-color_text_secondary text-base mb-6 leading-6'>
                Enter your admission number to receive password reset instructions
              </Text>
              
              <View className='mb-6'>
                <Text className='text-color_text_secondary text-sm font-montserratMedium mb-2 ml-1'>
                  Admission Number
                </Text>
                <TextInput 
                  placeholder='Enter your admission number' 
                  placeholderTextColor='#94a3b8'
                  value={username} 
                  onChangeText={setUsername} 
                  className='bg-gray-50 border border-color_border rounded-xl px-4 py-4 font-montserrat text-color_text_primary text-base'
                  autoCapitalize='none'
                  autoCorrect={false}
                />
              </View>
              
              <CustomButton 
                title={reset ? undefined : 'Send Reset Link'}
                onPress={handleReset}
                disabled={reset}
                variant="warning"
                size="lg"
              >
                {reset && (
                  <View className='flex-row items-center gap-3'>
                    <LoadinSvg loading={reset} />
                    <Text className='text-white font-montserratMedium'>
                      Sending...
                    </Text>
                  </View>
                )}
              </CustomButton>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  )
}