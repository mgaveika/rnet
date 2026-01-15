import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function TabsLayout() {
  const { darkMode } = useTheme();

  return (
    <ProtectedRoute>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: darkMode ? '#44444E' : '#ffffff',
            borderTopColor: darkMode ? '#1f2937' : '#e5e5e5',
          },
          tabBarActiveTintColor: '#007AFF',
          tabBarInactiveTintColor: darkMode ? '#888888' : '#888888',
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: 'Home',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="favorite"
          options={{
            title: 'Favorite',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="heart" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: 'Settings',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="settings" size={size} color={color} />
            ),
          }}
        />
      </Tabs>
    </ProtectedRoute>

  );
}
