"use client"

import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: { openCart: false, cartProducts: [],cartTotalPrice:0 },
  reducers: {
    updateState(state, action) {
      const params = action.payload;
      Object.keys(params).map((i) => {
        return (state[i] = params[i]);
      });
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice;
