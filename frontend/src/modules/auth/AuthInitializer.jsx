import useInitializeAuth from ".//hooks/useInitializeAuth";

export default function AuthInitializer({ children }) {
  useInitializeAuth();

  return children;
}