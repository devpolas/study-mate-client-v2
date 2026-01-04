import axios, { AxiosError } from "axios";
import type { User } from "../types/auth";

const API_URL = import.meta.env.VITE_API_URL;

export async function getMe(token: string): Promise<User> {
  try {
    const response = await axios.get(`${API_URL}/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const user = response.data?.data?.user;
    if (!user) {
      throw new Error("User not found in response");
    }
    return user;
  } catch (err) {
    if (err instanceof AxiosError) {
      throw new Error(err.response?.data?.message || "Authentication failed");
    }
    throw new Error("An unexpected error occurred");
  }
}
