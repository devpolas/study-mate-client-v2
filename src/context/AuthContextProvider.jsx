import { useEffect, useState } from "react";
import AuthContext from "./CreateAuthContext";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { appAuth } from "./../features/firebase.config";
import axios from "axios";

const BASE_URL = "https://study-mate-api.vercel.app/api/v1";

export default function AuthContextProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const googleAuthProvider = new GoogleAuthProvider();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) setToken(storedToken);
  }, []);

  const signup = async (signupObject) => {
    setIsLoading(true);
    setIsError("");
    try {
      const response = await axios.post(
        `${BASE_URL}/users/signup`,
        signupObject
      );
      localStorage.setItem("token", response.data?.token);
      setToken(response.data?.token);
      return;
    } catch (error) {
      const errorMsg =
        error.response?.data?.message || error.message || "An error occurred.";
      setIsError(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };
  const login = async (email, password) => {
    setIsLoading(true);
    setIsError("");
    try {
      const response = await axios.post(`${BASE_URL}/users/login`, {
        email,
        password,
      });
      localStorage.setItem("token", response.data?.token);
      setToken(response.data?.token);
      return;
    } catch (error) {
      const errorMsg =
        error.response?.data?.message || error.message || "An error occurred.";
      setIsError(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    setIsLoading(true);
    return signInWithPopup(appAuth, googleAuthProvider);
  };

  const socialLogin = async () => {
    setIsLoading(true);
    setIsError("");
    try {
      const credential = await signInWithGoogle();
      const idToken = await credential.user.getIdToken();
      const response = await axios.post(`${BASE_URL}/users/social-login`, {
        googleAuthToken: idToken,
      });
      localStorage.setItem("token", response.data?.token);
      setToken(response.data?.token);
      return;
    } catch (error) {
      const errorMsg =
        error.response?.data?.message || error.message || "An error occurred.";
      setIsError(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    setIsError("");
    try {
      localStorage.removeItem("token");
      setToken(null);
      return;
    } catch (error) {
      const errorMsg =
        error.response?.data?.message || error.message || "An error occurred.";
      setIsError(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    signup,
    socialLogin,
    login,
    logout,
    isLoading,
    setIsLoading,
    isError,
    setIsError,
    token,
  };
  return <AuthContext value={value}>{children}</AuthContext>;
}
