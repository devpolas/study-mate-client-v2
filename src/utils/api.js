import axios from "axios";

// Create Axios instance
const api = axios.create({
  baseURL: "https://study-mate-api.vercel.app/api/v1",
  withCredentials: true, // include cookies for refresh token
});

// Flag for refresh state and queue for pending requests
let isRefreshing = false;
let failedQueue = [];

// Helper to process queued requests
const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// Get access token from local storage
function getAccessToken() {
  return localStorage.getItem("token");
}

// Request interceptor to attach token
api.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor to handle 401 and refresh token
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (!error.response) return Promise.reject(error);

    // If 401 and request not retried
    if (error.response.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // Queue pending requests
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Call refresh token endpoint
        const response = await axios.post(
          "https://study-mate-api.vercel.app/api/v1/users/refresh_token",
          {},
          { withCredentials: true }
        );

        const newToken = response.data.token;
        if (!newToken) throw new Error("No token returned from refresh");

        localStorage.setItem("token", newToken);
        api.defaults.headers.common.Authorization = `Bearer ${newToken}`;

        processQueue(null, newToken);

        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api(originalRequest);
      } catch (err) {
        processQueue(err, null);
        localStorage.removeItem("token");
        window.location.href = "/login"; // Redirect to login
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;
