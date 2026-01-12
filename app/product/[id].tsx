import { View, Text, Image, Pressable } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useLocalSearchParams } from 'expo-router'
import { products } from '../../data/products'
import { router } from 'expo-router'
import { useFavorites } from '../../context/FavoritesContext'

export default function Product() {
    const { id } = useLocalSearchParams();
    const product = products.find(p => p.id === Number(id))
    const { favorites, addFavorite, removeFavorite } = useFavorites()

    const isFavorite = (productId: number) => {
        return favorites.some(p => p === Number(productId))
    }
    const toggleFavorite = () => {
        if (isFavorite(Number(product?.id))) {
            removeFavorite(Number(product?.id))
        } else {
            addFavorite(Number(product?.id))
        }
    }
    return (
        <SafeAreaView className='flex-1 items-center'>
            <Image source={{ uri: product?.image }} className="w-full h-80 bg-blue-500" resizeMode="cover" />
            <Text className="mt-5">{product?.name} for {product?.price}$</Text>
            <Pressable className="w-64 h-12 mt-5 flex items-center justify-center rounded-full bg-blue-500" onPress={() => { toggleFavorite() }}>
                <Text className="text-white">{isFavorite(Number(product?.id)) ? "Remove from favorites" : "Mark as favorite"}</Text>
            </Pressable>
            <Pressable className="w-fit h-12 mt-3 px-12 flex items-center justify-center rounded-full bg-gray-700" onPress={() => router.back()}>
                <Text className='text-white'>Back</Text>
            </Pressable>
        </SafeAreaView>
    )
}