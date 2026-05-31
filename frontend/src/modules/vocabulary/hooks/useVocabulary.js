import { useInfiniteQuery } from "@tanstack/react-query";

import useAuthStore from "../../../store/authStore";

import { getVocabulary } from "../services/vocabulary.service";

export const useVocabulary = (search, sort, limit = 10) => {
  const user = useAuthStore((state) => state.user);

  return useInfiniteQuery({
    queryKey: ["vocabulary", user?.id, search, sort,],

    queryFn: ({ pageParam = 1 }) =>
      getVocabulary(pageParam, limit, search, sort),

    enabled: !!user,

    initialPageParam: 1,

    getNextPageParam: (lastPage) => {
      const currentPage =
        lastPage?.pagination?.page;

      const totalPages =
        lastPage?.pagination?.totalPages;

      return currentPage < totalPages
        ? currentPage + 1
        : undefined;
    },

    staleTime: 1000 * 60,
  });
};