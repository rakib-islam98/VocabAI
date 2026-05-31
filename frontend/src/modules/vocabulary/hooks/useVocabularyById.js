import { useQuery } from "@tanstack/react-query";

import { getVocabularyById } from "../services/vocabulary.service";

export const useVocabularyById = (userWordId, enabled = true) => {
  return useQuery({
    queryKey: ["vocabulary-word", userWordId],

    queryFn: () => getVocabularyById(userWordId),

    enabled: enabled && !!userWordId,
  });
};
