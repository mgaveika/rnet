import { Text, FlatList } from 'react-native';
import { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Product } from '../../data/products';
import ProductListItem from '../../components/ProductListItem';

export default function HomeScreen() {
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
      })
      .catch(error => console.error(error));
  }, []);
  return (
    <SafeAreaView className='flex-1 items-center bg-primary'>
      <Text className="text-2xl font-bold text-primary">Home</Text>
      <FlatList
        className='w-[80%]'
        data={products}
        renderItem={({ item }) => (<ProductListItem product={item} />)}
        keyExtractor={(item) => item.id.toString()}
      />
    </SafeAreaView>
  );
}
