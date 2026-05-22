import { useEffect } from "react";

import useAuthStore from "../../../store/authStore";

import { getCurrentUser } from "../services/auth.service";

export default function useInitializeAuth() {
  const setUser = useAuthStore(
    (state) => state.setUser
  );

  const logout = useAuthStore(
    (state) => state.logout
  );

  const finishInitializing = useAuthStore(
    (state) => state.finishInitializing
  );

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const user = await getCurrentUser();

        setUser(user);
      } catch (error) {
        logout();
      } finally {
        finishInitializing();
      }
    };

    initializeAuth();
  }, [
    setUser,
    logout,
    finishInitializing,
  ]);
}