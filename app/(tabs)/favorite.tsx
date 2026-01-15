import { Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ProductModel } from '@/models/Products'
import ProductListItem from '@/components/ProductListItem'
import { ActivityIndicator } from 'react-native'
import { usePathname } from 'expo-router'

export default function favorite() {
    const [favorites, setFavorites] = useState<ProductModel[]>([])
    const [loading, setLoading] = useState(true)
    const pathname = usePathname()
    useEffect(() => {
        if (pathname !== '/favorite') return
        setLoading(true)
        fetch('http://172.20.10.2:5001/api/favorite', {
            credentials: 'include'
        })
            .then(res => res.json())
            .then(data => {
                setFavorites(data.data)
                setLoading(false)
            })
            .catch(error => console.error(error))
    }, [pathname])
    return (<>
        {loading ?
            <SafeAreaView className="flex-1 justify-center items-center">
                <ActivityIndicator size="large" />
            </SafeAreaView>
            :
            <SafeAreaView className='flex-1 items-center bg-primary'>
                <Text className="text-2xl font-bold text-primary">Favorite</Text>
                <FlatList
                    className='w-[80%]'
                    data={favorites}
                    renderItem={({ item }) => (
                        <ProductListItem product={item} />
                    )}
                />
            </SafeAreaView>}
    </>)
}