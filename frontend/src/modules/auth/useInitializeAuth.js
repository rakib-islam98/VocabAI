import { useEffect } from "react";

import useAuthStore from "../../store/authStore";

import { getCurrentUser } from "./auth.service";

export default function useInitializeAuth() {
  const setUser = useAuthStore((state) => state.setUser);
  const logout = useAuthStore((state) => state.logout);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const user = await getCurrentUser();

        setUser(user);
      } catch (error) {
        logout();
      }
    };

    initializeAuth();
  }, [setUser, logout]);
}