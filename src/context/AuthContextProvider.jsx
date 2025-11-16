import { useEffect, useState } from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { appAuth } from "../features/firebase.config";
import AuthContext from "./CreateAuthContext";
import api from "../utils/api";

export default function AuthContextProvider({ children }) {
  // Initial auth check
  const [isLoading, setIsLoading] = useState(true);
  // login/signup actions
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isError, setIsError] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [authUser, setAuthUser] = useState(null);
  const googleAuthProvider = new GoogleAuthProvider();

  // --- Initial auth check ---
  useEffect(() => {
    const checkAuth = async () => {
      const storedToken = localStorage.getItem("token");
      if (!storedToken) {
        setIsLoading(false);
        return;
      }

      try {
        // backend returns user info
        const response = await api.get("/users/me");
        setToken(storedToken);
        setAuthUser(response.data.data.user);
      } catch (err) {
        console.log("Auth check failed:", err);
        localStorage.removeItem("token");
        setToken(null);
        setAuthUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  // --- Signup ---
  const signup = async (signupObject) => {
    setIsSubmitting(true);
    setIsError("");
    try {
      const response = await api.post(`/users/signup`, signupObject);
      localStorage.setItem("token", response.data?.token);
      setToken(response.data?.token);
      setAuthUser(response.data?.user);
      return true;
    } catch (error) {
      setIsError(
        error.response?.data?.message || error.message || "An error occurred."
      );
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- Login ---
  const login = async (email, password) => {
    setIsSubmitting(true);
    setIsError("");
    try {
      const response = await api.post(`/users/login`, {
        email,
        password,
      });
      localStorage.setItem("token", response.data?.token);
      setToken(response.data?.token);
      setAuthUser(response.data?.user);
      return true;
    } catch (error) {
      setIsError(
        error.response?.data?.message || error.message || "An error occurred."
      );
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- Social login (Google) ---
  const socialLogin = async () => {
    setIsSubmitting(true);
    setIsError("");
    try {
      const credential = await signInWithPopup(appAuth, googleAuthProvider);
      const idToken = await credential.user.getIdToken();

      const response = await api.post(`/users/social-login`, {
        googleAuthToken: idToken,
      });

      localStorage.setItem("token", response.data?.token);
      setToken(response.data?.token);
      setAuthUser(response.data?.user);
      return true;
    } catch (error) {
      setIsError(
        error.response?.data?.message || error.message || "An error occurred."
      );
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- Logout ---
  const logout = async () => {
    setIsSubmitting(true);
    setIsError("");
    try {
      localStorage.removeItem("token");
      setToken(null);
      setAuthUser(null);
    } catch (error) {
      setIsError(
        error.response?.data?.message || error.message || "An error occurred."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const value = {
    signup,
    login,
    socialLogin,
    logout,
    authUser,
    token,
    isLoading,
    isSubmitting,
    setIsSubmitting,
    isError,
    setIsError,
  };

  return <AuthContext value={value}>{children}</AuthContext>;
}
