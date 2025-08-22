import { Linking, StyleSheet, Text, ToastAndroid, View } from 'react-native'
import React from 'react'
import CustomButton from './CustomButton'
import { LinearGradient } from 'expo-linear-gradient'

export default function QuizCard({ courseCode, quizUc, markOb, CorrectA, IncorrectA, NotAttempted, quizLink }: { courseCode: string, quizUc: string, markOb: number, CorrectA: number, IncorrectA: number, NotAttempted: number, quizLink: string }) {

    const handlePress = () => {
        const hrefMatch = quizLink.match(/href="([^"]*)"/);
        const href = hrefMatch ? hrefMatch[1] : null;
        console.log('Pressed');
        if (href) {
            Linking.canOpenURL(href)
                .then((supported) => {
                    if (supported) {
                        Linking.openURL(href);
                    } else {
                        ToastAndroid.show('Cannot open link', ToastAndroid.LONG);
                    }
                })
                .catch((err) => {
                    ToastAndroid.show('Cannot open link', ToastAndroid.LONG);
                    console.log("Error while opening link ", err);
                });
        } else {
            ToastAndroid.show('Invalid Quiz Link', ToastAndroid.LONG);
        }
    }

    return (
        <LinearGradient 
            colors={['#ffffff', '#f5f5f5']} 
            start={{ x: 0, y: 0 }} 
            end={{ x: 1, y: 1 }}
            className='rounded-2xl p-5 w-[90vw] h-auto mb-4 shadow-lg'
        >
            <View className='border-b border-gray-300 pb-2 mb-3'>
                <Text className='font-montserratBold text-xl text-color_three'>{courseCode}</Text>
            </View>
            
            <View className='space-y-2 mb-4'>
                <View className='flex-row justify-between'>
                    <Text className='text-base font-montserratMedium text-gray-600'>Quiz UC:</Text>
                    <Text className='text-base font-montserrat text-color_three'>{quizUc}</Text>
                </View>
                
                <View className='flex-row justify-between'>
                    <Text className='text-base font-montserratMedium text-gray-600'>Marks Obtained:</Text>
                    <Text className='text-base font-montserrat text-color_three'>{markOb}</Text>
                </View>
                
                <View className='flex-row justify-between'>
                    <Text className='text-base font-montserratMedium text-gray-600'>Correct Answers:</Text>
                    <Text className='text-base font-montserrat text-green-600'>{CorrectA}</Text>
                </View>
                
                <View className='flex-row justify-between'>
                    <Text className='text-base font-montserratMedium text-gray-600'>Incorrect Answers:</Text>
                    <Text className='text-base font-montserrat text-red-600'>{IncorrectA}</Text>
                </View>
                
                <View className='flex-row justify-between'>
                    <Text className='text-base font-montserratMedium text-gray-600'>Not Attempted:</Text>
                    <Text className='text-base font-montserrat text-yellow-600'>{NotAttempted}</Text>
                </View>
            </View>
            
            <CustomButton 
                title='View Details' 
                onPress={handlePress} 
                containerStyles='py-3 mt-2 rounded-xl' 
            />
        </LinearGradient>
    )
}

const styles = StyleSheet.create({})