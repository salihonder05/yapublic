"use client"

import { createSlice } from "@reduxjs/toolkit";

const orderSelectionSlice = createSlice({
    name: "orderSelection",
    initialState: { orderedProduct:{} },
    reducers: {
        updateState(state, action) {
            const params = action.payload;
            Object.keys(params).map((i) => {
                return (state[i] = params[i]);
            });
        },
    },
});

export const orderSelectionActions = orderSelectionSlice.actions;

export default orderSelectionSlice;
