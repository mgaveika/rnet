import { Stack } from 'expo-router';
import { SafeAreaProvider } from "react-native-safe-area-context";
import "./global.css"
import { ThemeProvider } from "../context/ThemeContext";

export default function RootLayout() {

  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen options={{ headerShown: false }} name="index" />
        </Stack>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}