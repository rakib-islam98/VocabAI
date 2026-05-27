import { useMutation } from "@tanstack/react-query";

import {
  getReviewSession,
} from "../services/review.service";

export const useReviewSession =
  () => {

    return useMutation({
      mutationFn:
        getReviewSession,
    });
  };