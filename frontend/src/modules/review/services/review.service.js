import api from "../../../api/client";

export const getReviewSession = async () => {
  const response = await api.get("/review/session");

  return response.data;
};

export const saveReviewAnswers = async ({ sessionId, answers }) => {
  const response = await api.patch(`/review/session/${sessionId}/answers`, {
    answers,
  });

  return response.data;
};

export const submitReviewSession = async ({ sessionId, answers }) => {
  const response = await api.post(`/review/session/${sessionId}/submit`);
  return response.data;
};
