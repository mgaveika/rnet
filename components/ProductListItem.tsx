import { View, Text, Image } from 'react-native'
import React from 'react'
import { products } from '../data/products'
import { Pressable } from 'react-native'
import { router } from 'expo-router'

export default function ProductListItem({ productId }: { productId: number }) {
    const product = products.find(p => p.id === productId)
    return (
        <View className='flex-row bg-secondary w-full p-2 rounded-lg mt-1'>
            <Image source={{ uri: product?.image }} className="w-20 h-20 rounded-lg" resizeMode="cover" />
            <View className='ml-5'>
                <Pressable onPress={() => router.push({ pathname: "/product/[id]", params: { id: productId } })} className="mt-5">
                    <Text className="text-special text-lg">{product?.name}</Text>
                </Pressable>
                <Text className="text-primary text-lg">{product?.price}$</Text>
            </View>
        </View>
    )
}