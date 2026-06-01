import { useMutation, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";

import useAuthStore from "../../../store/authStore";

import { addWord } from "../services/vocabulary.service";

import { getErrorMessage } from "../../../utils/getErrorMessage";

export const useAddWord = () => {
  const queryClient = useQueryClient();

  const user = useAuthStore(
    (state) => state.user
  );

  return useMutation({
    mutationFn: addWord,

    onSuccess: async () => {
      await queryClient.invalidateQueries({
          queryKey: [
            "vocabulary",
            user?.id,
          ],
      });

      await queryClient.invalidateQueries({
        queryKey: [
          "insights",
          user?.id,
        ],
      });
    },
  });
};
