import apiClient from "../../../api/client";

export const registerUser = async (data) => {
  const response = await apiClient.post("/auth/register", data);

  return response.data.data;
};

export const loginUser = async (data) => {
  const response = await apiClient.post("/auth/login", data);

  return response.data.data;
};

export const getCurrentUser = async () => {
  const response = await apiClient.get("/auth/me");

  return response.data.data;
};

export const logoutUser = async () => {
  const response = await apiClient.post("/auth/logout");

  return response.data;
};

export const refreshAccessToken = async () => {
  const response = await apiClient.post("/auth/refresh");

  return response.data;
};

export const forgotPassword = async (data) => {
  const response = await apiClient.post("/auth/forgot-password", data);

  return response.data;
};

export const resetPassword = async ({ token, password }) => {
  const response = await apiClient.post(`/auth/reset-password/${token}`, {
    password,
  });

  return response.data;
};
