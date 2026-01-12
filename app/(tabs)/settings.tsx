import { View, Text, Switch, Pressable } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTheme } from '../../context/ThemeContext'
import { useFavorites } from '../../context/FavoritesContext'

export default function settings() {
    const { theme, toggleTheme } = useTheme();
    const { clearFavorites } = useFavorites();
    return (
        <SafeAreaView className='flex-1 items-center bg-primary'>
            <Text className="text-2xl font-bold text-primary">Settings</Text>
            <View className='flex w-[80%] p-4 rounded-lg mt-5 bg-secondary'>
                <View className='flex-row items-center justify-between'>
                    <Text className='text-primary font-bold text-lg'>Dark Mode</Text>
                    <Switch value={theme === "dark"} onValueChange={toggleTheme} />
                </View>
            </View>
            <Pressable onPress={clearFavorites} className='mt-auto bg-red-500 w-[80%] p-3 rounded-lg items-center'>
                <Text className='text-white font-bold'>Reset Favorites</Text>
            </Pressable>
        </SafeAreaView>
    )
}