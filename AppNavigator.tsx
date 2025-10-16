// AppNavigator.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainNavigator from './src/nagivation/MainNavigator';
import AuthNavigator from './src/nagivation/AuthNavigator';
import { AuthProvider, useAuth } from './src/context/AuthContext';

function Navigation() {
  const { user } = useAuth();

  return (
    <NavigationContainer>
      {user ? <MainNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}

export default function AppNavigator() {
  return (
    <AuthProvider>
      <Navigation />
    </AuthProvider>
  );
}
