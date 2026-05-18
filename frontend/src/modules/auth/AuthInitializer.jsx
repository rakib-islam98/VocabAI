import useInitializeAuth from "./useInitializeAuth";

export default function AuthInitializer({ children }) {
  useInitializeAuth();

  return children;
}