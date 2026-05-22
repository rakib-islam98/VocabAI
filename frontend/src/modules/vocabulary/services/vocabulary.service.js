import api from "../../../api/client";

export const addWord = async (payload) => {
  const response = await api.post(
    "/vocabulary/add",
    payload
  );

  return response.data;
};

export const getVocabulary = async (
  page = 1,
  limit = 10
) => {
  const response = await api.get(
    `/vocabulary?page=${page}&limit=${limit}`
  );

  return response.data;
};

export const deleteVocabulary = async (id) => {
    const response = await api.delete(`/vocabulary/${id}`);

    return response.data;
};