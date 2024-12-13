import { Stack } from 'expo-router';

export default function Layout() {
    return (
        <Stack
            initialRouteName='index'
            screenOptions={{
                headerShown: false
            }}>
                
            <Stack.Screen name="index" options={{}} />
            <Stack.Screen name="SubAttDetails" options={{}} />
        </Stack>
    );
}