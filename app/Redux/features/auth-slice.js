"use client"

import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { isLoggedIn: false, authModalOpen: false, userToken: "", user: {}, openNotification: false },
  reducers: {
    updateState(state, action) {
      const params = action.payload;
      Object.keys(params).map((i) => {
        return (state[i] = params[i]);
      });
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice;
