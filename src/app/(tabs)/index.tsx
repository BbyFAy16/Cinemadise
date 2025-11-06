// index.tsx
import React from 'react';
import { registerRootComponent } from 'expo';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Splash from '../../screens/Splash';
import AuthLanding from '../../screens/AuthLanding';
import SignUp from '../../screens/SignUp';
import Login from '../../screens/Login'
import OtpVerify from '../../screens/OtpVerify';
import Home from '../../screens/Home';
import MovieDetail from '../../screens/MovieDetail';
import BuyScreen from '../../screens/BuyScreen';
import PaymentScreen from '../../screens/PaymentScreen';
import ReceiptScreen from '../../screens/ReceiptScreen';

const Stack = createNativeStackNavigator();

const Main = () => {
  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            animation: 'slide_from_right',
          }}
        >
          <Stack.Screen name="Splash" component={Splash} />
          <Stack.Screen name="AuthLanding" component={AuthLanding} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="OtpVerify" component={OtpVerify} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="MovieDetail" component={MovieDetail} />
          <Stack.Screen name='BuyScreen' component={BuyScreen} />
          <Stack.Screen name='PaymentScreen' component={PaymentScreen} />
          <Stack.Screen name='ReceiptScreen' component={ReceiptScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

registerRootComponent(Main);
