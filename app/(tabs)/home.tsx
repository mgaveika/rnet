import { Text, FlatList } from 'react-native';
import { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ProductModel } from '../../models/Products';
import ProductListItem from '../../components/ProductListItem';
import { ActivityIndicator } from 'react-native';

export default function HomeScreen() {
  const [products, setProducts] = useState<ProductModel[]>([]);
  const [loading, setLoading] = useState(true);

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
  }, [])

  return <>
    {loading ?
      <SafeAreaView className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" />
      </SafeAreaView>
      :
      <SafeAreaView className='flex-1 items-center bg-primary'>
        <Text className="text-2xl font-bold text-primary">Home</Text>
        <FlatList
          className='w-[80%]'
          data={products}
          renderItem={({ item }) => (<ProductListItem product={{ _id: item._id, title: item.title, price: item.price, description: item.description, category: item.category, image: item.image, count: item.count }} />)}
          keyExtractor={(item) => item._id}
        />
      </SafeAreaView>
    }
  </>
}
