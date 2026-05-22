import { useInfiniteQuery } from "@tanstack/react-query";

import { getVocabulary } from "../services/vocabulary.service";

export const useVocabulary = (
  limit = 10
) => {
  return useInfiniteQuery({
    queryKey: ["vocabulary"],

    queryFn: ({ pageParam = 1 }) =>
      getVocabulary(pageParam, limit),

    initialPageParam: 1,

    getNextPageParam: (
      lastPage,
      allPages
    ) => {
      const currentPage =
        lastPage?.pagination?.page;

      const totalPages =
        lastPage?.pagination?.totalPages;

      if (currentPage < totalPages) {
        return currentPage + 1;
      }

      return undefined;
    },

    staleTime: 1000 * 60,
  });
};