import { Linking, StyleSheet, Text, ToastAndroid, View } from 'react-native'
import React from 'react'
import CustomButton from './CustomButton'

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
        <View className='bg-color_five p-4 w-[90vw] rounded-md h-auto shadow shadow-black drop-shadow-2xl flex gap-2 mb-3'>
            <Text className='font-montserratSemiBold text-2xl'>{courseCode}</Text>
            <View>
                <Text className='text-lg font-montserrat'>Quiz UC: {quizUc}</Text>
                <Text className='text-lg font-montserrat'>Marks Obtained: {markOb}</Text>
                <Text className='text-lg font-montserrat'>Correct Answers: {CorrectA}</Text>
                <Text className='text-lg font-montserrat'>Incorrect Answers: {IncorrectA}</Text>
                <Text className='text-lg font-montserrat'>Not Attempted: {NotAttempted}</Text>
            </View>
            <CustomButton title='View Details' onPress={handlePress} containerStyles='py-2 self-center w-full mt-2' />
        </View>
    )
}

const styles = StyleSheet.create({})