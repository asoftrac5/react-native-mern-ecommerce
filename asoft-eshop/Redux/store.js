import { configureStore } from "@reduxjs/toolkit";
import cartItems from "./Reducers/cartItem";

const store = configureStore({
    reducer: {
        // cart: cartReducer
        cartItems: cartItems
    }
})

export default store;