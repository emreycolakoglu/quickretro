import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useState } from "react";
import {
  QueryClient,
  QueryClientProvider,
  HydrationBoundary,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary
        state={pageProps.dehydratedState}
        key="hydration-boundary"
      >
        <Component {...pageProps} />
      </HydrationBoundary>
      <ReactQueryDevtools buttonPosition="bottom-right" client={queryClient} />
    </QueryClientProvider>
  );
}
