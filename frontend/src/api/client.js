import axios from "axios";

import toast from "react-hot-toast";

import useAuthStore from "../store/authStore";

const api = axios.create({
  baseURL:"http://localhost:5000/api/v1",

  withCredentials: true,
});

let isRedirecting = false;

api.interceptors.response.use(
  (response) => response,

  (error) => {
    const isAuthMeRequest =
      error.config?.url?.includes("/auth/me");

    if (
      error.response?.status === 401 &&
      !isAuthMeRequest
    ) {
      const logout =
        useAuthStore.getState().logout;

      logout();

      if (!isRedirecting) {
        isRedirecting = true;

        toast.error(
          "Session expired. Please login again."
        );

        setTimeout(() => {
          window.location.href =
            "/login";
        }, 1200);
      }
    }

    return Promise.reject(error);
  }
);

export default api;