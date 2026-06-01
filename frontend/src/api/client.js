import axios from "axios";
import toast from "react-hot-toast";

import useAuthStore from "../store/authStore";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

let isRefreshing = false;
let refreshPromise = null;

api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    if (!originalRequest) {
      return Promise.reject(error);
    }

    const isAuthRoute =
      originalRequest.url?.includes("/auth/login") ||
      originalRequest.url?.includes("/auth/register");

    const isRefreshRoute = originalRequest.url?.includes("/auth/refresh");

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !isAuthRoute &&
      !isRefreshRoute
    ) {
      originalRequest._retry = true;

      try {
        if (!isRefreshing) {
          isRefreshing = true;

          refreshPromise = api.post("/auth/refresh");
        }

        await refreshPromise;

        isRefreshing = false;
        refreshPromise = null;

        return api(originalRequest);
      } catch (refreshError) {
        isRefreshing = false;
        refreshPromise = null;

        const { isAuthenticated, logout } = useAuthStore.getState();

        logout();

        if (isAuthenticated) {
          toast.error("Session expired. Please login again.");
        }

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default api;
