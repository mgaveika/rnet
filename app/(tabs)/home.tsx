import { Text, FlatList, View, Pressable } from 'react-native';
import { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ProductModel } from '../../models/Products';
import ProductListItem from '../../components/ProductListItem';
import { ActivityIndicator } from 'react-native';
import { usePathname } from 'expo-router';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { router } from 'expo-router';

export default function HomeScreen() {
  const [products, setProducts] = useState<ProductModel[]>([]);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname()

  useEffect(() => {
    fetch("http://172.20.10.2:5001/api/product", {
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => {
        if (data.status === "success") {
          setProducts(data.data)
          setLoading(false)
        }
      })
      .catch(error => console.error(error));
  }, [pathname])

  return <>
    {loading ?
      <SafeAreaView className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" />
      </SafeAreaView>
      :
      <SafeAreaView className='flex-1 items-center mx-auto bg-primary w-full'>
        <View className='w-[80%] flex-1'>
          <Text className="text-2xl font-bold text-primary">Home</Text>
          <Pressable className='ml-auto bg-secondary rounded-lg p-2' onPress={() => router.push('/cart')}>
            <FontAwesome5 className='ml-auto' name="shopping-cart" size={24} color="#999" />
          </Pressable>
          <FlatList
            className='w-full mt-2'
            data={products}
            renderItem={({ item }) => (<ProductListItem product={{ _id: item._id, title: item.title, price: item.price, description: item.description, category: item.category, image: item.image, count: item.count, owner: item.owner }} />)}
            keyExtractor={(item) => item._id}
          />
        </View>
      </SafeAreaView>
    }
  </>
}
