export const clearReviewStorage =
  (sessionId) => {

    sessionStorage.removeItem(
      `review_answers_${sessionId}`
    );

    sessionStorage.removeItem(
      `review_current_index_${sessionId}`
    );
  };