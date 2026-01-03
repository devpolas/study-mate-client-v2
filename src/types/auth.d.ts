export type Role = "student" | "tutor" | "admin";

export interface User {
  _id: string;
  name: string;
  email: string;
  role: Role;
  image?: string;
  slug: string;
  authProvider: "mongodb" | "firebase";
  ratingAverage: number;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupCredentials {
  name: string;
  email: string;
  birthdate: Date;
  password: string;
}

export interface AuthResponse {
  status: string;
  token: string;
}
