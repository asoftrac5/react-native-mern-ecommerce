// App.js
import React from 'react';
import { StyleSheet, View, LogBox} from 'react-native';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { config } from './gluestack-ui.config';

import Header from './Screens/Shared/Header';
import ProductContainer from './Screens/Products/ProductContainer';

LogBox.ignoreAllLogs(true);

export default function App() {
  return (
    <GluestackUIProvider config={config}>
      <View style={styles.container}>
        <Header />
        <ProductContainer />
      </View>
    </GluestackUIProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
