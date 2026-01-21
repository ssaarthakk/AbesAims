import { Stack } from 'expo-router';
import { color_three } from '@/constants/Colors';

export default function SettingsLayout() {
    return (
        <Stack
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#020617', // Slate 950
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontFamily: 'Montserrat-Bold',
                },
                headerShadowVisible: false,
                contentStyle: {
                    backgroundColor: '#020617'
                }
            }}
        >
            <Stack.Screen name="password" options={{ title: 'Change Password' }} />
            <Stack.Screen name="pin" options={{ title: 'Change PIN' }} />
        </Stack>
    );
}
