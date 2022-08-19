import type { AppProps } from "next/app";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";

import LayoutMain from "../components/layout/layout-main";

import "../styles/globals.css";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class">
      <QueryClientProvider client={queryClient}>
        <LayoutMain>
          <Component {...pageProps} />
        </LayoutMain>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default MyApp;
