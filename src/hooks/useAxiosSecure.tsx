import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "./useAuth";

// Create Axios instance
const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Get access token from local storage
function useAxiosSecure() {
  const {
    auth: { token },
    logout,
  } = useAuth();
  const navigate = useNavigate();

  useEffect(
    function () {
      const requestInterCeptor = instance.interceptors.request.use((config) => {
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      });

      const responseInterCeptor = instance.interceptors.response.use(
        (response) => {
          return response;
        },
        (err) => {
          const status = err.status;
          if (status === 401 || status === 403) {
            logout();
            navigate("/login");
          }
          return Promise.reject(err);
        }
      );

      return () => {
        instance.interceptors.request.eject(requestInterCeptor);
        instance.interceptors.response.eject(responseInterCeptor);
      };
    },
    [token, logout, navigate]
  );

  return instance;
}

export default useAxiosSecure;
