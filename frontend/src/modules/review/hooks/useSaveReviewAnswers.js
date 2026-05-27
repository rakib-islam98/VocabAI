import { useMutation } from "@tanstack/react-query";

import { saveReviewAnswers } from "../services/review.service";

export const useSaveReviewAnswers = () => {
  return useMutation({
    mutationFn: saveReviewAnswers,
  });
};
