import { useMutation, useQueryClient } from "@tanstack/react-query";

import useAuthStore from "../../../store/authStore";

import { createReviewSession } from "../services/review.service";

export const useCreateReviewSession = () => {
  const queryClient = useQueryClient();

  const user = useAuthStore((state) => state.user);

  return useMutation({
    mutationFn: createReviewSession,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["review-status", user?.id],
      });
    },
  });
};

// import { useMutation } from "@tanstack/react-query";

// import { createReviewSession } from "../services/review.service";

// export const useCreateReviewSession = () => {
//   return useMutation({
//     mutationFn: createReviewSession,
//   });
// };
