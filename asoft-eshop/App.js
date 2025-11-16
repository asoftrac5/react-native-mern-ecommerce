// App.js
import React from 'react';
import { LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

// Navigators
import Main from './Navigators/Main';

import Header from './Screens/Shared/Header';
import ProductContainer from './Screens/Products/ProductContainer';

LogBox.ignoreAllLogs(true);

export default function App() {
  return (
    <NavigationContainer>
        <Header />
        <Main />
    </NavigationContainer>
  );
}

