import { View, Text, Image, Pressable } from 'react-native'
import { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useLocalSearchParams } from 'expo-router'
import { ProductModel } from '../../models/Products'
import { router } from 'expo-router'
import ProtectedRoute from '@/components/ProtectedRoute'
import { ActivityIndicator } from 'react-native'

export default function ProductPage() {
    const { id } = useLocalSearchParams();
    const [product, setProduct] = useState<ProductModel>();
    const [isFavorite, setIsFavorite] = useState(false);
    const [loading, setLoading] = useState(true);

    const toggleFavorite = () => {
        setLoading(true)
        if (isFavorite) {
            fetch(`http://172.20.10.2:5001/api/favorite/${id}`,
                {
                    method: 'DELETE',
                    credentials: 'include'
                }
            )
                .then(res => res.json())
                .then(data => {
                    setIsFavorite(false);
                    setLoading(false)
                })
                .catch(error => console.error(error));
        } else {
            fetch(`http://172.20.10.2:5001/api/favorite/${id}`,
                {
                    method: 'POST',
                    credentials: 'include'
                }
            )
                .then(res => res.json())
                .then(data => {
                    setIsFavorite(true);
                    setLoading(false)
                })
                .catch(error => console.error(error));
        }
    }
    useEffect(() => {
        fetch(`http://172.20.10.2:5001/api/product/${id}`,
            {
                credentials: 'include'
            }
        )
            .then(res => res.json())
            .then(data => {
                setProduct(data.data);
                fetch(`http://172.20.10.2:5001/api/favorite/${id}`,
                    {
                        credentials: 'include'
                    }
                )
                    .then(res => res.json())
                    .then(data => {
                        setIsFavorite(data.data);
                        setLoading(false)
                    })
                    .catch(error => console.error(error));
            })
            .catch(error => console.error(error));
    }, []);

    return (
        <ProtectedRoute>
            {!product ?
                <SafeAreaView className="flex-1 justify-center items-center">
                    <ActivityIndicator size="large" />
                </SafeAreaView>
                :
                <SafeAreaView className='flex-1 items-center bg-primary'>
                    <Image source={{ uri: product?.image }} className="w-full h-80 bg-secondary" resizeMode="cover" />
                    <Text className="mt-5 text-primary w-[80%] text-center text-3xl">{product?.title}</Text>
                    <Text className="mt-2 text-primary w-[80%] text-center font-bold text-xl">{product?.price}$</Text>
                    <Pressable className="w-64 h-12 mt-5 flex items-center justify-center rounded-full bg-special" onPress={() => toggleFavorite()} disabled={loading}>
                        <Text className="text-white">{isFavorite ? "Remove from favorites" : "Mark as favorite"}</Text>
                    </Pressable>
                    <Pressable className="w-[80%] mt-auto h-12 px-12 flex items-center justify-center rounded-full bg-secondary" onPress={() => router.back()}>
                        <Text className='text-primary'>Back</Text>
                    </Pressable>
                </SafeAreaView>}
        </ProtectedRoute>
    )
}