import { View, Text, Image, Pressable, TextInput, ScrollView, FlatList } from 'react-native'
import { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import ProtectedRoute from '@/components/ProtectedRoute'
import { useRouter } from 'expo-router'

interface CartItem {
    id: string;
    title: string;
    price: number;
    image: string;
    quantity: number;
    cartItemId: string;
}

export default function Cart() {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter()

    const handleProductDelete = (cartItemId: string) => {
        setLoading(true)
        fetch(`http://172.20.10.2:5001/api/cart/${cartItemId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
            .then(res => res.json())
            .then(data => {
                if (data.status === 'success') {
                    setCart((prevCart) => prevCart.filter(item => item.cartItemId !== cartItemId));
                }
                setLoading(false)
            })
            .catch(error => console.error(error));
    }

    const handleQuantityChange = (action: string, cartItemId: string) => {
        setLoading(true)
        fetch(`http://172.20.10.2:5001/api/cart/${cartItemId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({ action })
        })
            .then(res => res.json())
            .then(data => {
                if (data.status === 'success') {
                    if (data.data === null) {
                        setCart((prevCart) => prevCart.filter(item => item.cartItemId !== cartItemId));
                    } else {
                        setCart((prevCart) => prevCart.map(item => item.cartItemId === cartItemId ? { ...item, quantity: data.data.quantity } : item));
                    }
                }
                setLoading(false)
            })
            .catch(error => console.error(error));
    }
    useEffect(() => {
        fetch("http://172.20.10.2:5001/api/auth/isAuthenticated", {
            credentials: 'include'
        })
            .then(res => res.json())
            .then(data => {
                if (data.status === 'success') {
                    setUserData(data.data.user);
                    fetch("http://172.20.10.2:5001/api/cart", {
                        credentials: 'include'
                    })
                        .then(res => res.json())
                        .then(data => {
                            if (data.status === 'success') {
                                setCart(data.data);
                                setLoading(false);
                            }
                        })
                        .catch(error => console.error(error));
                }
            })
            .catch(error => console.error(error));
    }, []);

    return (
        <ProtectedRoute>
            <SafeAreaView className='flex-1 items-center bg-primary'>
                <Text className="text-2xl font-bold text-primary">Cart</Text>
                <FlatList
                    className='w-[80%] my-5'
                    data={cart}
                    renderItem={({ item }) => (
                        <View className='flex-col bg-secondary w-full p-4 rounded-lg mt-1'>
                            <View className='flex-row w-full h-20'>
                                <Image source={{ uri: item.image }} className="w-20 h-full rounded-lg" resizeMode="cover" />
                                <View className='flex-1 ml-5 w-[60%] h-full'>
                                    <Pressable onPress={() => router.push({ pathname: "/product/[id]", params: { id: item.id } })} className="max-h-[70%]">
                                        <Text className="text-special text-lg text-clip">{item.title}</Text>
                                    </Pressable>
                                    <Text className="text-primary text-lg">{item.price}$</Text>
                                </View>
                            </View>
                            <View className='flex-row w-full justify-center gap-5 mt-5'>
                                <Pressable disabled={loading} onPress={() => handleQuantityChange('minus', item.cartItemId)} className={`w-10 h-10 bg-special rounded-lg justify-center items-center ${loading ? 'opacity-50' : ''}`}>
                                    <Text className='text-button text-lg'>-</Text>
                                </Pressable>
                                <Text className='text-primary text-lg'>{item.quantity}</Text>
                                <Pressable disabled={loading} onPress={() => handleQuantityChange('plus', item.cartItemId)} className={`w-10 h-10 bg-special rounded-lg justify-center items-center ${loading ? 'opacity-50' : ''}`}>
                                    <Text className='text-button text-lg'>+</Text>
                                </Pressable>
                            </View>
                            <Pressable disabled={loading} onPress={() => handleProductDelete(item.cartItemId)} className={`w-full h-10 bg-special rounded-full justify-center items-center mt-5 ${loading ? 'opacity-50' : ''}`}>
                                <Text className='text-button text-lg'>Remove from cart</Text>
                            </Pressable>
                        </View>
                    )}
                    keyExtractor={(item) => item.cartItemId}
                />
                <Pressable onPress={() => router.back()} className='w-[80%] h-10 bg-special rounded-full justify-center items-center mb-5'>
                    <Text className='text-button text-lg'>Back</Text>
                </Pressable>
            </SafeAreaView>
        </ProtectedRoute>
    )
}