import { useQuery } from "@tanstack/react-query";

import useAuthStore from "../../../store/authStore";

import { getInsights } from "../services/insights.service";

export const useInsights = () => {
  const user = useAuthStore(
    (state) => state.user
  );

  return useQuery({
    queryKey: ["insights", user?.id],

    queryFn: getInsights,

    enabled: !!user,

    staleTime: 1000 * 60 * 5,

    gcTime: 1000 * 60 * 15,
  });
};