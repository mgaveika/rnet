import { View, Text, FlatList } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useFavorites } from '../../context/FavoritesContext'
import ProductListItem from '@/components/ProductListItem'

export default function favorite() {
    const { favorites } = useFavorites()
    return (
        <SafeAreaView className='flex-1 items-center bg-primary'>
            <Text className="text-2xl font-bold text-primary">Favorite</Text>
            <FlatList
                className='w-[80%]'
                data={favorites}
                renderItem={({ item }) => (
                    <ProductListItem product={item} />
                )}
            />
        </SafeAreaView>
    )
}