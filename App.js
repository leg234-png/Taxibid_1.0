import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthProvider } from './src/contexts/AuthContext';
import HomePage from './src/pages/HomePage';   
import LoginPage from './src/pages/LoginPage';
import RegisterPage from './src/pages/RegisterPage';
import ClientHomePage from './src/pages/ClientHomePage';
import TaxiHomePage from './src/pages/TaxiHomePage';
import TaxiList from './src/pages/TaxiList';
import TaxiDetailsBid from './src/pages/TaxiDetailsBid';
import ClientDetailList from './src/pages/ClientDetailList';
import Help from './src/components/Help';
import wallet from './src/components/wallet';
import About from './src/components/About';
import TaxiProfile from  './src/components/TaxiProfile';
import ClientProfile from './src/components/ClientProfile';


const Stack = createStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="HomePage">
          <Stack.Screen name="HomePage" component={HomePage} options={{ title: 'Welcome' }} />
          <Stack.Screen name="LoginPage" component={LoginPage} options={{ title: 'Login' }} />
          <Stack.Screen name="RegisterPage" component={RegisterPage} options={{ title: 'Register' }} />
          <Stack.Screen name="ClientHomePage" component={ClientHomePage} options={{ title: 'Client Home' }} />
          <Stack.Screen name="TaxiHomePage" component={TaxiHomePage} options={{ title: 'Taxi Home' }} />
          <Stack.Screen name="TaxiList" component={TaxiList} />
          <Stack.Screen name="ClientList" component={ClientDetailList} />
          <Stack.Screen name="TaxiDetailsBid" component={TaxiDetailsBid} />
          <Stack.Screen name="Help" component={Help} />
          <Stack.Screen name="wallet" component={wallet} />
          <Stack.Screen name="About" component={About} />
          <Stack.Screen name="TaxiProfile" component={TaxiProfile} />
          <Stack.Screen name="ClientProfile" component={ClientProfile} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}
