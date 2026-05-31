import api from "../../../api/client";

export const getInsights = async () => {
  const response = await api.get("/insights");

  return response.data;
};