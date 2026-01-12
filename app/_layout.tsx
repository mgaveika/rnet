import { Stack } from 'expo-router';
import { SafeAreaProvider } from "react-native-safe-area-context";
import "./global.css"
import { FavoritesProvider } from "../context/FavoritesContext";
import { ThemeProvider } from "../context/ThemeContext";

export default function RootLayout() {

  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <FavoritesProvider>
          <Stack screenOptions={{ headerShown: false }} />
        </FavoritesProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}