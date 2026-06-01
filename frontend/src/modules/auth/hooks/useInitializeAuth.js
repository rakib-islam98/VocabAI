import { useEffect } from "react";

import { useQueryClient } from "@tanstack/react-query";

import useAuthStore from "../../../store/authStore";

import { getCurrentUser } from "../services/auth.service";

import { getInsights } from "../../insights/services/insights.service.js";

export default function useInitializeAuth() {
  const setUser = useAuthStore((state) => state.setUser);

  const logout = useAuthStore((state) => state.logout);

  const finishInitializing = useAuthStore((state) => state.finishInitializing);

  const queryClient = useQueryClient();

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const user = await getCurrentUser();
        setUser(user);
        queryClient
          .prefetchQuery({
            queryKey: ["insights", user.id],

            queryFn: getInsights,
          })
          .catch(() => {});
      } catch (error) {
        logout();
      } finally {
        finishInitializing();
      }
    };

    initializeAuth();
  }, [setUser, logout, finishInitializing, queryClient]);
}
