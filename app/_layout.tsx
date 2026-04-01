import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useEffect } from "react";
import { SplashScreen } from "expo-router";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Text } from "react-native";

SplashScreen.preventAutoHideAsync();

export default function Layout() {
    useEffect(() => {
        SplashScreen.hideAsync();
    }, []);

    return (
        <SafeAreaProvider>
            <GestureHandlerRootView style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#0f172a" }}>
                <Text style={{ color: "white", fontSize: 24, fontWeight: "bold", textAlign: "center", padding: 20 }}>
                    Thank you for using our app, It's time to say goodbye!
                </Text>
            </GestureHandlerRootView>
        </SafeAreaProvider>
    );
}