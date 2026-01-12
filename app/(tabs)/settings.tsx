import { View, Text, Switch } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTheme } from '../../context/ThemeContext'

export default function settings() {
    const { theme, toggleTheme } = useTheme();
    return (
        <SafeAreaView className='flex items-center min-h-full bg-primary'>
            <Text className="text-2xl font-bold text-primary">Settings</Text>
            <View className='flex w-[80%] p-4 rounded-lg mt-5 bg-secondary'>
                <View className='flex-row items-center justify-between'>
                    <Text className='text-primary font-bold text-lg'>Dark Mode</Text>
                    <Switch value={theme === "dark"} onValueChange={toggleTheme} />
                </View>
            </View>
        </SafeAreaView>
    )
}