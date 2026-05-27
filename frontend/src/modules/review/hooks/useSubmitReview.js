import { useMutation } from "@tanstack/react-query";

import { submitReviewSession } from "../services/review.service";

export const useSubmitReview = () => {
  return useMutation({
    mutationFn: submitReviewSession,
  });
};
