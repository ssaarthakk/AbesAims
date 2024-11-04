import { Linking, Text, ToastAndroid, View } from 'react-native'
import React from 'react'
import { color_four, color_three } from '@/constants/Colors'
import { LinearGradient } from 'expo-linear-gradient'
import { TouchableOpacity } from 'react-native-gesture-handler'

export default function About() {

  const handleFirst = () => {
    Linking.canOpenURL('https://aims-abes.vercel.app/')
      .then((supported) => {
        if (supported) {
          Linking.openURL('https://aims-abes.vercel.app/');
        } else {
          ToastAndroid.show('Cannot open link', ToastAndroid.LONG);
        }
      })
      .catch((err) => {
        ToastAndroid.show('Cannot open link', ToastAndroid.LONG);
        console.log("Error while opening link ", err);
      });
  }

  const handleSecond = () => {
    Linking.canOpenURL('https://simpsimp.netlify.app/login')
      .then((supported) => {
        if (supported) {
          Linking.openURL('https://simpsimp.netlify.app/login');
        } else {
          ToastAndroid.show('Cannot open link', ToastAndroid.LONG);
        }
      })
      .catch((err) => {
        ToastAndroid.show('Cannot open link', ToastAndroid.LONG);
        console.log("Error while opening link ", err);
      });
  }

  const handleSource = () => {
    Linking.canOpenURL('https://github.com/ssaarthakk/AbesAims')
      .then((supported) => {
        if (supported) {
          Linking.openURL('https://github.com/ssaarthakk/AbesAims');
        } else {
          ToastAndroid.show('Cannot open link', ToastAndroid.LONG);
        }
      })
      .catch((err) => {
        ToastAndroid.show('Cannot open link', ToastAndroid.LONG);
        console.log("Error while opening link ", err);
      });
  }

  return (
    <LinearGradient className='flex-1 justify-center items-center' colors={[color_four, color_three]} start={{ x: 0.4, y: 0.4 }} end={{ x: 1, y: 1 }} >
      <View className='bg-color_five p-4 w-[90vw] rounded-md h-auto shadow shadow-black drop-shadow-2xl flex'>
        <Text className='font-montserratBold text-2xl mb-1'>Hello, I hope this app helped you in some way.</Text>
        <Text className='font-montserrat mb-4'>
          I came across two sites made by two of my seniors and I was just impressed by how did they get acess to that data, I reverse engineered those two sites a little and got access to the apis used by Simplifii so I thought I wanted to build something similar, but there were already two websites, so I thought why not an mobile app? And Here it is.
        </Text>
        <Text className='font-montserratSemiBold text-2xl mb-2'>The two mentioned sites above are</Text>
        <TouchableOpacity onPress={handleFirst}><Text className='font-montserrat color-blue-600 text-xl mb-2'>AIMS 2.0 by Amit Yadav</Text></TouchableOpacity>
        <TouchableOpacity onPress={handleSecond}><Text className='font-montserrat color-blue-600 text-xl mb-4'>Simplifii Simplified by Manisangh Sharma</Text></TouchableOpacity>
        <Text className='font-montserratSemiBold text-xl mb-1'>Just in Case you want to know how this was made here is the source code</Text>
        <TouchableOpacity onPress={handleSource}><Text className='font-montserrat color-blue-600 text-lg mb-2'>Source Code</Text></TouchableOpacity>
      </View>
    </LinearGradient>
  )
}