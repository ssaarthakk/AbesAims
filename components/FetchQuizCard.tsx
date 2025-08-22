import { Text, ToastAndroid, View } from 'react-native'
import React, { useState } from 'react'
import CustomButton from './CustomButton';
import { TextInput } from 'react-native-gesture-handler';
import { doQuizFromAPI } from '@/utils/apicalls';

const FetchQuizCard = ( { quizCode, setQuizCode }: { setQuizValid: any, quizCode: string, setQuizCode: any } ) => {

    const [loading, setLoading] = useState(false);

    const handleQuizSubmit = async () => {
        if (!quizCode.trim()) {
            ToastAndroid.show('Please enter a quiz code', ToastAndroid.SHORT);
            return;
        }

        setLoading(true);

        try {
            const response = await doQuizFromAPI(quizCode);

            ToastAndroid.show(response.message, ToastAndroid.LONG);
        } catch (error) {
            console.error('Error submitting quiz code', error);
            ToastAndroid.show('Failed to submit quiz code. Please try again.', ToastAndroid.LONG);
        } finally {
            setLoading(false);
        }
    };



    return (
        <View className='w-[80vw] bg-color_five shadow-black shadow rounded-2xl p-6'>
            <Text className='font-montserratBold text-4xl text-center text-black pt-4'>Quizzes</Text>
            <Text className='font-montserratSemiBold text-2xl text-center pb-6 pt-2 text-black'>Enter Quiz Code</Text>

            <TextInput
                placeholder='Enter Quiz Code'
                value={quizCode}
                placeholderTextColor={'#141414'}
                onChangeText={setQuizCode}
                className='p-3 mb-5 border border-gray-500 rounded-xl font-montserrat text-black'
            />

            <CustomButton onPress={!loading ? handleQuizSubmit : () => { }} title='Submit' isLoading={loading} containerStyles='rounded-xl' />
        </View>
    )
}

export default FetchQuizCard;