import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import FetchQuizCard from './FetchQuizCard';

export default function QuizScreen() {
    const [quizCode, setQuizCode] = useState('');

    return (
        <ScrollView className="flex-1" contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}>
            <FetchQuizCard quizCode={quizCode} setQuizCode={setQuizCode} />
        </ScrollView>
    );
}