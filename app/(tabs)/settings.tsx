import { View, Text, Switch, Pressable } from 'react-native'
import { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTheme } from '../../context/ThemeContext'
import { useRouter } from 'expo-router'

export default function settings() {
    const { theme, toggleTheme } = useTheme();
    const router = useRouter();
    const [userData, setUserData] = useState<any>(null);

    useEffect(() => {
        fetch("http://172.20.10.2:5001/api/auth/isAuthenticated", {
            credentials: 'include'
        })
            .then(res => res.json())
            .then(data => {
                if (data.status === 'success') {
                    setUserData(data.data.user);
                }
            })
            .catch(error => console.error(error));
    }, []);

    const handleLogout = () => {
        fetch('http://172.20.10.2:5001/api/auth/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        }).then(res => res.json())
            .then(async data => {
                router.replace("/");
            })
            .catch(error => console.error(error));
    };

    return (
        <SafeAreaView className='flex-1 items-center bg-primary'>
            <Text className="text-2xl font-bold text-primary">Settings</Text>
            <Text className="text-md text-gray-500 mt-2">{userData?.email}</Text>
            <View className='flex w-[80%] p-4 rounded-lg mt-5 bg-secondary'>
                <View className='flex-row items-center justify-between'>
                    <Text className='text-primary font-bold text-lg'>Dark Mode</Text>
                    <Switch value={theme === "dark"} onValueChange={toggleTheme} />
                </View>
            </View>
            <Pressable onPress={handleLogout} className='mt-2 bg-gray-500 w-[80%] p-3 rounded-lg items-center'>
                <Text className='text-white font-bold'>Logout</Text>
            </Pressable>
        </SafeAreaView>
    )
}