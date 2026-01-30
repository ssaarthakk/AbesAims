import { useRef, useState, useEffect } from 'react';
import { WebView } from 'react-native-webview';
import Constants from 'expo-constants';
import { StyleSheet, ToastAndroid } from 'react-native';
import { saveData } from '@/utils/storage';

export default function Webview({ username, password, setLoggingIn, addUserData }: { username: string, password: string, setLoggingIn: any, addUserData: any }) {
    const webviewRef: any = useRef(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            ToastAndroid.show('Invalid Username or Password', ToastAndroid.SHORT);
            setLoggingIn(false);
        }, 30000);

        return () => clearTimeout(timer);
    }, []);

    const injectedffJavaScript = `
    (function() {
        const usernameField = document.querySelector('#email');
        const passwordField = document.querySelector('#demo-field');
        const submitButton = document.querySelector('#loginButton');

        if (usernameField && passwordField && submitButton) {
            usernameField.value = "${username}";
            passwordField.value = "${password}";
            setTimeout(() => {
                submitButton.click();
                setTimeout(() => {
                    const failedLogin = document.querySelector('#failure-message');
                    if(failedLogin && failedLogin.childNodes.length > 0) {
                        window.ReactNativeWebView.postMessage(null);
                    }
                }, 3000);
            }, 1000);
        } else {
            const localStorageData = localStorage.getItem("LoginApiResponse");

            window.ReactNativeWebView.postMessage(localStorageData);
        }
    })();
    true;
    `;

    const setGlobalUserData = async (obb: any) => {
        if (obb === null) {
            return null;
        }
        const data = {
            id: obb.id,
            token: obb.token,
            username: obb.username,
            password: password,
            name: obb.name,
            email: obb.email,
            rollno: obb.string4,
            section: obb.string5,
            mobile: obb.mobile,
            quizPin: obb.string10,
            year: obb.int3,
            semester: obb.int4,
            role: obb.role,
            passingYear: obb.int6,
            branch: null
        }
        await saveData('userData', data);
        await addUserData(data);
        return data;
    }

    const onMessage = async (event: any) => {
        try {
            const message = JSON.parse(event.nativeEvent.data);
            if (message == null) {
                ToastAndroid.show('Invalid Username or Password', ToastAndroid.SHORT);
            } else {
                console.log(message.liup_80axpy);
                await setGlobalUserData(message.liup_80axpy);
                ToastAndroid.show('Login successful', ToastAndroid.SHORT);
            }
        } catch (error) {
            console.error('Error parsing message:', error);
        } finally {
            setLoggingIn(false);
        }
    };

    const reinjectScript = () => {
        if (webviewRef.current) {
            webviewRef.current.injectJavaScript(injectedffJavaScript);
        }
    };

    const onNavigationStateChange = (navState: any) => {
        if (!navState.loading) {
            console.log('Navigation completed, reinjecting script');
            reinjectScript();
        }
    };

    const onError = () => {
        setLoggingIn(false);
    }

    return (
        <WebView
            ref={webviewRef}
            source={{ uri: 'https://abes.web.simplifii.com/index.php' }}
            onMessage={onMessage}
            onError={onError}
            injectedJavaScript={injectedffJavaScript}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            originWhitelist={['*']}
            style={styles.container}
            onNavigationStateChange={onNavigationStateChange}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Constants.statusBarHeight,
    },
});