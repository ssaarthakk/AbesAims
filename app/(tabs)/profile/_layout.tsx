import { Stack } from 'expo-router';

export default function ProfileLayout() {
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
            <Stack.Screen
                name="index"
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen name="password" options={{ title: 'Change Password' }} />
            <Stack.Screen name="pin" options={{ title: 'Change PIN' }} />
        </Stack>
    );
}
