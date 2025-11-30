// App.js
import React from "react";
import { LogBox } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

// Redux
import { Provider } from "react-redux";
import store from "./Redux/store";

//Context API
import Auth from "./Context/Store/Auth";

// Navigators
import Main from "./Navigators/Main";

import Header from "./Shared/Header";
import ProductContainer from "./Screens/Products/ProductContainer";
import Toast from "react-native-toast-message";

LogBox.ignoreAllLogs(true);

export default function App() {
  return (
    <Auth>
      <Provider store={store}>
        <NavigationContainer>
          <Header />
          <Main />
          <Toast ref={(ref) => Toast.setRef(ref)} />
        </NavigationContainer>
      </Provider>
    </Auth>
  );
}
