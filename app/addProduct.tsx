import { View, Text, Image, Pressable, TextInput, ScrollView } from 'react-native'
import { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import ProtectedRoute from '@/components/ProtectedRoute'

export default function AddProduct() {
    const [image, setImage] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [count, setCount] = useState('');

    const handleSubmit = () => {
        if (title.length === 0 || description.length === 0 || price.length === 0 || count.length === 0) {
            return;
        }
        fetch('http://172.20.10.2:5001/api/product', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                image: image.length === 0 ? 'https://placehold.co/600x400/png' : image,
                title,
                description,
                price,
                count,
            }),
            credentials: 'include'
        })
            .then(res => res.json())
            .then(data => {
                router.back();
                setImage('');
                setTitle('');
                setDescription('');
                setPrice('');
                setCount('');
            })
            .catch(error => console.error(error));
    }

    return (
        <ProtectedRoute>
            <SafeAreaView className='flex-1 items-center bg-primary'>
                <View className='w-full h-80'>
                    <Image source={{ uri: "https://placehold.co/600x400/png" }} className="h-full" resizeMode="cover" />
                </View>
                <View className='flex-1 w-[90%] gap-1 mt-5'>
                    <View className='w-full'>
                        <Text className='text-primary text-xl font-semibold'>Image</Text>
                        <TextInput
                            className='bg-secondary rounded-md py-2 px-5 text-primary text-xl font-semibold'
                            value={image}
                            onChangeText={setImage}
                            placeholder="Image"
                        />
                    </View>
                    <View className='w-full'>
                        <Text className='text-primary text-xl font-semibold'>Title</Text>
                        <TextInput
                            className='bg-secondary rounded-md py-2 px-5 text-primary text-xl font-semibold'
                            value={title}
                            onChangeText={setTitle}
                            placeholder="Title"
                        />
                    </View>
                    <View className='w-full'>
                        <Text className='text-primary text-xl font-semibold'>Price</Text>
                        <TextInput
                            className='bg-secondary rounded-md py-2 px-5 text-primary text-xl font-semibold'
                            value={price}
                            onChangeText={(text) => setPrice(text.replace(/[^0-9.]/g, ''))}
                            placeholder="Price"
                            keyboardType="decimal-pad"
                        />
                    </View>
                    <View className='w-full'>
                        <Text className='text-primary text-xl font-semibold'>Stock</Text>
                        <TextInput
                            className='bg-secondary rounded-md py-2 px-5 text-primary text-xl font-semibold'
                            value={count}
                            onChangeText={(text) => setCount(text.replace(/[^0-9]/g, ''))}
                            placeholder="Stock"
                        />
                    </View>
                    <View className='w-full'>
                        <Text className='text-primary text-xl font-semibold'>Description</Text>
                        <TextInput
                            className='bg-secondary rounded-md py-2 px-5 text-primary text-xl font-semibold'
                            value={description}
                            onChangeText={setDescription}
                            placeholder="Description"
                            multiline
                            numberOfLines={4}
                            maxLength={300}
                        />
                    </View>
                </View>
                <Pressable className="w-[80%] h-12 px-12 flex items-center justify-center rounded-full bg-special mb-5" onPress={() => handleSubmit()}>
                    <Text className='text-button font-bold'>Add Product</Text>
                </Pressable>
                <Pressable className="w-[80%] mt-auto h-12 px-12 flex items-center justify-center rounded-full bg-secondary mb-5" onPress={() => router.back()}>
                    <Text className='text-primary font-bold'>Back</Text>
                </Pressable>
            </SafeAreaView>
        </ProtectedRoute>
    )
}