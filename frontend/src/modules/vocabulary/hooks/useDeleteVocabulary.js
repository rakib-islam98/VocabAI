import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { toast } from "react-hot-toast";

import useAuthStore from "../../../store/authStore";

import {
  deleteVocabulary,
} from "../services/vocabulary.service";

export const useDeleteVocabulary =
  () => {

    const queryClient = useQueryClient();

    const user = useAuthStore(
      (state) => state.user
    );

    return useMutation({
      mutationFn:
        deleteVocabulary,

      onSuccess: (data) => {

        toast.success(
          data.message
        );

        /*
        ========================
        CLEAR REVIEW STORAGE
        ========================
        */

        Object.keys(sessionStorage)
          .forEach((key) => {

            if (
              key.startsWith(
                "review_"
              )
            ) {

              sessionStorage.removeItem(
                key
              );
            }
          });

        /*
        ========================
        REFRESH VOCABULARY
        ========================
        */

        queryClient.invalidateQueries({
            queryKey: [
              "vocabulary",
              user?.id,
            ],
        });

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

      onError: (error) => {

        toast.error(
          error?.response?.data
            ?.message ||
            "Failed to delete vocabulary"
        );
      },
    });
  };