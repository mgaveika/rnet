import { View, Text, Image, Pressable } from 'react-native'
import { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useLocalSearchParams } from 'expo-router'
import { Product } from '../../data/products'
import { router } from 'expo-router'
import { useFavorites } from '../../context/FavoritesContext'

export default function ProductPage() {
    const { id } = useLocalSearchParams();
    const [product, setProduct] = useState<Product>();
    useEffect(() => {
        fetch(`https://fakestoreapi.com/products/${id}`)
            .then(res => res.json())
            .then(data => {
                setProduct(data);
            })
            .catch(error => console.error(error));
    }, []);

    const { favorites, addFavorite, removeFavorite } = useFavorites()

    const isFavorite = (product: Product) => {
        return favorites.some(p => p.id === product.id)
    }
    const toggleFavorite = (product: Product) => {
        if (isFavorite(product)) {
            removeFavorite(product)
        } else {
            addFavorite(product)
        }
    }

    if (!product) {
        return (
            <SafeAreaView className='flex-1 items-center justify-center bg-primary'>
                <Text className="text-primary">Loading...</Text>
            </SafeAreaView>
        )
    }

    return (
        <SafeAreaView className='flex-1 items-center bg-primary'>
            <Image source={{ uri: product?.image }} className="w-full h-80 bg-secondary" resizeMode="cover" />
            <Text className="mt-5 text-primary w-[80%] text-center text-3xl">{product?.title}</Text>
            <Text className="mt-2 text-primary w-[80%] text-center font-bold text-xl">{product?.price}$</Text>
            <Pressable className="w-64 h-12 mt-5 flex items-center justify-center rounded-full bg-special" onPress={() => { toggleFavorite(product as Product) }}>
                <Text className="text-white">{isFavorite(product as Product) ? "Remove from favorites" : "Mark as favorite"}</Text>
            </Pressable>
            <Pressable className="w-[80%] mt-auto h-12 px-12 flex items-center justify-center rounded-full bg-secondary" onPress={() => router.back()}>
                <Text className='text-primary'>Back</Text>
            </Pressable>
        </SafeAreaView>
    )
}