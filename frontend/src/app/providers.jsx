import { QueryClientProvider } from "@tanstack/react-query";

import { queryClient } from "../lib/queryClient";

import AuthInitializer from "../modules/auth/AuthInitializer";

export default function Providers({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthInitializer>
        {children}
      </AuthInitializer>
    </QueryClientProvider>
  );
}