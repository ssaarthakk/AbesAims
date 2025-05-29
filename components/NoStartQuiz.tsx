import { StyleSheet, Text, ToastAndroid, View } from 'react-native'
import React, { useEffect } from 'react'

const NoStartQuiz = ({ quizCode, loginStart, quizData }: { quizCode: string,  loginStart: boolean, quizData: any }) => {

    return (
        <View className='w-[80vw] bg-color_five shadow-black shadow rounded-md p-6 gap-2'>
            {
                loginStart ? (
                    <View>
                        <Text className='font-montserratBold text-3xl'>The Quiz is not started yet</Text>
                        <Text className='font-montserrat text-xl'>Quiz Start Time: {quizData?.start_time}</Text>
                        <Text className='font-montserratBold text-xl'>The quiz will be automatically started, Please wait...</Text>
                    </View>
                ) : (
                    <View>
                        <Text className='font-montserratBold text-3xl'>The Login is not started yet</Text>
                        <Text className='font-montserrat text-xl'>Quiz Code: {quizCode}</Text>
                        <Text className='font-montserrat text-xl'>Login Start Time: {quizData?.login_time}</Text>
                        <Text className='font-montserrat text-xl'>Quiz Start Time: {quizData?.start_time}</Text>
                        <Text className='font-montserratBold text-xl'>The quiz will be automatically logged in, Please wait...</Text>
                    </View>
                )
            }
        </View>
    )
}

export default NoStartQuiz;