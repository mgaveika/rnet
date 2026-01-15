import { View, Text, Image, Pressable, TextInput, ScrollView } from 'react-native'
import { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useLocalSearchParams } from 'expo-router'
import { ProductModel } from '../../models/Products'
import { router } from 'expo-router'
import ProtectedRoute from '@/components/ProtectedRoute'
import { ActivityIndicator } from 'react-native'
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function ProductPage() {
    const { id } = useLocalSearchParams();
    const [product, setProduct] = useState<ProductModel>();
    const [isFavorite, setIsFavorite] = useState(false);
    const [loading, setLoading] = useState(true);
    const [userId, setUserId] = useState('');
    const [newStock, setNewStock] = useState('');

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
    const updateStock = () => {
        fetch(`http://172.20.10.2:5001/api/product/${id}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({ count: newStock })
            }
        )
            .then(res => res.json())
            .then(data => {
                setProduct(data.data);
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
                    setUserId(data.data.user.id);
                    fetch(`http://172.20.10.2:5001/api/product/${id}`,
                        {
                            credentials: 'include'
                        }
                    )
                        .then(res => res.json())
                        .then(data => {
                            if (data.data) {
                                setProduct(data.data);
                                setNewStock(data.data.count.toString());
                            }
                            fetch(`http://172.20.10.2:5001/api/favorite/${id}`,
                                {
                                    credentials: 'include'
                                }
                            )
                                .then(res => res.json())
                                .then(data => {
                                    setIsFavorite(data.data);
                                })
                                .catch(error => console.error(error));
                        })
                        .catch(error => console.error(error));
                }
            })
            .catch(error => console.error(error));
    }, []);

    return (
        <ProtectedRoute>
            {!product || !userId ?
                <SafeAreaView className="flex-1 justify-center items-center">
                    <ActivityIndicator size="large" />
                </SafeAreaView>
                :
                <SafeAreaView className='flex-1 items-center bg-primary'>
                    <View className='w-full h-80'>
                        <Image source={{ uri: product?.image }} className="h-full bg-secondary" resizeMode="cover" />
                        <View className='absolute bottom-5 right-5 bg-primary rounded-full p-3'>
                            <Pressable disabled={loading} onPress={() => toggleFavorite()}>
                                {isFavorite ? (
                                    <FontAwesome name="star" size={24} color="gold" />
                                ) : (
                                    <FontAwesome name="star-o" size={24} color="gold" />
                                )}
                            </Pressable>
                        </View>
                    </View>
                    <Text className="mt-5 text-primary w-[80%] text-center text-2xl">{product?.title}</Text>
                    <Text className="mt-2 text-primary w-[80%] text-center font-bold text-xl">{product?.price}$</Text>

                    <View className='flex-row items-center gap-2 mt-5'>
                        <Text className="text-primary text-center font-bold text-xl">Stock:</Text>
                        {product?.owner?.toString() === userId?.toString() ? <>
                            <TextInput
                                className='bg-secondary rounded-md py-2 px-5 text-primary text-xl font-semibold'
                                value={newStock}
                                onChangeText={(text) => setNewStock(text.replace(/[^0-9]/g, ''))}
                                placeholder="0"
                                keyboardType="numeric"
                            />
                            <Pressable disabled={newStock === product?.count.toString()} onPress={updateStock} className='bg-special rounded-full py-2 px-5'>
                                <Text className='text-primary'>Update</Text>
                            </Pressable>
                        </> : (
                            <Text className='text-primary text-center font-bold text-xl'>{product?.count}</Text>
                        )}
                    </View>
                    <View className='flex-1 w-full items-center mt-5 mb-5'>
                        <View className='w-[80%] bg-secondary p-2 rounded-lg rounded-md shrink'>
                            <Text className='text-primary text-center text-xl font-bold mb-2'>Description</Text>
                            <ScrollView>
                                <Text className='text-primary text-justify text-xl'>{product?.description}</Text>
                            </ScrollView>
                        </View>
                    </View>
                    <Pressable className="w-[80%] mt-auto h-12 px-12 flex items-center justify-center rounded-full bg-secondary mb-5" onPress={() => router.back()}>
                        <Text className='text-primary font-bold'>Back</Text>
                    </Pressable>
                </SafeAreaView>}
        </ProtectedRoute>
    )
}