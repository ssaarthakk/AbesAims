import { Stack } from "expo-router";
import { color_one } from "@/constants/Colors";

export default function AttendanceLayout() {
    return (
        <Stack
            screenOptions={{
                headerStyle: {
                    backgroundColor: color_one,
                },
                headerTintColor: "#fff",
                headerTitleStyle: {
                    fontFamily: "montserratBold",
                },
                headerShadowVisible: false,
            }}
        >
            <Stack.Screen
                name="index"
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="details"
                options={{
                    title: "Attendance Details.",
                    headerBackTitle: "Back",
                }}
            />
        </Stack>
    );
}
