import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import FetchQuizCard from './FetchQuizCard';
import QuizQuestion from './QuizQuestion';

export default function QuizScreen() {
    const [quizValid, setQuizValid] = useState<boolean>(false); // Change
    const [quizCode, setQuizCode] = useState('');

    return (
        <ScrollView className="flex-1" contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}>
            {quizValid ? (
                <QuizQuestion quizCode={quizCode} />
            ) : (
                <FetchQuizCard setQuizValid={setQuizValid} quizCode={quizCode} setQuizCode={setQuizCode} />
            )}
        </ScrollView>
    );
}