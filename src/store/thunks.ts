import { createAsyncThunk } from "@reduxjs/toolkit";

import { signin, signup, socialLogin } from "@/api/authApi";
import { getMe } from "@/api/userApi";

export const signinUser = createAsyncThunk(
  "auth/login",
  async ({ email, password }: { email: string; password: string }) => {
    return await signin(email, password);
  }
);
export const signupUser = createAsyncThunk(
  "auth/signup",
  async ({
    name,
    email,
    password,
    passwordConfirm,
    birthdate,
  }: {
    name: string;
    email: string;
    password: string;
    passwordConfirm: string;
    birthdate: string;
  }) => {
    return await signup({ name, email, password, passwordConfirm, birthdate });
  }
);

export const socialLoginUser = createAsyncThunk(
  "auth/social",
  async ({ googleAuthToken }: { googleAuthToken: string }) => {
    return await socialLogin(googleAuthToken);
  }
);

export const getUser = createAsyncThunk("auth/me", async (token: string) => {
  return await getMe(token);
});
