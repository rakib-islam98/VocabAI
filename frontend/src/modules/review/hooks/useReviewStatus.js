import { useQuery } from "@tanstack/react-query";

import useAuthStore from "../../../store/authStore";

import { getReviewStatus } from "../services/review.service";

export const useReviewStatus = () => {
  const user = useAuthStore(
    (state) => state.user
  );

  return useQuery({
    queryKey: ["review-status", user?.id],

    queryFn: getReviewStatus,

    enabled: !!user,

    refetchOnMount: "always",
  });
};