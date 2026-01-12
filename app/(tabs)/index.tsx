import { View, Text, Pressable, FlatList } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { products } from '../../data/products';
import ProductListItem from '../../components/ProductListItem';

export default function HomeScreen() {

  return (
    <SafeAreaView className='flex items-center min-h-full bg-primary'>
      <Text className="text-2xl font-bold text-primary">Home</Text>
      <FlatList
        className='w-[80%]'
        data={products}
        renderItem={({ item }) => (<ProductListItem productId={item.id} />)}
        keyExtractor={(item) => item.id.toString()}
      />
    </SafeAreaView>
  );
}
