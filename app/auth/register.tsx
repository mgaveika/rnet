import { View, Text, TextInput, Pressable } from 'react-native'
import { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage'
import GuestRoute from '@/components/GuestRoute'

export default function register() {
  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const [message, setMessage] = useState("")

  const router = useRouter()

  const handleSubmit = () => {
    if (email.length === 0 || username.length === 0 || password.length === 0 || confirmPassword.length === 0) {
      setMessage("All fields are required")
      return
    }
    if (!email.includes("@") || !email.includes(".")) {
      setMessage("Invalid email")
      return
    }
    if (username.length < 3) {
      setMessage("Username must be atleast 3 chars long")
      return
    }
    if (password.length < 6) {
      setMessage("Password must be atleast 6 chars long")
      return
    }
    if (password !== confirmPassword) {
      setMessage("Passwords do not match")
      return
    }
    fetch("http://172.20.10.2:5001/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: 'include',
      body: JSON.stringify({
        email,
        username,
        password,
        confirmPassword
      })
    })
      .then(res => res.json())
      .then(async data => {
        if (data.status === "success") {
          router.replace("/")
        } else if (data.status === "error") {
          setMessage(data.message)
        } else {
          setMessage(data.message)
        }
      })
      .catch(err => {
        setMessage("Network error")
      })
  }

  return (
    <GuestRoute>
      <SafeAreaView className='flex-1 items-center bg-primary'>
        <Text className="text-2xl font-bold text-primary mt-32">Register</Text>
        <View className='w-full flex items-center gap-4'>
          <Text className='text-red-500'>{message}</Text>
          <View className='w-[70%]'>
            <Text className='text-primary'>E-mail</Text>
            <TextInput
              className='bg-secondary w-full rounded-md'
              placeholder='E-mail'
              onChangeText={setEmail}
              autoCapitalize='none'
            ></TextInput>
          </View>
          <View className='w-[70%]'>
            <Text className='text-primary'>Username</Text>
            <TextInput
              className='bg-secondary w-full rounded-md'
              placeholder='Username'
              onChangeText={setUsername}
            ></TextInput>
          </View>
          <View className='w-[70%]'>
            <Text className='text-primary'>Password</Text>
            <TextInput
              onChangeText={setPassword}
              className='bg-secondary w-full rounded-md text-primary'
              placeholder='Password'
              secureTextEntry
            ></TextInput>
          </View>
          <View className='w-[70%]'>
            <Text className='text-primary'>Confirm Password</Text>
            <TextInput
              onChangeText={setConfirmPassword}
              className='bg-secondary w-full rounded-md text-primary'
              placeholder='Confirm Password'
              secureTextEntry
            ></TextInput>
          </View>
          <Pressable
            onPress={handleSubmit}
            className='bg-special w-[70%] p-3 rounded-full'
          >
            <Text className='text-button text-center'>Register</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </GuestRoute>
  )
}