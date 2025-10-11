import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainNavigator from './src/nagivation/MainNavigator';
import AuthNavigator from './src/nagivation/AuthNavigator';


export default function AppNavigator() {
  const user = false; // replace with your auth state

  return (
    <NavigationContainer>
      {user ? <MainNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}
