import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import FetchQuizCard from './FetchQuizCard';

export default function QuizScreen() {
    const [quizCode, setQuizCode] = useState('');

    return (
        <View className="flex-1">
            <ScrollView 
                className="flex-1" 
                contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}
            >
                <FetchQuizCard quizCode={quizCode} setQuizCode={setQuizCode} />
            </ScrollView>
        </View>
    );
}