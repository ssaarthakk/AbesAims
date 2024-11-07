// import { Linking, Text, ToastAndroid, View } from 'react-native'
// import React from 'react'
// import { color_four, color_three } from '@/constants/Colors'
// import { LinearGradient } from 'expo-linear-gradient'
// import { TouchableOpacity } from 'react-native-gesture-handler'

// export default function About() {

//   const handleSource = () => {
//     Linking.canOpenURL('https://github.com/ssaarthakk/AbesAims')
//       .then((supported) => {
//         if (supported) {
//           Linking.openURL('https://github.com/ssaarthakk/AbesAims');
//         } else {
//           ToastAndroid.show('Cannot open link', ToastAndroid.LONG);
//         }
//       })
//       .catch((err) => {
//         ToastAndroid.show('Cannot open link', ToastAndroid.LONG);
//         console.log("Error while opening link ", err);
//       });
//   }

//   return (
//     <LinearGradient className='flex-1 justify-center items-center' colors={[color_four, color_three]} start={{ x: 0.4, y: 0.4 }} end={{ x: 1, y: 1 }} >
//       <View className='bg-color_five p-4 w-[90vw] rounded-md h-auto shadow shadow-black drop-shadow-2xl flex'>
//         <Text className='font-montserratSemiBold text-2xl mb-1'>Hello, I am Sarthak Kumar, the developer of this app and I hope this app helped you in some way.</Text>
//         <Text className='font-montserrat mb-2'>
//             This app provide you acess to you Simplifii portal information directly on the homepage without having to log in again everytime you the open the app and you don't need to visit the Simplifii website either, I do not save any of you data, your data is saved privately on your mobile phone, so no worries there.{'\n'}
//             Why did build this? I was tired of logging again everytime I visited the Simplifii website to see my attendance so I wanted to build something that would not involve clicking 5 button on a website just to see my attendance.
//         </Text>
//         <Text className='font-montserratSemiBold text-xl mb-1'>Just in Case you want to know how this was made here is the source code</Text>
//         <TouchableOpacity onPress={handleSource}><Text className='font-montserrat color-blue-600 text-lg mb-2'>Source Code</Text></TouchableOpacity>
//       </View>
//     </LinearGradient>
//   )
// }