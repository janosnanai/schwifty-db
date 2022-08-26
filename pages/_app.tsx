import type { AppProps } from "next/app";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider } from "next-themes";
import { Provider as JotaiProvider } from "jotai";

import LayoutMain from "../components/layout/layout-main";

import "../styles/globals.css";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class">
      <JotaiProvider>
        <QueryClientProvider client={queryClient}>
          <LayoutMain>
            <Component {...pageProps} />
          </LayoutMain>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </JotaiProvider>
    </ThemeProvider>
  );
}

export default MyApp;
