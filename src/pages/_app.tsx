import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import {
  QueryClient,
  QueryClientProvider,
  HydrationBoundary,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider } from "@/components/custom/theme-provider";

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

  useEffect(() => {
    // start the socket server
    fetch("/api/socket");
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary
        state={pageProps.dehydratedState}
        key="hydration-boundary"
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Component {...pageProps} />
        </ThemeProvider>
      </HydrationBoundary>
      <ReactQueryDevtools buttonPosition="bottom-right" client={queryClient} />
    </QueryClientProvider>
  );
}
