import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";
import { Toaster } from "react-hot-toast";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => {
    return new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 1,
        },
      },
    });
  });
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <ReactQueryDevtools />
      {children}
    </QueryClientProvider>
  );
}
