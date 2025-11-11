// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';

// // Screens
// import ProductContainer from './Screens/Products/ProductContainer';
// import Header from './Screens/Shared/Header';

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Header />
//       <ProductContainer />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

// App.js
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';

import ProductContainer from './Screens/Products/ProductContainer';
import Header from './Screens/Shared/Header';

import { GluestackUIProvider } from '@gluestack-ui/themed';
import { config } from './gluestack-ui.config';

export default function App() {
  return (
    <GluestackUIProvider config={config}>
      <View style={styles.container}>
        <Header />
        <ProductContainer />
        <StatusBar style="auto" />
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
