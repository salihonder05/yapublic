"use client"

import { createSlice } from "@reduxjs/toolkit";

const restaurantsSlice = createSlice({
    name: "restaurants",
    initialState: { restaurants: [], restaurantsProducts: [], singleAccount: [], neighborhoodsx: [], neighborhoodRestaurants: [], activeCardAccount: [] },
    reducers: {
        updateState(state, action) {
            const params = action.payload;
            Object.keys(params).map((i) => {
                return (state[i] = params[i]);
            });
        },
    },
});

export const restaurantsActions = restaurantsSlice.actions;

export default restaurantsSlice;
