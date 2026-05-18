import apiClient from "../../api/client";

export const getCurrentUser = async () => {
  const response = await apiClient.get("/auth/me");

  return response.data.data;
};