"use client";
import { configureStore } from "@reduxjs/toolkit";
import accountSlice from "./features/account-slice";
import authSlice from "./features/auth-slice";
import cartSlice from "./features/cart-slice";
import ordersSlice from "./features/orders-slice";
import orderSelectionSlice from "./features/orderSelection-slice";
import productSlice from "./features/product-slice";
import restaurantsSlice from "./features/restaurants-slice";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    account: accountSlice.reducer,
    restaurants: restaurantsSlice.reducer,
    cart: cartSlice.reducer,
    orders: ordersSlice.reducer,
    product: productSlice.reducer,
    orderSelection: orderSelectionSlice.reducer,

  },
});

export default store;
