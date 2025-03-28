import { useRef, useState } from 'react';
import { WebView } from 'react-native-webview';
import Constants from 'expo-constants';
import { StyleSheet } from 'react-native';

export default function Webview({ username, password, setLoggingIn }: { username: string, password: string, setLoggingIn: any }) {
    const [localStorageData, setLocalStorageData] = useState(null);
    const webviewRef: any = useRef(null);
    const USERNAME = username;
    const PASSWORD = password;

    const injectedffJavaScript = `
    (function() {
        const usernameField = document.querySelector('#email');
        const passwordField = document.querySelector('#demo-field');
        const submitButton = document.querySelector('#loginButton');

        if (usernameField && passwordField && submitButton) {
            usernameField.value = "${USERNAME}";
            passwordField.value = "${PASSWORD}";
            setTimeout(() => {
                submitButton.click();
            }, 1000);
            // window.ReactNativeWebView.postMessage("Username: " + usernameField.value + " Password: " + passwordField.value);
        } else {
            const localStorageData = localStorage.getItem("LoginApiResponse");

            window.ReactNativeWebView.postMessage(localStorageData);
        }
    })();
    true;
    `;

    const onMessage = (event: any) => {
        try {
            const message = JSON.parse(event.nativeEvent.data);
            console.log(typeof message);
            console.log(message.liup_80axpy);
            setLocalStorageData(message.liup_80axpy);
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