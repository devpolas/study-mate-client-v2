import { createSlice } from "@reduxjs/toolkit";
import { getUser, signinUser, signupUser, socialLoginUser } from "./thunks";
import type { User } from "../types/auth";

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  user: User | null;
}

const initialState: AuthState = {
  token: localStorage.getItem("token"),
  isAuthenticated: !!localStorage.getItem("token"),
  loading: false,
  error: null,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logOut: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signinUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(signinUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload;
        state.isAuthenticated = true;
        localStorage.setItem("token", action.payload);
      })
      .addCase(signinUser.rejected, (state) => {
        state.loading = false;
        state.token = null;
        state.isAuthenticated = false;
        localStorage.removeItem("token");
        state.error = "signin failed!";
      })
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload;
        state.isAuthenticated = true;
        localStorage.setItem("token", action.payload);
      })
      .addCase(signupUser.rejected, (state) => {
        state.loading = false;
        state.token = null;
        state.isAuthenticated = false;
        localStorage.removeItem("token");
        state.error = "signup failed!";
      })
      .addCase(socialLoginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(socialLoginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload;
        state.isAuthenticated = true;
        localStorage.setItem("token", action.payload);
      })
      .addCase(socialLoginUser.rejected, (state) => {
        state.loading = false;
        state.token = null;
        state.isAuthenticated = false;
        state.error = "Fail to social Login!";
        localStorage.removeItem("token");
      })
      .addCase(getUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(getUser.rejected, (state) => {
        state.loading = false;
        state.user = null;
      });
  },
});

export const { logOut } = authSlice.actions;
export default authSlice.reducer;
