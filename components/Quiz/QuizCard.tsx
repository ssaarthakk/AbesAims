import { Linking, StyleSheet, Text, ToastAndroid, View } from 'react-native'
import React from 'react'
import CustomButton from '@/components/Common/CustomButton'
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
        <View
            className='bg-surface/80 border border-white/10 p-5 w-[90vw] h-auto mb-5 rounded-2xl shadow-xl shadow-black/40 backdrop-blur-md'
        >
            <View className='flex-row justify-between items-start mb-4'>
                <View className="flex-1">
                    <Text className='font-montserratExtraBold text-lg text-white tracking-wide'>{courseCode}</Text>
                    <Text className="text-xs text-primary font-montserratBold mt-1 uppercase tracking-wider">{quizUc}</Text>
                </View>
                <View className="bg-surface-highlight px-3 py-1 rounded-full border border-white/10">
                    <Text className="text-xs text-white font-montserratMedium">Quiz</Text>
                </View>
            </View>

            {/* Main Score Display */}
            <View className="items-center justify-center py-4 bg-color_one rounded-xl border border-white/5 mb-4">
                <Text className="text-4xl font-montserratExtraBold text-accent drop-shadow-md">{markOb}</Text>
                <Text className="text-xs text-text-muted font-montserrat tracking-widest uppercase mt-1">Marks Obtained</Text>
            </View>

            {/* Stats Grid */}
            <View className='flex-row justify-between gap-2 mb-4'>
                <View className='flex-1 bg-color_one p-2 rounded-lg border border-white/5 items-center'>
                    <Text className="text-success font-montserratBold text-lg">{CorrectA}</Text>
                    <Text className="text-[10px] text-text-muted uppercase">Correct</Text>
                </View>
                <View className='flex-1 bg-color_one p-2 rounded-lg border border-white/5 items-center'>
                    <Text className="text-error font-montserratBold text-lg">{IncorrectA}</Text>
                    <Text className="text-[10px] text-text-muted uppercase">Wrong</Text>
                </View>
                <View className='flex-1 bg-color_one p-2 rounded-lg border border-white/5 items-center'>
                    <Text className="text-warning font-montserratBold text-lg">{NotAttempted}</Text>
                    <Text className="text-[10px] text-text-muted uppercase">Skipped</Text>
                </View>
            </View>

            <CustomButton
                title='View Quiz'
                onPress={handlePress}
                containerStyles='py-3 rounded-xl bg-gradient-to-r from-primary to-purple-600 shadow-md shadow-primary/20'
            />
        </View>
    )
}

const styles = StyleSheet.create({})