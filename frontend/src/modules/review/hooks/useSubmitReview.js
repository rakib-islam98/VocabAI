import { useMutation, useQueryClient } from "@tanstack/react-query";

import { submitReviewSession } from "../services/review.service";

import useAuthStore from "../../../store/authStore";

export const useSubmitReview = () => {
  const queryClient = useQueryClient();

  const user = useAuthStore(
    (state) => state.user
  );

  return useMutation({
    mutationFn: submitReviewSession,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          "insights",
          user?.id,
        ],
      });
      queryClient.invalidateQueries({
        queryKey: [
          "review-status",
          user?.id,
        ],
      });
    },
  });
};
