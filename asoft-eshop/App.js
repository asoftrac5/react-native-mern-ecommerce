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

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import store from './Redux/store';
import Toast from 'react-native-toast-message';

import Header from './Shared/Header';
import Main from './Navigators/Main';

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <View style={styles.container}>
          <Header />
          <Main />
          <StatusBar style="auto" />
        </View>
        <Toast />
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});