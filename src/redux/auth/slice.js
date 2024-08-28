import { createSlice } from "@reduxjs/toolkit";
import { register, login, logOut, refreshUser } from "./operations";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: null,
    isLoggedIn: false,
    isRefreshing: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        state.token = action.payload;
        state.isLoggedIn = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.token = action.payload;
        state.isLoggedIn = true;
      })
      .addCase(logOut.fulfilled, (state) => {
        state.token = null;
        state.isLoggedIn = false;
      })
      .addCase(refreshUser.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.token = action.payload;
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(refreshUser.rejected, (state) => {
        state.isRefreshing = false;
      });
  },
});

export const authReducer = authSlice.reducer;
