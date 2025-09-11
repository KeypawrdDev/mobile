import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { fetchItems, PaginationInfo } from './src/api/client';

// Add this import for NativeWind
import './nativewind-env.d.ts';

const Tab = createBottomTabNavigator();
const qc = new QueryClient();

function FeedScreen() {
  const [q, setQ] = useState('');
  const [page, setPage] = useState(1);
  const [limit] = useState(10); // Items per page
  
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['items', q, page, limit],
    queryFn: () => fetchItems(q, page, limit),
  });

  console.log('FeedScreen data:', data);
  console.log('FeedScreen isLoading:', isLoading);
  console.log('FeedScreen error:', error);

  const pagination: PaginationInfo | undefined = data?.pagination;

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleSearch = (searchQuery: string) => {
    setQ(searchQuery);
    setPage(1); // Reset to first page when searching
  };

  const PaginationControls = () => {
    if (!pagination) return null;

    return (
      <View className="flex-row justify-between items-center p-4 bg-gray-100">
        <TouchableOpacity
          onPress={() => handlePageChange(page - 1)}
          disabled={!pagination.hasPrev}
          className={`px-4 py-2 rounded ${
            pagination.hasPrev 
              ? 'bg-blue-500' 
              : 'bg-gray-300'
          }`}
        >
          <Text className={`font-semibold ${
            pagination.hasPrev ? 'text-white' : 'text-gray-500'
          }`}>
            Previous
          </Text>
        </TouchableOpacity>

        <View className="flex-row items-center">
          <Text className="text-gray-700 mr-2">
            Page {pagination.page} of {pagination.totalPages}
          </Text>
          <Text className="text-sm text-gray-500">
            ({pagination.total} total items)
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => handlePageChange(page + 1)}
          disabled={!pagination.hasNext}
          className={`px-4 py-2 rounded ${
            pagination.hasNext 
              ? 'bg-blue-500' 
              : 'bg-gray-300'
          }`}
        >
          <Text className={`font-semibold ${
            pagination.hasNext ? 'text-white' : 'text-gray-500'
          }`}>
            Next
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View className="flex-1 bg-yellow-50">
      <View className="p-4">
        <TextInput
          placeholder="Search..."
          value={q}
          onChangeText={handleSearch}
          className="mb-3 p-2 border border-gray-300 rounded-md bg-white"
        />
        
        {isLoading && <Text className="text-center p-4">Loading...</Text>}
        
        {error && (
          <Text className="text-red-500 p-4">
            Error: {error.message}
          </Text>
        )}
        
        {pagination && (
          <Text className="mb-2 text-sm text-gray-600">
            Showing {data?.items?.length || 0} of {pagination.total} items
          </Text>
        )}
      </View>
      
      <FlatList
        data={data?.items ?? []}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className="mx-4 mb-1">
            <Text className="p-3 text-gray-800 bg-white rounded shadow-sm">
              {item.text}
            </Text>
          </View>
        )}
        className="flex-1"
      />
      
      <PaginationControls />
    </View>
  );
}

function AccountScreen() {
  return (
    <View className="flex-1 justify-center items-center bg-blue-100">
      <Text className="text-2xl font-bold text-blue-800">
        Account placeholder
      </Text>
    </View>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={qc}>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Feed" component={FeedScreen} />
          <Tab.Screen name="Account" component={AccountScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
}
