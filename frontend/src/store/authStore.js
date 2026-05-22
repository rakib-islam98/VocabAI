import { create } from "zustand";

const useAuthStore = create((set) => ({
  user: null,

  isAuthenticated: false,

  isInitializing: true,

  setUser: (user) =>
    set({
      user,
      isAuthenticated: !!user,
    }),

  finishInitializing: () =>
    set({
      isInitializing: false,
    }),

  logout: () =>
    set({
      user: null,
      isAuthenticated: false,
      isInitializing: false,
    }),
}));

export default useAuthStore;