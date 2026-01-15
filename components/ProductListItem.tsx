import { View, Text, Image } from 'react-native'
import React from 'react'
import { ProductModel } from '../models/Products'
import { Pressable } from 'react-native'
import { router } from 'expo-router'

export default function ProductListItem({ product }: { product: ProductModel }) {
    return (
        <View className='flex-row bg-secondary w-full h-20 p-2 rounded-lg mt-1'>
            <Image source={{ uri: product.image }} className="w-20 rounded-lg" resizeMode="cover" />
            <View className='ml-5 w-[50%] h-full'>
                <Pressable onPress={() => router.push({ pathname: "/product/[id]", params: { id: product._id } })} className="h-[50%]">
                    <Text className="text-special text-lg text-clip">{product.title}</Text>
                </Pressable>
                <Text className="text-primary text-lg">{product.price}$</Text>
            </View>
        </View>
    )
}