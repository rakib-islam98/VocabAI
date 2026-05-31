import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

import { queryClient } from "../lib/queryClient";

import AuthInitializer from "../modules/auth/AuthInitializer";

export default function Providers({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthInitializer>
        {children}
      </AuthInitializer>

      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
        }}
      />
    </QueryClientProvider>
  );
}