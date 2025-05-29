import { useRef, useState, useEffect } from 'react';
import { WebView } from 'react-native-webview';
import { StyleSheet, ToastAndroid } from 'react-native';
import { getData } from '@/utils/storage';
import { StudentData } from '@/utils/apicalls';

export default function QuizWeb({ quizCode }: { quizCode: string }) {
    const webviewRef: any = useRef(null);
    const [pin, setPin] = useState<string | null>(null);
    const [userUniqueCode, setUserUniqueCode] = useState<string | null>(null);
    
    useEffect(() => {
        getDataForQuiz();
    }, []);
    
    async function getDataForQuiz() {
        const studentData: StudentData | null = await getData('userData');
        const pin = studentData?.quizPin;
        const user_unique_code = studentData?.username;
        setPin(pin || null);
        setUserUniqueCode(user_unique_code || null);
    }
    
    // Need to change
    const getInjectedJavaScript = () => {
        return `
        (function() {
            function fillQuizForm() {
                try {
                    const quizForm = document.querySelector('.access-quiz-form');
                    
                    if (!quizForm) {
                        return;
                    }
                    
                    const formDivs = quizForm.querySelectorAll('div');
                    
                    const quizCodeInput = formDivs[0].querySelector('input');
                    const userCodeInput = formDivs[1].querySelector('input');
                    const pinInput = formDivs[2].querySelector('input');
                    const submitButton = formDivs[3].querySelector('button');
                    
                    if (!quizCodeInput || !userCodeInput || !pinInput || !submitButton) {
                        return;
                    }
                    
                    quizCodeInput.value = "${quizCode}";
                    
                    userCodeInput.value = "${userUniqueCode || ''}";
                    
                    pinInput.value = "${pin || ''}";
                    
                    setTimeout(() => {
                        // submitButton.click();
                    }, 1000);
                    
                } catch (error) {
                    window.ReactNativeWebView.postMessage(JSON.stringify({
                        status: 'error',
                        message: 'Error executing script: ' + error.message
                    }));
                }
            }
            
            setTimeout(fillQuizForm, 1000);
        })();
        true;
        `;
    };

    const onMessage = async (event: any) => {
            try {
                const message = JSON.parse(event.nativeEvent.data);
                if (message === null) {
                    console.log('No Message');
                } else {
                    console.log('Message Got');
                }
            } catch (error) {
                console.error('Error parsing message:', error);
            }
        };

    const reinjectScript = () => {
        if (webviewRef.current) {
            webviewRef.current.injectJavaScript(getInjectedJavaScript());
        }
    };

    const onNavigationStateChange = (navState: any) => {
        if (!navState.loading) {
            console.log('Navigation completed, injecting script');
            reinjectScript();
        }
    };

    const onError = () => {
        console.log("Error loading WebView");
    };

    return (
        <WebView
            ref={webviewRef}
            source={{ uri: 'https://abesquiz.netlify.app/#/access-quiz' }}
            onMessage={onMessage}
            onError={onError}
            injectedJavaScript={getInjectedJavaScript()}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            originWhitelist={['*']}
            style={styles.container}
            onNavigationStateChange={onNavigationStateChange}
        />
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
});