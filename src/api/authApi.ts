import axios, { AxiosError } from "axios";

const API_URL = "https://study-mate-api.vercel.app/api/v1";

async function authRequest(
  endpoint: string,
  payload: Record<string, unknown>
): Promise<string> {
  try {
    const response = await axios.post(`${API_URL}${endpoint}`, { ...payload });

    const token = response.data?.token;
    if (!token) {
      throw new Error("Token not found in response");
    }

    return token;
  } catch (err) {
    if (err instanceof AxiosError) {
      throw new Error(err.response?.data?.message || "Authentication failed");
    }
    throw new Error("An unexpected error occurred");
  }
}

export async function signin(email: string, password: string): Promise<string> {
  return authRequest("/login", { email, password });
}

type SignupPayload = {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
  birthdate: string;
};

export async function signup(data: SignupPayload): Promise<string> {
  return authRequest("/signup", data);
}

export function socialLogin(googleAuthToken: string): Promise<string> {
  return authRequest("/social-login", { googleAuthToken });
}
