import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { View, Text } from 'react-native';
import { FeedScreen } from './src/screens/feed_screen';
import { AccountScreen } from './src/screens/account_screen';
// Import the CSS file instead of the .d.ts file
import './global.css';

const Tab = createBottomTabNavigator();
const qc = new QueryClient();

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
