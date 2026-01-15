import { Text, Pressable, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router'
import GuestRoute from '@/components/GuestRoute'

export default function index() {
    const router = useRouter()
    return (
        <GuestRoute>
            <SafeAreaView className='flex-1 items-center bg-primary'>
                <Text className="text-2xl font-bold text-primary">Auth</Text>
                <View className='w-full flex-col items-center gap-4 mt-32'>
                    <Pressable onPress={() => router.push('/auth/register')} className='w-32 bg-special px-5 py-5 rounded-full'>
                        <Text className='text-button text-center'>Register</Text>
                    </Pressable>
                    <Pressable onPress={() => router.push('/auth/login')} className='w-32 bg-special px-5 py-5 rounded-full'>
                        <Text className='text-button text-center'>Login</Text>
                    </Pressable>
                </View>
            </SafeAreaView>
        </GuestRoute>
    )
}