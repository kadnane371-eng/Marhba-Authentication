import { Stack } from "expo-router";
import { useAuthStore } from "@/store/authStore";

export default function RootLayout() {
    const { isAuthenticated, isLoading } = useAuthStore();

    if (isLoading) {
        return null;
    }
    return (
       <Stack>
        <Stack.Protected guard={!isAuthenticated}>
            <Stack.Screen
            name="(auth)"
            options={{
                headerShown: false,
            }}
            />
        </Stack.Protected>

        <Stack.Protected guard={isAuthenticated}>
            <Stack.Screen
            name="(app)"
            options={{
                headerShown: false,
            }}
            />
        </Stack.Protected>
       </Stack>
    );
}