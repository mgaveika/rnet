import { View, Text, TextInput, Pressable } from 'react-native'
import { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router'
import GuestRoute from '@/components/GuestRoute'

export default function login() {
    const [email, setEmail] = useState("test@test.lv")
    const [password, setPassword] = useState("123456789")

    const [message, setMessage] = useState("")

    const router = useRouter()

    const handleSubmit = () => {
        if (email.length === 0 || password.length === 0) {
            setMessage("All fields are required")
            return
        }
        fetch("http://172.20.10.2:5001/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
                email,
                password
            }),
        }).then(res => res.json())
            .then(async data => {
                if (data.status == "success") {
                    router.replace("/(tabs)/home")
                } else if (data.status == "error") {
                    setMessage(data.message)
                } else {
                    setMessage(data.message)
                }
            })
            .catch(err => {
                setMessage(err)
            })
    }

    return (
        <GuestRoute>
            <SafeAreaView className='flex-1 items-center bg-primary'>
                <Text className="text-2xl font-bold text-primary mt-32">Login</Text>
                <View className='w-full flex items-center gap-4'>
                    <Text className='text-red-500'>{message}</Text>
                    <View className='w-[70%]'>
                        <Text className='text-primary'>Email</Text>
                        <TextInput
                            className='bg-secondary w-full rounded-md text-primary'
                            placeholder='Email'
                            onChangeText={setEmail}
                            autoCapitalize='none'
                            value={email}
                        ></TextInput>
                    </View>
                    <View className='w-[70%]'>
                        <Text className='text-primary'>Password</Text>
                        <TextInput
                            onChangeText={setPassword}
                            className='bg-secondary w-full rounded-md text-primary'
                            placeholder='Password'
                            value={password}
                            secureTextEntry
                        ></TextInput>
                    </View>
                    <Pressable
                        onPress={handleSubmit}
                        className='bg-special w-[70%] p-3 rounded-full'
                    >
                        <Text className='text-button text-center'>Login</Text>
                    </Pressable>
                </View>
            </SafeAreaView>
        </GuestRoute>
    )
}